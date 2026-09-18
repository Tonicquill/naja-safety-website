import { useEffect, useState } from 'react'
import { SITE, WA_LINK } from '../data/site'

/** Asset provenance flag — mandatory labeling for AI vs original media */
export function AssetTag({ kind }: { kind: 'AI' | 'ORIGINAL' }) {
  return (
    <span
      className={`absolute bottom-2 right-2 z-20 font-mono2 text-[9px] tracking-[0.15em] uppercase px-2 py-1 ${
        kind === 'AI'
          ? 'bg-[var(--hazard)] text-white'
          : 'bg-black/70 text-[var(--paper)] border border-white/20'
      }`}
    >
      {kind === 'AI' ? 'AI-GENERATED VISUAL' : 'ORIGINAL — NAJA SAFETY ARCHIVE'}
    </span>
  )
}

const NAV = [
  { label: 'Home', href: '#/' },
  { label: 'Services', href: '#/services' },
  { label: 'Courses', href: '#/courses' },
  { label: 'About', href: '#/about' },
  { label: 'Guide', href: '#/guide' },
  { label: 'Regulatory Hub', href: '#/regulatory-hub' },
  { label: 'Articles', href: '#/articles' },
  { label: 'Locations', href: '#/locations' },
  { label: 'Contact', href: '#/contact' },
]

