# NAJA SAFETY — FULL BUILD SPEC
## For AI Agent: Generate Complete Website

---

## PROJECT OVERVIEW
Build a high-converting, SEO/SEM-powered website for **Naja Safety Sdn Bhd** (Malaysian OSH/DOSH safety training & consultancy). Single-page application or multi-page static site. Must match/surpass the benchmark site `xspotpestcontroljb.com` in conversion architecture.

**Tech stack:** Static HTML/CSS/JS (no framework needed). Can use vanilla JS, Tailwind CDN, or plain CSS. Must be fully static — deployable to Pages/Netlify/any static host.

**Deploy target:** Cloudflare Pages (or similar). Must work on mobile.

---

## BRAND IDENTITY

- **Name:** Naja Safety Sdn Bhd
- **Tagline:** *"Your Trusted Safety Partner — Training, Consultancy & Compliance"*
- **Tone:** Professional but approachable. Not corporate-stiff. James Issachar is a real practitioner with 20+ years in the field. Human, credible, hands-on.
- **Primary color:** Use `#1B4F72` (deep corporate blue) or derive from the CIDB cert image if you can infer. Secondary: `#F39C12` (amber/gold accent for CTAs). If uncertain, use deep blue + amber.
- **Fonts:** Inter or system-ui stack. Clean, readable, modern.

---

## CONFIRMED DATA (Use verbatim — do not hallucinate)

### Company
- Legal Name: Naja Safety Sdn Bhd
- Year active: ~2006 (James joined as OSH Consultant May 2006, Director since Jan 2015)
- Sister company: Naja Scaffolding Sdn Bhd (Reg: 201701012443 / 1226608-V, incorporated 2017)
- Industry: HSE / OSH Consulting & Safety Training
- Size: ~4 core staff + freelance trainer/agent network
- Old site: `safetyconsultants.com.my` (broken frameset, empty pages, ~54 visits/month)

### Address (Only Office)
```
No 09-03, Block C,
Kompleks Austin Perdana,
Taman Austin Perdana,
81100 Johor Bahru, Johor, Malaysia
```

### Contact
- Office: **07-3612506**
- James (Director): **016-7160462**
- Sujen (Marketing): **01155890005** (WhatsApp)
- Email: **info@safetyconsultants.com.my**
- Legacy: naja_safety@yahoo.com

### Key Person — James Issachar A/L Daniel
- Director since Jan 2015
- HRD Corp Trainer ID: **62976**
- CIDB Certified Instructor
- OSH Consultant since May 2006
- 20+ years in manufacturing, construction & safety consultancy
- Chairman, Shechinah Association Johor Bahru (charity, founded 2018)
- Personal story: troubled youth → NIOSH vocational training → built consultancy → now committed to charity work

### Credentials to Display
- ✅ HRD Corp Certified Trainer (ID: 62976)
- ✅ CIDB Certified Instructor
- ✅ 20+ Years Industry Experience
- ✅ 158+ Client Companies Served
- ✅ Nationwide Training Deployment
- ✅ One-Stop Training, Consultancy & Compliance Support

---

## SERVICE TAXONOMY (Build pages/sections for each)

### A. OSH Training
- Incident & Accident Investigation
- Safety & Health Committee Training
- Chemical Safety
- Electrical Safety
- Emergency Response & Fire Safety
- First Aid & CPR
- Forklift & Machinery Safety
- HIRARC & Risk Management
- Safety Audit & Inspection Techniques
- Tailor-Made HSE Programmes

### B. CIDB & Construction Safety Training
- Safety Induction & Awareness
- Working at Height (WAH) Safety
- Site Safety Management
- Toolbox Talk & Safety Briefings
- Green Card Related Training (SICW / CIDB Green Card)
- Scaffold Safety Awareness Program

### C. Safety Consultancy & Support
- Workplace Safety Assessments
- Compliance & Risk Advisory
- Safety Documentation Support
- Supply of Competent Safety Supervisor & Environmental Officer

### D. HRDCorp Training Support (Financial Hook)
- Guidance on Claimable Training Programmes
- Grant & Funding Assistance
- Claim Process Support
- Training Budget Optimisation

---

## UNIQUE VALUE PROPOSITIONS (Use in copy)

