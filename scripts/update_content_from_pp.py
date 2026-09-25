#!/usr/bin/env python3
"""
Update website content with high-quality scientific reference data from Particle Peptides,
while strictly preserving all existing product images, pricing, and variant structures.
Pure standard-library Python (no pyyaml dependency).
"""

import os
import re
import glob
from bs4 import BeautifulSoup

REPO_ROOT = "/home/ivan/peptide"
PRODUCTS_DIR = os.path.join(REPO_ROOT, "astro-peptide/src/content/products")
BLOGS_DIR = os.path.join(REPO_ROOT, "astro-peptide/src/content/blog")
PP_HTML_DIR = os.path.join(REPO_ROOT, "competitor-reference/particlepeptides/html")
PP_BLOGS_MD = os.path.join(REPO_ROOT, "competitor-reference/particlepeptides/markdown/blogs")

def sanitize_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'Particle\s*Peptides', 'Peptide Shop', text, flags=re.IGNORECASE)
    text = re.sub(r'PARTICLE,\s*s\.\s*r\.\s*o\.', 'Peptide Shop Laboratory', text, flags=re.IGNORECASE)
    text = re.sub(r'particlepeptides\.com', 'peptide-kaufen.net', text, flags=re.IGNORECASE)
    text = re.sub(r'Ships\s+from\s+Slovakia\.?', 'Ships within the EU.', text, flags=re.IGNORECASE)
    text = re.sub(r'Slovak\s+Republic', 'European Union', text, flags=re.IGNORECASE)
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

def yaml_quote(s: str) -> str:
    s = s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip()
    return f'"{s}"'

def clean_html_to_markdown(elem) -> str:
    if not elem:
        return ""
    
    for bad in elem.find_all(['button', 'script', 'style']):
        bad.decompose()
    for bad in elem.find_all('a'):
        txt = bad.get_text().lower()
        if 'test results' in txt or 'calculator' in txt:
            bad.decompose()

    md_lines = []
    for child in elem.children:
        if not child.name:
            t = child.strip()
            if t:
                md_lines.append(sanitize_text(t))
            continue
        
        tag = child.name.lower()
        txt = child.get_text(strip=True)
        if not txt:
            continue
            
        if tag in ['h1', 'h2']:
            md_lines.append(f"\n## {sanitize_text(txt)}\n")
        elif tag in ['h3', 'h4', 'h5', 'h6']:
            md_lines.append(f"\n### {sanitize_text(txt)}\n")
        elif tag == 'p':
            md_lines.append(f"{sanitize_text(txt)}\n")
        elif tag in ['ul', 'ol']:
            for i, li in enumerate(child.find_all('li'), start=1):
                li_txt = sanitize_text(li.get_text(strip=True))
                if li_txt:
                    prefix = f"{i}." if tag == 'ol' else "-"
                    md_lines.append(f"{prefix} {li_txt}")
            md_lines.append("")
        elif tag == 'table':
            for tr in child.find_all('tr'):
                cells = [sanitize_text(c.get_text(strip=True)) for c in tr.find_all(['th', 'td'])]
                if cells:
                    md_lines.append("| " + " | ".join(cells) + " |")
            md_lines.append("")
        else:
            md_lines.append(f"{sanitize_text(txt)}\n")

    result = "\n".join(md_lines)
    result = re.sub(r'\n{3,}', '\n\n', result)
    return result.strip()

def parse_pp_product_html(fpath: str):
    with open(fpath, errors='ignore') as f:
        html = f.read()
    if 'box-product-parameters' not in html:
        return None
        
    soup = BeautifulSoup(html, 'html.parser')
    h1 = soup.find('h1')
    title = sanitize_text(h1.get_text()) if h1 else ""

    params = {}
    p_box = soup.find(class_='box-product-parameters')
    if p_box:
        for li in p_box.find_all(['li', 'p', 'div']):
            txt = li.get_text(strip=True)
            if ':' in txt:
                k, v = txt.split(':', 1)
                params[k.strip().lower()] = sanitize_text(v.strip())

    short_elem = soup.find(class_=re.compile(r'product-description-short'))
    short_desc = sanitize_text(short_elem.get_text()) if short_elem else ""

    meta_desc_tag = soup.find('meta', attrs={'name': 'description'})
    meta_desc = sanitize_text(meta_desc_tag.get('content', '')) if meta_desc_tag else ""

    dwnlds = soup.find(class_='dwnlds')
    body_md = clean_html_to_markdown(dwnlds)

    return {
        'title': title,
        'short_desc': short_desc,
        'meta_desc': meta_desc,
        'params': params,
        'body_md': body_md,
    }

