import { PageHero, SectionHead } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { Reveal } from '../components/motion'
import { WA_LINK } from '../data/site'

export function Articles() {
  return (
    <div>
      <PageHero
        crumb="Home / Articles"
        badge="Regulatory Compliance Articles & Statements"
        title={<>Compliance, decoded.</>}
        sub="Undated evergreen statutory guides for Malaysian employers, HR managers, and directors. Built for machine readability and maximum discoverability."
      />
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
        <a href="#/articles/osh-act-2022-10-things" className="block border border-[var(--line)] p-8 md:p-12 hover:border-[var(--hazard)] transition-colors group bg-[var(--ink-2)]">
          <div className="flex flex-wrap gap-2 mb-5">
            {['DOSH', 'OSH Act 2022', 'Section 29A', 'HIRARC'].map((t) => (
              <span key={t} className="font-mono2 text-[9px] uppercase tracking-[0.2em] border border-[var(--hazard)]/40 text-[var(--hazard)] px-3 py-1">{t}</span>
            ))}
          </div>
          <h2 className="text-display text-3xl md:text-5xl group-hover:text-[var(--hazard)] transition-colors max-w-4xl">10 Things Every Malaysian Employer Must Know About the OSH (Amendment) Act 2022</h2>
          <p className="text-[var(--paper-dim)] mt-5 max-w-2xl leading-relaxed">Section 29A, the 5-worker rule, RM500,000 corporate fines, director criminal liability, and the statutory shifts that changed Malaysian workplace safety forever.</p>
          <span className="font-mono2 text-[11px] uppercase tracking-[0.15em] text-[var(--hazard)] mt-6 inline-block">Read Statement →</span>
        </a>
        <div className="border border-dashed border-[var(--line)] p-8 mt-6 text-center">
          <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">More statutory guides coming soon</p>
          <p className="font-mono2 text-[10px] text-[var(--paper-faint)] mt-2">CIDB CIS 25:2018 deep-dive · HRD Corp levy forfeiture advisory · DOSH Site Safety Guidelines</p>
        </div>
        <div className="border border-[var(--hazard)]/40 bg-[var(--hazard-dim)] p-8 mt-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display font-extrabold uppercase text-2xl">Need hands-on compliance support?</p>
            <p className="text-sm text-[var(--paper-dim)] mt-2 max-w-2xl">Naja Safety provides on-site HRD Corp claimable training, DOSH-aligned consultancy, and statutory audit services across Johor, Selangor, KL, Penang, Melaka, and Perak.</p>
          </div>
          <div className="flex gap-3">
            <a href="#/services" className="btn-ghost">Explore Services</a>
            <a href={WA_LINK('Hello Naja Safety, I need compliance support.')} target="_blank" rel="noreferrer" className="btn-hazard">WhatsApp Us</a>
          </div>
        </div>
      </section>
      <ClosingCTA title="Knowledge is the first control measure." body="Train your team against the exact statute — on-site, nationwide, HRD Corp claimable." />
    </div>
  )
}

