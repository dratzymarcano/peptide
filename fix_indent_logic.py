
import os

PRODUCTS_DIR = 'astro-peptide/src/content/products/ru'

# Keys that should NOT be indented at top level
TOP_LEVEL_KEYS = [
    'id', 'title', 'primary_keyword', 'search_volume', 'urlPath', 'lang',
    'aliases', 'cas', 'molecular_weight', 'purity', 'storage',
    'package_sizes', 'moq', 'price', 'price_range', 'coa_url',
    'short_description', 'category', 'tags', 'images', 'meta', 'faqs', 'reviews'
]

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
            
            # We need to un-indent top level keys if they were accidentally indented.
            # But we must NOT un-indent keys that ARE inside meta, faqs, reviews.
            
            # Simple heuristic:
            # 1. We know strictly which keys are top level from schema.
            # 2. Iterate and context track.
            
            inside_meta = False
            inside_faq = False
            inside_review = False
            
            for line in lines:
                stripped = line.strip()
                if not stripped:
                    new_lines.append(line)
                    continue

                # Determine key
                key = stripped.split(':', 1)[0].strip()
                
                # Context switching
                if key == 'meta':
                    inside_meta = True
                    inside_faq = False
                    inside_review = False
                    # meta is top level, ensure no indent
                    new_lines.append(stripped) # removes indent if any
                    continue
                elif key == 'faqs':
                    inside_meta = False
                    inside_faq = True
                    inside_review = False
                    new_lines.append(stripped)
                    continue
                elif key == 'reviews':
                    inside_meta = False
                    inside_faq = False
                    inside_review = True
                    new_lines.append(stripped)
                    continue
                
                # Check indentation
                current_indent = len(line) - len(line.lstrip())
                
                if inside_meta:
                    # Inside meta, keys like title/description MUST be indented
                    if key in ['title', 'description']:
                        if current_indent == 0:
                            new_lines.append('  ' + stripped)
                        else:
                            new_lines.append(line)
                    else:
                        # Unknown key in meta? or maybe top level key that ended meta block?
                        # If we see a Top Level Key while inside meta, it means meta ended.
                         if key in TOP_LEVEL_KEYS:
                             inside_meta = False
                             new_lines.append(stripped) # Force un-indent
                         else:
                             new_lines.append(line)
                             
                elif inside_faq:
                    # inside faqs, we expect `- question:` or `answer:`
                    if stripped.startswith('-'):
                         new_lines.append(stripped) # List item start, remove indent if any (usually list items are 0 indented in this file style)
                    elif key == 'answer':
                         # Must be indented
                         if current_indent == 0:
                             new_lines.append('  ' + stripped)
                         else:
                             new_lines.append(line)
                    else:
                        if key in TOP_LEVEL_KEYS:
                            inside_faq = False
                            new_lines.append(stripped)
                        else:
                            new_lines.append(line)
                            
                elif inside_review:
                     if stripped.startswith('-'):
                         new_lines.append(stripped)
                     elif key in ['rating', 'date', 'title', 'content', 'verified', 'author']:
                         if current_indent == 0:
                             new_lines.append('  ' + stripped)
                         else:
                             new_lines.append(line)
                     else:
                        if key in TOP_LEVEL_KEYS:
                            inside_review = False
                            new_lines.append(stripped)
                        else:
                            new_lines.append(line)
                            
                else:
                    # Top level context
                    if key in TOP_LEVEL_KEYS:
                        new_lines.append(stripped) # Force un-indent
                    else:
                        # Maybe a list item for tags? or aliases?
                        if stripped.startswith('-'):
                             new_lines.append(line) # Keep original indent? usually tags: [..] so no list items
                        else:
                             # Fallback
                             new_lines.append(line)

            # Filter out multiple empty newlines at top
            final_lines = []
            for l in new_lines:
                if not final_lines and not l.strip():
                    continue
                final_lines.append(l)

            new_fm = '\n'.join(final_lines)
            new_content = f'---\n{new_fm}\n---{body}'
            
            with open(filepath, 'w') as f:
                f.write(new_content)

print("Fixed indentation logic.")
