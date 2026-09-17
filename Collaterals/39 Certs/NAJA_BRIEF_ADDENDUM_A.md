# NAJA SITE REMEDIATION BRIEF — ADDENDUM A

Source: 39 statutory and credential documents photographed at the business premises,
17 September 2026, read at full resolution.

All §0 rules of engagement still apply. This addendum **amends §1, §2 and §3** of the main
brief and adds four new tasks. Where this addendum conflicts with the main brief, this
addendum wins.

\---

## A1. AMENDMENTS TO §1 — CANONICAL FACTS

Add the following verbatim block to §1.

```
POSTCODE:        81100  — CONFIRMED, overrides any other value
                 Verified on both the SSM registration and the current
                 MBJB business licence. The "81300" printed on the current
                 CIDB certificate is an error in CIDB's record.
                 Use 81100 in every address, every schema block, every
                 sitemap entry, every NAP reference.

LOCAL LICENCE:   Majlis Bandaraya Johor Bahru
                 Lesen Perniagaan dan Iklan  L2026LI072807
                 Approved 9 February 2026, valid to 8 February 2027
                 Licensed activity: Perkhidmatan Perunding Keselamatan
                 dan Kesihatan Pekerjaan (OSH consultancy services)
                 \*\*\* DO NOT PUBLISH THE LICENCE IMAGE. See A4. \*\*\*

CIDB HISTORY:    Registration 151110-J003 held by NAJA SAFETY
                   09 Dec 2010 – 08 Dec 2012
                   10 Feb 2020 – 09 Feb 2022  (cert ref SICWT 000523)
                 Current accreditation PLSICW20231022-068
                   18 Jul 2025 – 17 Jul 2027
                 PERMITTED CLAIM, exact wording:
                   "CIDB-accredited SICW training provider since 2010."
                 NOT PERMITTED: "continuously accredited", "15 years
                 unbroken", or any span implying no gaps.

PRINCIPAL:       James Issachar A/L Daniel
                 - Executive Master in Safety, Health and Environment,
                   Universiti Malaysia Pahang Al-Sultan Abdullah,
                   conferred 20 August 2025
                 - Passed the NIOSH Safety \& Health Officer certification
                   examination, April 2005 (ref SHO 0948-F)
                 - CIDB Construction Safety \& Health Officer
                   (Pegawai Keselamatan \& Kesihatan Tapak Bina), July 2010
                 - NIOSH Sijil Jurulatih — trainer certificate for Safety
                   and Health Induction for Construction Workers, July 2010
                 - MLVK-appointed assessor/instructor, foreign worker
                   induction courses, January 2005
                 - MSOSH individual member I-1716, since January 2013
                 - HRD Corp Accredited Trainer, ID 62976,
                   23 Dec 2025 – 23 Dec 2028 (personal, not company)
```

\---

## A2. AMENDMENTS TO §2 — DEAD STRINGS

Add to the kill-list. Same treatment as the existing entries: grep the whole tree, remove,
report every hit.

|String|Why|
|-|-|
|`1126512D` and `1126512-D`|Dead Sdn Bhd registration. Also the serial on a lapsed HRDF training-provider certificate.|
|`1226608-V`|Naja Scaffolding Sdn Bhd. Already on the kill-list — re-confirmed. Appears on every historical project record.|
|`81300`|Wrong postcode. Replace with `81100` everywhere it appears.|

Add these **prohibited claims**:

1. Any present-tense statement that NAJA SAFETY is an **HRD Corp / HRDF registered training
provider**. A company-level registration existed for the dissolved Sdn Bhd and expired
18 January 2023. The only current fact is the trainer's personal accreditation.
2. Any claim of **current DOSH/JKKP registration** as a Safety and Health Officer, or any
printed JKKP number. The certificates carry references of the form `JKKP IS 127/484/5/...`
— these are CEP approvals attached to a *course*, not a registration of the business or
the person. Do not reproduce them as credentials.
3. Any **first-person claim** to construction projects (Forest City, Komtar JBCC, KSL Avery
Park, Taman Damansara Aliff, Sawadee Resort, or any contract value or contract number).
Those contracts belonged to a dissolved company and were scaffolding work, not OSH
training. See A3, Task A-2, for the only permitted phrasing.

\---

## A3. NEW TASKS

### Task A-1 — Put the Executive Master on the site (P0)

The principal holds a 2025 postgraduate degree in exactly the field the business sells and
it appears nowhere on the site.

