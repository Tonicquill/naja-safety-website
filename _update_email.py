import os

SITE = r'D:\Claude Code Porjects\Naja Safety\site'
OLD = 'najasafety@gmail.com'
NEW = 'info@safetyconsultants.com.my'

updated = 0
unchanged = 0

for root, dirs, files in os.walk(SITE):
    for name in files:
        if name.endswith(('.html', '.js', '.md', '.txt', '.xml')):
            path = os.path.join(root, name)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if OLD in content:
                content = content.replace(OLD, NEW)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
                print('Updated', path)
            else:
                unchanged += 1

print(f'\nDone: {updated} files updated, {unchanged} unchanged.')