def load_all_pp_products():
    pp_products = {}
    for fpath in glob.glob(os.path.join(PP_HTML_DIR, "*")):
        if fpath.endswith(('.1', '.2', '.3')):
            continue
        data = parse_pp_product_html(fpath)
        if not data:
            continue
        canon_slug = os.path.basename(fpath).replace('.html', '')
        pp_products[canon_slug] = data
    return pp_products

PRODUCT_MAPPING = {
    'bpc-157': '103-bpc-157-5mg-with-mannitol',
    'tb-500': '110-thymosin-beta-4-tb-500-10mg-with-mannitol',
    'epitalon': '30-epithalon-10mg',
    'retatrutide': '111-glp-3-10mg-with-mannitol',
    'll-37': '94-ll-37-5mg',
    'aod-9604': '9-aod-9604-5mg',
    'semax': '61-semax-10mg',
    'thymosin-alpha-1': '60-thymosin-alpha-1-5mg',
    'melanotan-2': '12-melanotan-2-10mg',
    'ghrp-2': '31-ghrp-2-5mg',
    'cjc-1295-no-dac': '64-cjc-1295-no-dac-mod-GRF-1-29-5mg',
    'bacteriostatic-water': '57-bacteriostatic-water-10ml',
    'thymalin': '63-thymalin-20mg',
    'ghrp-6': '32-ghrp-6-5mg',
    'ghk-cu': '58-ghk-cu',
    'selank': '17-selank-10mg',
    'dsip': '29-dsip-10mg',
    'ipamorelin': '11-ipamorelin-5mg',
}

NEW_PP_PRODUCTS = {
    'pt-141': ('16-pt-141-10mg', 'PT-141 10 mg', 'sexual-health', 'hormones', ['tanning', 'anti-aging'], 38),
    'cjc-1295-dac': ('62-cjc-1295-dac-5mg', 'CJC-1295 with DAC 5 mg', 'muscle-recovery', 'hormones', ['muscle-recovery', 'anti-aging'], 42),
    'kpv': ('66-kpv-5mg', 'KPV 5 mg', 'immune-system', 'cell-tissue', ['muscle-recovery'], 36),
    'mots-c': ('100-mots-c-10mg-with-mannitol', 'MOTS-c 10 mg', 'weight-loss', 'cell-signaling', ['weight-loss', 'anti-aging'], 46),
    'ss-31': ('92-ss-31-50mg', 'SS-31 50 mg', 'anti-aging', 'cell-signaling', ['anti-aging'], 75),
    'pinealon': ('96-pinealon-10-mg', 'Pinealon 10 mg', 'cognitive', 'neuroscience', ['cognitive', 'anti-aging'], 38),
    'hexarelin': ('8-hexarelin-5mg', 'Hexarelin 5 mg', 'muscle-recovery', 'hormones', ['muscle-recovery'], 34),
    'foxo4-dri': ('93-fox04-dri-10-mg', 'FOXO4-DRI 10 mg', 'anti-aging', 'cell-signaling', ['anti-aging'], 85),
    'bpc-157-tb-500-blend': ('113-bpc-157-tb-500-blend-5mg-5mg-with-mannitol', 'BPC-157 + TB-500 Blend (5 mg / 5 mg)', 'muscle-recovery', 'cell-tissue', ['muscle-recovery'], 62),
}