* **About page**: lead the bio with it, before the certificate list.
* **JSON-LD**: add to the `Person` node as an `EducationalOccupationalCredential` with
`credentialCategory: "degree"` and `recognizedBy` naming the university. Do **not** attach
it to the `Organization` node — it is a personal credential.
* **Wording**: "Executive Master in Safety, Health and Environment, Universiti Malaysia
Pahang Al-Sultan Abdullah (2025)." Do not abbreviate the university. Do not write "Masters".
* Insert a review flag `data-review="exec-master-title"` beside it: *confirm the exact award
title as conferred.*

### Task A-2 — Rewrite the credibility section using the principal's project history (P1)

Replace whatever currently stands in for track record. The only permitted construction is a
statement about the **principal**, never about the business. Write it at or below this level:

> Naja's principal has delivered safety and access work on Johor's largest construction
> sites — Forest City, Komtar JBCC and KSL Avery Park — for main contractors including
> MRCB Builders and China Construction, and was a registered vendor to Boustead Heavy
> Industries Corporation Berhad.

Rules for this block:

* No contract numbers. No contract values. No dates. No client logos.
* No `Organization` schema markup on it. Plain prose only — this is not a portfolio claim.
* Do not add any site or contractor not named above.
* Insert `data-review="project-history"`: *confirm the principal is comfortable naming these
sites and contractors publicly.*

### Task A-4 — Stop publishing certificate images (P0)

Change of approach, applies site-wide.

* Remove every scanned certificate image from the site. Do not replace them.
* In their place, publish **verifiable reference numbers** in a plain table: CIDB
`PLSICW20231022-068` (valid to 17 Jul 2027), HRD Corp Accredited Trainer ID `62976`
(valid to 23 Dec 2028), MBJB business licence valid to 8 Feb 2027, SSM `200603041203`.
A buyer can verify all of these at source.
* Offer redacted copies on request via the existing contact route. Do not host them.
* This supersedes Task 1 in the main brief: there is no replacement certificate image, the
image is simply gone. The purge requirement in Task 1 still stands in full.

\---

## A4. HARD RULE — NRIC AND QR CODES

Twenty of the thirty-nine source documents display a Malaysian NRIC number, including both
of the principal's headline credentials and, on the local business licence, a **third
party's** NRIC.

1. **No NRIC number, in any form, in any file in this repository** — not in an image, not in
alt text, not in a filename, not in a commit message, not in a JSON-LD `identifier`.
2. **Never publish the MBJB licence document or its payment receipt.** Reference the licence
number and validity date as text only.
3. If any certificate image is ever approved for publication in future, redaction must be
**flattened into the pixels** before the file enters the repository. Never a CSS overlay,
never a PDF annotation, never a positioned `<div>`. Both are trivially reversible.
4. **Redact QR codes too.** The codes on government-issued documents resolve to verification
portals keyed to the record. A scannable code in a published image is the same exposure
by another route.
5. Add a pre-commit or build check that fails on a 12-digit unformatted numeric string and
on the `NNNNNN-NN-NNNN` pattern anywhere in tracked text files.

\---

## A5. AMENDMENTS TO §3 — REVIEW FLAGS

**Update these existing flags:**

|`data-review`|Change|
|-|-|
|`hrdcorp-provider`|Question resolved as **no**. A company-level registration existed for the dissolved Sdn Bhd and expired 18 Jan 2023. Keep the flag, change its text to: *"Re-registration of the sole proprietorship in e-TRiS pending. Copy is written at trainer-accreditation level only."* Keep the conservative copy.|
|`dosh-oshc`|Still open, unchanged. Reinforce: the `JKKP IS ...` references on the wall certificates are course CEP approvals and must not be presented as registrations.|
|`insurance`|Still open, unchanged. Nothing found. Continue to omit entirely.|

**Add these flags:**

|`data-review`|What's pending|Write copy at this level until answered|
|-|-|-|
|`entity-principal`|The current MBJB business licence for NAJA SAFETY is held in a name other than the principal's. Who the registered proprietor is has not been confirmed.|**Do not name any individual as owner, proprietor, founder or director of NAJA SAFETY anywhere on the site.** Refer to James Issachar only as the trainer and principal consultant — describing what he does, never what he owns. This applies to the About page, the footer, the contact page, the `Organization` and `Person` JSON-LD (no `founder`, no `owner`), and any vendor-registration or capability content.|
|`exec-master-title`|Exact award title as conferred|Use the wording in A1 verbatim until confirmed.|
|`project-history`|Consent to name the sites and contractors in Task A-2|Keep the block, flagged.|
||||

\---

## A6. REPORTING

On completion, report in addition to the §0.8 requirements:

* Every occurrence of `81300` found and corrected.
* Every occurrence of `1126512`, `1226608` and any NRIC-shaped string found, with file and
line, and confirmation of removal.
* Every certificate image removed under Task A-4, with its path, and confirmation that it is
gone from the build output as well as the source tree.
* The full list of `data-review` flags now live in the build.