1. **"We do not operate as a training-only provider. We work as a trusted safety partner."**
2. **Long-term partnerships, not one-off training.** Continuous post-training support.
3. **Practical, real-world safety solutions** — not classroom theory.
4. **Flexible, site-focused approach** — trainers come to your site nationwide.
5. **One-stop shop** — training + consultancy + compliance + documentation + manpower supply.
6. **HRD Corp claim expertise** — we help you navigate funding. Training can be zero net cost.
7. **Sister scaffolding company** — natural cross-sell for construction clients.

---

## CLIENT PORTFOLIO (158 companies served)

Display as a **logo wall / trust bar**. Use text names if no logos. Notable names to highlight:

**Construction/Engineering:** Econpile (M) Sdn Bhd, Gadang Engineering Sdn Bhd, Penta Ocean Malaysia Sdn Bhd, Obayashi Corporation, Mudajaya Corporation Berhad, Zublin Precast Industries Sdn Bhd, AECOM Malaysia Sdn Bhd, Technip Geoproduction (M) Sdn Bhd

**Manufacturing/Industrial:** GP Batteries (M) Sdn Bhd, Rexam Sdn Bhd, Alstom Services Sdn Bhd, FMC Wellhead Equipment, Seien Rubber (M) Sdn Bhd, Hiroyuki Industries (M) Sdn Bhd

**Government/GLC:** Construction Industry Development Board (CIDB)

**Other peers:** NVM Safety & Health Consultancy Services, JVS HSE RESOURCES

Copy: *"158 companies trust Naja Safety. From Econpile to Penta Ocean Malaysia — we've trained their teams and kept their sites compliant for over 20 years."*

---

## MEDIA ASSETS AVAILABLE

Videos (from collaterals folder, use as `<video>` elements or references):
1. `ERP Training.mp4` (~20MB)
2. `Fire Fighting Briefing.mp4` (~2.5MB)
3. `Forklift Training.mp4` (~4MB)
4. `Important of Occupational Safety & Health OSH.mp4` (~3MB)
5. `Safety Training & FIRE DRILL.mp4` (~8.8MB)
6. `Scaffold Safety Awareness Program.mp4` (~1.6MB)

Images/Documents:
- `CIDB CERTIFIED.jpeg` (~57KB) — use as trust badge
- `HRD CORP ACCREDITED TRAINER CERTIFICATE.pdf` (~1.6MB) — offer as download
- `Naja Safety Introductory email.txt` — copy source

**Missing (use placeholders or generate with AI):**
- Naja Safety logo (vector / transparent PNG)
- James Issachar headshot
- Team photos
- On-site training photos
- Scaffolding work photos

**Instruction:** For missing images, use Unsplash-style placeholders or AI-generated imagery with prompts like "professional safety training in a Malaysian factory setting" or "construction site safety briefing". Clearly label as placeholder.

---

## SITE ARCHITECTURE (Minimum viable pages)

### 1. Homepage (`index.html`)
**Goal:** Immediate trust + clear CTA + service overview

**Sections (in order):**
1. **Hero:** Full-width with background video or image. Headline: *"20+ Years Keeping Malaysian Workplaces Safe"* or similar. Subheadline about trusted safety partner. Primary CTA: **WhatsApp/Call button** + **"View Courses"** secondary.
2. **Trust Bar:** 6 credential badges in a row (HRD Corp, CIDB, 20+ years, 158+ clients, nationwide, one-stop).
3. **Why Choose Us:** 6 value propositions with icons. Use their exact language (see UVPs above).
4. **Service Categories:** 4 cards linking to service detail sections/pages (OSH Training, CIDB/Construction, Consultancy, HRDCorp Support).
5. **About / Lead Trainer:** James Issachar bio with photo placeholder. Include HRD Corp ID 62976, CIDB cert, personal story, charity chairmanship. Humanises the brand.
6. **Video Evidence:** Grid of training video thumbnails. Builds proof.
7. **Client Logo Wall:** Trust bar with notable client names.
8. **Testimonials (if available):** Otherwise use "Client industries we serve" with icons.
9. **FAQ Accordion:** 6-8 common questions about HRD Corp claims, CIDB requirements, course durations, on-site vs classroom, certificates provided.
10. **Contact / CTA:** Address, phone numbers (click-to-call, click-to-WhatsApp), email, simple enquiry form (Name, Company, Phone, Email, Service Interested In, Message).
11. **Footer:** Full nav, contact info, copyright, sister company mention (Naja Scaffolding), Shechinah Association charity link (optional).

