import { useState } from 'react'
import { PageHero } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { WA_LINK } from '../data/site'
import { COURSES, CATEGORIES } from '../data/courses'

export default function Courses() {
  const [cat, setCat] = useState('ALL')
  const [q, setQ] = useState('')
  const visible = COURSES.filter((c) =>
    (cat === 'ALL' || c.catKey === cat) &&
    (q === '' || (c.name + c.desc + c.target).toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div>
      <PageHero
        crumb="Training Catalogue / 46 Programmes"
        badge="Industry-Certified · Nationwide Delivery"
        title={<>46 programmes.<br />Zero guesswork.</>}
        sub="From OSH Act compliance and CIDB certifications to industrial waste and environmental monitoring. HRD Corp claimable. On-site or classroom."
        image="/assets/original/hero-courses.jpg"
      />

      {/* certificate note */}
      <section className="border-b border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10 flex flex-wrap items-center gap-6">
          <span className="hazard-tape px-1 py-1"><span className="bg-[var(--ink)] px-3 py-2 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--hazard)]">Official Completion Certificate</span></span>
          <p className="text-sm text-[var(--paper-dim)] leading-relaxed max-w-4xl">
            Every trainee receives a printed certificate bearing the Naja Safety seal, company registration (JM0449867-U), and HRD Corp trainer accreditation. Certificates are issued with serial-numbered anti-tamper printing; digital copies are sent directly to the employer's HR department only. Redacted sample copies available on request.
          </p>
        </div>
      </section>

      {/* filter bar */}
      <div className="sticky top-[52px] z-40 bg-[rgba(11,12,26,0.94)] backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-3 flex flex-wrap gap-2 items-center">
          <button onClick={() => setCat('ALL')} className={`font-mono2 text-[10px] uppercase tracking-[0.15em] px-4 py-2 border transition-colors ${cat === 'ALL' ? 'bg-[var(--hazard)] text-white border-[var(--hazard)] font-semibold' : 'border-[var(--line)] text-[var(--paper-dim)]'}`}>All Programmes</button>
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)} className={`font-mono2 text-[10px] uppercase tracking-[0.15em] px-4 py-2 border transition-colors whitespace-nowrap ${cat === c.key ? 'bg-[var(--hazard)] text-white border-[var(--hazard)] font-semibold' : 'border-[var(--line)] text-[var(--paper-dim)] hover:border-[var(--hazard)]'}`}>
              {c.key}. {c.name}
            </button>
          ))}
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search programmes…" className="!w-48 ml-auto !py-2 font-mono2 text-xs" />
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-16">
        <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)] mb-6">
          Showing {visible.length} of 46 programmes
        </p>
        <div className="border border-[var(--line)]">
          <div className="hidden lg:grid grid-cols-12 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-faint)] border-b border-[var(--line)] px-6 py-3">
            <span className="col-span-1">No.</span><span className="col-span-4">Programme</span><span className="col-span-2">Duration</span><span className="col-span-2">Mode</span><span className="col-span-2">Claimable</span><span className="col-span-1"></span>
          </div>
          {visible.map((c, i) => (
            <div key={c.name} className="data-row grid lg:grid-cols-12 gap-2 lg:gap-0 px-6 py-5 border-b border-[var(--line)] last:border-b-0 items-baseline">
              <span className="lg:col-span-1 font-mono2 text-[10px] text-[var(--paper-faint)]">{c.catKey}-{String(i + 1).padStart(2, '0')}</span>
              <div className="lg:col-span-4">
                <p className="font-display font-bold uppercase leading-tight">
                  {c.detailRoute ? <a href={c.detailRoute} className="u-sweep hover:text-[var(--hazard)]">{c.name} →</a> : c.name}
                </p>
                <p className="text-xs text-[var(--paper-dim)] mt-1 leading-relaxed">{c.desc}</p>
                <p className="font-mono2 text-[10px] text-[var(--paper-faint)] mt-1">Target: {c.target}</p>
              </div>
              <span className="lg:col-span-2 font-mono2 text-[11px] text-[var(--paper-dim)]">{c.duration}</span>
              <span className="lg:col-span-2 font-mono2 text-[11px] text-[var(--paper-dim)]">{c.mode}</span>
              <span className="lg:col-span-2 font-mono2 text-[10px] text-[var(--hazard)]">✓ HRD Corp Claimable</span>
              <span className="lg:col-span-1 lg:text-right">
                <a href={WA_LINK(`Hello Naja Safety, I would like to enquire about: ${c.name}`)} target="_blank" rel="noreferrer" className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--hazard)] u-sweep">Enquire</a>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-[var(--hazard)]/40 bg-[var(--hazard-dim)] p-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display font-extrabold uppercase text-2xl">Need a custom programme?</p>
            <p className="text-sm text-[var(--paper-dim)] mt-2">Tell us your risk profile — we'll design a training package aligned to your incident data and statutory obligations.</p>
          </div>
          <a href={WA_LINK('Hello Naja Safety, we need a custom training programme.')} target="_blank" rel="noreferrer" className="btn-hazard">Request Custom Training →</a>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={WA_LINK('Hello Naja Safety, bulk booking enquiry.')} target="_blank" rel="noreferrer" className="btn-ghost">Enquire for Bulk Booking</a>
        </div>
      </section>

      <ClosingCTA
        title="Train once. Comply always."
        body="HRD Corp claimable programmes delivered on-site anywhere in Malaysia — mapped to the exact statutes your workplace answers to."
      />
    </div>
  )
}
