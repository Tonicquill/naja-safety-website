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

# ---------- services.html ----------
def fix_services(c):
    # JSON-LD offer removal (double-quoted)
    c = re.sub(
        r'\s*\{ "@type": "Offer", "itemOffered": \{ "@type": "Course", "name": "OSH Coordinator \(OSH-C\) Section 29A", "url": "https://safetyconsultants.com.my/services/osh-coordinator-section-29a" \} \},',
        '',
        c
    )
    # Remove OSH-C from service list lines
    c = re.sub(
        r'<li><strong>OSH Coordinator \(OSH-C\) Section 29A</strong>.*?</li>\s*',
        '',
        c,
        flags=re.DOTALL
    )
    return c

rw(os.path.join(SITE, 'services.html'), fix_services)

# ---------- index.html ----------
def fix_index(c):
    # Update title and meta tags
    c = c.replace('Naja Safety | OSH-C Mandate Preparation & CIDB Safety Courses Johor Bahru',
                  'Naja Safety | Safety Training & CIDB Safety Courses Johor Bahru')
    c = c.replace('Naja Safety | OSH-C Mandate Preparation & CIDB Safety Courses Johor Bahru',
                  'Naja Safety | Safety Training & CIDB Safety Courses Johor Bahru')
    # The article card about "Who Needs an OSH Coordinator?" may still be there
    c = re.sub(
        r'\s*<article class="card">\s*<div class="card-icon">.*?<h3>Who Needs an OSH Coordinator\?</h3>\s*<p>.*?</p>\s*<a href="/services/osh-coordinator-section-29a".*?</a>\s*</article>',
        '',
        c,
        flags=re.DOTALL
    )
    # Remove LLM geo layer data attributes referencing OSH-C courses
    c = c.replace('data-courses="OSH-C,Incident Investigation,HIRARC,First Aid,Forklift Safety,Emergency Response,Chemical Safety,Electrical Safety"',
                    'data-courses="Incident Investigation,HIRARC,First Aid,Forklift Safety,Emergency Response,Chemical Safety,Electrical Safety"')
    c = re.sub(
        r'\s*<div data-course-syllabus="OSH-C" data-modules="OSH Act legal obligations,Hazard identification,Risk assessment,Incident investigation,Safety committee coordination,Emergency response planning,Statutory reporting" data-duration="2-5 days" data-audience="Employers,HR managers,safety officers,site supervisors"></div>',
        '',
        c
    )
    # Remove remaining ticker items about Section 29A / OSH-C if any
    c = re.sub(
        r'\s*<span class="ticker-item">.*?Section 29A.*?</span>',
        '',
        c,
        flags=re.DOTALL
    )
    return c

rw(os.path.join(SITE, 'index.html'), fix_index)

# ---------- articles/osh-act-2022-10-things.html ----------
def fix_article(c):
    # Remove JSON-LD sameAs pointing to deleted service
    c = re.sub(
        r'\s*\{\s*"@type": "Thing",\s*"@id": "https://safetyconsultants.com.my/articles/osh-act-2022-10-things#concept-osh-c",\s*"name": "OSH Coordinator Appointment",\s*"sameAs": "https://safetyconsultants.com.my/services/osh-coordinator-section-29a"\s*\},',
        '',
        c
    )
    # Remove HowToSupply implying provision
    c = re.sub(
        r'\s*\{ "@type": "HowToSupply", "name": "OSH Coordinator Competency Certificate" \},',
        '',
        c
    )
    # Update HowToSteps to neutral language
    c = c.replace(
        '"text": "If you employ 5 or more people, Section 29A mandates an appointed OSH Coordinator."',
        '"text": "If you employ 5 or more people, Section 29A mandates the appointment of a trained safety coordinator."'
    )
    c = c.replace(
        '"text": "The coordinator must hold DOSH-recognised competency certificates."',
        '"text": "The appointed person must hold DOSH-recognised competency certificates."'
    )
    # Update FAQ that implies Naja provides OSH-C training
    c = re.sub(
        r'\s*\{ "@type": "Question", "name": "How long does OSH-C training take\?", "acceptedAnswer": \{ "@type": "Answer", "text": "Standard OSH-C competency training is 2–3 days\. Naja Safety offers on-site delivery for teams of 5 or more, typically achieving full compliance within 7–14 days\." \} \},',
        '',
        c
    )
    # Remove service-promotional CTA section at bottom
    c = re.sub(
        r'\s*<section class="bg-light" style="margin-top: 4rem; padding: 2\.5rem; border-radius: var\(--radius-lg\);" data-geo-cta="true" data-conversion-goal="osh-coordinator-appointment" data-service-offering="OSH Coordinator Section 29A Advisory">.*?</section>',
        '',
        c,
        flags=re.DOTALL
    )
    # Remove related link to deleted service
    c = re.sub(
        r'\s*<li><a href="/regulatory-hub" data-conversion-action="related-service">OSH Coordinator Section 29A Advisory — appointment, training, and compliance verification</a></li>',
        '',
        c
    )
    # Update link text in related resources to remove OSH-C mention
    c = c.replace(
        '<li><a href="/courses" data-conversion-action="related-courses">Safety Training Courses — OSH-C, CIDB Green Card, First Aid, Fire Emergency</a></li>',
        '<li><a href="/courses" data-conversion-action="related-courses">Safety Training Courses — CIDB Green Card, First Aid, Fire Emergency</a></li>'
    )
    # Update data-service-url attribute on section
    c = c.replace(
        'data-service-url="https://safetyconsultants.com.my/services/osh-coordinator-section-29a"',
        'data-service-url="https://safetyconsultants.com.my/regulatory-hub"'
    )
    return c

rw(os.path.join(SITE, 'articles', 'osh-act-2022-10-things.html'), fix_article)

# ---------- articles/index.html ----------
def fix_articles_index(c):
    # Remove article card linking to deleted service
    c = re.sub(
        r'\s*<article class="card">\s*<div class="card-icon">.*?<h3>Who Needs an OSH Coordinator\?</h3>\s*<p>.*?</p>\s*<a href="/services/osh-coordinator-section-29a".*?</a>\s*</article>',
        '',
        c,
        flags=re.DOTALL
    )
    return c

rw(os.path.join(SITE, 'articles', 'index.html'), fix_articles_index)

# ---------- course pages (cross-links) ----------
for course_file in ['scaffold-safety.html', 'chemical-handling.html', 'cidb-green-card.html']:
    path = os.path.join(SITE, 'courses', course_file)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            c = f.read()
        c_orig = c
        c = re.sub(r'.*osh-coordinator.*\n', '', c, flags=re.IGNORECASE)
        c = re.sub(r'.*OSH-C.*\n', '', c, flags=re.IGNORECASE)
        if c != c_orig:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(c)
            print('Updated courses/' + course_file)
        else:
            print('No changes courses/' + course_file)
    else:
        print('MISSING courses/' + course_file)

# ---------- js/main.js and new-dictionary-entries.js ----------
for jsfile in ['js/main.js', 'new-dictionary-entries.js']:
    path = os.path.join(SITE, jsfile)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            c = f.read()
        c_orig = c
        c = re.sub(r'.*[Oo][Ss][Hh][\s\-]?[Cc]oordinator.*\n', '', c)
        c = re.sub(r'.*osh-coordinator.*\n', '', c, flags=re.IGNORECASE)
        if c != c_orig:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(c)
            print('Updated', jsfile)
        else:
            print('No changes', jsfile)
    else:
        print('MISSING', jsfile)

print('\nOSH-C removal round 2 complete.')