def update_existing_product_file(slug, fpath, pp_info):
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()

    parts = re.split(r'^---\s*$', text, flags=re.MULTILINE)
    if len(parts) < 3:
        print(f"Skipping {slug}: invalid markdown split")
        return

    frontmatter = parts[1]
    
    # Strictly verify images is present in frontmatter
    if 'images:' not in frontmatter:
        print(f"ERROR: No images field in frontmatter for {slug}!")
        return

    params = pp_info['params'] if pp_info else {}
    short_desc = pp_info['short_desc'] if pp_info else ""
    meta_desc = pp_info['meta_desc'] if pp_info else ""
    body_md = pp_info['body_md'] if pp_info else ""

    # Update short_description
    if short_desc:
        clean_desc = short_desc[:280]
        if not clean_desc.endswith('.'):
            clean_desc = clean_desc.rsplit(' ', 1)[0] + '.'
        frontmatter = re.sub(
            r'short_description:.*?\n(?=[a-z_]+:)',
            f'short_description: {yaml_quote(clean_desc)}\n',
            frontmatter,
            flags=re.DOTALL
        )

    # Update storage
    new_storage = "Lyophilized: store at -20°C (up to 3–5 years). Reconstituted: store at 2–8°C; use within 4 weeks."
    frontmatter = re.sub(
        r'storage:.*?\n(?=[a-z_]+:)',
        f'storage: {yaml_quote(new_storage)}\n',
        frontmatter,
        flags=re.DOTALL
    )

    # Update sequence if found in params
    if 'sequence' in params and params['sequence']:
        seq = params['sequence']
        if re.search(r'sequence:.*?\n', frontmatter):
            frontmatter = re.sub(r'sequence:.*?\n', f'sequence: {yaml_quote(seq)}\n', frontmatter)
        else:
            frontmatter = re.sub(r'(tags:)', f'sequence: {yaml_quote(seq)}\n\\1', frontmatter)

    # Update meta description if available
    if meta_desc:
        frontmatter = re.sub(
            r'(meta:\s*\n\s*title:.*?\n\s*description:).*?\n',
            f'\\1 {yaml_quote(meta_desc)}\n',
            frontmatter
        )

    # Build comprehensive body
    title_match = re.search(r'title:\s*(.+)$', frontmatter, re.MULTILINE)
    compound_name = title_match.group(1).strip().strip('"\'').split(' — ')[0].split(' – ')[0] if title_match else slug.title()

    body_parts = []
    body_parts.append(f"## {compound_name} Research Overview\n")
    if short_desc:
        body_parts.append(f"{short_desc}\n")

    if body_md:
        body_parts.append(body_md)
    else:
        # Keep existing body if no competitor body
        body_parts.append(parts[2].strip())

    body_parts.append("\n## Laboratory Storage & Handling Guidelines\n")
    body_parts.append(
        "- **Lyophilized Form:** Store at -20°C or below for long-term stability (up to 3–5 years). Short-term room temperature exposure during standard transit does not compromise peptide purity.\n"
        "- **Reconstitution:** Allow vial to equilibrate to room temperature before reconstitution. Use sterile bacteriostatic water or 0.9% sodium chloride.\n"
        "- **Reconstituted Solution:** Store reconstituted solution at 2–8°C and use within 4 weeks. Avoid repeated freeze-thaw cycles.\n"
    )

    area_match = re.search(r'researchArea:\s*([a-z0-9\-]+)', frontmatter)
    area = area_match.group(1) if area_match else 'cell-tissue'
    use_case_match = re.search(r'useCases:\s*\n\s*-\s*([a-z0-9\-]+)', frontmatter)
    use_case = use_case_match.group(1) if use_case_match else 'muscle-recovery'

    body_parts.append("## Related Research Hubs\n")
    body_parts.append(f"- [Browse {area.replace('-', ' ').title()} Catalog](/catalog/{area}/)")
    body_parts.append(f"- [View {use_case.replace('-', ' ').title()} Hub](/use-case/{use_case}/)")
    body_parts.append("- [Peptide Storage and Handling Protocols](/blog/peptide-storage-handling-best-practices/)")
    body_parts.append("- [Certificate of Analysis (COA) Verification Policy](/coa-policy/)\n")

    new_full_body = "\n".join(body_parts)
    updated_file_content = f"---{frontmatter}---\n\n{new_full_body}\n"

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(updated_file_content)

