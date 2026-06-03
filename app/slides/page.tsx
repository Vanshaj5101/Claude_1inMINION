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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, width: '100%' }}>
          {[
            { num: '01', title: 'Talk to Your Minion', concept: 'Prompt Engineering', time: '20 min', color: '#f29b1c' },
            { num: '02', title: 'Arm Your Minion', concept: 'Custom GPTs', time: '25 min', color: '#8B5CF6' },
            { num: '03', title: 'The Mission Plan', concept: 'Custom GPTs', time: '15 min', color: '#3B82F6' },
            { num: '04', title: 'Beyond the Mission', concept: 'AI Opportunity Finder', time: '15 min', color: '#F97316' },
            { num: '05', title: 'Mission Debrief', concept: 'Padlet', time: '10 min', color: '#f29b1c' },
          ].map(l => (
            <div key={l.num} style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${l.color}44`,
              borderTop: `3px solid ${l.color}`,
              borderRadius: 12,
              padding: '18px 14px',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>LEVEL {l.num}</span>
              <p style={{ margin: '8px 0 5px', color: 'white', fontWeight: 700, fontSize: 16 }}>{l.title}</p>
              <p style={{ margin: 0, color: l.color, fontSize: 13, fontWeight: 600 }}>{l.concept}</p>
              <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{l.time}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── 04. Get Ready ────────────────────────────────────────────────────────────
  {
    eyebrow: 'BEFORE WE START',
    title: 'Get Ready',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          In the next two minutes, make sure you have everything you need to run the mission.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '🤝', label: 'A partner', desc: 'Find someone to go through the activities with you', color: '#f29b1c', link: null },
            { icon: '💻', label: 'A laptop', desc: 'You will need ChatGPT open throughout the session', color: '#8B5CF6', link: null },
            { icon: '🔗', label: 'The activity page', desc: 'This is your mission control', color: '#3B82F6', link: 'https://1in-minion.vercel.app/' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, background: 'rgba(255,255,255,0.05)', border: `1px solid ${item.color}44`, borderTop: `3px solid ${item.color}`, borderRadius: 12, padding: '28px 20px' }}>
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: 18 }}>{item.label}</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{item.desc}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: item.color, fontWeight: 700, fontSize: 15, marginTop: 6, textDecoration: 'none' }}>
                    1in-minion.vercel.app ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── 05. Level 1 ──────────────────────────────────────────────────────────────
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
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75 }}>
          Your Minion just arrived. They are eager, willing, and understand absolutely nothing. The quality of their response depends entirely on the quality of your order. Learn to give precise, structured prompts and watch your Minion transform from confused to capable.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {['Apply core prompt engineering principles — role, context, task, format, and constraints — to write more effective AI prompts', 'Run a vague prompt and a structured prompt side by side — see the difference immediately', 'Build your own prompt layer by layer and compare your first attempt to your final version'].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ color: '#f29b1c', flexShrink: 0, marginTop: 2 }}>→</span>{t}
            </li>
          ))}
        </ul>
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
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75 }}>
          Your Minion understands your orders now. But the sun does not steal itself. Arm them as a data-driven strategist, load 374 mission records, and let them find the pattern nobody spotted.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {['Build your first Custom GPT trained as a data-driven mission strategist', 'Upload the mission data file so your GPT can analyze 374 previous heist records', 'Find answers to the 5 mission questions from the data', 'Invent one special tool and compile everything into a mission debrief file'].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ color: '#8B5CF6', flexShrink: 0, marginTop: 2 }}>→</span>{t}
            </li>
          ))}
        </ul>
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
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75 }}>
          Gru does not show up unprepared. Neither does your Minion. Upload your debrief and watch your Minion turn data into a masterplan. The heist starts here.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {['Open the pre-built 1inMINION Project Manager Custom GPT', 'Upload your Level 2 mission debrief and run the prompt', 'Receive a structured HTML project plan with risks, a quick win, and an interactive checklist'].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ color: '#3B82F6', flexShrink: 0, marginTop: 2 }}>→</span>{t}
            </li>
          ))}
        </ul>
      </div>
    ),
  },

  // ── 07. Level 4 ──────────────────────────────────────────────────────────────
  {
    eyebrow: 'BEYOND THE HEIST',
    title: 'Level 04 - Beyond the Mission',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ background: '#F9731622', border: '1px solid #F9731666', borderRadius: 8, padding: '4px 12px', color: '#F97316', fontWeight: 700, fontSize: 13 }}>AI Opportunity Finder</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>15 min</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75 }}>
          Map where AI can make the biggest difference in your own work. Five questions. One personalised prompt. Your AI plan for FY27.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {['Answer 5 quick questions about your role, time sinks, quality gaps, repetitive tasks, and AI hunch', 'Generate a personalised AI prompt built around your actual work', 'Copy it into ChatGPT and discover exactly where AI can save you the most time', 'Complete the Hackathon Exit Ticket to log your AI workflows for FY27'].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ color: '#F97316', flexShrink: 0, marginTop: 2 }}>→</span>{t}
            </li>
          ))}
        </ul>
      </div>
    ),
  },

  // ── 08. Level 5 ──────────────────────────────────────────────────────────────
  {
    eyebrow: 'MISSION DEBRIEF',
    title: 'Level 05 - Mission Debrief',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ background: '#f29b1c22', border: '1px solid #f29b1c66', borderRadius: 8, padding: '4px 12px', color: '#f29b1c', fontWeight: 700, fontSize: 13 }}>Padlet</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>10 min</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75 }}>
          The heist is complete. Report back to Gru. Share your A-Ha moments, plot twists, questions, and AI ideas with the team.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {['Post a note in A-Ha Moments, Plot Twists, Curious Minions, or Go Bananas!', 'Read what your fellow teammates discovered and steal an idea or two'].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ color: '#f29b1c', flexShrink: 0, marginTop: 2 }}>→</span>{t}
            </li>
          ))}
        </ul>
      </div>
    ),
  },

  // ── 09. Wrap Up ───────────────────────────────────────────────────────────────
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
                maxWidth: 1000, width: '100%',
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
