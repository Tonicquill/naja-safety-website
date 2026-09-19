import os, re, glob

SITE = r'D:\Claude Code Porjects\Naja Safety\site'

# ---------- 1. Delete OSH-C specific pages ----------
for path in [
    os.path.join(SITE, 'courses', 'osh-coordinator.html'),
    os.path.join(SITE, 'services', 'osh-coordinator-section-29a.html'),
]:
    if os.path.exists(path):
        os.remove(path)
        print('Deleted', path)
    else:
        print('Already deleted', path)

# ---------- 2. Helper ----------
def replace_in_file(path, replacements):
    if not os.path.exists(path):
        print('MISSING', path)
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated', path)
    else:
        print('No changes', path)

# ---------- 3. courses.html — remove OSH-C card block ----------
courses_path = os.path.join(SITE, 'courses.html')
with open(courses_path, 'r', encoding='utf-8') as f:
    c = f.read()
c_orig = c
# Remove the OSH-C course-card block (lines 163-182 approximately)
c = re.sub(
    r'\s*<div class="course-card" data-category="osh-training">\s*<div class="course-card-header">\s*<h4 class="course-title">OSH Coordinator \(OSH-C\)</h4>\s*<span class="course-category-badge">OSH Training</span>\s*</div>\s*<p class="course-desc">Statutory appointment training under Section 29A of the OSH \(Amendment\) Act 2022\. For workplaces with 5\+ employees\.</p>\s*<div class="course-meta">.*?<a href="/courses/osh-coordinator\.html" class="course-enquire-link" style="margin-left:1rem;color:var\(--primary\);">View course details →</a>\s*</div>',
    '',
    c,
    flags=re.DOTALL
)
if c != c_orig:
    with open(courses_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated courses.html (removed card)')
else:
    print('No card found in courses.html (maybe already removed)')

# ---------- 4. index.html ----------
idx_path = os.path.join(SITE, 'index.html')
with open(idx_path, 'r', encoding='utf-8') as f:
    c = f.read()
c_orig = c

# Remove ticker items mentioning OSH-C / Section 29A
# There are two sets (original + duplicate for marquee)
c = re.sub(
    r"\s*<span class=\"ticker-item\">.*?OSH Act 2022 Section 29A Advisory.*?</span>",
    "",
    c,
    flags=re.DOTALL
)

# Remove 'OSH Coordinator (OSH-C) Development' list item
c = c.replace("<li>OSH Coordinator (OSH-C) Development</li>\n            </ul>", "</ul>")

# Remove the article card pointing to osh-coordinator-section-29a
c = re.sub(
    r'\s*<article class="card">\s*<div class="card-icon">.*?<h3>Who Needs an OSH Coordinator\?</h3>\s*<p>If you employ 5 or more workers, you are legally required to appoint an OSH Coordinator under Section 29A\. We explain the appointment process, competency requirements, and compliance timeline\.</p>\s*<a href="/services/osh-coordinator-section-29a" style="color:var\(--primary\);font-weight:600;">View OSH-C Advisory →</a>\s*</article>',
    '',
    c,
    flags=re.DOTALL
)

# Replace hero subtext offering language
c = c.replace(
    'Under Section 29A of the OSH (Amendment) Act 2022, any Malaysian enterprise employing 5 or more individuals must appoint an OSH Coordinator (OSH-C). Naja Safety trains and equips your internally appointed employee to clear regulatory benchmarks smoothly — turning compliance from a liability into a managed capability.',
    'Naja Safety provides training, consultancy, and compliance support for Malaysian workplaces — helping organisations meet statutory requirements under the OSH (Amendment) Act 2022 and CIDB regulations.'
)

# Replace FAQ custom training answer that mentions OSH-C
c = c.replace(
    'Yes. We design customized, site-focused HSE frameworks built completely around your industry\'s specific HIRARC metrics. For small-to-medium operations crossing the 5-employee threshold, we fast-track internal team members through the official OSH Coordinator syllabus without disrupting operational output.',
    'Yes. We design customized, site-focused HSE frameworks built completely around your industry\'s specific HIRARC metrics. Training can be delivered on-site to minimise operational disruption.'
)

if c != c_orig:
    with open(idx_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated index.html')
else:
    print('No changes index.html')

# ---------- 5. services.html ----------
svc_path = os.path.join(SITE, 'services.html')
with open(svc_path, 'r', encoding='utf-8') as f:
    c = f.read()
c_orig = c

# Remove OSH-C from JSON-LD offer catalog
c = re.sub(
    r"\s*\{ '@type': 'Offer', 'itemOffered': \{ '@type': 'Course', 'name': 'OSH Coordinator \(OSH-C\) Section 29A', 'url': 'https://safetyconsultants.com.my/services/osh-coordinator-section-29a' \} \},",
    "",
    c
)

# Remove OSH Coordinator from service list (the omitted long lines around 247)
c = re.sub(
    r'<li><strong>OSH Coordinator \(OSH-C\) Section 29A</strong>.*?</li>\s*',
    '',
    c,
    flags=re.DOTALL
)

# Update FAQ answer
c = c.replace(
    'Non-compliance exposes directors to <strong>criminal liability</strong>, heavy fines, and stop-work orders. Naja Safety fast-tracks your designated employee through the required OSH-C training and statutory appointment.',
    'Non-compliance exposes directors to <strong>criminal liability</strong>, heavy fines, and stop-work orders.'
)

if c != c_orig:
    with open(svc_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated services.html')
else:
    print('No changes services.html')

# ---------- 6. guide.html ----------
replace_in_file(os.path.join(SITE, 'guide.html'), [
    (
        'Prepare a complete HIRARC register, updated machinery registers (PMA/PMT), Safety and Health Committee records, first-aider certificates, and evidence of OSH Coordinator appointment. We conduct pre-audit gap assessments to help you pass cleanly.',
        'Prepare a complete HIRARC register, updated machinery registers (PMA/PMT), Safety and Health Committee records, and first-aider certificates. We conduct pre-audit gap assessments to help you pass cleanly.'
    ),
])

# ---------- 7. about.html ----------
abt_path = os.path.join(SITE, 'about.html')
with open(abt_path, 'r', encoding='utf-8') as f:
    c = f.read()
c_orig = c

# Update 2024 timeline to remove coordinator programme language
c = c.replace(
    '<strong>Enforcement Intensifies</strong>. DOSH begins targeted inspections verifying OSH Coordinator appointment letters and competency certificates. Naja Safety scales its coordinator preparation programme to meet surging demand.',
    '<strong>Enforcement Intensifies</strong>. DOSH begins targeted inspections verifying OSH Coordinator appointment letters and competency certificates. Naja Safety scales its compliance advisory and training programmes to meet surging demand.'
)

# Update 2022 timeline (informational only — keep but neutral)
c = c.replace(
    '<strong>OSH Amendment Act 2022</strong> passes, activating Section 29A: workplaces with 5+ employees must appoint an OSH Coordinator.',
    '<strong>OSH Amendment Act 2022</strong> passes, activating Section 29A: workplaces with 5+ employees must appoint an OSH Coordinator.'
)
# ^ no change needed, it's factual

if c != c_orig:
    with open(abt_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated about.html')
else:
    print('No changes about.html')

# ---------- 8. locations.html ----------
replace_in_file(os.path.join(SITE, 'locations.html'), [
    ('<li>OSH Coordinator (OSH-C) training</li>\n', '<li>OSH Training & Compliance Advisory</li>\n'),
])

# ---------- 9. regulatory-hub.html ----------
reg_path = os.path.join(SITE, 'regulatory-hub.html')
with open(reg_path, 'r', encoding='utf-8') as f:
    c = f.read()
c_orig = c

# Remove OSH-C advisory link from related resources
c = c.replace(
    '          <li><a href="/services/osh-coordinator-section-29a">OSH Coordinator Section 29A Advisory Hub</a></li>\n',
    ''
)

if c != c_orig:
    with open(reg_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated regulatory-hub.html')
else:
    print('No changes regulatory-hub.html')

# ---------- 10. articles/index.html ----------
art_path = os.path.join(SITE, 'articles', 'index.html')
if os.path.exists(art_path):
    with open(art_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    c = re.sub(
        r'\s*<article class="card">\s*<div class="card-icon">.*?<h3>Who Needs an OSH Coordinator\?</h3>\s*<p>.*?</p>\s*<a href="/services/osh-coordinator-section-29a".*?</a>\s*</article>',
        '',
        c,
        flags=re.DOTALL
    )
    if c != c_orig:
        with open(art_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated articles/index.html')
    else:
        print('No changes articles/index.html')
else:
    print('MISSING articles/index.html')

# ---------- 11. articles/osh-act-2022-10-things.html ----------
art10_path = os.path.join(SITE, 'articles', 'osh-act-2022-10-things.html')
if os.path.exists(art10_path):
    with open(art10_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    # Remove any link to osh-coordinator-section-29a
    c = c.replace(' href="/services/osh-coordinator-section-29a"', ' href="/regulatory-hub"')
    c = c.replace(' href="/courses/osh-coordinator.html"', ' href="/courses"')
    if c != c_orig:
        with open(art10_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated articles/osh-act-2022-10-things.html')
    else:
        print('No changes articles/osh-act-2022-10-things.html')
else:
    print('MISSING articles/osh-act-2022-10-things.html')

# ---------- 12. whatsapp-lander.html ----------
wa_path = os.path.join(SITE, 'whatsapp-lander.html')
if os.path.exists(wa_path):
    with open(wa_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    # Remove osh-coordinator preset block
    c = re.sub(
        r"\s*'osh-coordinator': \{\s*headline: 'OSH Coordinator Mandate \(Act 514\)',\s*message: 'Hi Naja Safety, under the OSH \(Amendment\) Act 2022, our organization requires an official OSH Coordinator \(OSH-C\). Please guide us through your training timeline and requirements.'\s*\},",
        "",
        c
    )
    if c != c_orig:
        with open(wa_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated whatsapp-lander.html')
    else:
        print('No changes whatsapp-lander.html')
else:
    print('MISSING whatsapp-lander.html')

# ---------- 13. sitemap.xml ----------
sm_path = os.path.join(SITE, 'sitemap.xml')
if os.path.exists(sm_path):
    with open(sm_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    c = re.sub(
        r"\s*<url>\s*<loc>https://safetyconsultants\.com\.my/(courses|services)/osh-coordinator[^<]*</loc>.*?</url>",
        "",
        c,
        flags=re.DOTALL
    )
    if c != c_orig:
        with open(sm_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated sitemap.xml')
    else:
        print('No changes sitemap.xml')
else:
    print('MISSING sitemap.xml')

# ---------- 14. _redirects ----------
red_path = os.path.join(SITE, '_redirects')
if os.path.exists(red_path):
    with open(red_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    filtered = [ln for ln in lines if 'osh-coordinator' not in ln.lower() and 'osh-c' not in ln.lower()]
    if len(filtered) != len(lines):
        with open(red_path, 'w', encoding='utf-8') as f:
            f.writelines(filtered)
        print('Updated _redirects')
    else:
        print('No changes _redirects')
else:
    print('MISSING _redirects')

# ---------- 15. llms.txt ----------
llms_path = os.path.join(SITE, 'llms.txt')
if os.path.exists(llms_path):
    with open(llms_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    # Remove lines or sections referencing osh-coordinator
    c = re.sub(r".*osh-coordinator.*\n", "", c, flags=re.IGNORECASE)
    c = re.sub(r".*OSH-C.*\n", "", c, flags=re.IGNORECASE)
    if c != c_orig:
        with open(llms_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated llms.txt')
    else:
        print('No changes llms.txt')
else:
    print('MISSING llms.txt')

# ---------- 16. js/main.js — remove OSH-C from dictionary if present ----------
js_main = os.path.join(SITE, 'js', 'main.js')
if os.path.exists(js_main):
    with open(js_main, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    # Remove dictionary entries mentioning osh coordinator
    c = re.sub(r".*[Oo]SH[- ]?[Cc]oordinator.*\n", "", c)
    if c != c_orig:
        with open(js_main, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated js/main.js')
    else:
        print('No changes js/main.js')
else:
    print('MISSING js/main.js')

# ---------- 17. new-dictionary-entries.js ----------
nd_path = os.path.join(SITE, 'new-dictionary-entries.js')
if os.path.exists(nd_path):
    with open(nd_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c_orig = c
    c = re.sub(r".*[Oo]SH[- ]?[Cc]oordinator.*\n", "", c)
    if c != c_orig:
        with open(nd_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Updated new-dictionary-entries.js')
    else:
        print('No changes new-dictionary-entries.js')
else:
    print('MISSING new-dictionary-entries.js')

print('\\nOSH-C removal complete.')
