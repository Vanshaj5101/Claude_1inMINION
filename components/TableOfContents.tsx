'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface TocSection {
  id: string
  label: string
}

function getStatus(pct: number): string {
  if (pct === 0)   return 'Awaiting orders'
  if (pct < 50)    return 'Training in progress'
  if (pct < 100)   return 'Almost there!'
  return 'Mission complete!'
}

export default function TableOfContents({
  sections,
  checked,
}: {
  sections: TocSection[]
  checked?: boolean[]
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')
  const [celebrate, setCelebrate] = useState(false)
  const [prevPct, setPrevPct] = useState(0)

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        entries => { entries.forEach(e => { if (e.isIntersecting) setActiveId(id) }) },
        { rootMargin: '-10% 0px -65% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  const done  = checked ? checked.filter(Boolean).length : 0
  const total = checked ? checked.length : 0
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0

  useEffect(() => {
    if (pct === 100 && prevPct < 100) {
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 900)
    }
    setPrevPct(pct)
  }, [pct])

  const glowIntensity = pct === 0 ? 0 : pct < 50 ? 0.3 : pct < 100 ? 0.55 : 0.85

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="hidden xl:flex fixed flex-col gap-1"
      style={{ top: 128, right: 'calc(50% - 576px)', zIndex: 40, maxWidth: 168, pointerEvents: 'none' }}
      aria-label="On this page"
    >
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 700, pointerEvents: 'none' }}
      >
        On this page
      </p>

      {sections.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-left transition-all duration-200"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              opacity: isActive ? 1 : 0.45,
              paddingLeft: isActive ? 10 : 6,
              paddingTop: 4,
              paddingBottom: 4,
              borderTop: 'none',
              borderRight: 'none',
              borderBottom: 'none',
              borderLeft: isActive ? '2px solid var(--yellow)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              lineHeight: 1.4,
              pointerEvents: 'auto',
              transition: 'all 200ms ease',
            }}
          >
            {label}
          </button>
        )
      })}

      {/* ── Mission Progress Widget ── */}
      {checked && (
        <div
          style={{
            marginTop: 20,
            borderRadius: 6,
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderTop: `2px solid ${pct === 100 ? 'var(--green)' : 'var(--yellow)'}`,
            boxShadow: pct > 0 ? `0 2px 16px rgba(242,155,28,${glowIntensity * 0.25})` : 'none',
            overflow: 'hidden',
            transition: 'box-shadow 0.4s ease, border-top-color 0.4s ease',
            pointerEvents: 'none',
          }}
        >
          <div style={{ padding: '8px 10px 4px', fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', color: pct === 100 ? 'var(--green)' : 'var(--yellow)', transition: 'color 0.4s ease' }}>
            // LEVEL PROGRESS
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 8px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: `2.5px solid ${pct === 100 ? 'var(--green)' : 'var(--yellow)'}`,
              boxShadow: `0 0 0 ${Math.round(glowIntensity * 6)}px rgba(242,155,28,${glowIntensity * 0.2}), 0 0 ${Math.round(glowIntensity * 18)}px rgba(242,155,28,${glowIntensity * 0.3})`,
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--yellow-light)',
              transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
              animation: celebrate ? 'minionCelebrate 0.9s ease' : 'none',
            }}>
              <Image src="/minion_img.png" alt="Minion" width={46} height={46} style={{ objectFit: 'contain' }} />
            </div>
          </div>

          <div style={{ padding: '0 10px 4px' }}>
            <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-tertiary, #F3F4F6)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`, borderRadius: 999,
                background: pct === 100 ? 'var(--green)' : 'linear-gradient(90deg, #f29b1c, #F97316)',
                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.4s ease',
                boxShadow: pct > 0 ? '0 0 6px rgba(242,155,28,0.5)' : 'none',
              }} />
            </div>
          </div>

          <div style={{ padding: '4px 10px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)' }}>{done}/{total} done</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1, transition: 'color 0.4s ease' }}>{pct}%</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: pct === 100 ? 'var(--green)' : 'var(--text-muted)', letterSpacing: '0.06em', lineHeight: 1.3, transition: 'color 0.4s ease' }}>
              {getStatus(pct)}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes minionCelebrate {
          0%   { transform: scale(1) rotate(0deg); }
          20%  { transform: scale(1.22) rotate(-8deg); }
          40%  { transform: scale(1.18) rotate(8deg); }
          60%  { transform: scale(1.15) rotate(-5deg); }
          80%  { transform: scale(1.1) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </nav>
  )
}