const POINTS = [
  { t: 'The Scope Now Applies to 100% of All Malaysian Workplaces', body: ['Under the old framework, safety laws primarily targeted heavy industries like manufacturing, construction, and mining. The amended Act broadens the scope completely.', 'The law now applies to all places of work throughout Malaysia, including the service sector, retail, tech startups, statutory authorities, public services, and even remote work corporate setups. If you employ people in Malaysia, you are legally bound by this Act.'] },
  { t: 'The "5-Worker Rule" Mandates a New Corporate Appointment', body: ['The most misunderstood trigger in the market is the threshold for mandatory safety personnel. Under the new Section 29A, if your company employs five or more employees, you are statutorily required to appoint a dedicated Occupational Safety and Health Coordinator (OSH Coordinator).', 'This means that small and medium enterprises (SMEs), small offices, and boutique agencies that previously flew under the regulatory radar are now fully required to have an in-house OSH-C.'] },
  { t: 'OSH Coordinators Must Be Professionally Trained', body: ['You cannot simply assign the OSH Coordinator title to an HR executive without proper training. The law specifies that the appointed individual must undergo specific, certified training approved by the Department of Occupational Safety and Health (DOSH / JKKP).', 'Failing to appoint a competent OSH Coordinator leaves your organization open to non-compliance citations during a routine labour or safety inspection.'] },
  { t: 'Maximum Corporate Fines Increased Tenfold', body: ['The cost of ignoring workplace safety has drastically increased. Under the previous Act, the maximum fine for general employer duty violations was RM50,000.', 'Under the amended framework, corporate fines have jumped to a maximum of RM500,000. A single systemic safety failure or lack of documentation can now result in a business-ending financial penalty.'], quote: '— Section 29A and related penalty provisions, OSH (Amendment) Act 2022 (Act 514)' },
  { t: 'Directors and Officers Face Direct Criminal Liability', body: ['One of the most significant changes in the update is the introduction of personal accountability. If a company commits an offense under the Act, the directors, CEOs, managers, and corporate officers can be held personally liable alongside the business entity.', 'If a serious workplace injury occurs and negligence is proven, executives face individual fines, criminal records, and imprisonment terms.'] },
  { t: 'Risk Assessments (HIRARC) Are Now Explicitly Mandatory', body: ['Hazard Identification, Risk Assessment, and Risk Control (HIRARC) is no longer just a recommended best practice; it is a mandatory legal requirement under the new text.', 'Employers must conduct documented risk assessments for all operational processes. Failing to produce updated HIRARC documentation during a DOSH inspection constitutes a direct violation of employer duties.'] },
  { t: 'Explicit Protection for the "Right to Refuse Unsafe Work"', body: ['The amendment strengthens employee protections by formalizing their right to remove themselves from an immediate danger zone. If an employee reasonably believes that a work task poses an imminent risk to their safety or health, they have the statutory right to refuse to perform that task without fear of corporate retaliation, termination, or docked pay.', 'Employers must establish clear protocols to receive, assess, and rectify these internal safety reports immediately.'] },
  { t: 'The Repeal of the Factories and Machinery Act 1967 (FMA)', body: ['To streamline enforcement, the old FMA 1967 has been officially repealed and integrated into the single, unified framework of the amended Act.', 'All regulatory matters concerning industrial machinery, certificates of fitness (CF), and factory designs are now managed under modern subsidiary regulations under the DOSH framework.'] },
  { t: 'Stricter Statutory Duties Mandated for "Principals"', body: ['If your business utilizes sub-contractors, freelancers, or third-party service providers, you cannot contract away your safety liabilities.', "The amended Act places explicit duties on \"Principals\" to ensure the safety and health of everyone working under their broader corporate umbrella. If a contractor's employee gets injured on your premises, your business can be held legally responsible for failing to audit the contractor's safety protocols."] },
  { t: 'You Must Establish Clear Written Emergency Procedures', body: ['Every employer must develop, document, and actively implement clear, step-by-step procedures for dealing with emergencies at the workplace. This goes beyond having a basic fire extinguisher on the wall.', 'Your emergency procedures must account for medical crises, industrial accidents, and sudden structural failures, and they must be actively communicated to all staff members through training drills.'] },
]