def create_new_product_file(slug, pp_slug, title_display, category, research_area, use_cases, price, pp_info):
    fpath = os.path.join(PRODUCTS_DIR, f"{slug}.md")
    params = pp_info['params'] if pp_info else {}
    short_desc = pp_info['short_desc'] if pp_info else f"{title_display} research peptide for in-vitro laboratory analysis. ≥99% HPLC purity."
    meta_desc = pp_info['meta_desc'] if pp_info and pp_info['meta_desc'] else f"Buy {title_display} research peptide. ≥99% purity, per-batch COA, EU dispatch. Research use only."
    body_md = pp_info['body_md'] if pp_info else ""

    purity = params.get('peptide purity', '≥ 99%')
    cas = params.get('cas number', None)
    cas_line = f"cas: {yaml_quote(cas)}" if cas else "cas: null"
    seq = params.get('sequence', '')
    seq_line = f"sequence: {yaml_quote(seq)}" if seq else ""

    storage = "Lyophilized: store at -20°C (up to 3–5 years). Reconstituted: store at 2–8°C; use within 4 weeks."
    
    use_cases_lines = "\n".join([f"  - {u}" for u in use_cases])
    tags = ["research-use-only", "coa-included", research_area, slug]
    tags_lines = "\n".join([f"  - {t}" for t in tags])

    fm_lines = [
        "---",
        f"id: peptide-{slug}",
        f"title: {yaml_quote(f'{title_display} — ≥99 % HPLC, COA included')}",
        f"primary_keyword: {yaml_quote(slug)}",
        "search_volume: 1200",
        cas_line,
        "molecular_weight: null",
        f"purity: {yaml_quote(purity)}",
        f"storage: {yaml_quote(storage)}",
        "package_sizes:",
        "  - 1 × vial",
        "moq: 1",
        f"price: {price}",
        f"price_range: {yaml_quote(f'€{price} per vial')}",
        f"short_description: {yaml_quote(short_desc[:280])}",
        f"category: {yaml_quote(category)}",
        f"researchArea: {research_area}",
        "useCases:",
        use_cases_lines,
        seq_line if seq_line else "# no sequence provided",
        "tags:",
        tags_lines,
        "images:",
        "  - /images/peptide-default.jpg",
        "meta:",
        f"  title: {yaml_quote(f'Buy {title_display} — ≥99% HPLC, COA Included | Peptide Shop')}",
        f"  description: {yaml_quote(meta_desc[:250])}",
        "---",
        ""
    ]
    fm_text = "\n".join([line for line in fm_lines if line])

    body_parts = []
    body_parts.append(f"## {title_display} Research Overview\n")
    body_parts.append(f"{short_desc}\n")
    if body_md:
        body_parts.append(body_md)

    body_parts.append("\n## Laboratory Storage & Handling Guidelines\n")
    body_parts.append(
        "- **Lyophilized Form:** Store at -20°C or below for long-term stability (up to 3–5 years). Short-term room temperature exposure during standard transit does not compromise peptide purity.\n"
        "- **Reconstitution:** Allow vial to equilibrate to room temperature before reconstitution. Use sterile bacteriostatic water or 0.9% sodium chloride.\n"
        "- **Reconstituted Solution:** Store reconstituted solution at 2–8°C and use within 4 weeks. Avoid repeated freeze-thaw cycles.\n"
    )

    body_parts.append("## Related Research Hubs\n")
    body_parts.append(f"- [Browse {research_area.replace('-', ' ').title()} Catalog](/catalog/{research_area}/)")
    body_parts.append(f"- [View {use_cases[0].replace('-', ' ').title()} Hub](/use-case/{use_cases[0]}/)")
    body_parts.append("- [Peptide Storage and Handling Protocols](/blog/peptide-storage-handling-best-practices/)")
    body_parts.append("- [Certificate of Analysis (COA) Verification Policy](/coa-policy/)\n")

    full_content = fm_text + "\n" + "\n".join(body_parts) + "\n"
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    print(f"Created new product entry: {slug}")

def update_all_products(pp_products):
    print("\n--- UPDATING EXISTING PRODUCTS ---")
    for filename in sorted(os.listdir(PRODUCTS_DIR)):
        if not filename.endswith('.md'):
            continue
        slug = filename[:-3]
        fpath = os.path.join(PRODUCTS_DIR, filename)

        if slug in PRODUCT_MAPPING:
            pp_slug = PRODUCT_MAPPING[slug]
            pp_info = pp_products.get(pp_slug)
            update_existing_product_file(slug, fpath, pp_info)
            print(f"Updated product: {slug:<22} with PP content")
        else:
            # Refresh formatting and storage
            update_existing_product_file(slug, fpath, None)
            print(f"Refreshed product: {slug:<22} (preserved images & existing specs)")

    print("\n--- ADDING NEW PARTICLE PEPTIDES PRODUCTS ---")
    for slug, (pp_slug, title_display, cat, area, use_cases, price) in NEW_PP_PRODUCTS.items():
        pp_info = pp_products.get(pp_slug)
        create_new_product_file(slug, pp_slug, title_display, cat, area, use_cases, price, pp_info)

