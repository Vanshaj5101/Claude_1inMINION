'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const LEVELS = [1, 2, 3, 4]
const LEVEL_LABELS = ['Talk to Your Minion', 'Arm Your Minion', 'Upgrade Your Minion', 'Give Minion the Wheel']

export default function Navigation() {
  const pathname = usePathname()
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('completedLevels') || '[]') as number[]
    setCompletedLevels(stored)
  }, [pathname])

  const isHomePage  = pathname === '/' || pathname === '/onboarding'
  const levelMatch  = pathname.match(/^\/level\/(\d+)/)
  const currentLevel = levelMatch ? parseInt(levelMatch[1]) : null
  const isLevelPage  = currentLevel !== null

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height: 72,
        background: isHomePage ? 'transparent' : 'var(--bg-primary)',
        borderBottom: isHomePage ? 'none' : '1px solid var(--border)',
        boxShadow: isHomePage ? 'none' : 'var(--shadow-xs)',
      }}
    >
      {/* Left: brand */}
      <Link
        href="/"
        className="flex items-center gap-2"
        style={{ textDecoration: 'none', color: 'var(--text-primary)', flexShrink: 0 }}
      >
        <Image src="/1inMINION.png" alt="1inMINION" width={160} height={60} style={{ objectFit: 'contain' }} />
      </Link>

      {/* Center: level progress track — level pages only */}
      {isLevelPage && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ width: 'calc(100% - 460px)', maxWidth: 740 }}
        >
          {/* Connector lines — positioned relative to full track, circle-center to circle-center */}
          <div style={{ position: 'relative', height: 40 }}>
            {[0, 1, 2].map(idx => {
              const nextReached = completedLevels.includes(idx + 2) || (idx + 2) === currentLevel
              return (
                <div key={idx} style={{
                  position: 'absolute',
                  top: 19,
                  left: `calc(${12.5 + idx * 25}% + 20px)`,
                  width: `calc(25% - 40px)`,
                  height: 2,
                  background: nextReached
                    ? 'linear-gradient(to right, var(--yellow-muted), rgba(255,215,0,0.35))'
                    : 'var(--border)',
                  borderRadius: 1,
                  transition: 'background 0.3s ease',
                  zIndex: 0,
                }} />
              )
            })}

            {/* Circles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', height: '100%', position: 'relative', zIndex: 1 }}>
              {LEVELS.map((n, idx) => {
                const isCompleted = completedLevels.includes(n)
                const isCurrent   = n === currentLevel
                const isHovered   = hoveredLevel === n

                return (
                  <div key={n} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {/* Circle node */}
                    <div
                      onMouseEnter={() => setHoveredLevel(n)}
                      onMouseLeave={() => setHoveredLevel(null)}
                    >
                      <Link
                        href={`/level/${n}`}
                        aria-label={`Level ${n} of 4`}
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          border: isCurrent ? '2.5px solid var(--yellow)' : isCompleted ? '2.5px solid var(--yellow)' : '2px solid var(--border)',
                          background: isCurrent ? 'var(--yellow-light)' : isCompleted ? 'rgba(242,155,28,0.10)' : 'var(--bg-secondary)',
                          boxShadow: isCurrent ? '0 0 0 3px rgba(255,215,0,0.2)' : isHovered ? '0 0 0 4px rgba(255,215,0,0.25)' : 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'box-shadow 0.2s ease',
                          overflow: 'hidden',
                        }}>
                          {isCurrent ? (
                            <Image src="/minion_img.png" alt="minion" width={26} height={26}
                              style={{
                                objectFit: 'contain',
                                borderRadius: '50%',
                                transform: isHovered ? 'scale(1.35)' : 'scale(1)',
                                transition: 'transform 0.2s ease',
                              }} />
                          ) : isCompleted ? (
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                              <path d="M4 3v18" stroke="#f29b1c" strokeWidth="2.2" strokeLinecap="round"/>
                              <path d="M4 4 L18 8 L4 13 Z" fill="#f29b1c"/>
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Labels row — grid mirrors circles grid for perfect alignment */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 4 }}>
            {LEVELS.map((n, idx) => {
              const isCompleted = completedLevels.includes(n)
              const isCurrent   = n === currentLevel
              return (
                <span key={n} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? 'var(--yellow-muted)' : isCompleted ? 'var(--yellow-muted)' : 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  textAlign: 'center', display: 'block',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  padding: '0 4px',
                }}>
                  {LEVEL_LABELS[idx]}
                </span>
              )
            })}
          </div>
        </div>
      )}

    </nav>
  )
}
