'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { landingContent } from '@/content/landing'
import { levels } from '@/content/levels'
import { useMinionName } from '@/hooks/useMinionName'

const accentColor: Record<string, string> = {
  yellow: 'var(--yellow)',
  purple: 'var(--purple)',
  blue:   'var(--blue)',
  orange: 'var(--orange)',
}

const TOTAL = 4 // 4 slides: Backstory, Mission, Training Program, Name entry

export default function OnboardingCarousel() {
  const { story } = landingContent
  const searchParams = useSearchParams()
  const startSlide = Math.min(Math.max(parseInt(searchParams.get('slide') ?? '0', 10) || 0, 0), TOTAL - 1)
  const [current, setCurrent] = useState(startSlide)
  const [nameInput, setNameInput] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { saveMinionName } = useMinionName()
  const router = useRouter()

  const handleStartMission = () => {
    if (nameInput.trim()) saveMinionName(nameInput.trim())
    router.push('/level/1')
  }

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(TOTAL - 1, c + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const slideStyle: React.CSSProperties = {
    width: `${100 / TOTAL}%`,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 72,
    paddingLeft: 24,
    paddingRight: 24,
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

      {/* Slides track */}
      <div style={{
        display: 'flex',
        width: `${TOTAL * 100}%`,
        height: '100%',
        transform: `translateX(-${current * (100 / TOTAL)}%)`,
        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* ── Slide 1: Backstory ─────────────────────────────── */}
        <div style={slideStyle}>
          <div style={{ maxWidth: 680, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              {story.sectionLabel}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1.05, margin: 0 }}>
              {story.heading}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', fontWeight: 700, margin: 0 }}>
              {story.subheading}
            </p>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />
            {story.paragraphs.map((p, i) => {
              const isLast = i === story.paragraphs.length - 1
              return (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: isLast ? 18 : 16,
                  fontWeight: isLast ? 700 : 400,
                  color: isLast ? 'white' : 'rgba(255,255,255,0.72)',
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {p}
                </p>
              )
            })}
          </div>
        </div>

        {/* ── Slide 2: Mission ───────────────────────────────── */}
        <div style={slideStyle}>
          <div style={{ maxWidth: 680, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              {story.missionBox.label}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1.05, margin: 0 }}>
              {story.missionBox.heading}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
              {story.missionBox.description}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 700, color: 'white', lineHeight: 1.65, margin: 0 }}>
              {story.missionBox.highlight}
            </p>
          </div>
        </div>

        {/* ── Slide 3: Training Program ──────────────────────── */}
        <div style={slideStyle}>
          <div style={{ maxWidth: 1040, width: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              TRAINING PROGRAM
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'white', lineHeight: 1.1, margin: 0 }}>
              4 Levels. 70 Minutes. One Heist Plan.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, width: '100%' }}>
              {levels.map(level => {
                const accent = accentColor[level.color] ?? 'var(--yellow)'
                const isHovered = hoveredCard === level.number
                return (
                  <div
                    key={level.number}
                    onMouseEnter={() => setHoveredCard(level.number)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: isHovered ? 'rgba(6,10,22,0.85)' : 'rgba(6,10,22,0.60)',
                      borderTop: `3px solid ${accent}`,
                      borderRight: `1px solid ${isHovered ? accent : 'rgba(255,255,255,0.10)'}`,
                      borderBottom: `1px solid ${isHovered ? accent : 'rgba(255,255,255,0.10)'}`,
                      borderLeft: `1px solid ${isHovered ? accent : 'rgba(255,255,255,0.10)'}`,
                      borderRadius: 12,
                      padding: '20px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      cursor: 'default',
                      transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered ? `0 16px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}33` : 'none',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: isHovered ? accent : 'rgba(255,255,255,0.25)', lineHeight: 1, transition: 'color 0.25s ease' }}>{level.number}</span>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white', margin: 0, lineHeight: 1.2 }}>{level.title}</p>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: accent, fontWeight: 700, letterSpacing: '0.06em' }}>{level.concept}</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0, flex: 1 }}>{level.description}</p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: isHovered ? accent : 'rgba(255,255,255,0.65)', transition: 'color 0.25s ease' }}>⏱ {level.duration}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Slide 4: Ready ─────────────────────────────────── */}
        <div style={{ ...slideStyle, alignItems: 'center' }}>
          <div style={{ maxWidth: 680, width: '100%', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              READY TO TRAIN YOUR MINION?
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 88px)', color: 'white', lineHeight: 1.05, margin: 0 }}>
              Your Minion Awaits.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                Keep this page open alongside Claude throughout the session
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                Each level builds on the last. Do not skip ahead.
              </p>
            </div>

            {/* Name input */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Give your Minion a name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStartMission()}
                placeholder="KEVIN, BOB, STUART..."
                maxLength={24}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  padding: '14px 20px',
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  letterSpacing: '0.06em',
                  color: 'white',
                  outline: 'none',
                  textAlign: 'center',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--yellow)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
              />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <button
                onClick={handleStartMission}
                disabled={!nameInput.trim()}
                className="hero-cta"
                style={{
                  opacity: nameInput.trim() ? 1 : 0.4,
                  cursor: nameInput.trim() ? 'pointer' : 'not-allowed',
                  pointerEvents: nameInput.trim() ? 'auto' : 'none',
                }}
              >
                START THE MISSION
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Prev button ── */}
      {current > 0 && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)',
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* ── Next button ── */}
      {current < TOTAL - 1 && (
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.40)',
            color: 'var(--yellow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.15)')}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* ── Slide dots ── */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? 'var(--yellow)' : 'rgba(255,255,255,0.28)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div style={{
        position: 'absolute', bottom: 32, right: 28,
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)',
      }}>
        {current + 1} / {TOTAL}
      </div>

    </div>
  )
}
