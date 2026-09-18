import { useState } from 'react'
import { PageHero, SectionHead, FAQ } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { Reveal } from '../components/motion'
import { GUIDE_INDUSTRIES, GUIDE_TRIGGERS } from '../data/pages'

export default function Guide() {
  const [active, setActive] = useState(0)
  const ind = GUIDE_INDUSTRIES[active]
  return (
    <div>
      <PageHero
        crumb="Home / Guide"
        badge="Training & Compliance Guide"
        title={<>Which training does<br />your business need?</>}
        sub="Select your industry or browse by compliance trigger to see exactly what courses, assessments, and documentation are applicable to you."
      />

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
        <p className="eyebrow mb-6">/// Choose Your Industry</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--line)] border border-[var(--line)]">
          {GUIDE_INDUSTRIES.map((g, i) => (
            <button key={g.name} onClick={() => setActive(i)}
              className={`p-5 text-left transition-colors ${active === i ? 'bg-[var(--hazard)] text-white' : 'bg-[var(--ink)] hover:bg-[var(--ink-3)]'}`}>
              <p className="font-display font-bold uppercase text-lg leading-tight">{g.name}</p>
              <p className={`font-mono2 text-[9px] mt-2 leading-relaxed ${active === i ? 'text-white/70' : 'text-[var(--paper-faint)]'}`}>{g.sub}</p>
            </button>
          ))}
        </div>

        <Reveal key={active}>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="border border-[var(--hazard)]/50 p-8 bg-[var(--hazard-dim)]">
              <p className="eyebrow mb-5">/// Mandatory / Legally Required</p>
              <ul className="space-y-3">
                {ind.mandatory.map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed"><span className="text-[var(--hazard)] font-mono2">■</span>{m}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--line)] p-8">
              <p className="eyebrow mb-5 !text-[var(--paper-dim)]">/// Highly Recommended</p>
              <ul className="space-y-3">
                {ind.recommended.map((m) => (
                  <li key={m} className="flex gap-3 text-sm text-[var(--paper-dim)] leading-relaxed"><span className="font-mono2">□</span>{m}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-mono2 text-[11px] text-[var(--paper-faint)] mt-6 tracking-wide">{ind.note}</p>
        </Reveal>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead eyebrow="Compliance Quick Reference" title="Browse by compliance trigger" sub="Browse by common compliance trigger to find exactly what you need." />
          <div className="mt-12"><FAQ items={GUIDE_TRIGGERS} /></div>
        </div>
      </section>

      <ClosingCTA
        title="Still unsure what you need?"
        body="Speak to us directly. We will assess your site, industry, and compliance gaps — then recommend the right training or consultancy package."
        primary="Call Us"
      />
    </div>
  )
}