### 2. Services Page (`services.html`) OR in-page anchors
Detailed breakdown of all 4 service pillars. Each pillar gets:
- Icon + headline
- Description paragraph
- List of specific courses/services
- CTA: *"Enquire about this service →"*

### 3. About Page (`about.html`)
- Company history (2006 → today)
- James Issachar full bio
- Team structure (core 4 + network)
- Sister company mention (Naja Scaffolding)
- Community involvement (Shechinah Association)
- Mission statement (derived from their email positioning)

### 4. Courses Page (`courses.html`)
Filterable or tabbed list of all courses by category:
- OSH Training
- CIDB / Construction Safety
- Emergency & Fire Safety
- Machinery & Lifting

Each course card: Title, Duration, Target Audience, Mode (Classroom / On-site), Certification, HRD Corp Claimable (Yes/No).

### 5. Contact Page (`contact.html`)
- Full address with embedded map placeholder (Google Maps iframe)
- All phone numbers with click-to-call
- WhatsApp click-to-chat button (use wa.me/601155890005 format)
- Email link
- Contact form (Name, Email, Phone, Company, Service, Message)
- Operating hours (if known — otherwise omit)

---

## SEO & STRUCTURED DATA REQUIREMENTS

### Meta Tags (Every Page)
- Title: *"Naja Safety Sdn Bhd | DOSH & CIDB Safety Training Johor Bahru"* (or variant)
- Description: Include "20+ years", "HRD Corp claimable", "CIDB Green Card", "Johor Bahru", "nationwide"
- Canonical URL
- Open Graph tags (image, title, description)
- Twitter Card tags

### JSON-LD Schema (Add to every page `<head>`)
1. **Organization:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Naja Safety Sdn Bhd",
  "url": "https://safetyconsultants.com.my",
  "logo": "...",
  "sameAs": [
    "https://www.linkedin.com/company/naja-safety-sdn-bhd"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+60-7-3612506",
    "contactType": "customer service",
    "areaServed": "MY",
    "availableLanguage": ["English", "Malay"]
  }
}
```

2. **LocalBusiness (Homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Naja Safety Sdn Bhd",
  "image": "...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No 09-03, Block C, Kompleks Austin Perdana",
    "addressLocality": "Taman Austin Perdana",
    "addressRegion": "Johor",
    "postalCode": "81100",
    "addressCountry": "MY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "1.5358",
    "longitude": "103.7150"
  },
  "url": "https://safetyconsultants.com.my",
  "telephone": "+6073612506",
  "priceRange": "$$"
}
```

3. **Person (James Issachar):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "James Issachar A/L Daniel",
  "jobTitle": "Director & Lead Trainer",
  "worksFor": "Naja Safety Sdn Bhd",
  "alumniOf": "NIOSH",
  "award": "HRD Corp Certified Trainer (ID: 62976), CIDB Certified Instructor"
}
```

4. **Course schema** for each training program (add on Courses page):
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Scaffold Safety Awareness Program",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "Naja Safety Sdn Bhd",
    "sameAs": "https://safetyconsultants.com.my"
  },
  "courseCode": "...",
  "educationalCredentialAwarded": "Certificate of Attendance"
}
```

5. **FAQPage schema** for the FAQ section.

### Technical SEO
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Proper heading hierarchy (single H1 per page)
- Alt text for all images
- Internal linking between pages
- Breadcrumb structured data
- XML Sitemap (`sitemap.xml`)
- `robots.txt`
- Canonical tags
- Mobile-first responsive design
- Fast load times (compressed images, minified CSS/JS)

### Local SEO Targets
Primary: Johor Bahru, Mount Austin, Taman Austin Perdana, Ulu Tiram, Pasir Gudang, Sedenak, PTP, Iskandar Puteri, Skudai, Tebrau, Kulai, Senai.

Mention these naturally in copy: "We conduct CIDB Green Card training across Johor Bahru, Pasir Gudang, Sedenak and nationwide."

---

## CONVERSION ARCHITECTURE (Match Xspot Benchmark)

### CTAs Everywhere
- **Sticky WhatsApp button** (bottom-right corner, all pages)
- **Click-to-call** on phone numbers (mobile)
- **"Get a Quote"** or **"Enquire Now"** buttons after every service section
- **Form submissions** trigger a thank-you page with tracking pixel placeholder

### WhatsApp Deep Link
Use: `https://wa.me/601155890005?text=Hi%20Naja%20Safety,%20I%20am%20interested%20in%20your%20safety%20training%20services.`

