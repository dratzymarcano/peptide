
import os
import re

BLOG_DIR = 'astro-peptide/src/content/blog'

for filename in os.listdir(BLOG_DIR):
    if filename.endswith('.md'):
        filepath = os.path.join(BLOG_DIR, filename)
        
        with open(filepath, 'r') as f:
            content = f.read()

        # Split frontmatter
        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm = parts[1]
            body = parts[2]
            
            # Check for duplicate keys in fm
            lines = fm.strip().split('\n')
            new_lines = []
            seen_keys = set()
            
            # Since YAML parser failed on duplicate mapping key, we just need to remove the second occurrence?
            # The previous update script added `lang: "en"` blindly after title.
            # But duplicate error location in build log was line 12 inside `meta` object?
            # Ah, the script regex replace might have hit multiple times or inserted weirdly.
            # Let's clean up specifically the indented `lang: "en"` inside `meta:` block or duplicated top level.
            
            inside_meta = False
            for line in lines:
                stripped = line.strip()
                if stripped.startswith('meta:'):
                    inside_meta = True
                    new_lines.append(line)
                    continue
                
                # Check if line is a key
                if ':' in line:
                    key = line.split(':', 1)[0].strip()
                    
                    if inside_meta:
                        # If we see 'lang' inside meta, remove it (it's not in schema)
                        if key == 'lang':
                            continue
                        # If meta block indentation ends (heuristic), inside_meta = False
                        if not line.startswith('  ') and not line.startswith('\t'):
                             inside_meta = False
                    
                    # If duplicate top level key?
                    # The build error said "duplicated mapping key". 
                    # If I have `lang: en` at top and again `lang: en` later.
                    
                    if not inside_meta and key in seen_keys:
                         # Skip duplicate top level keys
                         if key == 'lang': continue
                    
                    if not inside_meta:
                        seen_keys.add(key)
                
                new_lines.append(line)
            
            new_fm = '\n'.join(new_lines)
            new_content = f'---\n{new_fm}\n---{body}'
            
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Cleaned {filename}")
