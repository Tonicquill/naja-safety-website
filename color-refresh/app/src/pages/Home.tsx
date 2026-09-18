import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, CharReveal, Counter, Marquee } from '../components/motion'
import { AssetTag, ClosingCTA } from '../components/chrome'
import { SITE, WA_LINK, CREDENTIALS, CLIENTS, DOCTRINE, STATUTES, WHY_SAFETY_PAYS, HIDDEN_COSTS, HOME_FAQS, VIDEOS, INDUSTRIES, SOUTHERN_HUBS } from '../data/site'
import { DELIVERY } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((f, i) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-baseline justify-between gap-6 py-5 text-left group">
            <span className="flex items-baseline gap-4">
              <span className="font-mono2 text-[10px] text-[var(--hazard)]">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display font-bold uppercase text-base md:text-lg tracking-wide group-hover:text-[var(--hazard)] transition-colors">{f.q}</span>
            </span>
            <span className="font-mono2 text-[var(--hazard)] text-lg shrink-0">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="pb-6 pl-10 pr-4 text-sm text-[var(--paper-dim)] leading-relaxed max-w-3xl">{f.a}</p>}
        </div>
      ))}
    </div>
  )
}

function SectionHead({ index, eyebrow, title, sub }: { index: string; eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono2 text-[10px] text-[var(--paper-faint)] tracking-widest">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="text-display text-4xl md:text-6xl max-w-4xl">{title}</h2>
      {sub && <p className="text-[var(--paper-dim)] mt-5 max-w-2xl leading-relaxed">{sub}</p>}
    </Reveal>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const icebergRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // hero staged entrance
      gsap.fromTo('.hero-line', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.hero-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.9, ease: 'power3.out' })
      // hero parallax
      gsap.to('.hero-bg', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      // iceberg descent: image sinks as you scroll
      gsap.to('.iceberg-img', {
        yPercent: -14, ease: 'none',
        scrollTrigger: { trigger: icebergRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      // hidden cost rows stagger in
      gsap.fromTo('.cost-row', { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.cost-list', start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden noise">
        <div className="hero-bg absolute inset-0">
          <img src="/assets/ai/hero-industrial.jpg" alt="" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[rgba(11,12,26,0.35)] to-[rgba(11,12,26,0.55)]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
        <div className="absolute top-24 right-5 md:right-8 z-10">
          <span className="relative inline-block"><AssetTag kind="AI" /></span>
        </div>
        <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-8 pb-16 pt-40">
          <div className="hero-meta inline-flex items-center gap-3 border border-[var(--hazard)]/50 bg-black/50 px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[var(--hazard)] blink" />
            <span className="font-mono2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[var(--hazard)]">LIVE · Section 29A OSH (Amendment) Act 2022</span>
          </div>
          <h1 className="text-display text-[13.5vw] md:text-[9vw] lg:text-[7.5vw]">
            {['Five workers.', 'One law.', <span key="l3"><span className="text-[var(--hazard)]">RM500,000</span> at stake.</span>].map((l, i) => (
              <span key={i} className="block overflow-hidden"><span className="hero-line block">{l}</span></span>
            ))}
          </h1>
          <div className="grid md:grid-cols-2 gap-8 mt-10 items-end">
            <p className="hero-meta text-[var(--paper-dim)] leading-relaxed max-w-xl">
              Under Section 29A of the OSH (Amendment) Act 2022, any Malaysian enterprise employing <strong className="text-[var(--paper)]">5 or more</strong> individuals must appoint an OSH Coordinator (OSH-C). Naja Safety trains and equips your internally appointed employee to clear regulatory benchmarks smoothly — turning compliance from a liability into a managed capability.
            </p>
            <div className="hero-meta flex flex-wrap gap-4 md:justify-end">
              <a href={WA_LINK('Hello Naja Safety, I would like to book a training.')} target="_blank" rel="noreferrer" className="btn-hazard">Book Training →</a>
              <a href="#/courses" className="btn-ghost">View Courses</a>
            </div>
          </div>
          <p className="hero-meta font-mono2 text-[10px] tracking-[0.15em] uppercase text-[var(--paper-faint)] mt-10">
            20+ Years Keeping Malaysian Workplaces Safe · HRD Corp claimable courses · CIDB-certified instruction · Nationwide on-site training from Johor Bahru
          </p>
        </div>
      </section>

      {/* ═══ TRUST MARQUEE ═══ */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)] py-5">
        <Marquee items={CLIENTS.slice(0, 19)} className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-dim)]" />
        <p className="text-center font-mono2 text-[9px] tracking-[0.25em] uppercase text-[var(--paper-faint)] mt-4 px-4">
          Trusted by 158+ companies including Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, AECOM & CIDB
        </p>
      </section>

      {/* ═══ STAT BAND ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)]">
        {[
          { v: 20, s: '+', label: 'Years Field Experience' },
          { v: 158, s: '+', label: 'Client Companies' },
          { v: 5, s: '', label: 'States Covered — JB to Penang' },
          { v: 2005, s: '', label: 'Protecting Workspaces Since', raw: true },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--ink)] p-8">
            <p className="text-display text-5xl md:text-6xl text-[var(--hazard)]">
              <Counter to={s.v} suffix={s.s} plain={s.v === 2005} />
            </p>
            <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-dim)] mt-3">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ═══ MANIFESTO — char reveal ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-36">
        <p className="eyebrow mb-8">/// Operational Doctrine</p>
        <CharReveal
          text="We do not paraphrase the law. We train you against it. Every module maps to the exact Act, Section, and Standard your site is legally bound to meet."
          className="text-display text-3xl md:text-5xl lg:text-6xl max-w-5xl leading-tight"
        />
      </section>

      {/* ═══ DELIVERY COMPARISON ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-16">
        <SectionHead index="01" eyebrow="How We Deliver Training" title="Your floor. Your hazards. Your schedule." sub="In-house programmes tailored to your facility vs. public seminar slots." />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[DELIVERY.inhouse, DELIVERY.public].map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1}>
              <div className={`relative p-8 md:p-10 notch h-full ${i === 0 ? 'bg-[var(--hazard)] text-white' : 'bg-[var(--ink-2)] border border-[var(--line)]'}`}>
                <span className={`font-mono2 text-[10px] uppercase tracking-[0.2em] px-3 py-1 ${i === 0 ? 'bg-black text-[var(--hazard)]' : 'border border-[var(--line)] text-[var(--paper-faint)]'}`}>{d.label}</span>
                <h3 className="text-display text-3xl md:text-4xl mt-6">{d.title}</h3>
                <ul className="mt-6 space-y-3">
                  {d.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed">
                      <span className={`font-mono2 ${i === 0 ? 'text-white' : 'text-[var(--hazard)]'}`}>{i === 0 ? '■' : '□'}</span>{p}
                    </li>
                  ))}
                </ul>
                <a href={WA_LINK(`Hello Naja Safety, regarding: ${d.title}`)} target="_blank" rel="noreferrer" className={`inline-block mt-8 font-mono2 text-[11px] uppercase tracking-[0.15em] font-semibold ${i === 0 ? 'bg-black text-[var(--hazard)] px-6 py-3' : 'btn-ghost'}`}>{d.cta} →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ HRD CORP LEVY ═══ */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)] relative noise">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="02" eyebrow="Levy-Optimised Safety Training" title="Your levy expires. We deploy it." sub="HRD Corp levies are subject to a rolling utilisation window. We audit your e-TRiS account status and design claimable safety programmes to help deploy accumulated balances productively before they expire. Grant approval is subject to HRD Corp eligibility rules, active balance thresholds, and programme alignment." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
            {[
              { n: '1', t: 'Audit', d: 'Review levy balance & risk' },
              { n: '2', t: 'Design', d: 'Map programmes to gaps' },
              { n: '3', t: 'Train', d: 'On-site by Trainer 62976' },
              { n: '4', t: 'Claim', d: 'e-TRiS documentation support' },
            ].map((s) => (
              <div key={s.n} className="bg-[var(--ink-2)] p-8 group hover:bg-[var(--ink-3)] transition-colors">
                <p className="text-display text-6xl text-[var(--hazard)]/25 group-hover:text-[var(--hazard)] transition-colors">{s.n}</p>
                <p className="font-display font-bold uppercase text-xl mt-4">{s.t}</p>
                <p className="text-sm text-[var(--paper-dim)] mt-2">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[var(--paper-faint)] mt-6">Trainer Registration Profile Serial: 62976 · HRD Corp Certified · CIDB Certified Instructor · One-Stop Support</p>
        </div>
      </section>

      {/* ═══ CREDENTIALS LEDGER ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead index="03" eyebrow="Verified Credentials & Regulatory Standing" title="The ledger of record." sub="Verifiable reference numbers. Redacted copies available on request via the contact page." />
        <div className="mt-12 border border-[var(--line)]">
          <div className="hidden md:grid grid-cols-12 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-faint)] border-b border-[var(--line)] px-6 py-3">
            <span className="col-span-5">Accreditation</span><span className="col-span-4">Reference</span><span className="col-span-3">Valid Until</span>
          </div>
          {CREDENTIALS.map((c, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="data-row grid md:grid-cols-12 gap-2 md:gap-0 px-6 py-5 border-b border-[var(--line)] last:border-b-0 items-baseline">
                <span className="md:col-span-5 font-display font-bold uppercase tracking-wide">{c.accreditation}</span>
                <span className="md:col-span-4 font-mono2 text-sm text-[var(--hazard)]">{c.reference}</span>
                <span className="md:col-span-3 font-mono2 text-xs text-[var(--paper-dim)]">{c.valid}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-sm text-[var(--paper-dim)] mt-6 max-w-3xl leading-relaxed">
          <strong className="text-[var(--paper)]">CIDB Provider History:</strong> CIDB-accredited SICW training provider since 2010 (Registrations 151110-J003, 2010–2012 and 2020–2022; current PLSICW20231022-068). All reference numbers can be verified directly with the issuing authority. Redacted copies of supporting documents are available on request.
        </p>
      </section>

      {/* ═══ DOCTRINE SIX ═══ */}
      <section className="border-y border-[var(--line)] bg-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="04" eyebrow="Operational Doctrine" title="Six principles that govern every engagement" sub="From first contact to post-training compliance — these are the protocols that keep your sites audit-ready and your workforce protected." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
            {DOCTRINE.map((d, i) => (
              <div key={i} className="bg-[var(--ink)] p-8 group hover:bg-[var(--ink-3)] transition-colors">
                <p className="font-mono2 text-[10px] text-[var(--hazard)] tracking-widest">P-{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold uppercase text-xl mt-4 group-hover:text-[var(--hazard)] transition-colors">{d.title}</h3>
                <p className="text-sm text-[var(--paper-dim)] mt-3 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DELIVER ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead index="05" eyebrow="What We Deliver" title="Full-spectrum. One partner." sub="Comprehensive safety solutions for Malaysian workplaces." />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            { img: '/assets/original/hero-services.jpg', title: 'OSH Training', body: 'Incident investigation, HIRARC, first aid, forklift safety, emergency response, chemical safety, and tailor-made HSE programmes.', tags: ['Incident & Accident Investigation', 'Chemical & Electrical Safety Handling', 'Forklift & Machinery Competency Training', 'OSH Coordinator (OSH-C) Development'] },
            { img: '/assets/original/pillar-construction.jpg', title: 'CIDB & Construction Safety', body: 'Safety induction, working at height, site safety management, toolbox talks, Green Card training, and scaffold safety awareness.', tags: ['CIDB Green Card Induction (SICW)', 'Working at Height (WAH) Safety Certification', 'Scaffold Safety Awareness Program'] },
            { img: '/assets/original/pillar-consultancy.jpg', title: 'Safety Consultancy', body: 'Workplace assessments, compliance advisory, safety documentation, and supply of competent safety supervisors & environmental officers.', tags: [] },
            { img: '/assets/original/pillar-hrdcorp.jpg', title: 'HRD Corp Support', body: 'Guidance on claimable training programmes, grant & funding assistance, claim process support, and training budget optimisation.', tags: [] },
          ].map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <a href="#/services" className="block group relative overflow-hidden border border-[var(--line)] h-full">
                <div className="relative h-56 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <AssetTag kind="ORIGINAL" />
                </div>
                <div className="p-8">
                  <h3 className="text-display text-3xl group-hover:text-[var(--hazard)] transition-colors">{p.title}</h3>
                  <p className="text-sm text-[var(--paper-dim)] mt-3 leading-relaxed">{p.body}</p>
                  {p.tags.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {p.tags.map((t) => <li key={t} className="font-mono2 text-[11px] text-[var(--paper-faint)]">→ {t}</li>)}
                    </ul>
                  )}
                  <span className="font-mono2 text-[11px] uppercase tracking-[0.15em] text-[var(--hazard)] mt-6 inline-block u-sweep">Learn more →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ KNOWLEDGE CENTRE ═══ */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="06" eyebrow="Regulatory Knowledge Centre" title="Compliance insights for Malaysian employers" sub="Statutory updates, penalty frameworks, and actionable compliance guides — written for decision-makers who need answers fast." />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { t: '10 Things Every Employer Must Know About the OSH (Amendment) Act 2022', d: 'Section 29A, the 5-worker rule, RM500,000 corporate fines, director criminal liability, and 9 other statutory shifts that affect every Malaysian workplace.', cta: 'Read the guide →', href: '#/articles/osh-act-2022-10-things' },
              { t: 'The RM500,000 Penalty Explained', d: 'Under the OSH (Amendment) Act 2022, corporate fines for general employer duty violations increased tenfold from RM50,000 to RM500,000. Directors now face personal criminal liability.', cta: 'Understand the penalty framework →', href: '#/articles/osh-act-2022-10-things' },
              { t: 'Who Needs an OSH Coordinator?', d: 'If you employ 5 or more workers, you are legally required to appoint an OSH Coordinator under Section 29A. We explain the appointment process, competency requirements, and compliance timeline.', cta: 'View OSH-C Advisory →', href: '#/services/osh-coordinator-section-29a' },
            ].map((a) => (
              <Reveal key={a.t}>
                <a href={a.href} className="block border border-[var(--line)] p-8 h-full hover:border-[var(--hazard)] transition-colors group bg-[var(--ink)]">
                  <h3 className="font-display font-bold uppercase text-xl leading-tight group-hover:text-[var(--hazard)] transition-colors">{a.t}</h3>
                  <p className="text-sm text-[var(--paper-dim)] mt-4 leading-relaxed">{a.d}</p>
                  <span className="font-mono2 text-[11px] uppercase tracking-[0.15em] text-[var(--hazard)] mt-6 inline-block">{a.cta}</span>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-8"><a href="#/articles" className="btn-ghost">View All Articles</a></div>
        </div>
      </section>

      {/* ═══ TRAINER SPOTLIGHT ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative notch overflow-hidden border border-[var(--line)]">
            <img src="/assets/original/james-issachar.png" alt="James Issachar A/L Daniel — Lead Trainer, Naja Safety" className="w-full object-cover" />
            <AssetTag kind="ORIGINAL" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-6 pt-16">
              <p className="font-display font-extrabold uppercase text-2xl">James Issachar A/L Daniel</p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--hazard)] mt-1">Lead Trainer, Naja Safety</p>
            </div>
          </div>
        </Reveal>
        <div>
          <p className="eyebrow mb-4">/// Meet Your Lead Trainer</p>
          <h2 className="text-display text-4xl md:text-5xl">Real practitioner. Real credentials. Real impact.</h2>
          <ul className="mt-8 space-y-3 font-mono2 text-[12px] tracking-wide text-[var(--paper-dim)]">
            <li className="flex gap-3"><span className="text-[var(--hazard)]">■</span>HRD Corp Certified Trainer — ID: 62976</li>
            <li className="flex gap-3"><span className="text-[var(--hazard)]">■</span>CIDB Certified Instructor</li>
            <li className="flex gap-3"><span className="text-[var(--hazard)]">■</span>OSH Consultant since May 2006; Principal consultant since Jan 2015</li>
            <li className="flex gap-3"><span className="text-[var(--hazard)]">■</span>20+ years in manufacturing, construction & safety consultancy</li>
            <li className="flex gap-3"><span className="text-[var(--hazard)]">■</span>Chairman, Shechinah Association Johor Bahru (charity, founded 2018)</li>
          </ul>
          <p className="text-[var(--paper-dim)] leading-relaxed mt-6">
            James did not start in a boardroom. He started at NIOSH as a vocational trainee. Today he is a CIDB-certified instructor, HRD Corp-accredited trainer, and Chairman of Shechinah Association Johor Bahru — because safety is not just a job. It is a mission to protect people.
          </p>
          <a href="#/about" className="btn-hazard mt-8">Read Full Story →</a>
        </div>
      </section>

      {/* ═══ TRAINING IN ACTION — ORIGINAL VIDEOS ═══ */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="07" eyebrow="Training in Action" title="Real footage. Real sites." sub="Real footage from our on-site safety programmes across Malaysia. All videos filmed on-site at actual client premises across Malaysia." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {VIDEOS.map((v) => (
              <Reveal key={v.src}>
                <div className="relative border border-[var(--line)] group">
                  <video src={v.src} controls preload="metadata" playsInline className="w-full aspect-video object-cover bg-black" />
                  <AssetTag kind="ORIGINAL" />
                  <p className="font-mono2 text-[11px] uppercase tracking-[0.15em] p-4 text-[var(--paper-dim)] group-hover:text-[var(--hazard)] transition-colors">{v.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRACK RECORD ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead index="08" eyebrow="A Historical Track Record of Field Delivery Across Two Decades" title="Real companies. Real sites. Real outcomes." sub="Naja Safety's practitioners have proudly trained personnel and managed project hazard parameters past and present for components of the organisations listed below." />
        <div className="grid grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] mt-12 mb-10">
          {[{ v: 158, s: '+', l: 'Client Companies' }, { v: 20, s: '+', l: 'Years in Operation' }].map((s) => (
            <div key={s.l} className="bg-[var(--ink)] p-6 md:p-10 text-center">
              <p className="text-display text-5xl md:text-7xl text-[var(--hazard)]"><Counter to={s.v} suffix={s.s} plain={s.v === 2005} /></p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-dim)] mt-2">{s.l}</p>
            </div>
          ))}
          <div className="bg-[var(--ink)] p-6 md:p-10 text-center">
            <p className="text-display text-5xl md:text-7xl text-[var(--hazard)]">MY</p>
            <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-dim)] mt-2">Nationwide Deployment Reach</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {CLIENTS.map((c) => (
            <span key={c} className="font-mono2 text-[11px] tracking-wide border border-[var(--line)] px-3 py-2 text-[var(--paper-dim)] hover:border-[var(--hazard)] hover:text-[var(--hazard)] transition-colors">{c}</span>
          ))}
          <span className="font-mono2 text-[11px] tracking-wide bg-[var(--hazard)] text-white px-3 py-2 font-semibold">+ 128 more across Johor, KL, Selangor, Penang & Melaka</span>
        </div>
        <p className="font-mono2 text-[10px] text-[var(--paper-faint)] mt-6 tracking-wide">View full client list of 158+ companies — names above represent a cross-section of engagements.</p>

        {/* See in action */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { t: 'On-Site Training — Live Training Floor', d: 'Real drills with certified instructors and your own equipment on your own premises.' },
            { t: 'Hazard Mapping — Fire Safety Drill', d: "Emergency response protocols tailored to your facility's layout and risk profile." },
            { t: 'Site Assessment — Scaffold Inspection', d: 'Practical scaffold erection and inspection on active construction sites.' },
          ].map((x) => (
            <div key={x.t} className="border-l-2 border-[var(--hazard)] pl-5">
              <p className="font-display font-bold uppercase">{x.t}</p>
              <p className="text-sm text-[var(--paper-dim)] mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COVERAGE ═══ */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="09" eyebrow="Our Coverage Areas" title="From Johor Bahru to Penang" sub="On-site safety training and consultancy delivered nationwide. Freelance trainer network incl. Sabah & Sarawak." />
          <div className="grid md:grid-cols-5 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
            {[
              { s: 'Johor', d: 'HQ in Johor Bahru with full on-site deployment across the state.' },
              { s: 'Melaka', d: 'Regular training schedules for manufacturing and port operations.' },
              { s: 'Kuala Lumpur', d: 'Corporate headquarters and federal compliance support.' },
              { s: 'Perak', d: 'Industrial zone safety audits and plantation HSE programmes.' },
              { s: 'Penang', d: 'Electronics manufacturing and semiconductor clean-room safety.' },
            ].map((x) => (
              <div key={x.s} className="bg-[var(--ink-2)] p-6 hover:bg-[var(--ink-3)] transition-colors">
                <p className="font-display font-extrabold uppercase text-2xl text-[var(--hazard)]">{x.s}</p>
                <p className="text-[13px] text-[var(--paper-dim)] mt-3 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6"><a href="#/locations" className="btn-ghost">Full coverage map →</a></div>
        </div>
      </section>

      {/* ═══ WHY SAFETY PAYS + ICEBERG ═══ */}
      <section ref={icebergRef} className="relative border-b border-[var(--line)] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="10" eyebrow="Why Safety Pays" title="Prevention is cheaper than the accident." sub="Promotion, education, and awareness are vital elements of occupational safety and health programs." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
            {WHY_SAFETY_PAYS.map((w) => (
              <div key={w.title} className="bg-[var(--ink)] p-7">
                <p className="font-display font-bold uppercase text-lg text-[var(--hazard)]">{w.title}</p>
                <p className="text-sm text-[var(--paper-dim)] mt-2 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>

          {/* Iceberg */}
          <div className="grid lg:grid-cols-2 gap-12 mt-24 items-center">
            <div className="relative overflow-hidden notch border border-[var(--line)] max-h-[720px]">
              <img src="/assets/ai/iceberg.jpg" alt="Iceberg cross-section — hidden accident costs below the waterline" className="iceberg-img w-full object-cover scale-110" />
              <AssetTag kind="AI" />
              <div className="absolute top-6 left-6">
                <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] bg-black/60 px-3 py-2 text-[var(--hazard)]">Insured Costs — The Tip</p>
              </div>
            </div>
            <div>
              <h3 className="text-display text-4xl md:text-5xl">The fine is the <span className="text-[var(--hazard)]">tip.</span></h3>
              <p className="text-[var(--paper-dim)] leading-relaxed mt-6">
                <strong className="text-[var(--paper)]">Insured Costs (The Tip):</strong> These are the visible, covered expenses most companies plan for: injury compensation, medical treatment, property damage, and statutory fines.
              </p>
              <p className="text-[var(--paper-dim)] leading-relaxed mt-4">
                <strong className="text-[var(--hazard)]">The Hidden Uninsured Costs (8 to 36 times as much):</strong> The bulk of accident costs sit below the surface. These are never covered by insurance and quietly drain your margins.
              </p>
              <div className="cost-list grid grid-cols-2 gap-x-6 gap-y-2 mt-8">
                {HIDDEN_COSTS.map((c) => (
                  <p key={c} className="cost-row font-mono2 text-[11px] tracking-wide text-[var(--paper-dim)] flex gap-2"><span className="text-[var(--hazard)]">▾</span>{c}</p>
                ))}
              </div>
              <p className="font-mono2 text-[9px] text-[var(--paper-faint)] mt-6 tracking-wide">Source: Naja Safety accident-cost methodology, derived from statutory OSH reporting frameworks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead index="11" eyebrow="Industries We Serve" title="Decades across Malaysia's key sectors." />
        <div className="grid md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.name} className="bg-[var(--ink)] p-8 group hover:bg-[var(--ink-3)] transition-colors">
              <p className="font-mono2 text-[10px] text-[var(--hazard)] tracking-widest">SECTOR {String(i + 1).padStart(2, '0')}</p>
              <p className="font-display font-extrabold uppercase text-2xl mt-3 group-hover:text-[var(--hazard)] transition-colors">{ind.name}</p>
              <p className="font-mono2 text-[11px] text-[var(--paper-faint)] mt-2">{ind.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATUTORY FRAMEWORK ═══ */}
      <section className="border-y border-[var(--line)] bg-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead index="12" eyebrow="Statutory Framework" title="The laws that govern your workplace" sub="We do not paraphrase the law. We train you against it. Here are the four statutes every Malaysian employer must understand." />
          <div className="space-y-px mt-12 border border-[var(--line)]">
            {STATUTES.map((s) => (
              <Reveal key={s.title}>
                <div className="data-row grid lg:grid-cols-12 gap-4 bg-[var(--ink)] p-8 items-start">
                  <div className="lg:col-span-2">
                    <span className="font-display font-extrabold uppercase text-2xl text-[var(--hazard)]">{s.body}</span>
                    <p className="font-mono2 text-[10px] text-[var(--paper-faint)] mt-1 uppercase tracking-wider">{s.badge}</p>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="font-display font-bold uppercase text-lg">{s.title}</p>
                    <p className="text-sm text-[var(--paper-dim)] mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="lg:col-span-3 lg:text-right">
                    <a href={s.link} className="font-mono2 text-[11px] uppercase tracking-[0.15em] text-[var(--hazard)] u-sweep">{s.linkText} →</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-sm text-[var(--paper-dim)] mt-8">Need a full compliance audit? Our regulatory hub maps every programme we deliver to its governing statute, with direct links to official .gov.my sources. <a href="#/regulatory-hub" className="text-[var(--hazard)] u-sweep">Visit the Regulatory Hub →</a></p>
        </div>
      </section>

      {/* ═══ QUICK ENQUIRY ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow mb-4">/// Quick Enquiry</p>
          <h2 className="text-display text-4xl md:text-5xl">Tell us what you need.</h2>
          <p className="text-[var(--paper-dim)] mt-4 leading-relaxed">Tell us what you need and we will respond within one business day.</p>
          <div className="mt-8 space-y-4 font-mono2 text-sm">
            <p className="text-[var(--paper-dim)]">PHONE / WHATSAPP<br /><a href="tel:0167301802" className="text-[var(--hazard)] text-xl">{SITE.phone}</a></p>
            <p className="text-[var(--paper-dim)]">EMAIL<br /><a href={`mailto:${SITE.email}`} className="text-[var(--hazard)]">{SITE.email}</a></p>
            <p className="text-[var(--paper-dim)]">ADDRESS<br /><span className="text-[var(--paper)] text-xs leading-relaxed">{SITE.address}</span></p>
          </div>
        </div>
        <EnquiryForm />
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 pb-24">
        <SectionHead index="13" eyebrow="Frequently Asked Questions" title="Everything you need to know" sub="Everything you need to know about our training, claims, and compliance support." />
        <div className="mt-12"><FAQ items={HOME_FAQS} /></div>
      </section>

      {/* ═══ SOUTHERN HUBS + AFFILIATE ═══ */}
      <section className="border-t border-[var(--line)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-16">
          <p className="eyebrow mb-4">/// Direct Corporate Training Deployment Across Southern Hubs</p>
          <p className="text-[var(--paper-dim)] max-w-3xl leading-relaxed">
            Our mobile safety units deploy directly to site operations throughout{' '}
            {SOUTHERN_HUBS.map((h, i) => (
              <span key={h}><span className="text-[var(--hazard)]">{h}</span>{i < SOUTHERN_HUBS.length - 1 ? ', ' : '.'}</span>
            ))}
          </p>
          <p className="text-sm text-[var(--paper-dim)] mt-6 max-w-3xl leading-relaxed">
            Are you a licensed SHO (Green Book) or competent OSH Practitioner? Naja Safety is scaling nationwide.{' '}
            <a href={WA_LINK('Hello Naja Safety, I am interested in joining the affiliate training partner network.')} target="_blank" rel="noreferrer" className="text-[var(--hazard)] u-sweep">Join our nationwide network of affiliate training partners here</a>.
          </p>
        </div>
      </section>

      <ClosingCTA
        title="Ready to secure your workforce?"
        body="Book a training session, request a site audit, or enquire about HRD Corp claimable programmes. Our team responds within 24 hours."
      />
    </div>
  )
}

export function EnquiryForm() {
  const [sent, setSent] = useState(false)
  const [consent, setConsent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', company: '', need: '' })
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `ENQUIRY — ${form.name} (${form.company || 'N/A'})\nPhone: ${form.phone}\nNeed: ${form.need}`
    window.open(WA_LINK(msg), '_blank')
    setSent(true)
  }
  if (sent) return (
    <div className="border border-[var(--hazard)] p-10 text-center">
      <p className="text-display text-3xl text-[var(--hazard)]">Received.</p>
      <p className="text-[var(--paper-dim)] mt-4 text-sm leading-relaxed">Thank you. Your enquiry has been received. We typically reply within one business day. Your enquiry has been handed to WhatsApp for direct transmission.</p>
      <button onClick={() => setSent(false)} className="btn-ghost mt-6">Send another</button>
    </div>
  )
  return (
    <form onSubmit={submit} className="border border-[var(--line)] p-8 bg-[var(--ink-2)] space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
        <div><label className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">Phone / WhatsApp *</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" /></div>
      </div>
      <div><label className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1" /></div>
      <div><label className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">What do you need? *</label><textarea required rows={4} value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })} className="mt-1" /></div>
      <label className="flex items-start gap-3 text-xs text-[var(--paper-dim)] leading-relaxed cursor-pointer">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="!w-4 mt-0.5 accent-[#5a68e0]" />
        I consent to Naja Safety processing my personal data per the Privacy Notice and the Malaysian Personal Data Protection Act 2010.
      </label>
      <button type="submit" className="btn-hazard w-full justify-center">Send Enquiry →</button>
    </form>
  )
}
