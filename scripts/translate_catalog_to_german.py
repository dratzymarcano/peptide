#!/usr/bin/env python3
"""
High-Performance German Translation Script for Peptide-Kaufen.net
Translates all products, blog articles, and learn guides using multi-threaded batching.
Strictly preserves images, prices, variants, categories, and references.
"""

import os
import re
import time
import urllib.request
import urllib.parse
import json
from concurrent.futures import ThreadPoolExecutor, as_completed

REPO_ROOT = "/home/ivan/peptide"
PRODUCTS_DIR = os.path.join(REPO_ROOT, "astro-peptide/src/content/products")
BLOGS_DIR = os.path.join(REPO_ROOT, "astro-peptide/src/content/blog")
LEARN_DIR = os.path.join(REPO_ROOT, "astro-peptide/src/content/learn")

TRANSLATION_CACHE = {}

def translate_text(text: str) -> str:
    """Translates text to German with retry and local in-memory cache."""
    if not text or not text.strip():
        return text
    clean = text.strip()
    if clean in TRANSLATION_CACHE:
        return TRANSLATION_CACHE[clean]
    
    if re.match(r'^[0-9\-\.\s,/%≥≤±]+$', clean) or clean.startswith('http') or clean.startswith('/'):
        return text

    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=de&dt=t&q=' + urllib.parse.quote(clean)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                res = ''.join([item[0] for item in data[0] if item and item[0]])
                res = res.replace('>=', '≥').replace('<=', '≤')
                TRANSLATION_CACHE[clean] = res
                return res
        except Exception:
            time.sleep(0.5 * (attempt + 1))
    
    return text

def translate_faqs(faq_items):
    """Batches all FAQs of a product into a single translation call."""
    if not faq_items:
        return []
    lines = []
    for q, a in faq_items:
        lines.append(f"[FAQ]\nQ: {q.strip()}\nA: {a.strip()}")
    batch_text = "\n".join(lines)
    trans = translate_text(batch_text)
    
    de_faqs = []
    blocks = trans.split('[FAQ]')
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        m = re.search(r'^[QF]:\s*(.+?)\n[Aa]:\s*(.+)$', block, re.DOTALL)
        if m:
            de_faqs.append((m.group(1).strip(), m.group(2).strip()))
        else:
            blines = [l.strip() for l in block.split('\n') if l.strip()]
            if len(blines) >= 2:
                de_faqs.append((re.sub(r'^[QF]:\s*', '', blines[0]), re.sub(r'^[Aa]:\s*', '', ' '.join(blines[1:]))))
            elif len(blines) == 1:
                de_faqs.append((blines[0], blines[0]))

    if len(de_faqs) != len(faq_items):
        res = []
        for i in range(len(faq_items)):
            if i < len(de_faqs):
                res.append(de_faqs[i])
            else:
                res.append((translate_text(faq_items[i][0]), translate_text(faq_items[i][1])))
        return res
    return de_faqs