### Phone Links
- `tel:+6073612506` (office)
- `tel:+60167160462` (James)
- `tel:+601155890005` (Sujen)

### Enquiry Form Fields
1. Name
2. Company Name
3. Email
4. Phone / WhatsApp
5. Service Interested In (dropdown: OSH Training / CIDB Construction Safety / Consultancy / HRD Corp Support / Other)
6. Message
7. Submit button

Form action: Use a placeholder like `action="https://formspree.io/f/YOUR_ID"` or Netlify forms. Add a comment: `<!-- TODO: Replace with actual form endpoint -->`

---

## CONTENT COPY ANGLES

### Headline Options
- *"20+ Years Keeping Malaysian Workplaces Safe"*
- *"Your Trusted Safety Partner — From Training to Compliance"*
- *"HRD Corp Claimable Safety Training & Consultancy"*
- *"CIDB Green Card, Scaffold Safety & Working at Height — We Come to Your Site"*

### Fear/Compliance Angle (for SEO pages)
"Under the Occupational Safety and Health Act 1994 (Act 514) and the OSH (Amendment) Act 2022, companies face mandatory compliance requirements. Non-compliance means heavy fines and stop-work orders. Naja Safety is your external compliance shield."

### Financial Incentive Angle
"James Issachar is HRD Corp-certified (Trainer ID: 62976). Your mandatory safety training can be 100% claimable under HRD Corp levies. We even help you with the claim process — turning compliance into zero net cost."

### Trust Angle
"158 companies trust Naja Safety. From Econpile to Penta Ocean Malaysia, from manufacturing to construction — we've trained their teams and kept their sites compliant for over 20 years."

### Human Interest Angle
"James Issachar didn't start in a boardroom. He started at NIOSH as a vocational trainee. Today he's a CIDB-certified instructor, HRD Corp-accredited trainer, and Chairman of Shechinah Association Johor Bahru — because safety isn't just a job. It's a mission to protect people."

---

## FILES TO GENERATE

Minimum deliverable:
```
/
├── index.html
├── services.html
├── about.html
├── courses.html
├── contact.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── images/
│   ├── logo-placeholder.png
│   ├── james-headshot-placeholder.jpg
│   ├── cidb-certified-badge.png
│   ├── hrdcorp-badge.png
│   └── [video thumbnails]
├── videos/
│   └── [reference video files — do not embed large files, use <video> with poster]
├── sitemap.xml
├── robots.txt
└── README.md (deployment instructions)
```

**Important:** Do NOT embed the actual MP4 videos inline if they're large. Use `<video>` elements with `poster` images and `preload="none"` or host externally. Reference them by filename in the code comments.

---

## DESIGN NOTES

- **Mobile-first:** 90% of Malaysian B2B search is mobile. Test at 375px width.
- **Fast load:** No heavy frameworks. Keep under 2MB first paint.
- **Dark blue + amber accents:** Trust + action. Avoid generic corporate grey.
- **Real photos over stock:** Wherever possible, show the actual training videos as evidence.
- **Clear typography:** Inter or Roboto. 16px minimum body. Good line-height.
- **WhatsApp sticky:** Always visible, green button, bottom-right.
- **No pop-ups:** Malaysian B2B buyers hate aggressive lead capture.

---

## DEPLOYMENT NOTES

- **Domain:** `safetyconsultants.com.my` (existing) or suggest migrating to `najasafety.my` if available
- **SSL:** Must be HTTPS (Let's Encrypt or Cloudflare automatic)
- **CDN:** Cloudflare recommended (free tier, caching, analytics)
- **Analytics:** Google Analytics 4 placeholder + Google Tag Manager placeholder
- **Search Console:** Add site verification meta tag placeholder

---

## FINAL CHECKLIST FOR AGENT

Before marking complete, verify:
- [ ] All 5 HTML pages exist and link to each other
- [ ] WhatsApp sticky button is present on all pages
- [ ] All phone numbers are click-to-call
- [ ] JSON-LD schema is present on all pages
- [ ] Meta tags are unique per page
- [ ] Semantic HTML5 is used throughout
- [ ] Mobile responsive (test mentally at 375px and 768px)
- [ ] sitemap.xml and robots.txt exist
- [ ] No placeholder text remains unlabelled
- [ ] All images have alt text
- [ ] Form has a clear TODO comment for endpoint configuration
- [ ] Copy uses confirmed data only — no hallucinated stats

---

**Build this site. Make it fast, credible, and conversion-focused.**
