# Naja Safety Sdn Bhd — Static Website

## Overview
Complete static website for Naja Safety Sdn Bhd, a Malaysian OSH / DOSH safety training and consultancy based in Johor Bahru.

## Structure
```
site/
├── index.html          # Homepage
├── services.html       # Services detail
├── about.html          # Company & team
├── courses.html        # Course catalogue
├── contact.html        # Contact & enquiry form
├── css/
│   └── main.css
├── js/
│   └── main.js
├── images/
│   ├── logo-placeholder.svg
│   ├── james-headshot-placeholder.svg
│   ├── cidb-certified-badge.svg
│   └── hrdcorp-badge.svg
├── sitemap.xml
└── robots.txt
```

## Deployment
1. Upload the entire `site/` folder to your static host (Cloudflare Pages, Netlify, GitHub Pages, etc.).
2. Update form endpoint in `contact.html` and `index.html` (search for `TODO: Replace with actual form endpoint`).
3. Replace placeholder SVG images with real photography / logo when available.
4. Configure custom domain `safetyconsultants.com.my` (or migrate to `najasafety.my`).
5. Add Google Analytics 4 measurement ID where indicated in page `<head>` sections.

## Form Handling
The enquiry form currently uses a placeholder endpoint. Options:
- **Formspree:** Replace with `https://formspree.io/f/YOUR_FORM_ID`
- **Netlify Forms:** Add `data-netlify="true"` to the `<form>` tag
- **Google Sheets:** Use a free form backend like SheetMonkey

## Notes
- All phone numbers are click-to-call (`tel:`) links.
- WhatsApp sticky button links to `wa.me/601155890005` (Sujen).
- JSON-LD structured data is included on every page for SEO.
- Built mobile-first; test at 375px width.
