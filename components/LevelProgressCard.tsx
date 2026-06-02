'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

function getStatus(pct: number): string {
  if (pct === 0)   return 'Awaiting orders'
  if (pct < 50)    return 'Training in progress'
  if (pct < 100)   return 'Almost there!'
  return 'Mission complete!'
}

export default function LevelProgressCard({
  checked,
}: {
  checked: boolean[]
}) {
  const [celebrate, setCelebrate] = useState(false)
  const [prevPct, setPrevPct] = useState(0)

  const done  = checked.filter(Boolean).length
  const total = checked.length
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0

  useEffect(() => {
    if (pct === 100 && prevPct < 100) {
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 900)
    }
    setPrevPct(pct)
  }, [pct])

  const glowIntensity = pct === 0 ? 0 : pct < 50 ? 0.3 : pct < 100 ? 0.55 : 0.85
  const accentColor   = pct === 100 ? 'var(--green)' : 'var(--yellow)'

  return (
    <div
      className="xl:hidden"
      style={{
        borderRadius: 6,
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderTop: `2px solid ${accentColor}`,
        boxShadow: pct > 0 ? `0 2px 16px rgba(242,155,28,${glowIntensity * 0.2})` : 'none',
        transition: 'box-shadow 0.4s ease, border-top-color 0.4s ease',
        overflow: 'hidden',
        maxWidth: 320,
      }}
    >
      {/* Header */}
      <div style={{ padding: '8px 12px 4px', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: pct === 100 ? 'var(--green)' : 'var(--yellow)', transition: 'color 0.4s ease' }}>
        // LEVEL PROGRESS
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 14px 14px' }}>
        {/* Minion avatar */}
        <div style={{
          width: 60, height: 60, borderRadius: '50%', flexShrink: 0,
          border: `2.5px solid ${accentColor}`,
          boxShadow: `0 0 0 ${Math.round(glowIntensity * 5)}px rgba(242,155,28,${glowIntensity * 0.15}), 0 0 ${Math.round(glowIntensity * 14)}px rgba(242,155,28,${glowIntensity * 0.25})`,
          overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--yellow-light)',
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
          animation: celebrate ? 'minionCelebrate 0.9s ease' : 'none',
        }}>
          <Image src="/minion_img.png" alt="Minion" width={48} height={48} style={{ objectFit: 'contain' }} />
        </div>

        {/* Right: bar + stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Bar */}
          <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-tertiary, #F3F4F6)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${pct}%`, borderRadius: 999,
              background: pct === 100 ? 'var(--green)' : 'linear-gradient(90deg, #f29b1c, #F97316)',
              transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.4s ease',
              boxShadow: pct > 0 ? '0 0 6px rgba(242,155,28,0.5)' : 'none',
            }} />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{done}/{total} done</span>
              <br />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: pct === 100 ? 'var(--green)' : 'var(--text-muted)', letterSpacing: '0.04em', transition: 'color 0.4s ease' }}>{getStatus(pct)}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1, transition: 'color 0.4s ease' }}>
              {pct}%
            </span>
          </div>
        </div>
      </div>

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
    </div>
  )
}
