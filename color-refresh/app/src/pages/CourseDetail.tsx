import { PageHero, SectionHead, FAQ } from '../components/blocks'
import { AssetTag, ClosingCTA } from '../components/chrome'
import { Reveal } from '../components/motion'
import { WA_LINK } from '../data/site'
import { COURSE_DETAILS } from '../data/pages'

export default function CourseDetail({ slug }: { slug: string }) {
  const d = COURSE_DETAILS.find((p) => p.slug === slug)
  if (!d) return null
  return (
    <div>
      <PageHero crumb={`Home / ${d.crumb}`} badge={`${d.durationTag} · ${d.modeTag} · HRD Claimable`} title={d.title} sub={d.intro} />

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-10 relative z-10 flex flex-wrap gap-4">
        <a href={WA_LINK(`Hello Naja Safety, I would like to book: ${d.title}`)} target="_blank" rel="noreferrer" className="btn-hazard">Book This Training →</a>
        <a href={WA_LINK(`Hello Naja Safety, enquiry: ${d.title}`)} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Naja Safety</a>
      </div>

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <SectionHead eyebrow="Course Outline" title="What this programme covers" sub={d.slug === 'scaffold-safety' ? 'Scaffold-related incidents remain one of the leading causes of construction site injuries in Malaysia. This 1-day programme equips your team with the practical skills to erect, inspect, use, and dismantle scaffolding safely and in full regulatory compliance.' : 'Chemical incidents can cause severe injury, environmental damage, and regulatory penalties. This 1-day programme equips your team with the knowledge to identify chemical hazards, interpret Safety Data Sheets, and respond effectively to spills and exposures.'} />
          <ul className="mt-10 space-y-3">
            {d.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-[var(--paper-dim)] leading-relaxed border border-[var(--line)] px-4 py-3"><span className="text-[var(--hazard)] font-mono2">■</span>{b}</li>
            ))}
          </ul>

          <p className="eyebrow mt-14 mb-6">/// Course Syllabus</p>
          <div className="space-y-px border border-[var(--line)]">
            {d.syllabus.map((s, i) => (
              <div key={s.title} className="data-row px-6 py-4 border-b border-[var(--line)] last:border-b-0">
                <p className="font-display font-bold uppercase"><span className="font-mono2 text-[10px] text-[var(--hazard)] mr-3">{String(i + 1).padStart(2, '0')}</span>{s.title}</p>
                {s.body && <p className="text-sm text-[var(--paper-dim)] mt-1 pl-9 leading-relaxed">{s.body}</p>}
              </div>
            ))}
          </div>

          <p className="eyebrow mt-14 mb-6">/// Learning Outcomes</p>
          <ul className="grid md:grid-cols-2 gap-2">
            {d.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm text-[var(--paper-dim)] leading-relaxed border border-[var(--line)] px-4 py-3"><span className="text-[var(--hazard)]">✓</span>{o}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-8 self-start lg:sticky lg:top-28">
          <Reveal>
            <div className="relative border border-[var(--line)] notch overflow-hidden">
              <img src={d.image} alt={d.title} className="w-full object-cover" />
              <AssetTag kind="ORIGINAL" />
            </div>
          </Reveal>
          <div className="border border-[var(--line)]">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-faint)] px-6 py-3 border-b border-[var(--line)]">Course Specifications</p>
            {d.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 px-6 py-3 border-b border-[var(--line)] last:border-b-0 text-sm">
                <span className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">{s.label}</span>
                <span className="text-right text-[var(--paper)]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
          <SectionHead eyebrow="Target Audience" title="Who should attend" />
          <div className="grid md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] mt-10">
            {d.audience.map((a) => (
              <div key={a.title} className="bg-[var(--ink)] p-8">
                <p className="font-display font-bold uppercase text-xl text-[var(--hazard)]">{a.title}</p>
                <p className="text-sm text-[var(--paper-dim)] mt-3 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
        <SectionHead eyebrow="Related Programmes" title="Complete the picture" />
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {d.related.map((r) => (
            <a key={r.name} href={r.route} className="border border-[var(--line)] p-7 hover:border-[var(--hazard)] transition-colors group block">
              <p className="font-display font-bold uppercase text-xl group-hover:text-[var(--hazard)] transition-colors">{r.name}</p>
              <p className="text-sm text-[var(--paper-dim)] mt-2">{r.note}</p>
              <span className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--hazard)] mt-4 inline-block">View →</span>
            </a>
          ))}
        </div>
        <div className="mt-16">
          <SectionHead eyebrow="Frequently Asked Questions" title="Before you book" />
          <div className="mt-10"><FAQ items={d.faqs} /></div>
        </div>
      </section>

      <ClosingCTA title={d.ctaTitle} body={d.ctaBody} primary="Request Training Schedule" />
    </div>
  )
}
