import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Fade + rise on scroll into view */
export function Reveal({ children, delay = 0, y = 40, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y }, {
      opacity: 1, y: 0, duration: 1, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
  }, [delay, y])
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>
}

/** Character-by-character scrubbed reveal — signature editorial move */
export function CharReveal({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll('span')
    gsap.fromTo(chars, { opacity: 0.08 }, {
      opacity: 1, stagger: 0.4, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true },
    })
  }, [text])
  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split('').map((c, i) => (
        <span key={i} style={{ whiteSpace: 'pre' }} aria-hidden>{c}</span>
      ))}
    </p>
  )
}

/** Animated counter */
export function Counter({ to, suffix = '', prefix = '', className = '', duration = 1.6, plain = false }: { to: number; suffix?: string; prefix?: string; className?: string; duration?: number; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    gsap.to(obj, {
      v: to, duration, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => { el.textContent = `${prefix}${plain ? String(Math.round(obj.v)) : Math.round(obj.v).toLocaleString()}${suffix}` },
    })
  }, [to, suffix, prefix, duration, plain])
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}

/** Horizontal marquee strip */
export function Marquee({ items, fast = false, className = '' }: { items: string[]; fast?: boolean; className?: string }) {
  const row = items.concat(items)
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-6 pr-6">
            <span>{t}</span>
            <span className="text-[var(--hazard)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Scroll progress hazard bar */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    })
  }, [])
  return <div ref={ref} className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--hazard)] origin-left scale-x-0 z-[90]" />
}
