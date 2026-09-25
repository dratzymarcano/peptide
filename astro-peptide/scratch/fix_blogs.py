import os
import glob
import re

blog_dir = 'src/content/blog'
files = sorted(glob.glob(os.path.join(blog_dir, '*.md')))
print(f"Total blog files found: {len(files)}")

def fix_title(title):
    # Strip any trailing ' | ...' or truncated tokens
    t = re.sub(r'\s*\|\s*.*$', '', title).strip()
    t = re.sub(r'\s*\.\.\.$', '', t).strip()
    return t

def generate_clean_meta_title(title, category):
    base = fix_title(title)
    # Remove any trailing punctuation
    base = re.sub(r'[\.\:\?]+$', '', base).strip()
    
    # If base is too long, smartly shorten it
    if len(base) > 55:
        # try to cut at a colon or dash
        if ' - ' in base:
            base = base.split(' - ')[0].strip()
        elif ': ' in base:
            parts = base.split(': ')
            if len(parts[0]) >= 20:
                base = parts[0]
            else:
                base = f"{parts[0]}: {parts[1]}"
                if len(base) > 55:
                    base = base[:52].rsplit(' ', 1)[0]
    
    # Add a clean professional suffix if space allows
    if len(base) <= 45:
        candidate = f"{base} | Forschung"
        if len(candidate) <= 60:
            return candidate
    return base[:60].strip()

def generate_clean_meta_description(desc, title):
    d = re.sub(r'\s*\.\.\.$', '', desc).strip()
    # Remove awkward cut-offs
    if len(d) > 155:
        # find last sentence or sensible punctuation under 155
        clipped = d[:155]
        last_period = clipped.rfind('.')
        if last_period > 90:
            d = clipped[:last_period+1]
        else:
            # cut at last space
            last_space = clipped.rfind(' ')
            if last_space > 90:
                d = clipped[:last_space].rstrip(',;:') + '.'
            else:
                d = clipped.rstrip(',;:') + '.'
    elif len(d) < 110:
        # enrich with professional scientific summary
        d = f"{d.rstrip('.')} – wissenschaftliche Analyse und aktuelle Studienübersicht."
        if len(d) > 155:
            d = d[:152].rsplit(' ', 1)[0] + '.'
    return d

def format_body_headings(body):
    lines = body.split('\n')
    new_lines = []
    
    heading_patterns = [
        r'^(Wie|Was|Wozu|Welche|Warum|Kann|Gibt es|Ist|Sind|Werden|Wo)\s+.{5,80}\?$',
        r'^(Gelenkgesundheit und Verjüngung|Beschleunigt die Knochenheilung|Schützt vor Darmschäden|Zwang|Schützen Sie sich vor Darmschäden durch NSAIDs)$',
        r'^(Wirkungsmechanismus|Biologische Wirkungen|Studienergebnisse|Präklinische Forschung|Pharmakokinetik|Fazit und Ausblick|Dosierung und Verabreichung|Sicherheit und Toxizität|Molekulare Struktur|Forschungsausblick)$',
        r'^(Hintergrund|Einleitung|Methodik|Ergebnisse|Diskussion|Zusammenfassung)$',
        r'^[A-ZÄÖÜ][a-zA-ZäöüÄÖÜß\s\-\,]{3,50}:$'
    ]
    
    for i, line in enumerate(lines):
        trimmed = line.strip()
        
        # Check if already a markdown heading
        if trimmed.startswith('#'):
            new_lines.append(line)
            continue
            
        # Check if it looks like a heading
        is_heading = False
        for pat in heading_patterns:
            if re.match(pat, trimmed):
                # Ensure it's not inside a paragraph (preceded and followed by blank lines or start/end)
                prev_blank = (i == 0 or lines[i-1].strip() == '')
                next_blank = (i == len(lines)-1 or lines[i+1].strip() == '')
                if prev_blank and next_blank:
                    is_heading = True
                    break
        
        if is_heading:
            clean_h = trimmed.rstrip(':')
            new_lines.append(f"## {clean_h}")
        else:
            new_lines.append(line)
            
    return '\n'.join(new_lines)

processed = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        raw = fp.read()
        
    fm_match = re.search(r'^---\s*\n(.*?)\n---(.*)$', raw, re.DOTALL)
    if not fm_match:
        continue
        
    fm = fm_match.group(1)
    body = fm_match.group(2)
    
    # Extract fields
    title_m = re.search(r'title:\s*\"([^\"]+)\"', fm)
    title = title_m.group(1) if title_m else ""
    
    desc_m = re.search(r'description:\s*\"([^\"]+)\"', fm)
    desc = desc_m.group(1) if desc_m else ""
    
    cat_m = re.search(r'category:\s*\"([^\"]+)\"', fm)
    category = cat_m.group(1) if cat_m else "Peptidforschung"
    
    clean_title = fix_title(title)
    clean_meta_title = generate_clean_meta_title(clean_title, category)
    clean_meta_desc = generate_clean_meta_description(desc, clean_title)
    
    # Replace title if it had trailing truncated stuff
    new_fm = re.sub(r'title:\s*\"[^\"]+\"', f'title: "{clean_title}"', fm, count=1)
    
    # Replace meta block
    new_meta = f"""meta:
  title: "{clean_meta_title}"
  description: "{clean_meta_desc}\""""
    
    if 'meta:' in new_fm:
        new_fm = re.sub(r'meta:\s*\n\s*title:[^\n]+\n\s*description:[^\n]+', new_meta, new_fm)
    else:
        new_fm = new_fm.strip() + f"\n{new_meta}\n"
        
    formatted_body = format_body_headings(body)
    
    # Reassemble
    updated_raw = f"---\n{new_fm.strip()}\n---{formatted_body}"
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(updated_raw)
    processed += 1

print(f"Successfully processed {processed} blog posts.")
