import { PageHero, SectionHead, FAQ } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { Reveal } from '../components/motion'
import { WA_LINK } from '../data/site'
import { DETAIL_PAGES } from '../data/details'

export default function ServiceDetail({ slug }: { slug: string }) {
  const d = DETAIL_PAGES.find((p) => p.slug === slug)
  if (!d) return null
  return (
    <div>
      <PageHero crumb={`Home / ${d.crumb}`} badge={d.badge} title={d.title} sub={d.intro} />

      {/* CTAs */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-10 relative z-10 flex flex-wrap gap-4">
        <a href={WA_LINK(`Hello Naja Safety, enquiry: ${d.title}`)} target="_blank" rel="noreferrer" className="btn-hazard">{d.ctaPrimary} →</a>
        <a href="#/contact" className="btn-ghost">{d.ctaSecondary}</a>
      </div>

      {/* need */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHead eyebrow="Assessment" title={d.needTitle} />
          <p className="text-[var(--paper-dim)] leading-relaxed mt-6">{d.needBody}</p>
          {d.notice && <p className="border-l-2 border-[var(--hazard)] bg-[var(--hazard-dim)] px-5 py-4 text-sm text-[var(--paper-dim)] leading-relaxed mt-6">{d.notice}</p>}
        </div>
        <div className="space-y-px border border-[var(--line)]">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-faint)] px-6 py-3 border-b border-[var(--line)]">The Stakes</p>
          {d.stakes.map((s) => (
            <div key={s.title} className="px-6 py-5 border-b border-[var(--line)] last:border-b-0">
              <p className="font-display font-bold uppercase text-lg text-[var(--hazard)]">{s.title}</p>
              <p className="text-sm text-[var(--paper-dim)] mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* hazard profile + warning signs */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow mb-8">/// Hazard Profile</p>
            <div className="space-y-6">
              {d.hazards.map((h) => (
                <div key={h.title} className="border-l-2 border-[var(--hazard)] pl-5">
                  <p className="font-display font-bold uppercase">{h.title}</p>
                  <p className="text-sm text-[var(--paper-dim)] mt-1 leading-relaxed">{h.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-8">/// Warning Signs</p>
            <ul className="space-y-3">
              {d.warnings.map((w) => (
                <li key={w} className="flex gap-3 text-sm text-[var(--paper-dim)] leading-relaxed border border-[var(--line)] px-4 py-3">
                  <span className="text-[var(--hazard)] font-mono2 shrink-0">⚠</span>{w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
        <SectionHead eyebrow="Our Process" title="Five steps to airtight compliance." />
        <div className="mt-12 space-y-px border border-[var(--line)]">
          {d.process.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="data-row grid md:grid-cols-12 gap-4 px-6 py-7 border-b border-[var(--line)] last:border-b-0 items-baseline">
                <span className="md:col-span-2 text-display text-4xl text-[var(--hazard)]">STEP {String(i + 1).padStart(2, '0')}</span>
                <span className="md:col-span-3 font-display font-bold uppercase text-lg">{p.title}</span>
                <span className="md:col-span-7 text-sm text-[var(--paper-dim)] leading-relaxed">{p.body}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* why others fail + scheduling */}
      <section className="border-y border-[var(--line)] bg-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
          <div className="border border-[var(--blood)]/50 bg-[rgba(168,168,168,0.07)] p-8">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--blood)] mb-4">/// {d.failTitle}</p>
            <p className="text-[var(--paper-dim)] leading-relaxed">{d.failBody}</p>
          </div>
          <div>
            <p className="eyebrow mb-6">/// Risk-Based Scheduling</p>
            <div className="space-y-4">
              <div className="border border-[var(--line)] p-6">
                <p className="font-display font-bold uppercase text-[var(--hazard)]">High-Risk Environments</p>
                <p className="text-sm text-[var(--paper-dim)] mt-2 leading-relaxed">{d.scheduling.high}</p>
              </div>
              <div className="border border-[var(--line)] p-6">
                <p className="font-display font-bold uppercase">Low-Moderate Risk</p>
                <p className="text-sm text-[var(--paper-dim)] mt-2 leading-relaxed">{d.scheduling.low}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* properties + coverage */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow mb-6">/// Property Types We Serve</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {d.properties.map((p) => (
              <li key={p} className="font-mono2 text-[11px] tracking-wide border border-[var(--line)] px-4 py-3 text-[var(--paper-dim)]">▸ {p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-6">/// Coverage Areas</p>
          <p className="text-sm text-[var(--paper-dim)] mb-4">{d.coverageNote}</p>
          <div className="flex flex-wrap gap-2">
            {d.coverage.map((c) => (
              <span key={c} className="font-mono2 text-[11px] tracking-wide bg-[var(--ink-2)] border border-[var(--line)] px-3 py-2 text-[var(--hazard)]">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 pb-20">
        <SectionHead eyebrow="Frequently Asked Questions" title="Asked and answered." />
        <div className="mt-10"><FAQ items={d.faqs} /></div>
      </section>

      <ClosingCTA title={d.ctaTitle} body={d.ctaBody} primary={d.ctaPrimary} />
    </div>
  )
}
