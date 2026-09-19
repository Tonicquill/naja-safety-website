#!/usr/bin/env python3
"""
Part 1 — Claim Sweeps
Fixes every instance of prohibited/supply/HRD/FMA claims across all HTML files.
"""

import os, re, glob

BASE = r'D:\\Claude Code Porjects\\Naja Safety\\site'

HRD_CONSTANT = "Training is delivered by an HRD Corp Accredited Trainer (ID 62976). Whether a particular programme can be claimed against your levy depends on your own HRD Corp registration and the programme submitted — we will confirm before you commit."

CHRA_CONSTANT = "Conducted by a DOSH-registered competent person. Naja Safety scopes the assessment, coordinates site access and manages the submission; the assessment itself is performed and signed by the registered assessor."

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    original = s
    changes = []

    # ── 1.1 SUPPLY OF SUPERVISORS ──
    # Delete FAQ items about supplying supervisors from index.html JSON-LD
    if 'index.html' in path:
        # JSON-LD supply FAQ
        s = s.replace(
            '''          {
            "@type": "Question",
            "name": "Do you supply competent safety supervisors or environmental officers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs."
            }
          },''',
            '')
        # HTML FAQ accordion about supplying supervisors
        s = s.replace(
            '''          <button class="faq-question" aria-expanded="false">Do you supply competent safety supervisors or environmental officers?</button>
          <div class="faq-answer"><div class="faq-answer-inner">Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs.</div></div>''',
            '<span class="review-flag" data-review="manpower-supply">REVIEW: Removed per Addendum D. Do not reinstate without resolving entity-principal and competent-person-network flags.</span>')
        # Services grid claim
        s = s.replace(
            'Workplace assessments, compliance advisory, safety documentation, and supply of competent safety supervisors &amp; environmental officers.',
            'Workplace assessments, compliance advisory, and safety documentation support.')
        s = s.replace(
            'Workplace assessments, compliance advisory, safety documentation, and supply of competent safety supervisors & environmental officers.',
            'Workplace assessments, compliance advisory, and safety documentation support.')

    # guide.html specific fixes
    if 'guide.html' in path:
        # JSON-LD FAQ about supplying supervisors
        s = s.replace(
            '''          {
            "@type": "Question",
            "name": "We need a competent Safety Supervisor on site — can you supply one?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs." }
          },''',
            '')
        # Delete the entire FAQ accordion item
        s = s.replace(
            '''          <button class="faq-question" aria-expanded="false" data-translate="guideFaq8Q">We need a competent Safety Supervisor on site — can you supply one?</button>
          <div class="faq-answer"><div class="faq-answer-inner" data-translate="guideFaq8A">Yes. Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs.</div></div>''',
            '<span class="review-flag" data-review="manpower-supply">REVIEW: Removed per Addendum D. Do not reinstate without resolving entity-principal and competent-person-network flags.</span>')
        # Fix DOSH audit FAQ answer
        s = s.replace(
            'We conduct pre-audit gap assessments and supply competent Safety Supervisors to help you pass cleanly.',
            'We conduct pre-audit gap assessments to help you pass cleanly.')
        # Remove "Supply of Competent Safety Supervisor" from industry blocks
        s = s.replace(
            '<li><a href="/services#consultancy">Supply of Competent Safety Supervisor</a></li>',
            '')

    # about.html — "NIOSH as a vocational trainee" imported claim
    if 'about.html' in path:
        s = s.replace(
            'James did not start in a boardroom. He started at <strong>NIOSH as a vocational trainee</strong>. Through 20+ years of discipline, field experience, and a genuine commitment to protecting workers, he built Naja Safety into one of Johor Bahru\'s most trusted safety consultancies — with a national network of freelance trainers deployed across Malaysia.',
            'James Issachar brings 20+ years of discipline, field experience, and a genuine commitment to protecting workers to Naja Safety — one of Johor Bahru\'s most trusted safety consultancies, with a national network of freelance trainers deployed across Malaysia. <span class="review-flag" data-review="niosh-origin-story">REVIEW: not in the source documents — confirm with the owner or remove.</span>')

    # ── 1.2 HRD CORP CLAIMABILITY ──
    # Fix "we audit your e-TRiS account" phrasing
    s = s.replace(
        'We audit your e-TRiS account status and advise on programmes that may be eligible for levy recovery, helping deploy accumulated balances productively before they expire.',
        'We advise on programmes that may be eligible for levy recovery, helping you deploy accumulated balances productively before they expire. The employer submits through e-TRiS; we prepare the documentation.')
    # Fix services.html levy-funded claim
    s = s.replace(
        'Cost to Company: <strong>Levy-funded</strong> (subject to approval)',
        'Cost to Company: varies by programme size and location. Contact for a proposal.')
    # Fix "tax levies"
    s = s.replace(
        'protect their paid tax levies from automatic system forfeiture',
        'protect their paid statutory levies from automatic system forfeiture')
    # Fix "levy-eligible programmes" in guide industry intro
    s = s.replace(
        'recommended training, and <strong>levy-eligible programmes</strong>.',
        'recommended training.')
    # Fix articles/osh-act about OSH Coordinators
    if 'osh-act-2022-10-things.html' in path:
        s = s.replace(
            'with guidance on levy eligibility for programmes designed to upscale your internal team members into certified, competent OSH Coordinators.',
            'with guidance on training programmes that support workplace safety compliance.')

    # ── 1.4 FACTORY AND MACHINERY ACT ──
    # Fix services.html course block
    s = s.replace(
        'Advanced competency training for warehouse operations managers covering high-racking load distribution analysis, pallet racking structural integrity audits, and aisle safety compliance under Malaysian Factory and Machinery Act 1967.',
        'Advanced competency training for warehouse operations managers covering high-racking load distribution analysis, pallet racking structural integrity audits, and aisle safety compliance under the OSH (Amendment) Act 2022.')

    # Fix main.js and new-dictionary-entries.js — can't do everything here but mark for JS pass

    # ── 1.3 CHRA/NOISE/LEV ──
    # Delete "Naja conducts calibrated noise mapping and dosimetry" from guide
    s = s.replace(
        '<strong>Naja conducts</strong> calibrated noise mapping and dosimetry.',
        '<span class="review-flag" data-review="competent-person-network">REVIEW: Noise assessments must be performed by a DOSH-registered competent person. Confirm the named assessors Naja works with.</span>')

    if s != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(s)
        return True
    return False

# Run across all HTML
count = 0
for html_path in glob.glob(os.path.join(BASE, '**', '*.html'), recursive=True):
    if fix_file(html_path):
        count += 1
        print(f'Fixed: {os.path.relpath(html_path, BASE)}')

print(f'\nTotal HTML files modified: {count}')
