
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
            
            # The previous script might have left empty lines or bad indentation for list items
            # The YAML error 'end of the stream or a document separator is expected' often means
            # a list item `-` is not indented correct relative to parent key.
            # faqs:
            # - question: ...
            # should be valid if `-` is at start of line (if `faqs:` is not indented).
            
            # However, in `5-amino-1mq.md` snippet:
            # meta: 
            #   title: ...
            # faqs: 
            # - question: ...
            
            # This looks valid top-level. 
            # But wait, answer key is NOT indented?
            # - question: "..."
            # answer: "..."  <-- This breaks the list item object context usually? 
            # In YAML:
            # - question: q
            #   answer: a
            # is correct.
            # - question: q
            # answer: a
            # is interpreted as `answer` being a sibling of the list item, which is invalid mixed structure.
            
            # We need to indent `answer:` lines that follow `- question:` lines.
            
            for i, line in enumerate(lines):
                stripped = line.strip()
                if stripped.startswith('answer:'):
                   # Check if previous non-empty line was a question
                   # Or just blindly indent answer if it's not indented
                   if not line.startswith('  ') and not line.startswith('\t'):
                       new_lines.append('  ' + line)
                       continue
                
                # Also check subsequent lines of answer if it's multi-line (but here they look single line quoted)
                new_lines.append(line)

            new_fm = '\n'.join(new_lines)
            new_content = f'---\n{new_fm}\n---{body}'
            
            with open(filepath, 'w') as f:
                f.write(new_content)

print("Fixed YAML indentation for answers.")
