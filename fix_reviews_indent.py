
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
            
            # Same issue with reviews.
            # reviews:
            # - author: ...
            # rating: ...  <- needs indent
            
            # Keys to indent if they follow a list item dash or are part of review object
            review_keys = ['rating:', 'date:', 'title:', 'content:', 'verified:']
            
            for line in lines:
                stripped = line.strip()
                
                needs_indent = False
                for k in review_keys:
                    if stripped.startswith(k):
                        needs_indent = True
                        break
                
                if needs_indent:
                   if not line.startswith('  ') and not line.startswith('\t'):
                       new_lines.append('  ' + line)
                       continue
                
                new_lines.append(line)

            new_fm = '\n'.join(new_lines)
            new_content = f'---\n{new_fm}\n---{body}'
            
            with open(filepath, 'w') as f:
                f.write(new_content)

print("Fixed YAML indentation for reviews.")
