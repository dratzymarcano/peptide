
import os
import re

PRODUCTS_DIR = 'astro-peptide/src/content/products/ru'

for filename in os.listdir(PRODUCTS_DIR):
    if filename.endswith('.md'):
        filepath = os.path.join(PRODUCTS_DIR, filename)
        
        with open(filepath, 'r') as f:
            content = f.read()

        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm = parts[1]
            body = parts[2]
            
            lines = fm.split('\n')
            new_lines = []
            
            inside_meta_context = False
            
            for line in lines:
                stripped = line.strip()
                
                # Detect start of meta
                if stripped == 'meta:':
                    inside_meta_context = True
                    new_lines.append(line)
                    continue
                
                # Detect end of meta context (start of next top-level keys usually at end of file)
                if inside_meta_context:
                    if stripped.startswith('faqs:') or stripped.startswith('reviews:') or stripped == '':
                        inside_meta_context = False
                    elif stripped.startswith('title:') or stripped.startswith('description:'):
                        # Detect if already indented
                        if not line.startswith('  ') and not line.startswith('\t'):
                            # Indent it
                            new_lines.append('  ' + line)
                            continue
                
                new_lines.append(line)
            
            new_fm = '\n'.join(new_lines)
            new_content = f'---\n{new_fm}\n---{body}'
            
            with open(filepath, 'w') as f:
                f.write(new_content)
                
print("Finished fixing product frontmatters.")
