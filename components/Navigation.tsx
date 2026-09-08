'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Linkedin, Globe } from 'lucide-react'
import { landingContent } from '@/content/landing'
import { trackEvent } from '@/lib/analytics'

const LEVELS = [1, 2, 3, 4]
const LEVEL_LABELS = ['Talk to Your Minion', 'Arm Your Minion', 'Upgrade Your Minion', 'Give Minion the Wheel']

export default function Navigation() {
  const pathname = usePathname()
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('completedLevels') || '[]') as number[]
    setCompletedLevels(stored)
  }, [pathname])

  const isHomePage  = pathname === '/' || pathname === '/onboarding'
  const levelMatch  = pathname.match(/^\/level\/(\d+)/)
  const currentLevel = levelMatch ? parseInt(levelMatch[1]) : null
  const isLevelPage  = currentLevel !== null
  const connect      = landingContent.connect

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


      {/* Right: connect — label plus two direct links, no dropdown */}
      <div className="connect-btn" style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--yellow)',
        borderRadius: 999,
        padding: '5px 8px 5px 5px',
        animation: 'connectHalo 2.8s ease-in-out infinite',
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
          background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Image
            src="/minion_img.png"
            alt=""
            width={28}
            height={28}
            className="connect-avatar"
            style={{ objectFit: 'contain', animation: 'connectNudge 5s ease-in-out infinite' }}
          />
        </span>

        <span
          className="hidden sm:inline"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: '#1F2937', whiteSpace: 'nowrap' }}
        >
          {connect.label}
        </span>

        <span style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.18)', flexShrink: 0 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {connect.links.map(link => {
            const Icon = link.id === 'linkedin' ? Linkedin : Globe
            const isHovered = hoveredLink === link.id
            return (
              <div key={link.id} style={{ position: 'relative' }}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.tooltip}
                  onClick={() => trackEvent(`click_${link.id}`, { link_url: link.url })}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onFocus={() => setHoveredLink(link.id)}
                  onBlur={() => setHoveredLink(null)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1F2937',
                    background: isHovered ? 'rgba(0,0,0,0.14)' : 'transparent',
                    transition: 'background 0.15s ease, transform 0.15s ease',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={16} strokeWidth={2.2} />
                </a>

                {isHovered && (
                  <span
                    role="tooltip"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 9px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#1F2937',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '5px 9px',
                      borderRadius: 6,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
                      zIndex: 120,
                    }}
                  >
                    {link.tooltip}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

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
                    ? 'linear-gradient(to right, var(--yellow-muted), var(--rule-amber))'
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
                          background: isCurrent ? 'var(--yellow-light)' : isCompleted ? 'var(--tint-amber-hi)' : 'var(--bg-secondary)',
                          boxShadow: isCurrent ? '0 0 0 3px var(--tint-amber-hi)' : isHovered ? '0 0 0 4px var(--tint-amber-hi)' : 'none',
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
