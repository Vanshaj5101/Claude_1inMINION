'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const LEVELS = [1, 2, 3, 4, 5]
const LEVEL_LABELS = ['Talk to Your Minion', 'Arm Your Minion', 'The Mission Plan', 'Beyond the Mission', 'Mission Debrief']

export default function Navigation() {
  const pathname = usePathname()
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('completedLevels') || '[]') as number[]
    setCompletedLevels(stored)
  }, [pathname])

  // Must come AFTER all hooks — an early return before a hook violates the
  // Rules of Hooks and crashes the re-render when navigating away from /slides.
  if (pathname === '/slides') return null

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

      {/* Right: menu */}
      <div ref={menuRef} style={{ flexShrink: 0, position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(242,155,28,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 14px rgba(242,155,28,0.4)' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#1F2937',
            background: 'var(--yellow)',
            border: 'none',
            padding: '9px 20px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 3px 14px rgba(242,155,28,0.4)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          MENU
          {/* Hamburger lines */}
          <span style={{ display: 'flex', flexDirection: 'column', gap: 3.5, flexShrink: 0 }}>
            <span style={{ display: 'block', width: 14, height: 1.5, background: '#1F2937', borderRadius: 1 }} />
            <span style={{ display: 'block', width: 10, height: 1.5, background: '#1F2937', borderRadius: 1 }} />
            <span style={{ display: 'block', width: 14, height: 1.5, background: '#1F2937', borderRadius: 1 }} />
          </span>
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              minWidth: 200,
              background: isHomePage ? 'rgba(8,12,24,0.97)' : 'var(--bg-primary)',
              border: isHomePage ? '1px solid rgba(242,155,28,0.3)' : '1px solid var(--border)',
              borderTop: '2px solid var(--yellow)',
              borderRadius: 10,
              boxShadow: isHomePage
                ? '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(242,155,28,0.1)'
                : '0 8px 32px rgba(0,0,0,0.14)',
              overflow: 'hidden',
              zIndex: 100,
              backdropFilter: isHomePage ? 'blur(16px)' : 'none',
            }}
          >
            <div style={{
              padding: '8px 16px 6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'var(--yellow)',
              borderBottom: isHomePage ? '1px solid rgba(242,155,28,0.15)' : '1px solid var(--border)',
            }}>
              // NAVIGATE
            </div>

            <Link href="/slides" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ padding: '13px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: isHomePage ? 'rgba(255,255,255,0.9)' : 'var(--text-primary)', borderBottom: isHomePage ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s ease, color 0.15s ease', display: 'flex', alignItems: 'center', gap: 10 }}
                onMouseEnter={e => { e.currentTarget.style.background = isHomePage ? 'rgba(242,155,28,0.1)' : 'rgba(242,155,28,0.06)'; e.currentTarget.style.color = 'var(--yellow)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isHomePage ? 'rgba(255,255,255,0.9)' : 'var(--text-primary)' }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--yellow)', flexShrink: 0 }} />
                SLIDE DECK
              </div>
            </Link>

            <Link href="/level/1" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ padding: '13px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: isHomePage ? 'rgba(255,255,255,0.9)' : 'var(--text-primary)', cursor: 'pointer', transition: 'background 0.15s ease, color 0.15s ease', display: 'flex', alignItems: 'center', gap: 10 }}
                onMouseEnter={e => { e.currentTarget.style.background = isHomePage ? 'rgba(242,155,28,0.1)' : 'rgba(242,155,28,0.06)'; e.currentTarget.style.color = 'var(--yellow)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isHomePage ? 'rgba(255,255,255,0.9)' : 'var(--text-primary)' }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--yellow)', flexShrink: 0 }} />
                ACTIVITY
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Center: level progress track — level pages only */}
      {isLevelPage && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ width: 'calc(100% - 460px)', maxWidth: 740 }}
        >
          {/* Connector lines — positioned relative to full track, circle-center to circle-center */}
          <div style={{ position: 'relative', height: 40 }}>
            {[0, 1, 2, 3].map(idx => {
              const nextReached = completedLevels.includes(idx + 2) || (idx + 2) === currentLevel
              return (
                <div key={idx} style={{
                  position: 'absolute',
                  top: 19,
                  left: `calc(${10 + idx * 20}% + 18px)`,
                  width: `calc(20% - 36px)`,
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', height: '100%', position: 'relative', zIndex: 1 }}>
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
                        aria-label={`Level ${n} of 3`}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', marginTop: 4 }}>
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
