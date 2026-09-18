import { useState } from 'react'
import { Reveal } from '../components/motion'
import { SectionHead, PageHero } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { WA_LINK } from '../data/site'
import { SERVICE_CATEGORIES, HRDC_TABLE, REG_FRAMEWORKS, DELIVERY } from '../data/services'

export default function Services() {
  const [cat, setCat] = useState('ALL')
  const visible = cat === 'ALL' ? SERVICE_CATEGORIES : SERVICE_CATEGORIES.filter((c) => c.key === cat)

  return (
    <div>
      <PageHero
        crumb="Home / Services"
        badge="Services / A–G"
        title={<>Safety services &<br />training programmes</>}
        sub="From OSH compliance training and CIDB certifications to full-spectrum safety consultancy. On-site and classroom delivery across Malaysia."
        image="/assets/original/hero-services.jpg"
      />

      {/* category filter */}
      <div className="sticky top-[52px] z-40 bg-[rgba(11,12,26,0.94)] backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-3 flex gap-2 overflow-x-auto">
          {[{ key: 'ALL', name: 'All' }, ...SERVICE_CATEGORIES.map((c) => ({ key: c.key, name: `${c.key}. ${c.name.split(' ')[0]}` }))].map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`font-mono2 text-[10px] uppercase tracking-[0.15em] px-4 py-2 whitespace-nowrap border transition-colors ${cat === c.key ? 'bg-[var(--hazard)] text-white border-[var(--hazard)] font-semibold' : 'border-[var(--line)] text-[var(--paper-dim)] hover:border-[var(--hazard)]'}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-16 space-y-24">
        {visible.map((c) => (
          <section key={c.key} id={`cat-${c.key}`}>
            <Reveal>
              <div className="flex items-start gap-6 mb-8">
                <span className="text-display text-7xl md:text-8xl text-[var(--hazard)]/20 leading-none">{c.key}</span>
                <div>
                  <h2 className="text-display text-3xl md:text-5xl">{c.name}</h2>
                  <p className="text-[var(--paper-dim)] mt-3 max-w-3xl leading-relaxed">{c.intro}</p>
                </div>
              </div>
            </Reveal>
            {c.notice && (
              <p className="border-l-2 border-[var(--hazard)] bg-[var(--hazard-dim)] px-5 py-4 text-sm text-[var(--paper-dim)] leading-relaxed mb-8">{c.notice}</p>
            )}
            {c.key === 'D' && (
              <div className="border border-[var(--line)] mb-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-faint)] border-b border-[var(--line)]">
                      <th className="text-left px-5 py-3">Feature</th>
                      <th className="text-left px-5 py-3 text-[var(--hazard)]">With Naja Safety</th>
                      <th className="text-left px-5 py-3">Without</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HRDC_TABLE.map((r) => (
                      <tr key={r.feature} className="border-b border-[var(--line)] last:border-b-0">
                        <td className="px-5 py-3 font-display font-bold uppercase">{r.feature}</td>
                        <td className="px-5 py-3 text-[var(--hazard)]">{r.with}</td>
                        <td className="px-5 py-3 text-[var(--paper-dim)]">{r.without}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="border border-[var(--line)]">
              {c.items.map((it, i) => (
                <Reveal key={it.title} delay={Math.min(i * 0.04, 0.3)}>
                  <div className="data-row grid lg:grid-cols-12 gap-3 px-6 py-6 border-b border-[var(--line)] last:border-b-0">
                    <div className="lg:col-span-4 flex items-baseline gap-3">
                      <span className="font-mono2 text-[10px] text-[var(--paper-faint)]">{c.key}.{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-display font-bold uppercase text-lg leading-tight">
                        {it.detailRoute ? <a href={it.detailRoute} className="u-sweep hover:text-[var(--hazard)]">{it.title}</a> : it.title}
                      </h3>
                    </div>
                    <p className="lg:col-span-5 text-sm text-[var(--paper-dim)] leading-relaxed">{it.desc}</p>
                    <p className="lg:col-span-3 font-mono2 text-[11px] text-[var(--paper-faint)] leading-relaxed"><span className="text-[var(--hazard)]">TARGET ▸</span> {it.target}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-6">
              <a href={WA_LINK(`Hello Naja Safety, enquiry: ${c.name}`)} target="_blank" rel="noreferrer" className="btn-ghost">{c.enquiry} →</a>
            </div>
          </section>
        ))}
      </div>

      {/* Regulatory hub teaser */}
      <section className="border-t border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead eyebrow="Regulatory Compliance Hub" title="We train you against the law itself." sub="Every programme is anchored to official Malaysian statutory frameworks and international MNC standards. We do not paraphrase the law — we train you against it." />
          <div className="border border-[var(--line)] mt-12 overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-faint)] border-b border-[var(--line)]">
                  <th className="text-left px-5 py-3">Act / Regulation</th>
                  <th className="text-left px-5 py-3">Enforcement Body</th>
                  <th className="text-left px-5 py-3">Direct Authority Source</th>
                </tr>
              </thead>
              <tbody>
                {REG_FRAMEWORKS.map((r) => (
                  <tr key={r.act} className="border-b border-[var(--line)] last:border-b-0 data-row">
                    <td className="px-5 py-4"><span className="font-display font-extrabold uppercase text-[var(--hazard)] mr-2">{r.agency}</span>{r.act}</td>
                    <td className="px-5 py-4 text-[var(--paper-dim)]">{r.body}</td>
                    <td className="px-5 py-4 font-mono2 text-[11px] text-[var(--hazard)]">{r.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8"><a href="#/regulatory-hub" className="btn-hazard">Open the Regulatory Hub →</a></div>
        </div>
      </section>

      {/* delivery comparison */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead eyebrow="How We Deliver Training" title="In-house vs. public seminars" sub="In-house programmes tailored to your facility vs. public seminar slots." />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[DELIVERY.inhouse, DELIVERY.public].map((d, i) => (
            <div key={d.title} className={`relative p-8 md:p-10 notch ${i === 0 ? 'bg-[var(--hazard)] text-white' : 'bg-[var(--ink-2)] border border-[var(--line)]'}`}>
              <span className={`font-mono2 text-[10px] uppercase tracking-[0.2em] px-3 py-1 ${i === 0 ? 'bg-black text-[var(--hazard)]' : 'border border-[var(--line)] text-[var(--paper-faint)]'}`}>{d.label}</span>
              <h3 className="text-display text-3xl mt-6">{d.title}</h3>
              <ul className="mt-6 space-y-3">
                {d.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed"><span className={`font-mono2 ${i === 0 ? 'text-white' : 'text-[var(--hazard)]'}`}>{i === 0 ? '■' : '□'}</span>{p}</li>
                ))}
              </ul>
              <a href={WA_LINK(`Hello Naja Safety, regarding: ${d.title}`)} target="_blank" rel="noreferrer" className={`inline-block mt-8 font-mono2 text-[11px] uppercase tracking-[0.15em] font-semibold ${i === 0 ? 'bg-black text-[var(--hazard)] px-6 py-3' : 'btn-ghost'}`}>{d.cta} →</a>
            </div>
          ))}
        </div>
        <div className="mt-12 border border-[var(--line)] p-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold uppercase text-xl">Not sure which service applies to you?</p>
            <p className="text-sm text-[var(--paper-dim)] mt-2">Browse our Training & Compliance Guide for industry-specific recommendations, mandatory requirements by law, and claimable programmes.</p>
          </div>
          <a href="#/guide" className="btn-hazard">View Training Guide →</a>
        </div>
      </section>

      <ClosingCTA
        title="Not sure which service you need?"
        body="Speak to us directly. We will assess your site, industry, and compliance gaps — then recommend the right training or consultancy package."
        primary="Call Us"
      />
    </div>
  )
}
