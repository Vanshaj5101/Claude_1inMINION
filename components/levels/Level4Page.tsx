'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Clipboard, Check, ArrowRight, RotateCcw } from 'lucide-react'
import TableOfContents from '../TableOfContents'
import LevelBriefingModal from '../LevelBriefingModal'

const briefingData = {
  level: {
    number: '04',
    title: 'Beyond the Mission',
    concept: 'AI Opportunity Finder',
    duration: '15 min',
    subdescription: 'The heist was practice. Now find where AI belongs in your actual work. Five questions. One personalised prompt. Your AI plan for FY27.',
  },
  mission_targets: [],
  mission_gear: [],
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: number
  label: string
  question: string
  placeholder: string
  example: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    label: 'Your Role',
    question: 'What team are you on and what is your role?',
    placeholder: 'Tell us in 1-2 lines',
    example:
      'I am on the Marketing team. I manage social media campaigns and create content for student recruitment.',
  },
  {
    id: 2,
    label: 'Where Time Goes',
    question: 'What takes more of your time than it should in a typical week?',
    placeholder: 'List as many as you like',
    example:
      'Writing weekly performance reports, responding to repetitive emails, updating spreadsheets with data from multiple sources, sitting in status update meetings.',
  },
  {
    id: 3,
    label: 'The Quality Gap',
    question:
      'Is there something you produce regularly where you know the quality could be better if you just had more time?',
    placeholder: 'List as many as you like',
    example:
      'The monthly newsletter I send to students always feels rushed. The project briefs I write for vendors could be much more detailed and clear.',
  },
  {
    id: 4,
    label: 'Repetitive Tasks',
    question: 'What tasks do you find yourself doing over and over — same steps, every time?',
    placeholder: 'List as many as you like',
    example:
      'Copy-pasting data from emails into a tracker, formatting meeting notes into the same template, sending the same follow-up messages to different people every week.',
  },
  {
    id: 5,
    label: 'Your AI Hunch',
    question:
      'Where do you feel AI could help you most in your work — even if you are not sure how yet?',
    placeholder: 'Your instinct is enough — no technical knowledge needed',
    example:
      'I think AI could help me draft communications faster. I also feel like there must be a way to automate some of the reporting I do manually every week.',
  },
]

function buildPrompt(answers: string[]): string {
  const [q1, q2, q3, q4, q5] = answers
  return `About my role:\n${q1}\n\nHere is context about my work:\n\nWhere I spend too much time:\n${q2}\n\nWhere quality could be better with more time:\n${q3}\n\nMy most repetitive tasks:\n${q4}\n\nWhere I feel AI could help me most:\n${q5}\n\nIdentify at least 4 specific opportunities where AI could make a meaningful difference in my work.\n\nFor each opportunity share:\n- What the AI use case is and how it helps\n- How much time it could realistically save me per week\n\nAt the end, sort all 4 opportunities by where I should start first — based on ease of adoption and highest time saved. Present this as a table with columns: Opportunity | What it does | Difficulty (Easy / Medium / Hard) | Time Saved Per Week.\n\nBe specific to my actual role and tasks. No generic advice.\n\nFinally, ask me up to 3 clarifying questions if you need more context to sharpen or improve any of the recommendations.`
}

// ─── TOC sections ─────────────────────────────────────────────────────────────

const tocSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'questions', label: 'Your Answers' },
  { id: 'copy-prompt', label: 'Your Prompt' },
  { id: 'whats-next', label: "What's Next" },
]


// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: i * 0.07 },
  }),
}

// ─── QuestionCard ─────────────────────────────────────────────────────────────

