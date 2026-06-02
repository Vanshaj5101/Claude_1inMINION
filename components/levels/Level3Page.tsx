'use client'

import { useState, useCallback } from 'react'
import { ExternalLink, CheckSquare, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import LevelProgressCard from '../LevelProgressCard'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level3/level_03_briefing.json'
import resourcesData from '@/content/levels/level3/level_03_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level3Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // checked[0]: opened the GPT
  // checked[1]: ran the prompt
  // checked[2]: received the HTML project plan
  // checked[3]: project plan includes risks, quick win, checklist
  const [checked, setChecked] = useState<boolean[]>(() => new Array(4).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'step-1',        label: 'Step 1 — Open the GPT' },
    { id: 'step-2',        label: 'Step 2 — Run the Prompt' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const gptUrl: string           = res['gpt-url'].url
  const withGptPrompt: string    = res['prompt-with-gpt'].content
  const withGptInstruction: string = res['prompt-with-gpt'].instruction
  const withGptNote: string      = res['prompt-with-gpt'].note

  return (
    <>
      {showBriefing && (
        <LevelBriefingModal data={briefingData} onEnter={handleEnter} />
      )}

      <TableOfContents sections={tocSections} checked={checked} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        {/* Header */}
        <section id="overview" className="space-y-4 pt-8">
          <p className="section-eyebrow">{briefingData.level.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {briefingData.level.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.7, textAlign: 'left', whiteSpace: 'pre-line' }}>
            {briefingData.level.subdescription}
          </p>
          <span className="pill-badge">⏱ {briefingData.level.duration.toUpperCase()}</span>
          <LevelBriefingSection data={briefingData} />
          <LevelProgressCard checked={checked} />
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </section>

        {/* Step 1 — Open the GPT */}
        <section id="step-1" className="space-y-6">
          <p className="section-eyebrow">// STEP 01 — OPEN THE GPT</p>

          <div
            className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${checked[0] ? 'var(--green)' : 'var(--border)'}`,
              borderLeft: `2px solid ${checked[0] ? 'var(--green)' : 'var(--yellow)'}`,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: checked[0] ? 'var(--green)' : 'var(--yellow)', color: checked[0] ? 'white' : 'var(--text-primary)' }}>
                  01
                </span>
                <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Head to the 1inMINION Project Manager GPT
                </h3>
              </div>
              <button onClick={() => toggleCheck(0)} className="flex items-center gap-1.5 flex-shrink-0" style={{ color: checked[0] ? 'var(--green)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {checked[0] ? <CheckSquare size={18} /> : <Square size={18} />}
                <span className="hidden sm:inline">{checked[0] ? 'Done' : 'Mark done'}</span>
              </button>
            </div>

            {/* Link button */}
            <a
              href={gptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-mono font-bold text-sm transition-all duration-150"
              style={{
                background: 'var(--yellow)',
                color: '#0F0F1A',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                alignSelf: 'flex-start',
              }}
            >
              OPEN 1inMINION PROJECT MANAGER
              <ExternalLink size={14} />
            </a>

            {/* Screenshot — GPT landing */}
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>YOUR SCREEN SHOULD LOOK LIKE THIS</p>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/level3_gpt_landing.png"
                  alt="1inMINION Project Manager GPT landing screen"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 — Upload & Run */}
        <section id="step-2" className="space-y-6">
          <p className="section-eyebrow">// STEP 02 — RUN THE PROMPT</p>

          <div
            className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${checked[1] ? 'var(--green)' : 'var(--border)'}`,
              borderLeft: `2px solid ${checked[1] ? 'var(--green)' : 'var(--yellow)'}`,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: checked[1] ? 'var(--green)' : 'var(--yellow)', color: checked[1] ? 'white' : 'var(--text-primary)' }}>
                  02
                </span>
                <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Upload Your Mission Debrief &amp; Run the Prompt
                </h3>
              </div>
              <button onClick={() => toggleCheck(1)} className="flex items-center gap-1.5 flex-shrink-0" style={{ color: checked[1] ? 'var(--green)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {checked[1] ? <CheckSquare size={18} /> : <Square size={18} />}
                <span className="hidden sm:inline">{checked[1] ? 'Done' : 'Mark done'}</span>
              </button>
            </div>

            {/* Upload reminder */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--yellow)', boxShadow: '0 0 0 3px rgba(242,155,28,0.25)' }}
            >
              <span className="text-xl flex-shrink-0">📎</span>
              <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                Upload your <strong>mission_debrief.txt</strong> file from Level 2 into the chat first — then send this prompt.
              </p>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {withGptInstruction}
            </p>

            {/* Screenshot — file attached */}
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>YOUR SCREEN SHOULD LOOK LIKE THIS</p>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/level3_gpt_upload.png"
                  alt="1inMINION Project Manager with mission debrief uploaded and prompt ready"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </div>

            <PromptBlock
              label="PROMPT — PASTE INTO THE GPT"
              promptText={withGptPrompt}
              variant="core"
            />

            <div className="p-4 rounded-lg flex items-start gap-3" style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.25)' }}>
              <span className="text-base flex-shrink-0">✅</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {withGptNote}
              </p>
            </div>
          </div>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/4"
            nextLabel="ADVANCE TO LEVEL 04: BEYOND THE MISSION"
            levelNumber={3}
            isFinale={true}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
