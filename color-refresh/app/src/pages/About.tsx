import { Reveal, Counter, CharReveal } from '../components/motion'
import { SectionHead, PageHero } from '../components/blocks'
import { AssetTag, ClosingCTA } from '../components/chrome'
import { CLIENTS } from '../data/site'

const TIMELINE = [
  { year: '2005', title: 'The shop floor', body: 'James Issachar joins NIOSH as a vocational trainee. The mission starts on the shop floor — learning the physics of scaffolds, the chemistry of hazardous substances, and the human cost of shortcuts.' },
  { year: '2006', title: 'Certified OSH Consultant', body: "Certified as an OSH Consultant. Begins on-site advisory across Johor manufacturing plants and construction sites, building the field foundation that would define Naja Safety's practical approach." },
  { year: '2015', title: 'Principal consultant', body: 'James becomes principal consultant with Naja Safety, formalising the consultancy into a full-service safety training and compliance firm. Company scales from Johor Bahru nationwide.' },
  { year: '2017', title: 'CIDB Certified Instructor', body: 'Naja Safety achieves CIDB Certified Instructor status (Center: PLSICW20231022-068), expanding construction safety training capabilities and enabling official Green Card induction delivery across Malaysia.' },
  { year: '2018', title: 'HRD Corp accreditation', body: 'HRD Corp accreditation secured (Trainer ID: 62976). Naja Safety becomes a verified levy-claimable training provider, enabling employers to recover training costs through the e-TRiS platform.' },
  { year: '2022', title: 'OSH Amendment Act passes', body: 'OSH Amendment Act 2022 passes, activating Section 29A: workplaces with 5+ employees must appoint an OSH Coordinator.' },
  { year: '2024', title: 'Enforcement intensifies', body: 'DOSH begins targeted inspections verifying OSH Coordinator appointment letters and competency certificates. Naja Safety scales its coordinator preparation programme to meet surging demand.' },
  { year: '2026', title: '158+ companies served', body: '158+ companies served across manufacturing, construction, oil & gas, and logistics. Nationwide coverage across 5 states with a national freelance trainer network. Digital compliance tools and on-site training delivery continue to scale.' },
]

const DOSSIER = [
  { k: 'Current Role', v: 'Lead Trainer, Naja Safety (since January 2015)' },
  { k: 'Postgraduate Degree', v: 'Executive Master in Safety, Health and Environment, Universiti Malaysia Pahang Al-Sultan Abdullah (2025)' },
  { k: 'Field Entry', v: 'OSH Consultant, May 2006' },
  { k: 'HRD Corp Accreditation', v: 'Trainer ID 62976 | Valid: 23 Dec 2025 – 23 Dec 2028 | e-TRiS platform enabled' },
  { k: 'CIDB Accreditation', v: 'Certified Instructor | Centre Code PLSICW20231022-068' },
  { k: 'Business Registration', v: 'Borang D — Reg. No. 200603041203 (JM0449867-U) | Valid until 14 July 2031' },
  { k: 'Sector Coverage', v: 'Manufacturing, Construction, Engineering, Oil & Gas, Government / GLC' },
  { k: 'Geographic Reach', v: 'Johor, Melaka, Kuala Lumpur, Selangor, Perak, Penang, Negeri Sembilan' },
  { k: 'Project History', v: "James has delivered safety and access work on Johor's largest construction sites — Forest City, Komtar JBCC and KSL Avery Park — for main contractors including MRCB Builders and China Construction, and was a registered vendor to Boustead Heavy Industries Corporation Berhad." },
  { k: 'Community Role', v: 'Chairman, Shechinah Association Johor Bahru (founded 2018)' },
]

