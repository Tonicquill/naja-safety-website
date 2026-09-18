import { PageHero, SectionHead } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { Reveal } from '../components/motion'
import { WA_LINK } from '../data/site'
import { LOCATIONS } from '../data/pages'

export default function Locations() {
  return (
    <div>
      <PageHero
        crumb="Coverage Areas"
        badge="Nationwide Safety Training & Consultancy"
        title={<>Headquartered in JB.<br />Deployed nationwide.</>}
        sub="Headquartered in Johor Bahru with on-site deployment across Peninsular Malaysia. Classroom sessions at your premises or our partner training centres."
      />

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-10 relative z-10 flex flex-wrap gap-4">
        <a href={WA_LINK('Hello Naja Safety, I would like to request a site visit.')} target="_blank" rel="noreferrer" className="btn-hazard">Request a Site Visit →</a>
        <a href={WA_LINK('Hello Naja Safety.')} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
      </div>

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
        <SectionHead eyebrow="Where We Deliver" title="Seven states. Zero hidden surcharges." sub="Our lead trainer and freelance network cover seven states across Peninsular Malaysia. Travel costs are built into on-site quotations — no hidden surcharges." />
        <div className="mt-12 space-y-px border border-[var(--line)]">
          {LOCATIONS.map((l, i) => (
            <Reveal key={l.state} delay={i * 0.04}>
              <div className="data-row grid lg:grid-cols-12 gap-4 px-6 py-8 border-b border-[var(--line)] last:border-b-0">
                <div className="lg:col-span-3">
                  <p className="text-display text-3xl text-[var(--hazard)]">{l.state}</p>
                </div>
                <p className="lg:col-span-5 text-sm text-[var(--paper-dim)] leading-relaxed">{l.base}</p>
                <ul className="lg:col-span-4 space-y-1.5">
                  {l.services.map((s) => <li key={s} className="font-mono2 text-[11px] text-[var(--paper-dim)]">▸ {s}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 border border-[var(--hazard)]/40 bg-[var(--hazard-dim)] p-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display font-extrabold uppercase text-2xl">Not sure if we cover your area?</p>
            <p className="text-sm text-[var(--paper-dim)] mt-2">We also coordinate training in Kedah, Pahang, and Terengganu through our freelance trainer network. Reach out and we'll confirm availability.</p>
          </div>
          <a href="#/contact" className="btn-hazard">Contact Us →</a>
        </div>
      </section>

      <ClosingCTA title="Your site. Our trainers. Anywhere in Malaysia." body="On-site delivery eliminates travel downtime — your team trains without leaving the facility." />
    </div>
  )
}