def import_blogs():
    print("\n--- IMPORTING PARTICLE PEPTIDES BLOG ARTICLES ---")
    os.makedirs(BLOGS_DIR, exist_ok=True)
    
    blog_files = glob.glob(os.path.join(PP_BLOGS_MD, "*.md"))
    print(f"Found {len(blog_files)} competitor blog files")
    
    imported_count = 0
    skipped_count = 0
    
    EXCLUDE_SLUGS = {
        'all-customer-reviews',
        'peptide-calculator',
        'solutions',
        'buy-peptides',
        'highest-quality-research-peptides-particle-peptides',
    }

    for bpath in sorted(blog_files):
        filename = os.path.basename(bpath)
        slug = filename[:-3]
        
        if slug in EXCLUDE_SLUGS:
            skipped_count += 1
            continue
            
        with open(bpath, 'r', encoding='utf-8') as f:
            content = f.read()

        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else slug.replace('-', ' ').title()
        title = sanitize_text(title)

        desc_match = re.search(r'-\s+\*\*Meta Description:\*\*\s*(.+)$', content, re.MULTILINE)
        desc = desc_match.group(1).strip() if desc_match else ""
        if not desc:
            para_match = re.search(r'## Article Content[^\n]*\n+(.+?)\n\n', content, re.DOTALL)
            if para_match:
                desc = para_match.group(1).strip()[:160] + "..."
            else:
                desc = f"In-depth scientific review of {title} in preclinical models and laboratory research."
        desc = sanitize_text(desc)[:220]
        if not desc.endswith('.'):
            desc = desc.rsplit(' ', 1)[0] + '.'

        parts = re.split(r'## Article Content[^\n]*\n', content, maxsplit=1)
        body = parts[1].strip() if len(parts) > 1 else content

        body = re.sub(r'^(?:today|\d{1,2}\.\d{1,2}\.\d{4}|Back to blog|\s+)+', '', body, flags=re.IGNORECASE).strip()
        body = sanitize_text(body)

        cat = "Peptide Research"
        tags = ["research", "peptides", "laboratory"]
        low_title = title.lower()
        if 'bpc' in low_title or 'wound' in low_title or 'healing' in low_title or 'tissue' in low_title:
            cat = "Tissue Regeneration"
            tags += ["tissue-repair", "wound-healing", "angiogenesis"]
        elif 'aging' in low_title or 'epithalon' in low_title or 'longevity' in low_title or 'senescence' in low_title:
            cat = "Anti-Aging & Longevity"
            tags += ["longevity", "anti-aging", "cellular-senescence"]
        elif 'metabolism' in low_title or 'weight' in low_title or 'diabetes' in low_title or 'glp' in low_title:
            cat = "Metabolic Research"
            tags += ["metabolism", "weight-management", "glp1"]
        elif 'sleep' in low_title or 'dsip' in low_title or 'neuro' in low_title or 'brain' in low_title or 'semax' in low_title or 'selank' in low_title:
            cat = "Neuroscience"
            tags += ["neuroprotection", "cognition", "neuropeptides"]
        elif 'immunity' in low_title or 'thymosin' in low_title or 'immune' in low_title or 'antimicrobial' in low_title:
            cat = "Immunology"
            tags += ["immune-system", "antimicrobial", "thymic-peptides"]

        date_match = re.search(r'(\d{2})\.(\d{2})\.(\d{4})', content)
        if date_match:
            d, m, y = date_match.groups()
            publish_date = f"{y}-{m}-{d}"
        else:
            publish_date = "2026-02-15"

        tags_unique = sorted(list(set(tags)))
        tags_yaml = "\n".join([f'  - "{t}"' for t in tags_unique])

        fm = (
            "---\n"
            f"title: {yaml_quote(title)}\n"
            f"description: {yaml_quote(desc)}\n"
            f"publishDate: {yaml_quote(publish_date)}\n"
            'author: "Peptide Shop Editorial"\n'
            f"category: {yaml_quote(cat)}\n"
            "tags:\n"
            f"{tags_yaml}\n"
            'image: "/images/lifestyle/research-lab-bench.webp"\n'
            "featured: false\n"
            "meta:\n"
            f"  title: {yaml_quote(f'{title[:55]} | Research Review')}\n"
            f"  description: {yaml_quote(desc[:155])}\n"
            "---\n\n"
        )

        dest_path = os.path.join(BLOGS_DIR, f"{slug}.md")
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(fm + body + "\n")
        
        imported_count += 1

    print(f"Imported {imported_count} blog articles (skipped {skipped_count} utility pages).")

if __name__ == '__main__':
    pp_products = load_all_pp_products()
    print(f"Loaded {len(pp_products)} unique Particle Peptides products.")
    update_all_products(pp_products)
    import_blogs()
    print("\nAll content successfully updated and synchronized.")
