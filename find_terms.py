import re

with open('src/data/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# find all keys starting with "terms.
keys = set(re.findall(r'"terms\..*?":', content))
print(keys)