export function ArticleOSH() {
  return (
    <div>
      <PageHero
        crumb="Home / Articles / OSH Act 2022"
        badge="DOSH · OSH Act 2022 · Section 29A · HIRARC"
        title={<>10 things every Malaysian employer must know about the <span className="text-[var(--hazard)]">OSH (Amendment) Act 2022</span></>}
        sub="Section 29A, the 5-worker rule, RM500,000 corporate fines, director criminal liability, and the statutory shifts that changed Malaysian workplace safety forever."
      />
      <article className="max-w-[900px] mx-auto px-5 md:px-8 py-20">
        <p className="text-lg text-[var(--paper-dim)] leading-relaxed">The regulatory landscape for business owners in Malaysia changed permanently when the Occupational Safety and Health (Amendment) Act 2022 (OSHA 2022) officially came into full force on <strong className="text-[var(--hazard)]">1 June 2024</strong>. Signed into effect by the Ministry of Human Resources, this amendment marks the most radical overhaul of Malaysian workplace safety laws in three decades.</p>
        <p className="text-lg text-[var(--paper-dim)] leading-relaxed mt-6">If you are a director, HR manager, or business owner operating in Malaysia, a passive approach to safety is no longer just a liability — it is a direct path to severe financial penalties and potential jail time. The old protections of the Factories and Machinery Act 1967 (FMA) are gone, replaced by a comprehensive framework that leaves zero room for non-compliance.</p>
        <p className="font-display font-bold uppercase text-xl mt-8">Here are the 10 critical statutory shifts every Malaysian employer must understand to protect their business and their people.</p>

        <div className="mt-16 space-y-0">
          {POINTS.map((p, i) => (
            <Reveal key={p.t}>
              <div className="relative border-t border-[var(--line)] py-10 grid md:grid-cols-12 gap-6">
                <span className="md:col-span-3 text-display text-7xl text-[var(--hazard)]/20">{String(i + 1).padStart(2, '0')}</span>
                <div className="md:col-span-9">
                  <h2 className="font-display font-extrabold uppercase text-2xl md:text-3xl leading-tight">{p.t}</h2>
                  {p.body.map((para, j) => <p key={j} className="text-[var(--paper-dim)] leading-relaxed mt-4">{para}</p>)}
                  {p.quote && <p className="font-mono2 text-[11px] text-[var(--hazard)] mt-4 tracking-wide">{p.quote}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="border border-[var(--hazard)]/40 bg-[var(--hazard-dim)] p-8 md:p-10 mt-10">
          <h2 className="text-display text-3xl md:text-4xl">How to protect your organization from the RM500,000 fine</h2>
          <p className="text-[var(--paper-dim)] leading-relaxed mt-5">Achieving full compliance does not have to be an overwhelming process. The immediate first step for any Malaysian company with 5 or more staff members is to secure your mandatory safety appointment.</p>
          <p className="text-[var(--paper-dim)] leading-relaxed mt-4">At Naja Safety, we specialize in guiding companies through the exact transition steps needed to satisfy DOSH requirements. We provide fully HRD Corp claimable training programs designed to upscale your internal team members into certified, competent OSH Coordinators.</p>
          <p className="text-[var(--paper)] font-semibold mt-4">Don't wait for a surprise DOSH inspection or a costly workplace incident to address your compliance needs.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#/services/osh-coordinator-section-29a" className="btn-hazard">OSH Coordinator Section 29A Advisory Hub</a>
            <a href={WA_LINK('Hello Naja Safety, I read the OSH Act 2022 article and need help with compliance.')} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us Now</a>
          </div>
        </div>

        <div className="mt-14">
          <SectionHead eyebrow="Related Regulatory Resources" title="Keep reading" />
          <div className="space-y-3 mt-8 font-mono2 text-[12px] uppercase tracking-[0.12em]">
            <a href="#/regulatory-hub" className="block border border-[var(--line)] px-5 py-4 hover:border-[var(--hazard)] hover:text-[var(--hazard)] transition-colors">→ Malaysian Safety Law Reference Hub — full statutory matrix with PDF links</a>
            <a href="#/courses" className="block border border-[var(--line)] px-5 py-4 hover:border-[var(--hazard)] hover:text-[var(--hazard)] transition-colors">→ HRD Corp Claimable Safety Courses — OSH-C, CIDB Green Card, First Aid, Fire Emergency</a>
            <a href="#/services/osh-coordinator-section-29a" className="block border border-[var(--line)] px-5 py-4 hover:border-[var(--hazard)] hover:text-[var(--hazard)] transition-colors">→ OSH Coordinator Section 29A Advisory — appointment, training, and compliance verification</a>
          </div>
        </div>
      </article>
      <ClosingCTA title="The law changed. Has your workplace?" body="Secure your OSH-C appointment before enforcement intensifies." />
    </div>
  )
}