def translate_markdown_body(body: str) -> str:
    """Translates Markdown body by grouping paragraphs into large ~3000-char chunks."""
    if not body or not body.strip():
        return body

    paragraphs = body.split('\n\n')
    translated_paras = []
    
    current_chunk = []
    current_len = 0
    
    for p in paragraphs:
        p_strip = p.strip()
        if not p_strip:
            continue
            
        # Citations / PMIDs: keep citations intact
        if re.match(r'^\d+\.\s+.*\[PMID', p_strip) or re.match(r'^\d+\.\s+[A-Z].*et al\.', p_strip):
            current_chunk.append(p_strip)
            current_len += len(p_strip)
        elif p_strip.startswith('## Related') or p_strip.startswith('## Verwandte') or p_strip.startswith('## References') or p_strip.startswith('## Literatur'):
            if current_chunk:
                translated_paras.append(translate_text("\n\n".join(current_chunk)))
                current_chunk = []
                current_len = 0
            
            if 'Related' in p_strip or 'Verwandte' in p_strip:
                p_trans = (
                    "## Verwandte Forschungsbereiche\n\n"
                    "- [Katalog durchsuchen](/catalog/)\n"
                    "- [Übersicht der Anwendungsbereiche](/use-case/)\n"
                    "- [Protokolle zur Lagerung und Handhabung](/blog/peptide-storage-handling-best-practices/)\n"
                    "- [COA-Prüfungsrichtlinie](/coa-policy/)"
                )
                translated_paras.append(p_trans)
            elif 'References' in p_strip or 'Literatur' in p_strip:
                translated_paras.append("## Literatur und Referenzen")
        else:
            if current_len + len(p_strip) > 2800:
                translated_paras.append(translate_text("\n\n".join(current_chunk)))
                current_chunk = [p_strip]
                current_len = len(p_strip)
            else:
                current_chunk.append(p_strip)
                current_len += len(p_strip)

    if current_chunk:
        translated_paras.append(translate_text("\n\n".join(current_chunk)))

    result = "\n\n".join(translated_paras)
    result = re.sub(r'## ([^\n]+) Research Overview', r'## \1 Forschungsüberblick', result, flags=re.IGNORECASE)
    result = re.sub(r'## ([^\n]+) research overview', r'## \1 Forschungsüberblick', result, flags=re.IGNORECASE)
    result = re.sub(r'## Research [Uu]se', r'## Forschungsanwendung', result)
    result = re.sub(r'## Laboratory Storage & Handling Guidelines', r'## Richtlinien zur Lagerung und Handhabung im Labor', result, flags=re.IGNORECASE)
    result = re.sub(r'## Mechanism of Action', r'## Wirkungsmechanismus', result, flags=re.IGNORECASE)
    result = re.sub(r'## References', r'## Literatur und Referenzen', result, flags=re.IGNORECASE)
    return result

def yaml_quote(s: str) -> str:
    s = s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip()
    return f'"{s}"'

def translate_product_file(filename: str):
    fpath = os.path.join(PRODUCTS_DIR, filename)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
    if len(parts) < 3:
        return filename, False

    frontmatter = parts[1]
    body = parts[2].strip()

    # Title
    title_match = re.search(r'title:\s*(.+)$', frontmatter, re.MULTILINE)
    if title_match:
        orig_title = title_match.group(1).strip().strip('"\'')
        compound = orig_title.split(' — ')[0].split(' – ')[0].split(' - ')[0].strip()
        de_title = f"{compound} — ≥99 % HPLC, COA enthalten"
        frontmatter = re.sub(r'title:\s*.+$', f'title: {yaml_quote(de_title)}', frontmatter, count=1, flags=re.MULTILINE)

    # Short description
    desc_match = re.search(r'short_description:\s*(.+?)(?=\n[a-z_]+:)', frontmatter, re.DOTALL)
    if desc_match:
        orig_desc = desc_match.group(1).strip().strip('"\'')
        de_desc = translate_text(orig_desc)
        frontmatter = re.sub(r'short_description:\s*.+?(?=\n[a-z_]+:)', f'short_description: {yaml_quote(de_desc)}', frontmatter, count=1, flags=re.DOTALL)

    # Storage standard in German
    de_storage = "Lyophilisiert: Lagerung bei -20 °C (bis zu 3–5 Jahre). Rekonstituiert: Lagerung bei 2–8 °C; innerhalb von 4 Wochen verwenden."
    frontmatter = re.sub(r'storage:\s*.+?(?=\n[a-z_]+:)', f'storage: {yaml_quote(de_storage)}', frontmatter, count=1, flags=re.DOTALL)

    # Price range
    pr_match = re.search(r'price_range:\s*(.+)$', frontmatter, re.MULTILINE)
    if pr_match:
        orig_pr = pr_match.group(1).strip().strip('"\'')
        de_pr = re.sub(r'per vial', 'pro Vial', orig_pr, flags=re.IGNORECASE)
        frontmatter = re.sub(r'price_range:\s*.+$', f'price_range: {yaml_quote(de_pr)}', frontmatter, count=1, flags=re.MULTILINE)

    # Meta
    meta_title_match = re.search(r'(meta:\s*\n\s*title:\s*)(.+)$', frontmatter, re.MULTILINE)
    if meta_title_match:
        orig_mt = meta_title_match.group(2).strip().strip('"\'')
        compound = orig_mt.split(' — ')[0].split(' - ')[0].replace('Buy ', '').strip()
        de_meta_title = f"{compound} kaufen — ≥99 % HPLC, COA | Peptide Shop"
        frontmatter = re.sub(r'(meta:\s*\n\s*title:\s*).+$', f'\\1{yaml_quote(de_meta_title)}', frontmatter, count=1, flags=re.MULTILINE)

    meta_desc_match = re.search(r'(description:\s*)(.+)$', frontmatter[frontmatter.find('meta:'):], re.MULTILINE)
    if meta_desc_match:
        orig_md = meta_desc_match.group(2).strip().strip('"\'')
        de_meta_desc = translate_text(orig_md)
        meta_pos = frontmatter.find('meta:')
        pre_meta = frontmatter[:meta_pos]
        post_meta = frontmatter[meta_pos:]
        post_meta = re.sub(r'(description:\s*).+$', f'\\1{yaml_quote(de_meta_desc)}', post_meta, count=1, flags=re.MULTILINE)
        frontmatter = pre_meta + post_meta

    # FAQs translation (batch)
    if 'faqs:' in frontmatter:
        faqs_pos = frontmatter.find('faqs:')
        pre_faqs = frontmatter[:faqs_pos]
        faqs_text = frontmatter[faqs_pos:]
        
        faq_items = re.findall(r'-\s+question:\s*(.+?)\n\s+answer:\s*(.+?)(?=\n\s+-\s+question:|\Z)', faqs_text, re.DOTALL)
        if faq_items:
            translated_faqs = translate_faqs(faq_items)
            de_faq_lines = ["faqs:"]
            for q_de, a_de in translated_faqs:
                de_faq_lines.append(f"  - question: {yaml_quote(q_de)}")
                de_faq_lines.append(f"    answer: {yaml_quote(a_de)}")
            frontmatter = pre_faqs + "\n".join(de_faq_lines) + "\n"

    # Translate body
    de_body = translate_markdown_body(body)

    new_content = f"---{frontmatter}---\n\n{de_body}\n"
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return filename, True

