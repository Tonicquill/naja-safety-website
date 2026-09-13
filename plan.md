# Plan: Training & Compliance Guide (`/guide.html`)

## Problem
HR/safety departments struggle to navigate the extensive course/service list and self-diagnose what is applicable to their business category, size, and compliance triggers.

## Proposed Solution
Build a single decision-support page at `/guide.html` — a hybrid of interactive industry cards + compliance FAQ. Users can browse by industry or by legal mandate.

## Files to Create / Modify

### 1. New: `site/guide.html`
Standard page shell matching existing pages (header, footer, schema, hero, breadcrumb, language toggle).

**Structure:**
- **Hero**: "Which Training Does Your Business Need?" + subtitle
- **Section 1 — Choose Your Industry**: 6 clickable cards in a grid:
  1. Manufacturing
  2. Construction
  3. Warehouse & Logistics
  4. Chemical & Process
  5. Commercial & Office
  6. Oil & Gas
  - Reuse existing `.card` + `.card-grid` CSS.
  - Each card toggles a detail panel below the grid (via accordion or simple anchor scroll) listing:
    - Mandatory legal requirements
    - Recommended courses (linked to `/services#...` or `/courses/...`)
    - Applicable monitoring/assessment services
    - HRD Corp claimability note
- **Section 2 — Compliance Quick Reference**: Accordion FAQ using existing `.faq-item` pattern. Questions organised by common triggers:
  - "We have 40+ employees — what is mandatory?"
  - "A DOSH audit is coming — what should we prepare?"
  - "We are starting a CIDB project — what do workers need?"
  - "We handle scheduled chemicals — what is required by law?"
  - "Our factory noise exceeds 85 dB(A) — what must we do?"
  - "We have an LEV system — does it need inspection?"
  - "Our HRD Corp levy is expiring — which courses are claimable?"
  - "We need a Safety Supervisor on site — can you supply one?"
  - Answers include direct links to relevant service pillars and course pages.
- **Section 3 — Still Unsure?**: CTA block → WhatsApp / Contact
- **JSON-LD**: `FAQPage` schema for Section 2; `BreadcrumbList` for page.

### 2. Modify: `site/css/main.css`
Add minimal new rules for:
- `.guide-industry-card.active` border/highlight state
- `.guide-detail-panel` spacing and show/hide
- `.guide-tag` (small inline category tags for course links)
Reuse existing `.card`, `.card-grid`, `.faq-item`, `.btn`, `.section-title` classes.

### 3. Modify: `site/js/main.js`
Add translation keys to `fullSiteDictionary` for:
- `guideHeroTitle`, `guideHeroSubtitle`
- Industry names and descriptions (6 industries × 4 langs)
- FAQ questions and answers for the compliance accordion (9 Q/A pairs × 4 langs)
- `guideCtaTitle`, `guideCtaText`
Add a lightweight JS function for toggling industry-card detail panels (or rely on existing accordion logic with a new selector).

### 4. Modify: `site/services.html`
Insert a prominent CTA banner after the `#osh-monitoring` pillar and before the closing "Not Sure Which Service You Need?" section:
> "Not sure which service applies to you? Browse our Training & Compliance Guide for industry-specific recommendations."
→ Link to `/guide`

### 5. Modify: `site/courses.html`
Insert a similar CTA banner after the course grid and before the closing contact CTA.

### 6. Modify: Footer across all pages
Add `<a href="/guide">Training Guide</a>` to the Services column in the footer of every `.html` file (or use a bulk script).

### 7. No main nav addition
To avoid mobile menu crowding, the guide is discovered via CTAs on Services/Courses pages and the footer. This keeps the primary nav clean.

## Schema & SEO
- `FAQPage` structured data for the compliance accordion (rich snippet eligibility)
- `BreadcrumbList` for the page
- Meta title: "Training & Compliance Guide | Naja Safety Sdn Bhd"
- Meta description: "Find the right safety training and compliance services for your industry. Manufacturing, construction, chemical, warehouse, and more."

## Deployment
After all edits, deploy with:
```bash
npx wrangler pages deploy site --project-name=naja-safety
```

## Rollback Safety
All changes are additive (new file + minor insertions). No destructive edits. The existing FAQ on `index.html` is left untouched.
