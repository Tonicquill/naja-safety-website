import { useState } from 'react'
import type { ReactNode } from 'react'
import { Reveal } from './motion'
import { AssetTag } from './chrome'

export function SectionHead({ index, eyebrow, title, sub }: { index?: string; eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4 mb-4">
        {index && <span className="font-mono2 text-[10px] text-[var(--paper-faint)] tracking-widest">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="text-display text-4xl md:text-6xl max-w-4xl">{title}</h2>
      {sub && <p className="text-[var(--paper-dim)] mt-5 max-w-2xl leading-relaxed">{sub}</p>}
    </Reveal>
  )
}

export function PageHero({ crumb, badge, title, sub, image, ai }: { crumb: string; badge: string; title: ReactNode; sub?: string; image?: string; ai?: boolean }) {
  return (
    <section className="relative pt-40 pb-20 border-b border-[var(--line)] overflow-hidden noise">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[rgba(11,12,26,0.6)] to-[rgba(11,12,26,0.7)]" />
          {ai && <AssetTag kind="AI" />}
        </div>
      )}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[var(--paper-faint)]">{crumb}</p>
        <p className="eyebrow mt-6 mb-4 inline-block border border-[var(--hazard)]/40 px-3 py-1">/// {badge}</p>
        <h1 className="text-display text-5xl md:text-7xl max-w-5xl">{title}</h1>
        {sub && <p className="text-[var(--paper-dim)] mt-6 max-w-2xl leading-relaxed">{sub}</p>}
      </div>
    </section>
  )
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
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
