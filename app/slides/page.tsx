'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// ─── Slide content ────────────────────────────────────────────────────────────
// Edit text here. Components and layout live below.
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  // ── 01. Title ────────────────────────────────────────────────────────────────
  {
    eyebrow: 'NOVUS CONNECT',
    title: 'AI Hackathon',
    isTitle: true,
    subtitle: 'Every great heist starts with a well-trained Minion.',
    body: null,
  },

  // ── 02. Opportunity & Objectives ─────────────────────────────────────────────
  {
    eyebrow: 'AI HACKATHON',
    title: 'Opportunity & Objectives',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 800 }}>Opportunity</span>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            AI tools are reshaping how we work, but fluency across Learning Enterprise varies widely.
            This hackathon gives every staff member, regardless of their starting point, a hands-on
            entry point into the evolution of modern AI use and a clearer view of how it fits their role.
          </p>
        </div>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 800 }}>Learning Objectives</span>
          <p style={{ marginTop: 6, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            By the end of the session, participants will be able to:
          </p>
          <ol style={{ marginTop: 10, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Apply core <span style={{ color: '#f29b1c', fontWeight: 700 }}>Prompt Engineering principles</span> (role, context, task, format, and constraints) to write more effective AI prompts.</li>
            <li><span style={{ color: '#f29b1c', fontWeight: 700 }}>Build and use a Custom GPT</span> trained for a specific job so AI delivers consistent, specialist output every time.</li>
            <li><span style={{ color: '#f29b1c', fontWeight: 700 }}>Identify at least one realistic opportunity</span> to embed AI into your workflows, systems, or recurring responsibilities.</li>
            <li><span style={{ color: '#f29b1c', fontWeight: 700 }}>Evaluate AI-generated outputs with a critical lens</span>, recognizing strengths, limitations, and responsible-use considerations.</li>
          </ol>
        </div>
      </div>
    ),
  },

  // ── 03. Activity Overview ─────────────────────────────────────────────────────
  {
    eyebrow: 'HEIST TO THE SUN',
    title: 'Activity Overview',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
          The moon heist failed. GRU is not done. This time the target is bigger - we steal the Sun.
          Your mission: train an AI Minion, analyze 374 previous heist records, and build a mission plan
          worthy of Villain HQ.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { num: '01', title: 'Talk to Your Minion', concept: 'Prompt Engineering', time: '20 min', color: '#f29b1c' },
            { num: '02', title: 'Arm Your Minion', concept: 'Custom GPTs', time: '25 min', color: '#8B5CF6' },
            { num: '03', title: 'The Mission Plan', concept: 'Custom GPTs', time: '15 min', color: '#3B82F6' },
          ].map(l => (
            <div key={l.num} style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${l.color}44`,
              borderTop: `3px solid ${l.color}`,
              borderRadius: 12,
              padding: '16px',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>LEVEL {l.num}</span>
              <p style={{ margin: '6px 0 4px', color: 'white', fontWeight: 700, fontSize: 15 }}>{l.title}</p>
              <p style={{ margin: 0, color: l.color, fontSize: 12, fontWeight: 600 }}>{l.concept}</p>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{l.time}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── 04. Level 1 ──────────────────────────────────────────────────────────────
  {
    eyebrow: 'HEIST TO THE SUN',
    title: 'Level 01 - Talk to Your Minion',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ background: '#f29b1c22', border: '1px solid #f29b1c66', borderRadius: 8, padding: '4px 12px', color: '#f29b1c', fontWeight: 700, fontSize: 13 }}>Prompt Engineering</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>20 min</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          Apply core prompt engineering principles to get more effective, consistent outputs from AI.
          Because a well-trained Minion starts with a well-structured order.
        </p>
      </div>
    ),
  },

  // ── 05. Level 2 ──────────────────────────────────────────────────────────────
  {
    eyebrow: 'HEIST TO THE SUN',
    title: 'Level 02 - Arm Your Minion',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ background: '#8B5CF622', border: '1px solid #8B5CF666', borderRadius: 8, padding: '4px 12px', color: '#8B5CF6', fontWeight: 700, fontSize: 13 }}>Custom GPTs</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>25 min</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          Custom GPTs give AI a permanent specialty - no re-briefing, no guessing, same quality every time.
          Arm your Minion with real data and watch them become the smartest strategist in the room.
        </p>
      </div>
    ),
  },

  // ── 06. Level 3 ──────────────────────────────────────────────────────────────
  {
    eyebrow: 'HEIST TO THE SUN',
    title: 'Level 03 - The Mission Plan',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ background: '#3B82F622', border: '1px solid #3B82F666', borderRadius: 8, padding: '4px 12px', color: '#3B82F6', fontWeight: 700, fontSize: 13 }}>Custom GPTs</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>15 min</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          See how a well-built specialist GPT takes your inputs and produces something structured,
          beautiful, and ready to use - without you writing a single extra instruction.
        </p>
      </div>
    ),
  },

  // ── 07. AI in Your Work ───────────────────────────────────────────────────────
  {
    eyebrow: 'BEYOND THE MISSION',
    title: 'Integrating AI in Your Work',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          The heist was practice. Now the real mission starts.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
          AI fits into the workflows, systems, and recurring tasks you already own - helping you
          move faster, stay consistent, and scale what you do best. The next step is figuring out
          exactly where it belongs for you.
        </p>
        <div style={{ background: 'rgba(242,155,28,0.08)', border: '1px solid rgba(242,155,28,0.25)', borderLeft: '4px solid #f29b1c', borderRadius: 8, padding: '16px' }}>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Your next move:</span>
          <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            Go to the <span style={{ color: '#f29b1c', fontWeight: 700 }}>Beyond the Mission</span> page on the website.
            Answer 5 quick questions about your role and tasks.
            A personalised AI prompt will be generated for you - copy it into ChatGPT and
            discover where AI can save you the most time.
          </p>
        </div>
      </div>
    ),
  },

  // ── 08. Exit Ticket ───────────────────────────────────────────────────────────
  {
    eyebrow: 'EXIT TICKET',
    title: 'Hackathon Exit Ticket',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Directions:</span>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            Please complete the exit ticket below. Submit one form per working group.
            Your responses will help identify themes for AI integration, usage, and
            opportunities for training and support.
          </p>
        </div>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Include:</span>
          <ul style={{ marginTop: 8, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 6, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Both names (partners)</li>
            <li>Select your team</li>
            <li>List 1 to 2 ways AI can be incorporated in your work. If partners have different roles, please list 1 to 2 ways for each role.</li>
          </ul>
        </div>
        <a href="https://forms.gle/v6DAhEfZg7LxgJMK6" target="_blank" rel="noopener noreferrer" style={{ color: '#f29b1c', fontWeight: 700, fontSize: 18, marginTop: 8, display: 'inline-block' }}>forms.gle/v6DAhEfZg7LxgJMK6 ↗</a>
      </div>
    ),
  },

  // ── 09. Share Out ─────────────────────────────────────────────────────────────
  {
    eyebrow: 'MISSION DEBRIEF',
    title: 'Share Out',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          Use the link below to access our{' '}
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Mission Complete Padlet</span>{' '}
          and add your intel.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
          Share a key takeaway, an a-ha moment, something that surprised you, or a question
          you are still sitting with. Read what others post and steal an idea or two for yourself.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 8 }}>
          {[
            { label: 'A-Ha Moments', desc: 'Your biggest realisation from today' },
            { label: 'Plot Twists', desc: 'Something that surprised or shocked you' },
            { label: 'Curious Minions', desc: 'Questions you are still sitting with' },
            { label: 'Go Bananas!', desc: 'Ideas you want to explore after today' },
          ].map(col => (
            <div key={col.label} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 10,
              padding: '12px 14px',
            }}>
              <p style={{ margin: 0, color: '#f29b1c', fontWeight: 700, fontSize: 14 }}>{col.label}</p>
              <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{col.desc}</p>
            </div>
          ))}
        </div>
        <a href="https://padlet.com/jcampb70/mission-complete-report-back-to-gru-8q5oc67etz2c0yay" target="_blank" rel="noopener noreferrer" style={{ color: '#f29b1c', fontWeight: 700, fontSize: 18, marginTop: 8, display: 'inline-block' }}>padlet.com/jcampb70/mission-complete… ↗</a>
      </div>
    ),
  },

  // ── 10. Wrap Up ───────────────────────────────────────────────────────────────
  {
    eyebrow: 'A MINION THANKS',
    title: 'Wrap Up',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Today you:</span>
          <ul style={{ marginTop: 10, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Learned to write prompts that actually work - not just hope for the best.</li>
            <li>Built a Custom GPT trained on real data and used it to find insights nobody spotted manually.</li>
            <li>Used a specialist GPT to turn a data debrief into a beautiful, usable plan.</li>
            <li>Identified where AI fits your actual work - not just a fictional heist.</li>
            <li>Shared your discoveries with the team and captured ideas for what comes next.</li>
          </ul>
        </div>
        <div style={{ background: 'rgba(242,155,28,0.08)', border: '1px solid rgba(242,155,28,0.25)', borderRadius: 12, padding: '20px 24px', marginTop: 8, textAlign: 'center' as const }}>
          <p style={{ fontStyle: 'italic', fontWeight: 700, color: '#f29b1c', fontSize: 22, margin: 0 }}>
            Go forth, scheme boldly, and aim for the sun.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '12px 0 0', fontStyle: 'italic' }}>
            Despicably Yours, The 1inMINION Team
          </p>
        </div>
      </div>
    ),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

const TOTAL = SLIDES.length

export default function SlidesPage() {
  const [current, setCurrent] = useState(0)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(TOTAL - 1, c + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const isTitleSlide = current === 0

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#060a16' }}>

      {/* Photo background - title slide only */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.62) 100%), url(/hero_bg3.png)',
        backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat',
        opacity: isTitleSlide ? 1 : 0,
        transition: 'opacity 0.55s ease',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Dark gradient - content slides */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(155deg, #0d1730 0%, #080d1c 55%, #04060f 100%)',
        opacity: isTitleSlide ? 0 : 1,
        transition: 'opacity 0.55s ease',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Slides track */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <div style={{
          display: 'flex',
          width: `${TOTAL * 100}%`,
          height: '100%',
          transform: `translateX(-${current * (100 / TOTAL)}%)`,
          transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}>
          {SLIDES.map((s, i) => (
            <div key={i} style={{
              width: `${100 / TOTAL}%`, height: '100%', flexShrink: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: s.isTitle ? 'center' : 'flex-start',
              justifyContent: 'center',
              padding: '60px 8vw 80px',
              overflowY: 'auto',
            }}>
              <div style={{
                maxWidth: 820, width: '100%',
                display: 'flex', flexDirection: 'column',
                gap: s.isTitle ? 20 : 24,
                textAlign: s.isTitle ? 'center' : 'left',
              }}>
                {/* Eyebrow */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11, letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  fontWeight: 700,
                  color: s.isTitle ? 'rgba(255,255,255,0.65)' : '#1F2937',
                  background: s.isTitle ? 'transparent' : 'var(--yellow)',
                  padding: s.isTitle ? '0' : '4px 10px',
                  borderRadius: s.isTitle ? 0 : 4,
                  alignSelf: s.isTitle ? 'center' : 'flex-start',
                }}>
                  {s.eyebrow}
                </span>

                {/* Title */}
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400, lineHeight: 1.05, margin: 0,
                  ...(s.isTitle ? {
                    fontSize: 'clamp(64px, 11vw, 140px)',
                    background: 'linear-gradient(135deg, #f29b1c, #F97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  } : {
                    fontSize: 'clamp(32px, 4.5vw, 56px)',
                    color: '#F3F4F6',
                  }),
                }}>
                  {s.title}
                </h1>

                {/* Subtitle (title slide only) */}
                {s.isTitle && s.subtitle && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, fontStyle: 'italic', fontWeight: 700, color: '#f29b1c', margin: 0 }}>
                    {s.subtitle}
                  </p>
                )}

                {/* Body */}
                {s.body && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 16 }}>
                    {s.body}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <Link href="/" style={{
        position: 'fixed', top: 20, left: 20,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 16px',
        background: 'var(--yellow)',
        border: 'none', borderRadius: 8,
        color: '#1F2937',
        fontFamily: 'var(--font-mono)',
        fontSize: 11, fontWeight: 700,
        letterSpacing: '0.1em',
        textDecoration: 'none', zIndex: 20,
      }}>
        <ArrowLeft size={13} />
        BACK TO MISSION
      </Link>

      {/* Slide counter */}
      <div style={{
        position: 'fixed', top: 20, right: 20,
        fontFamily: 'var(--font-mono)',
        fontSize: 11, fontWeight: 700,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.1em',
        zIndex: 20,
      }}>
        {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </div>

      {/* Prev arrow */}
      {current > 0 && (
        <button onClick={prev} aria-label="Previous slide" style={{
          position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)',
          color: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', transition: 'background 0.2s ease', zIndex: 10,
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next arrow */}
      {current < TOTAL - 1 && (
        <button onClick={next} aria-label="Next slide" style={{
          position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.40)',
          color: 'var(--yellow)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', transition: 'background 0.2s ease', zIndex: 10,
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.15)')}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      <div style={{
        position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 10, alignItems: 'center', zIndex: 10,
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {hoveredDot === i && (
              <div style={{
                position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.85)', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '5px 9px', borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.12)',
                pointerEvents: 'none',
              }}>
                {s.title}
              </div>
            )}
            <button
              onClick={() => setCurrent(i)}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              style={{
                width: 10, height: 10, borderRadius: '50%',
                background: i === current ? 'var(--yellow)' : 'rgba(255,255,255,0.30)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'background 0.3s ease', flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>

    </main>
  )
}