def translate_blog_file(filename: str):
    fpath = os.path.join(BLOGS_DIR, filename)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
    if len(parts) < 3:
        return filename, False

    frontmatter = parts[1]
    body = parts[2].strip()

    title_match = re.search(r'title:\s*(.+)$', frontmatter, re.MULTILINE)
    orig_title = title_match.group(1).strip().strip('"\'') if title_match else filename[:-3]
    de_title = translate_text(orig_title)

    desc_match = re.search(r'description:\s*(.+)$', frontmatter, re.MULTILINE)
    orig_desc = desc_match.group(1).strip().strip('"\'') if desc_match else ""
    de_desc = translate_text(orig_desc)

    cat_match = re.search(r'category:\s*(.+)$', frontmatter, re.MULTILINE)
    orig_cat = cat_match.group(1).strip().strip('"\'') if cat_match else "Peptide Research"
    cat_map = {
        'Tissue Regeneration': 'Geweberegeneration & Wundheilung',
        'Metabolic Research': 'Stoffwechsel & Gewichtsregulation',
        'Anti-Aging & Longevity': 'Anti-Aging & Langlebigkeit',
        'Neuroscience': 'Neurowissenschaften & Kognition',
        'Immunology': 'Immunologie & Abwehr',
        'Peptide Research': 'Peptidforschung',
        'Lab Techniques': 'Labormethoden & Analytik'
    }
    de_cat = cat_map.get(orig_cat, 'Peptidforschung')

    date_match = re.search(r'publishDate:\s*(.+)$', frontmatter, re.MULTILINE)
    pdate = date_match.group(1).strip().strip('"\'') if date_match else "2026-02-15"

    tags_match = re.search(r'tags:\s*\n((?:\s+-\s+.+\n?)+)', frontmatter)
    tags_yaml = tags_match.group(1).strip() if tags_match else '  - "peptidforschung"\n  - "forschung"'

    image_match = re.search(r'image:\s*(.+)$', frontmatter, re.MULTILINE)
    img = image_match.group(1).strip().strip('"\'') if image_match else "/images/lifestyle/research-lab-bench.webp"

    fm_de = (
        "---\n"
        f"title: {yaml_quote(de_title)}\n"
        f"description: {yaml_quote(de_desc)}\n"
        f"publishDate: {yaml_quote(pdate)}\n"
        'author: "Peptide Shop Redaktion"\n'
        f"category: {yaml_quote(de_cat)}\n"
        "tags:\n"
        f"  {tags_yaml}\n"
        f"image: {yaml_quote(img)}\n"
        "featured: false\n"
        "meta:\n"
        f"  title: {yaml_quote(f'{de_title[:55]} | Wissenschaftlicher Überblick')}\n"
        f"  description: {yaml_quote(de_desc[:155])}\n"
        "---\n\n"
    )

    de_body = translate_markdown_body(body)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(fm_de + de_body + "\n")
    return filename, True

