'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clipboard, Check } from 'lucide-react'
import TableOfContents from '../TableOfContents'
import LevelBriefingModal from '../LevelBriefingModal'

const PADLET_URL = 'https://padlet.com/jcampb70/mission-complete-report-back-to-gru-8q5oc67etz2c0yay'

const briefingData = {
  level: {
    number: '05',
    title: 'Mission Debrief',
    concept: 'Padlet',
    duration: '10 min',
    subdescription: 'The heist is complete. Report back to Gru. Share your A-Ha moments, plot twists, questions, and AI ideas — then see what your fellow teammates discovered.',
  },
  mission_targets: [],
  mission_gear: [],
}

const tocSections = [
  { id: 'overview',  label: 'Overview' },
  { id: 'padlet',   label: 'Report Back' },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

const columns = [
  { emoji: '💡', title: 'A-Ha Moments',       desc: 'Key takeaways from today' },
  { emoji: '🎭', title: 'Plot Twists',         desc: 'AI surprises / shockers' },
  { emoji: '🤔', title: 'Curious Minions',     desc: 'Questions you still have' },
  { emoji: '🍌', title: 'Go Bananas!',         desc: 'AI usage ideas & requests' },
]

export default function Level5Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(PADLET_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {showBriefing && <LevelBriefingModal data={briefingData} onEnter={() => setShowBriefing(false)} />}
      <TableOfContents sections={tocSections} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        {/* Header */}
        <section id="overview" className="space-y-4 pt-8">
          <p className="section-eyebrow">// LEVEL 05 — MISSION DEBRIEF</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
              letterSpacing: '0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.05,
            }}
          >
            Mission Complete.<br />Report Back to Gru.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            Share thoughts from today&apos;s AI adventure. Add a note in any column to share key takeaways, surprising moments, questions you still have, and exciting ideas for using AI. Then take a moment to see what your fellow teammates discovered.
          </p>
          <span className="pill-badge">⏱ 10 MIN</span>
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </section>

        {/* Column previews */}
        <section className="space-y-4">
          <p className="section-eyebrow">// THE 4 COLUMNS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {columns.map((col) => (
              <div
                key={col.title}
                className="rounded-xl p-4 flex items-start gap-3"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--yellow)' }}
              >
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{col.emoji}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, letterSpacing: '0.02em', color: 'var(--text-primary)', lineHeight: 1.2 }}>{col.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{col.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Padlet section */}
        <section id="padlet" className="space-y-5">
          <p className="section-eyebrow">// OPEN THE PADLET</p>

          {/* Card: link + QR + button */}
          <div style={{ borderRadius: 14, border: '1px solid var(--border)', borderTop: '2px solid var(--yellow)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            {/* Body: text + button left, QR right */}
            <div className="flex items-center gap-6 p-6">
              <div className="flex-1 space-y-3">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', letterSpacing: '0.03em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                  Add Your Note to the Board
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Click any column, hit the <strong>+</strong> button, and drop your thought. Read what your fellow teammates posted too.
                </p>
                {/* Copyable link */}
                <div className="flex items-center gap-2" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px' }}>
                  <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    padlet.com/jcampb70/mission-complete…
                  </code>
                  <button type="button" onClick={handleCopy} className="flex items-center gap-1 flex-shrink-0 transition-all duration-150"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: copied ? 'var(--green)' : 'var(--yellow-text)', background: copied ? 'rgba(5,150,105,0.08)' : 'rgba(242,155,28,0.08)', border: `1px solid ${copied ? 'var(--green)' : 'var(--yellow)'}`, borderRadius: 5, padding: '3px 8px', cursor: 'pointer' }}>
                    {copied ? <><Check size={10} /> COPIED</> : <><Clipboard size={10} /> COPY</>}
                  </button>
                </div>
                <a href={PADLET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.04em', color: '#1F2937', background: 'var(--yellow)', border: 'none', borderRadius: 10, padding: '11px 22px', textDecoration: 'none', boxShadow: '0 3px 12px rgba(242,155,28,0.35)', transition: 'background 0.18s ease, transform 0.15s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--yellow-muted)'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--yellow)'; el.style.transform = 'translateY(0)' }}>
                  Open Padlet →
                </a>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <a href={PADLET_URL} target="_blank" rel="noopener noreferrer">
                  <img src="/padlet-qr.png" alt="QR code for Padlet"
                    style={{ width: 130, height: 130, borderRadius: 8, border: '1.5px solid var(--border)', display: 'block', transition: 'transform 0.15s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </a>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>SCAN TO OPEN</span>
              </div>
            </div>
          </div>

          {/* Preview image */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <img src="/padlet-preview.png" alt="Mission Complete: Report Back to Gru — Padlet board" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* How to add a note */}
          <div className="space-y-4">
            <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>HOW TO ADD A NOTE</p>
            <div className="space-y-2">
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--yellow-text)' }}>OPTION 1 — USE THE + BUTTON IN A COLUMN</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Click the <strong>+</strong> button at the top of any column to add your note directly to that section.
              </p>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img src="/padlet_plus_button.png" alt="Click the + button in a column to add a note" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--yellow-text)' }}>OPTION 2 — USE THE POST BUTTON</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Click the pink <strong>+ Post</strong> button at the bottom right of the screen, then select which section you want to add your note to.
              </p>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img src="/padlet_post_button.png" alt="Click the Post button at bottom right and select a section" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Closure */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic' }}>
            Despicably Yours,
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
            The 1inMINION Team
          </p>
        </div>

      </motion.main>
    </>
  )
}
