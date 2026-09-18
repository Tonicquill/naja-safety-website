import { PageHero, SectionHead } from '../components/blocks'
import { AssetTag } from '../components/chrome'
import { SITE, WA_LINK } from '../data/site'
import { EnquiryForm } from './Home'

export default function Contact() {
  return (
    <div>
      <PageHero
        crumb="Home / Contact"
        badge="Response within one business day"
        title={<>Ready to make your<br />workplace safer?</>}
        sub="Reach us by phone, WhatsApp, email, or the form below."
        image="/assets/original/hero-contact.jpg"
      />

      <section className="max-w-[1400px] mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
            <div className="bg-[var(--ink)] p-7">
              <p className="eyebrow mb-3">Phone / WhatsApp</p>
              <a href="tel:0167301802" className="font-display font-extrabold text-2xl text-[var(--hazard)]">{SITE.phone}</a>
              <div className="mt-3"><a href={WA_LINK('Hello Naja Safety.')} target="_blank" rel="noreferrer" className="font-mono2 text-[10px] uppercase tracking-widest u-sweep text-[var(--paper-dim)]">Chat on WhatsApp →</a></div>
            </div>
            <div className="bg-[var(--ink)] p-7">
              <p className="eyebrow mb-3">Email</p>
              <a href={`mailto:${SITE.email}`} className="font-display font-extrabold text-xl text-[var(--hazard)] break-all">{SITE.email}</a>
            </div>
            <div className="bg-[var(--ink)] p-7 sm:col-span-2">
              <p className="eyebrow mb-3">Office Address</p>
              <p className="text-sm text-[var(--paper-dim)] leading-relaxed">09-03, Blok C,<br />Kompleks Austin Perdana,<br />Taman Mount Austin,<br />81100 Johor Bahru, Johor, Malaysia</p>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">/// Response Times</p>
            <div className="border border-[var(--line)]">
              {[['WhatsApp', '< 15 min'], ['Phone (business hours)', 'Immediate'], ['Email', '< 24 hours'], ['Site Visit Scheduling', '1–3 days']].map(([k, v]) => (
                <div key={k} className="flex justify-between px-5 py-3 border-b border-[var(--line)] last:border-b-0 text-sm">
                  <span className="text-[var(--paper-dim)]">{k}</span>
                  <span className="font-mono2 text-[var(--hazard)]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">/// Nationwide Deployment</p>
            <div className="flex flex-wrap gap-2">
              {['Tebrau', 'Pasir Gudang', 'Senai', 'Pengerang', 'Iskandar Puteri', 'Skudai'].map((h) => (
                <span key={h} className="font-mono2 text-[11px] border border-[var(--line)] px-3 py-2 text-[var(--paper-dim)]">{h}</span>
              ))}
            </div>
          </div>

          <div className="border border-[var(--line)] p-6 bg-[var(--ink-2)]">
            <p className="font-display font-bold uppercase text-lg">Prefer a quick call?</p>
            <p className="text-sm text-[var(--paper-dim)] mt-2">We respond to WhatsApp and phone calls within business hours. For urgent training bookings, call Naja Safety directly.</p>
            <div className="flex gap-3 mt-5">
              <a href="tel:0167301802" className="btn-hazard">Call Us</a>
              <a href={WA_LINK('Hello Naja Safety, urgent booking.')} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
            </div>
          </div>
        </div>

        <div>
          <SectionHead eyebrow="Send an Enquiry" title="The fastest brief is a short one." />
          <div className="mt-8"><EnquiryForm /></div>
          <div className="relative mt-8 border border-[var(--line)] notch overflow-hidden">
            <img src="/assets/original/training-group.jpg" alt="Naja Safety on-site training group" className="w-full object-cover h-56" />
            <AssetTag kind="ORIGINAL" />
          </div>
        </div>
      </section>
    </div>
  )
}
