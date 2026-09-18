import { PageHero, SectionHead } from '../components/blocks'
import { ClosingCTA } from '../components/chrome'
import { Reveal } from '../components/motion'
import { REG_FRAMEWORKS } from '../data/services'

export default function RegHub() {
  return (
    <div>
      <PageHero
        crumb="Home / Regulatory Hub"
        badge="Malaysian Safety Law Reference Hub"
        title={<>The exact statute.<br />Nothing paraphrased.</>}
        sub="Exact statutory frameworks, official government sources, and the regulatory anchors behind every Naja Safety training programme and consultancy service."
      />

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20">
        <SectionHead eyebrow="Statutory Frameworks We Train Against" title="Cited to the section." sub="We do not paraphrase the law. We cite the exact Act, Section, and Standard — then train your workforce to comply with it." />
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

        {/* OSH Act deep dive */}
        <Reveal>
          <div className="mt-20 border border-[var(--hazard)]/40">
            <div className="hazard-tape h-2" />
            <div className="p-8 md:p-12">
              <p className="eyebrow mb-4">/// OSH (Amendment) Act 2022 — Full Mandate Breakdown</p>
              <h2 className="text-display text-4xl md:text-5xl">Effective 1 June 2024</h2>
              <p className="text-[var(--paper-dim)] leading-relaxed mt-6 max-w-3xl">The OSH (Amendment) Act 2022 repeals the old Factories and Machinery Act 1967 (FMA) and dramatically expands safety laws to all Malaysian workplaces — not just factories.</p>
              <blockquote className="border-l-2 border-[var(--hazard)] pl-6 mt-8 font-display font-bold uppercase text-xl md:text-2xl leading-snug max-w-3xl">
                "Every employer shall, in respect of each of his workplaces, appoint one or more OSH Coordinators where five or more persons are employed at that workplace."
                <span className="block font-mono2 text-[10px] tracking-[0.2em] text-[var(--paper-faint)] mt-3 normal-case font-normal">— Section 29A, OSH (Amendment) Act 2022 (Act 514)</span>
              </blockquote>
              <p className="eyebrow mt-10 mb-4">/// Key changes for employers</p>
              <ul className="space-y-3 max-w-3xl">
                {[
                  'Section 29A: Mandatory OSH Coordinator for 5+ employees. Non-compliance = criminal liability for directors.',
                  'Expanded scope: Covers offices, warehouses, retail, and all workplaces — not just factories.',
                  'Increased penalties: Corporate fines up to RM500,000 and imprisonment for serious breaches. Directors face personal criminal liability.',
                  'Stop-work orders: DOSH can immediately halt operations for imminent danger.',
                ].map((x) => (
                  <li key={x} className="flex gap-3 text-sm text-[var(--paper-dim)] leading-relaxed"><span className="text-[var(--hazard)] font-mono2">■</span>{x}</li>
                ))}
              </ul>
              <p className="text-sm text-[var(--paper-dim)] mt-8 max-w-3xl leading-relaxed"><strong className="text-[var(--hazard)]">Naja Safety's role:</strong> We fast-track your designated employee through the required OSH-C training and statutory appointment, typically within 7–14 days.</p>
            </div>
          </div>
        </Reveal>

        {/* DOSH guidelines */}
        <Reveal>
          <div className="mt-12 border border-[var(--line)] p-8 md:p-12">
            <p className="eyebrow mb-4">/// DOSH Site Public Safety & Health Guidelines — Construction Operations</p>
            <p className="text-[var(--paper-dim)] leading-relaxed max-w-3xl">Issued directly by the Department of Occupational Safety and Health (DOSH / JKKP), these guidelines lay down explicit rules for:</p>
            <ul className="space-y-3 mt-6 max-w-3xl">
              {['Building operations and structural engineering activities', 'Public safety barriers around active construction zones', 'Excavation protocols and trench stability', 'Temporary structure safety and load limits', 'Hazard communication to adjacent public areas'].map((x) => (
                <li key={x} className="flex gap-3 text-sm text-[var(--paper-dim)]"><span className="text-[var(--hazard)] font-mono2">■</span>{x}</li>
              ))}
            </ul>
            <p className="text-sm text-[var(--paper-dim)] mt-8 max-w-3xl leading-relaxed">Our on-site training and consultancy programmes map directly to these guidelines — giving your site the documentation and competency credentials needed for DOSH inspections and CIDB contractor pre-qualification.</p>
          </div>
        </Reveal>

        {/* CIDB CIS 25 */}
        <Reveal>
          <div className="mt-12 border border-[var(--line)] p-8 md:p-12">
            <p className="eyebrow mb-4">/// CIDB CIS 25:2018 — Construction Activities Risk Assessment (CARA)</p>
            <p className="text-[var(--paper-dim)] leading-relaxed max-w-3xl">CIDB CIS 25:2018 mandates the Hazard Identification, Risk Assessment, and Risk Control (HIRARC) protocols required across all Malaysian engineering and construction sites.</p>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)] mt-6 mb-4">The standard requires:</p>
            <ul className="space-y-3 max-w-3xl">
              {['Systematic hazard identification before commencement of work', 'Risk ranking using quantitative severity × probability matrices', 'Documented control measures following the hierarchy of controls', 'Regular review and update of risk registers', 'Integration with CIDB Green Card and site-safety supervisor mandates'].map((x) => (
                <li key={x} className="flex gap-3 text-sm text-[var(--paper-dim)]"><span className="text-[var(--hazard)] font-mono2">■</span>{x}</li>
              ))}
            </ul>
            <p className="text-sm text-[var(--paper-dim)] mt-8 max-w-3xl leading-relaxed"><strong className="text-[var(--hazard)]">Naja Safety's role:</strong> We deliver accredited CARA-aligned training and documentation support — from initial hazard registers to ongoing risk-control monitoring. We help you pass CIDB audits and maintain Green Card compliance without guesswork.</p>
          </div>
        </Reveal>

        {/* OSHA 1926 */}
        <Reveal>
          <div className="mt-12 border border-[var(--line)] p-8 md:p-12">
            <p className="eyebrow mb-4">/// US OSHA 29 CFR 1926 — MNC & Oil & Gas Dual Compliance</p>
            <p className="text-[var(--paper-dim)] leading-relaxed max-w-3xl">Multinational corporations and oil & gas firms operating in Malaysia often require dual-compliance — meeting local DOSH rules and US OSHA Title 29 standards.</p>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)] mt-6 mb-4">OSHA 1926 covers:</p>
            <ul className="space-y-3 max-w-3xl">
              {['Scaffolding (Subpart L) — design, load limits, and inspection frequencies', 'Fall protection (Subpart M) — guardrails, harnesses, and anchor points', 'Crane and derrick operations (Subpart CC)', 'Personal protective equipment (Subpart E) — selection, training, and maintenance', 'Excavations (Subpart P) — protective systems and soil classification'].map((x) => (
                <li key={x} className="flex gap-3 text-sm text-[var(--paper-dim)]"><span className="text-[var(--hazard)] font-mono2">■</span>{x}</li>
              ))}
            </ul>
            <p className="text-sm text-[var(--paper-dim)] mt-8 max-w-3xl leading-relaxed"><strong className="text-[var(--hazard)]">Naja Safety's role:</strong> We integrate OSHA 1926 protocols into our training modules, giving your workforce the documentation and competency credentials needed for MNC contractor pre-qualification and international project bids.</p>
          </div>
        </Reveal>

        {/* related */}
        <div className="mt-16 flex flex-wrap gap-4 font-mono2 text-[11px] uppercase tracking-[0.15em]">
          <a href="#/articles/osh-act-2022-10-things" className="btn-ghost">OSH Act 2022: 10 Things Every Malaysian Employer Must Know</a>
          <a href="#/services/osh-coordinator-section-29a" className="btn-ghost">OSH Coordinator Section 29A Advisory Hub</a>
          <a href="#/courses" className="btn-ghost">HRD Corp Claimable Safety Courses</a>
        </div>
      </section>

      <ClosingCTA
        title="Need help navigating these regulations?"
        body="Speak to us directly. We will assess your site, industry, and compliance gaps — then recommend the exact training or consultancy package to keep you statutory-compliant."
        primary="Call Us"
      />
    </div>
  )
}