export function Nav({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [route])
  return (
    <header className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${scrolled ? 'bg-[rgba(11,12,26,0.92)] backdrop-blur-md border-b border-[var(--line)]' : ''}`}>
      {/* statutory ticker */}
      <div className="bg-[var(--hazard)] text-white overflow-hidden">
        <div className="flex animate-marquee-fast whitespace-nowrap py-1 font-mono2 text-[10px] font-semibold tracking-[0.14em] uppercase">
          {[0, 1].map((k) => (
            <span key={k} className="inline-flex items-center">
              {['LIVE · Section 29A OSH (Amendment) Act 2022 in force', '5+ employees = mandatory OSH Coordinator', 'Corporate fines up to RM500,000', 'Director criminal liability', 'HRD Corp claimable programmes', 'CIDB Center PLSICW20231022-068'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-8 pr-8">
                  <span>{t}</span><span>///</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 md:px-8 py-3">
        <a href="#/" className="flex items-center gap-3 group">
          <img src="/assets/original/logo.jpeg" alt="Naja Safety logo" className="h-9 w-9 object-contain rounded-sm" />
          <span className="font-display font-extrabold uppercase tracking-wide text-lg leading-none">
            Naja<span className="text-[var(--hazard)]"> Safety</span>
            <span className="block font-mono2 text-[8px] tracking-[0.3em] text-[var(--paper-faint)] font-normal">EST. 2005 · JOHOR BAHRU</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 font-mono2 text-[11px] uppercase tracking-[0.14em]">
          {NAV.slice(1, 7).map((n) => (
            <a key={n.href} href={n.href} className={`u-sweep ${route === n.href ? 'text-[var(--hazard)]' : 'text-[var(--paper-dim)] hover:text-[var(--paper)]'}`}>
              {n.label}
            </a>
          ))}
          <a href={WA_LINK('Hello Naja Safety, I would like to make an enquiry.')} target="_blank" rel="noreferrer" className="btn-hazard !py-2 !px-4">WhatsApp Us</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden font-mono2 text-xs uppercase tracking-widest border border-[var(--line)] px-4 py-2">
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden bg-[var(--ink-2)] border-t border-[var(--line)] px-5 py-4 flex flex-col gap-3 font-mono2 text-sm uppercase tracking-widest">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={route === n.href ? 'text-[var(--hazard)]' : 'text-[var(--paper-dim)]'}>{n.label}</a>
          ))}
          <a href={WA_LINK('Hello Naja Safety, I would like to make an enquiry.')} target="_blank" rel="noreferrer" className="btn-hazard justify-center mt-2">WhatsApp Us</a>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink-2)] relative noise">
      <div className="hazard-tape h-3 w-full" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/original/logo.jpeg" alt="Naja Safety" className="h-10 w-10 object-contain" />
              <span className="font-display font-extrabold uppercase text-xl">Naja<span className="text-[var(--hazard)]"> Safety</span></span>
            </div>
            <p className="text-[var(--paper-dim)] text-sm leading-relaxed">{SITE.tagline}</p>
            <p className="font-mono2 text-[10px] text-[var(--paper-faint)] mt-4 tracking-wider">OSHA-aligned safety training and consultancy. Since 2005.<br />Trainer Registration Profile Serial: 62976</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm text-[var(--paper-dim)]">
              {[['Home', '#/'], ['Services', '#/services'], ['Courses', '#/courses'], ['About', '#/about'], ['Locations', '#/locations'], ['Contact', '#/contact'], ['Articles', '#/articles']].map(([l, h]) => (
                <li key={h}><a href={h} className="u-sweep hover:text-[var(--paper)]">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Services</p>
            <ul className="space-y-2 text-sm text-[var(--paper-dim)]">
              <li><a href="#/services" className="u-sweep hover:text-[var(--paper)]">OSH Training</a></li>
              <li><a href="#/services" className="u-sweep hover:text-[var(--paper)]">CIDB Safety</a></li>
              <li><a href="#/services" className="u-sweep hover:text-[var(--paper)]">Consultancy</a></li>
              <li><a href="#/services" className="u-sweep hover:text-[var(--paper)]">HRD Corp Support</a></li>
              <li><a href="#/services" className="u-sweep hover:text-[var(--paper)]">OSH Monitoring & Assessments</a></li>
              <li><a href="#/guide" className="u-sweep hover:text-[var(--paper)]">Training Guide</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-[var(--paper-dim)]">
              <li>Hotline: <a href="tel:0167301802" className="text-[var(--paper)]">{SITE.phone}</a></li>
              <li><a href={WA_LINK('Hello Naja Safety.')} target="_blank" rel="noreferrer" className="u-sweep text-[var(--hazard)]">WhatsApp Us</a></li>
              <li><a href="mailto:najasafety@gmail.com" className="u-sweep">{SITE.email}</a></li>
              <li className="leading-relaxed">{SITE.address}</li>
            </ul>
            <p className="eyebrow mt-6 mb-3">Legal</p>
            <div className="flex gap-4 font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">
              <a href="#/privacy" className="u-sweep">Privacy</a>
              <a href="#/terms" className="u-sweep">Terms</a>
              <a href="#/cookies" className="u-sweep">Cookies</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--line)] mt-12 pt-6 font-mono2 text-[10px] text-[var(--paper-faint)] leading-relaxed tracking-wide">
          <p>Naja Safety | Business Reg: 200603041203 (JM0449867-U) | CIDB Perakuan Pentauliahan (SICW only): PLSICW20231022-068, valid to 17 July 2027 · HRD Corp Accredited Trainer: James Issachar, ID 62976</p>
          <p className="mt-2">{SITE.address}</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <span>© Naja Safety. All rights reserved.</span>
            <span className="text-[var(--hazard)]/70">MEDIA REGISTER: items marked “AI-GENERATED VISUAL” are synthetic illustrations. All photographs, videos, logo and badges marked “ORIGINAL” are from the Naja Safety archive.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <a
      href={WA_LINK('Hello Naja Safety, I would like to make an enquiry.')}
      target="_blank" rel="noreferrer"
      className="fixed bottom-5 right-5 z-[85] group flex items-center gap-3"
      aria-label="Chat on WhatsApp"
    >
      <span className="hidden md:block font-mono2 text-[10px] uppercase tracking-[0.15em] bg-[var(--ink-2)] border border-[var(--line)] px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Chat on WhatsApp
      </span>
      <span className="hazard-tape p-[3px]">
        <span className="bg-[var(--ink)] w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[var(--hazard)]"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.03c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>
        </span>
      </span>
    </a>
  )
}

/** Shared closing CTA */
export function ClosingCTA({ title, body, primary = 'Send an Enquiry', note }: { title: string; body: string; primary?: string; note?: string }) {
  return (
    <section className="relative border-t border-[var(--line)] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/ai/texture-dark.jpg')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-transparent to-[var(--ink)]" />
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
        <p className="eyebrow mb-6">/// Final Transmission</p>
        <h2 className="text-display text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">{title}</h2>
        <p className="text-[var(--paper-dim)] max-w-2xl mx-auto mt-6 leading-relaxed">{body}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a href="#/contact" className="btn-hazard">{primary} →</a>
          <a href={WA_LINK('Hello Naja Safety, I would like to get started.')} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
          <a href={`mailto:${SITE.email}`} className="btn-ghost">Email {SITE.email}</a>
        </div>
        <p className="font-mono2 text-[10px] text-[var(--paper-faint)] mt-8 tracking-wider uppercase">
          {note ?? 'We reply within one business day. For fastest response, message Naja Safety directly on WhatsApp.'}
        </p>
        <p className="font-mono2 text-[9px] text-[var(--paper-faint)] mt-3">
          By contacting us, you consent to Naja Safety processing your data per the Malaysian Personal Data Protection Act 2010.
        </p>
      </div>
    </section>
  )
}