export default function About() {
  return (
    <div>
      <PageHero
        crumb="Home / About"
        badge="Since 2005"
        title={<>Two decades of<br />protecting people.</>}
        sub="Two decades of protecting people, places, and businesses across Malaysia."
        image="/assets/original/hero-about.jpg"
      />

      {/* overview */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <CharReveal
          text="Naja Safety has been registered in Malaysia since 2005 and has been expanding from Johor to Melaka, Kuala Lumpur, Perak, and Penang. We have served multinational companies throughout the region — from manufacturing and construction to oil & gas and logistics — delivering practical, field-tested safety training and compliance advisory."
          className="text-2xl md:text-4xl font-display font-bold uppercase leading-snug max-w-5xl"
        />
        <p className="text-[var(--paper-dim)] leading-relaxed mt-8 max-w-3xl">
          We are proud to say that we are safety specialists in the field of building construction, with a national network of freelance trainers built over two decades — delivery anywhere in Malaysia, including Sabah and Sarawak. We are currently based in Johor Bahru with nationwide on-site deployment.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
          {[
            { v: 2005, l: 'Protecting Malaysian Workspaces Since', raw: true },
            { v: 5, l: 'States Covered — JB to Penang' },
            { v: 158, s: '+', l: 'Clients & Partners' },
          ].map((s) => (
            <div key={s.l} className="bg-[var(--ink)] p-8">
              <p className="text-display text-5xl text-[var(--hazard)]"><Counter to={s.v} suffix={s.s ?? ''} plain={s.v === 2005} /></p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-dim)] mt-3">{s.l}</p>
            </div>
          ))}
          <div className="bg-[var(--ink)] p-8">
            <p className="text-display text-5xl text-[var(--hazard)]">MY+</p>
            <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[var(--paper-dim)] mt-3">Freelance Trainer Network, incl. Sabah & Sarawak</p>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="border-y border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead eyebrow="Our Story" title="From a single consultant to a nationwide partner." />
          <div className="mt-16 space-y-0 border-l border-[var(--line)]">
            {TIMELINE.map((t) => (
              <Reveal key={t.year}>
                <div className="relative pl-10 pb-14 group">
                  <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-[var(--hazard)] group-hover:scale-150 transition-transform" />
                  <p className="text-display text-5xl md:text-6xl text-[var(--hazard)]/25 group-hover:text-[var(--hazard)] transition-colors">{t.year}</p>
                  <p className="font-display font-bold uppercase text-xl mt-2">{t.title}</p>
                  <p className="text-sm text-[var(--paper-dim)] mt-2 max-w-2xl leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* trainer dossier */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead eyebrow="Lead Trainer Dossier" title="James Issachar A/L Daniel" sub="Lead Trainer — Naja Safety · HRD Corp Trainer #62976 · CIDB Certified Instructor · OSH Consultant since 2006 · Director since 2015" />
        <div className="grid lg:grid-cols-5 gap-10 mt-12">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="relative border border-[var(--line)] notch overflow-hidden">
                <img src="/assets/original/james-issachar.png" alt="James Issachar" className="w-full object-cover" />
                <AssetTag kind="ORIGINAL" />
              </div>
            </Reveal>
            <p className="text-sm text-[var(--paper-dim)] leading-relaxed mt-6">
              James did not start in a boardroom. He started at NIOSH as a vocational trainee. Through 20+ years of discipline, field experience, and a genuine commitment to protecting workers, he built Naja Safety into one of Johor Bahru's most trusted safety consultancies — with a national network of freelance trainers deployed across Malaysia.
            </p>
            <p className="text-sm text-[var(--paper-dim)] leading-relaxed mt-4">
              Beyond business, James serves as Chairman of Shechinah Association Johor Bahru, a charity he founded in 2018 to give back to the community that shaped him.
            </p>
          </div>
          <div className="lg:col-span-3 border border-[var(--line)] self-start">
            {DOSSIER.map((d) => (
              <div key={d.k} className="data-row grid md:grid-cols-12 gap-2 px-6 py-4 border-b border-[var(--line)] last:border-b-0">
                <span className="md:col-span-4 font-mono2 text-[10px] uppercase tracking-[0.18em] text-[var(--hazard)]">{d.k}</span>
                <span className="md:col-span-8 text-sm text-[var(--paper-dim)] leading-relaxed">{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* team + mission */}
      <section className="border-y border-[var(--line)] bg-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
          <SectionHead eyebrow="Our Team" title="Small team, big reach." sub="Agile, experienced, and nationwide." />
          <div className="grid md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] mt-12">
            {[
              { t: 'Core Team', d: 'A lean core team handling operations, scheduling, compliance documentation, and client relations.' },
              { t: 'Trainer Network', d: 'Freelance trainers and agents deployed nationwide for on-site programmes across Johor, KL, Penang, and beyond.' },
              { t: 'Construction Focus', d: 'Deep expertise in construction site safety — from scaffold erection protocols and CIDB green card training to Working at Height compliance for high-rise and infrastructure projects.' },
            ].map((x) => (
              <div key={x.t} className="bg-[var(--ink)] p-8">
                <p className="font-display font-bold uppercase text-xl text-[var(--hazard)]">{x.t}</p>
                <p className="text-sm text-[var(--paper-dim)] mt-3 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-20">
            <div>
              <p className="eyebrow mb-4">/// Our Vision</p>
              <p className="text-xl font-display font-bold uppercase leading-snug">To be the leading Occupational Safety and Health Services and training provider in Malaysia. To fulfil all Occupational Safety & Health requirements for industries and organizations using latest techniques, formats, guidelines and codes of practices.</p>
            </div>
            <div>
              <p className="eyebrow mb-4">/// Our Mission</p>
              <p className="text-sm text-[var(--paper-dim)] leading-relaxed">Assist the Government namely the Department of Occupational Safety & Health (DOSH / JKKP) on achieving their objective to reduce Occupational Accident rates in Malaysia. Provide quality Occupational Safety & Health services for industries and organizations to achieve better productivity through OSH management. Promote Occupational Safety & Health awareness among industries and organizations and creating an attitude of a safe working culture among workers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] mt-16">
            {[
              { t: 'Protection First', d: 'Every worker deserves to go home safe. We design training and systems that prevent harm before it happens.' },
              { t: 'Partnership, Not Transaction', d: 'We build long-term relationships. Our clients return because we stay with them through audits, incidents, and growth.' },
              { t: 'Real-World Learning', d: 'Theory alone does not save lives. Our training is grounded in actual site experience — Malaysian factories, construction sites, and industrial plants.' },
              { t: 'Community Commitment', d: 'Through Shechinah Association Johor Bahru, we extend our care beyond the workplace into the communities we serve.' },
            ].map((v) => (
              <div key={v.t} className="bg-[var(--ink)] p-7">
                <p className="font-display font-bold uppercase text-lg text-[var(--hazard)]">{v.t}</p>
                <p className="text-sm text-[var(--paper-dim)] mt-3 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* clients */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-24">
        <SectionHead eyebrow="Trusted Since 2005" title="Clients & Partners" sub="158+ companies across manufacturing, construction, engineering, and government sectors." />
        <div className="flex flex-wrap gap-2 mt-12">
          {CLIENTS.map((c) => (
            <span key={c} className="font-mono2 text-[11px] tracking-wide border border-[var(--line)] px-3 py-2 text-[var(--paper-dim)] hover:border-[var(--hazard)] hover:text-[var(--hazard)] transition-colors">{c}</span>
          ))}
          <span className="font-mono2 text-[11px] tracking-wide bg-[var(--hazard)] text-white px-3 py-2 font-semibold">And 128 more across Johor, KL, Selangor, Penang, and Melaka</span>
        </div>
      </section>

      {/* shechinah */}
      <section className="border-t border-[var(--line)] bg-[var(--ink-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">/// Beyond the balance sheet</p>
            <h2 className="text-display text-4xl md:text-5xl">Shechinah Association Johor Bahru</h2>
            <p className="text-[var(--paper-dim)] leading-relaxed mt-6">Safety is a mission to protect people — on the site, and off it.</p>
            <p className="text-[var(--paper-dim)] leading-relaxed mt-4">Community Service Driven — Founded in 2018 by James Issachar as a charity organization operating in Johor Bahru. James serves as Chairman, channeling the same discipline and care from his safety career into social impact.</p>
            <blockquote className="border-l-2 border-[var(--hazard)] pl-6 mt-8 font-display font-bold uppercase text-xl leading-snug">
              "Safety is not just a job. It is a mission to protect people."
              <span className="block font-mono2 text-[10px] tracking-[0.2em] text-[var(--paper-faint)] mt-3">— JAMES ISSACHAR</span>
            </blockquote>
          </div>
          <Reveal>
            <div className="relative border border-[var(--line)] notch overflow-hidden">
              <img src="/assets/original/team-group.jpg" alt="Naja Safety training cohort with certificates" className="w-full object-cover" />
              <AssetTag kind="ORIGINAL" />
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCTA title="Work with the mission." body="Contact Naja Safety — we respond within one business day." primary="Contact Naja Safety" />
    </div>
  )
}