function QuestionCard({
  q,
  index,
  value,
  onChange,
}: {
  q: Question
  index: number
  value: string
  onChange: (val: string) => void
}) {
  const num = String(q.id).padStart(2, '0')

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="rounded-2xl"
      style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
      >
        <div className="flex items-start gap-4">
          {/* Number badge */}
          <span
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
            style={{
              background: 'var(--yellow)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 13,
              color: '#fff',
              letterSpacing: '0.04em',
            }}
          >
            {num}
          </span>

          <div className="flex-1 min-w-0">
            {/* Label */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'var(--yellow-text)',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              {q.label}
            </p>
            {/* Question */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                letterSpacing: '0.02em',
                color: 'var(--text-primary)',
                lineHeight: 1.25,
              }}
            >
              {q.question}
            </h3>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 pt-4 pb-5 space-y-3">
        {/* Example — always visible */}
        <div
          className="rounded-lg px-4 py-3"
          style={{
            background: 'var(--yellow-light)',
            border: '1px solid rgba(242,155,28,0.25)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--yellow-text)', marginBottom: 4 }}>
            EXAMPLE
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--yellow-text)',
              lineHeight: 1.65,
              fontStyle: 'italic',
            }}
          >
            {q.example}
          </p>
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.placeholder}
          rows={4}
          style={{
            width: '100%',
            minHeight: 100,
            resize: 'vertical',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--text-primary)',
            background: 'var(--bg-secondary)',
            border: '1.5px solid var(--border)',
            borderRadius: 10,
            padding: '10px 14px',
            outline: 'none',
            lineHeight: 1.65,
            transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--yellow)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(242,155,28,0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Level4Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', ''])
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)


  const handleChange = useCallback((index: number, val: string) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = val
      return next
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = buildPrompt(answers)
    setGeneratedPrompt(prompt)
  }

  const handleReset = () => {
    setAnswers(['', '', '', '', ''])
    setGeneratedPrompt('')
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = generatedPrompt
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // ── SINGLE VIEW ────────────────────────────────────────────────────────────

  const activeSections = useMemo(
    () => generatedPrompt ? tocSections : tocSections.filter(s => s.id !== 'copy-prompt'),
    [generatedPrompt]
  )

  return (
    <>
      {showBriefing && <LevelBriefingModal data={briefingData} onEnter={() => setShowBriefing(false)} />}
      <TableOfContents sections={activeSections} />

      <motion.main
        {...fadeUp}
        className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-12"
      >
        {/* Header */}
        <section id="overview" className="space-y-4 pt-8">
          <p className="section-eyebrow">// LEVEL 04 — BEYOND THE MISSION</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
              letterSpacing: '0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.05,
            }}
          >
            Find Your AI Opportunity
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 540,
            }}
          >
            Answer 5 quick questions about your work. We will generate a personalised prompt you
            can take straight into ChatGPT to discover where AI can save you the most time.
          </p>
          <span className="pill-badge">⏱ 10 MIN</span>
        </section>

        {/* Questions */}
        <section id="questions" className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {QUESTIONS.map((q, i) => (
              <QuestionCard
                key={q.id}
                q={q}
                index={i}
                value={answers[i]}
                onChange={(val) => handleChange(i, val)}
              />
            ))}

            {/* Generate + Reset buttons */}
            <div className="pt-2 flex gap-3 justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 transition-all"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 15,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  color: '#1F2937',
                  background: 'var(--yellow)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '11px 20px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: '0 4px 16px rgba(242,155,28,0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--yellow-muted)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 22px rgba(242,155,28,0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--yellow)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(242,155,28,0.35)'
                }}
              >
                Generate My AI Prompt
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 transition-all"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  color: '#4B5563',
                  background: 'var(--bg-primary)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 10,
                  padding: '11px 18px',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.borderColor = '#4B5563'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#4B5563'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <RotateCcw size={13} />
                Reset Form
              </button>
            </div>
          </form>

          {/* Generated prompt — shown inline after generating */}
          {generatedPrompt && (
            <div className="space-y-4 pt-2">
              <div id="copy-prompt" style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <p className="section-eyebrow" style={{ marginBottom: 12 }}>// YOUR AI DISCOVERY PROMPT</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                  Copy this prompt and paste it into ChatGPT. It will ask you a few questions first, then map out exactly where AI can save you the most time.
                </p>

                {/* Prompt code block — copy button lives in the header */}
                <div className="rounded-md overflow-hidden" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', borderLeft: '3px solid var(--yellow)', boxShadow: 'var(--shadow-xs)' }}>
                  <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--yellow-text)', textTransform: 'uppercase' }}>
                      // Your AI Discovery Prompt
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-all duration-150"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        background: copied ? 'rgba(5,150,105,0.08)' : 'rgba(242,155,28,0.06)',
                        border: `1px solid ${copied ? 'var(--green)' : 'var(--yellow)'}`,
                        color: copied ? 'var(--green)' : 'var(--yellow-text)',
                        cursor: 'pointer',
                        transform: copied ? 'scale(1.03)' : 'scale(1)',
                      }}
                    >
                      {copied
                        ? <><Check size={11} /> COPIED! PASTE IN CHATGPT</>
                        : <><Clipboard size={11} /> COPY</>}
                    </button>
                  </div>
                  <div className="px-4 py-4 overflow-x-auto">
                    <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowY: 'auto', maxHeight: 360 }}>
                      <span style={{ color: 'var(--yellow-text)', fontWeight: 600 }}>$ </span>
                      {generatedPrompt}
                    </pre>
                  </div>
                </div>

              </div>

              {/* What's Next */}
              <div id="whats-next" style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <p className="section-eyebrow" style={{ marginBottom: 16 }}>// WHAT&apos;S NEXT</p>

                {/* Card */}
                <div style={{
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  borderTop: '2px solid var(--yellow)',
                  background: 'var(--bg-secondary)',
                  overflow: 'hidden',
                }}>
                  {/* Card body: text left, QR right */}
                  <div className="flex items-center gap-6 p-6">
                    {/* Left: text + button */}
                    <div className="flex-1 space-y-3">
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', letterSpacing: '0.03em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                        Hackathon Exit Ticket
                      </h2>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Add 1–2 workflows where you will have AI enabled in FY27.
                      </p>
                      {/* Copyable link */}
                      <div className="flex items-center gap-2" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px' }}>
                        <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          forms.gle/v6DAhEfZg7LxgJMK6
                        </code>
                        <button
                          type="button"
                          onClick={() => { navigator.clipboard.writeText('https://forms.gle/v6DAhEfZg7LxgJMK6'); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000) }}
                          className="flex items-center gap-1 flex-shrink-0 transition-all duration-150"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: copiedLink ? 'var(--green)' : 'var(--yellow-text)', background: copiedLink ? 'rgba(5,150,105,0.08)' : 'rgba(242,155,28,0.08)', border: `1px solid ${copiedLink ? 'var(--green)' : 'var(--yellow)'}`, borderRadius: 5, padding: '3px 8px', cursor: 'pointer' }}
                        >
                          {copiedLink ? <><Check size={10} /> COPIED</> : <><Clipboard size={10} /> COPY</>}
                        </button>
                      </div>

                      <a
                        href="https://forms.gle/v6DAhEfZg7LxgJMK6"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.04em', color: '#1F2937', background: 'var(--yellow)', border: 'none', borderRadius: 10, padding: '11px 22px', textDecoration: 'none', boxShadow: '0 3px 12px rgba(242,155,28,0.35)', transition: 'background 0.18s ease, transform 0.15s ease, box-shadow 0.15s ease' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--yellow-muted)'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 5px 18px rgba(242,155,28,0.45)' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--yellow)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 3px 12px rgba(242,155,28,0.35)' }}
                      >
                        Open the Form →
                      </a>
                    </div>

                    {/* Divider */}
                    <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)', flexShrink: 0 }} />

                    {/* Right: QR */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <a href="https://forms.gle/v6DAhEfZg7LxgJMK6" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/google-form-qr.png"
                          alt="QR code for Google Form"
                          style={{ width: 130, height: 130, borderRadius: 8, border: '1.5px solid var(--border)', display: 'block', transition: 'transform 0.15s ease' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      </a>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>SCAN TO OPEN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advance to Level 5 */}
          <a
            href="/level/5"
            className="w-full flex items-center justify-center gap-3 py-4 rounded-lg font-mono font-bold tracking-widest transition-all duration-200"
            style={{
              background: 'var(--yellow)',
              color: '#0F0F1A',
              fontSize: 12,
              letterSpacing: '0.1em',
              boxShadow: '0 4px 14px rgba(233,149,10,0.25), 0 1px 4px rgba(233,149,10,0.15)',
              textDecoration: 'none',
            }}
          >
            ADVANCE TO LEVEL 05: MISSION DEBRIEF
            <ArrowRight size={16} />
          </a>
        </section>
      </motion.main>
    </>
  )
}
