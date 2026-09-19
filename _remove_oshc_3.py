import os, re

SITE = r'D:\Claude Code Porjects\Naja Safety\site'

def rw(path, func):
    if not os.path.exists(path):
        print('MISSING', path)
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    content = func(content)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated', path)
    else:
        print('No changes', path)

# ---------- main.js ----------
def fix_main_js(c):
    # Remove oshcHeroBtnBook and oshcHeroBtnCall lines
    c = re.sub(r'\s*oshcHeroBtnBook:\s*\{[^}]+\},', '', c)
    c = re.sub(r'\s*oshcHeroBtnCall:\s*\{[^}]+\},', '', c)
    # Remove oschCtaTitle line
    c = re.sub(r'\s*oschCtaTitle:\s*\{[^}]+\},', '', c)
    # Remove entire oshCoord block (from oshCoordEyebrow to oshCoordCtaBtnContact)
    c = re.sub(
        r'\s*oshCoordEyebrow:\s*\{[^}]+\},'
        r'.*?'
        r'oshCoordCtaBtnContact:\s*\{[^}]+\},',
        '',
        c,
        flags=re.DOTALL
    )
    # Update heroSubtitle translations to remove OSH-C offering language
    c = c.replace(
        'ms: "Kami melatih dan menyediakan Penyelaras OSH (OSH-C) yang dilantik secara dalaman untuk anda memenuhi piawaian kawal selia Malaysia dengan lancar. Di bawah Seksyen 29A Akta OSHA (Pindaan) 2022, mana-mana syarikat dengan 5 atau lebih pekerja mesti melantik penyelaras OSH. Kami menyediakan pekerja yang dilantik untuk memenuhi mandat ini.",',
        'ms: "Naja Safety menyediakan latihan, perundingan, dan sokongan pematuhan untuk tempat kerja Malaysia — membantu organisasi memenuhi keperluan statutori di bawah Akta OSH (Pindaan) 2022 dan peraturan CIDB.",'
    )
    c = c.replace(
        'zh: "我们培训并装备贵公司内部指定的职业安全卫生协调员（OSH-C），使其顺利通过马来西亚监管基准。根据2022年《职业安全卫生法（修正）法》第29A条，任何雇用5名或以上员工的企业必须任命OSH协调员。我们为贵公司指定的员工做好合规准备。",',
        'zh: "Naja Safety为马来西亚工作场所提供培训、咨询和合规支持——帮助组织满足OSH（修正）法案2022和CIDB法规的法定要求。",'
    )
    c = c.replace(
        'ta: "உங்கள் உள்ளக நியமிக்கப்பட்ட OSH ஒருங்கிணைப்பாளரை (OSH-C) மலேசியா கட்டுப்பாட்டு தரங்களை சீராக கடக்க தயார்படுத்துகிறோம். 2022 OSH சட்டத்தின் பிரிவு 29A-ன் கீழ், 5 அல்லது அதற்கு மேற்பட்ட ஊழியர்களைக் கொண்ட நிறுவனம் OSH ஒருங்கிணைப்பாளரை நியமிக்க வேண்டும். நாங்கள் உங்கள் நியமிக்கப்பட்ட ஊழியரை இந்த கட்டளைக்கு தயார் செய்கிறோம்.",',
        'ta: "Naja Safety மலேசியா பணியிடங்களுக்கு பயிற்சி, ஆலோசனை மற்றும் இணக்க ஆதரவை வழங்குகிறது — OSH (திருத்தம்) சட்டம் 2022 மற்ற CIDB விதிமுறைகளின் கீழ் சட்டபூர்வ தேவைகளை பூர்த்தி செய்ய உதவுகிறது."'
    )
    return c

rw(os.path.join(SITE, 'js', 'main.js'), fix_main_js)

# ---------- new-dictionary-entries.js ----------
def fix_new_dict(c):
    # Remove entire oshCoord block
    c = re.sub(
        r'\s*oshCoordEyebrow:\s*\{[^}]+\},'
        r'.*?'
        r'oshCoordCtaBtnContact:\s*\{[^}]+\},',
        '',
        c,
        flags=re.DOTALL
    )
    return c

rw(os.path.join(SITE, 'new-dictionary-entries.js'), fix_new_dict)

# ---------- course pages: remove OSH Coordinator related card ----------
COURSE_FILES = [
    'courses/cidb-green-card.html',
    'courses/chemical-handling.html',
    'courses/scaffold-safety.html',
]

for rel in COURSE_FILES:
    path = os.path.join(SITE, rel)
    if not os.path.exists(path):
        print('MISSING', rel)
        continue
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    # Try to remove the related card block pointing to osh-coordinator
    c = re.sub(
        r'\s*<a[^>]*href="/courses/osh-coordinator\.html"[^>]*>'
        r'\s*<div[^>]*>.*?OSH Coordinator.*?</p>'
        r'\s*</a>',
        '',
        c,
        flags=re.DOTALL | re.IGNORECASE
    )
    # Also remove standalone h3/p combos about OSH Coordinator
    c = re.sub(
        r'\s*<h3>OSH Coordinator</h3>\s*<p>.*?</p>',
        '',
        c,
        flags=re.DOTALL | re.IGNORECASE
    )
    if c != c_orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated', rel)
    else:
        print('No changes', rel)

# ---------- index.html title/meta cleanup ----------
def fix_index(c):
    c = c.replace(
        '<title>Naja Safety | OSH-C Mandate Preparation & CIDB Safety Courses Johor Bahru</title>',
        '<title>Naja Safety | Safety Training & CIDB Safety Courses Johor Bahru</title>'
    )
    return c

rw(os.path.join(SITE, 'index.html'), fix_index)

print('\nOSH-C removal round 3 complete.')