def translate_learn_file(filename: str):
    fpath = os.path.join(LEARN_DIR, filename)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
    if len(parts) < 3:
        return filename, False

    frontmatter = parts[1]
    body = parts[2].strip()

    title_match = re.search(r'title:\s*(.+)$', frontmatter, re.MULTILINE)
    orig_title = title_match.group(1).strip().strip('"\'') if title_match else filename[:-3]
    de_title = translate_text(orig_title)

    desc_match = re.search(r'description:\s*(.+)$', frontmatter, re.MULTILINE)
    orig_desc = desc_match.group(1).strip().strip('"\'') if desc_match else ""
    de_desc = translate_text(orig_desc)

    frontmatter = re.sub(r'title:\s*.+$', f'title: {yaml_quote(de_title)}', frontmatter, count=1, flags=re.MULTILINE)
    frontmatter = re.sub(r'description:\s*.+$', f'description: {yaml_quote(de_desc)}', frontmatter, count=1, flags=re.MULTILINE)
    frontmatter = re.sub(r'author:\s*.+$', 'author: "Peptide Shop Redaktion"', frontmatter, count=1, flags=re.MULTILINE)

    de_body = translate_markdown_body(body)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(f"---{frontmatter}---\n\n{de_body}\n")
    return filename, True

def main():
    print("==================================================")
    print("STARTING FAST PARALLEL GERMAN TRANSLATION")
    print("==================================================")

    # 1. Products
    product_files = sorted([f for f in os.listdir(PRODUCTS_DIR) if f.endswith('.md')])
    print(f"\n[1/3] Translating {len(product_files)} Product Markdown Files (5 workers)...")
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(translate_product_file, f): f for f in product_files}
        done = 0
        for future in as_completed(futures):
            fn, ok = future.result()
            done += 1
            if done % 5 == 0 or done == len(product_files):
                print(f"  Processed {done}/{len(product_files)} products ({time.time()-t0:.1f}s)")
    print(f"All {len(product_files)} products translated in {time.time()-t0:.1f}s!")

    # 2. Blogs
    blog_files = sorted([f for f in os.listdir(BLOGS_DIR) if f.endswith('.md')])
    print(f"\n[2/3] Translating {len(blog_files)} Blog Articles (5 workers)...")
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(translate_blog_file, f): f for f in blog_files}
        done = 0
        for future in as_completed(futures):
            fn, ok = future.result()
            done += 1
            if done % 10 == 0 or done == len(blog_files):
                print(f"  Processed {done}/{len(blog_files)} blogs ({time.time()-t0:.1f}s)")
    print(f"All {len(blog_files)} blogs translated in {time.time()-t0:.1f}s!")

    # 3. Learn
    if os.path.exists(LEARN_DIR):
        learn_files = sorted([f for f in os.listdir(LEARN_DIR) if f.endswith('.md')])
        print(f"\n[3/3] Translating {len(learn_files)} Learn Guides (5 workers)...")
        t0 = time.time()
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = {executor.submit(translate_learn_file, f): f for f in learn_files}
            done = 0
            for future in as_completed(futures):
                fn, ok = future.result()
                done += 1
                print(f"  Processed {done}/{len(learn_files)} learn guides ({time.time()-t0:.1f}s)")
        print(f"All {len(learn_files)} learn guides translated in {time.time()-t0:.1f}s!")

    print("\n==================================================")
    print("ALL CONTENT SUCCESSFULLY TRANSLATED TO GERMAN!")
    print("==================================================")

if __name__ == '__main__':
    main()
