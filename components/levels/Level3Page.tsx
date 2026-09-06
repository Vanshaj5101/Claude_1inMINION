'use client'

import { useState, useCallback } from 'react'
import { Download, CheckSquare, Square, X, Check } from 'lucide-react'
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

  // checked[0]: ran the prompt with no Skill
  // checked[1]: installed the Skill
  // checked[2]: ran the same prompt with the Skill
  // checked[3]: compared both outputs
  const [checked, setChecked] = useState<boolean[]>(() => new Array(4).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'before',        label: 'Ask Without a Skill' },
    { id: 'install',       label: 'Install the Skill' },
    { id: 'after',         label: 'Ask Again, Same Chat' },
    { id: 'reveal',        label: 'What Changed' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const noSkill   = res['prompt-no-skill']   as { instruction: string; content: string; note: string }
  const withSkill = res['prompt-with-skill'] as { instruction: string; content: string; note: string }
  const skillFile = res['skill-file']        as { filename: string; description: string; label: string }
  const reveal    = briefingData.reveal

  const installSteps = [
    { num: '01', title: 'Open Customize',        desc: 'Click Customize in the left sidebar of Claude.', shot: '/level3_customize.png', alt: 'Customize in the Claude left sidebar', narrow: true },
    { num: '02', title: 'Add a Skill',           desc: 'You land on the Skills tab. Open the Add menu on the right and choose Upload skill.', shot: '/level3_add_skill.png', alt: 'The Add menu on the Skills tab, showing Upload skill' },
    { num: '03', title: 'Choose the file',       desc: 'Drag pitch_skill.md onto the drop zone, or browse for it in your Downloads folder.', shot: '/level3_upload_empty.png', alt: 'The empty Upload skill drag and drop screen' },
    { num: '04', title: 'Check the preview, then Save', desc: 'Claude reads the name and description from the top of the file and shows them back to you. That is how it later decides when this Skill applies. A security scan runs when you save.', shot: '/level3_upload_preview.png', alt: 'Upload skill screen with pitch_skill.md loaded and Presentation Builder shown in the preview' },
    { num: '05', title: 'Check it is switched on', desc: 'The Skill appears as presentation-builder with its toggle on. Your Minion is now a presentation specialist in every chat.', shot: '/level3_skill_installed.png', alt: 'The installed presentation-builder Skill with its toggle enabled' },
  ]

  const StepHeader = ({ num, title, idx }: { num: string; title: string; idx: number }) => (
    <div className="flex items-center gap-3">
      <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: checked[idx] ? 'var(--green)' : 'var(--yellow)', color: checked[idx] ? 'white' : 'var(--text-primary)' }}>
        {num}
      </span>
      <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
        {title}
      </h3>
    </div>
  )

  const MarkDone = ({ idx }: { idx: number }) => (
    <div className="flex justify-end">
      <button onClick={() => toggleCheck(idx)} className="flex items-center gap-1.5 transition-all duration-150" style={{ color: checked[idx] ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        {checked[idx] ? <CheckSquare size={18} /> : <Square size={18} />}
        <span className="hidden sm:inline">{checked[idx] ? 'Done' : 'Mark done'}</span>
      </button>
    </div>
  )

  const cardStyle = (idx: number) => ({
    background: 'var(--bg-secondary)',
    border: `1px solid ${checked[idx] ? 'var(--green)' : 'var(--border)'}`,
    borderLeft: `2px solid ${checked[idx] ? 'var(--green)' : 'var(--yellow)'}`,
  })

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

        {/* Step 01 — Before */}
        <section id="before" className="space-y-6">
          <p className="section-eyebrow">// STEP 01 — ASK WITHOUT A SKILL</p>
          <div className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300" style={cardStyle(0)}>
            <StepHeader num="01" title="Stay in Your Level 02 Chat" idx={0} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {noSkill.instruction}
            </p>
            <div className="rounded-lg p-4 flex items-start gap-3" style={{ background: 'rgba(242,155,28,0.1)', border: '1.5px solid rgba(242,155,28,0.45)' }}>
              <span className="text-lg flex-shrink-0">⚠️</span>
              <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
                Do not open a new chat for this level. Everything happens in the Level 02 conversation, so your Minion still has all five answers and your special tool in front of it.
              </p>
            </div>
            <PromptBlock label="PRESENTATION PROMPT — NO SKILL" promptText={noSkill.content} variant="test" substituteMinion={true} />
            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>💡 </span>{noSkill.note}
              </p>
            </div>
            <MarkDone idx={0} />
          </div>
        </section>

        {/* Step 02 — Install */}
        <section id="install" className="space-y-6">
          <p className="section-eyebrow">// STEP 02 — INSTALL THE SKILL</p>
          <div className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300" style={cardStyle(1)}>
            <StepHeader num="02" title="Give It the Skill" idx={1} />

            <a
              href="/files/pitch_skill.md"
              download={skillFile.filename}
              className="flex items-center gap-4 p-5 rounded-xl transition-all duration-150"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                <Download size={22} style={{ color: 'var(--yellow)' }} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-bold text-sm" style={{ color: 'var(--yellow-text)' }}>{skillFile.filename}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{skillFile.description}</p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                DOWNLOAD
              </span>
            </a>

            <div className="space-y-2">
              {installSteps.map(step => (
                <div key={step.num} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                    {step.num}
                  </span>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <p className="font-bold text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{step.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                    </div>
                    {step.shot && (
                      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: step.narrow ? 260 : '100%' }}>
                        <img src={step.shot} alt={step.alt} style={{ width: '100%', display: 'block' }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg" style={{ background: 'rgba(242,155,28,0.06)', border: '1px solid rgba(242,155,28,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>OPEN THE FILE FIRST: </span>
                It is only a page of plain English. Nothing in a Skill is code — it is the method you would explain to a new colleague, written down once.
              </p>
            </div>
            <MarkDone idx={1} />
          </div>
        </section>

        {/* Step 03 — After */}
        <section id="after" className="space-y-6">
          <p className="section-eyebrow">// STEP 03 — ASK AGAIN, SAME CHAT</p>
          <div className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300" style={cardStyle(2)}>
            <StepHeader num="03" title="Same Chat, Same Words" idx={2} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {withSkill.instruction}
            </p>
            <PromptBlock label="PRESENTATION PROMPT — WITH SKILL" promptText={withSkill.content} variant="final" substituteMinion={true} />
            <div className="p-3 rounded-lg" style={{ background: 'rgba(242,155,28,0.06)', border: '1px solid rgba(242,155,28,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>💡 </span>{withSkill.note}
              </p>
            </div>
            <div className="rounded-lg p-4 space-y-2" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
              <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>THE FIVE QUESTIONS IT WILL ASK</p>
              <ul className="space-y-1">
                {['Who is going to see this?', 'What do you want them to do or feel afterwards?', 'Pick a vibe — bold, clean, warm, or energetic?', 'Any colour or visual style you love or hate?', 'Anything it must include that Claude would not know?'].map(q => (
                  <li key={q} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    <span style={{ color: 'var(--yellow-text)', flexShrink: 0 }}>→</span>{q}
                  </li>
                ))}
              </ul>
            </div>
            <MarkDone idx={2} />
          </div>
        </section>

        {/* Reveal — side by side */}
        <section id="reveal" className="space-y-6">
          <div>
            <p className="section-eyebrow">// WHAT CHANGED?</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Same Prompt. Different Minion.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                <X size={14} style={{ color: 'var(--text-muted)' }} />
                <span className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>{reveal.without.label}</span>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {reveal.without.points.map(p => (
                  <li key={p} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--yellow)' }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(242,155,28,0.08)' }}>
                <Check size={14} style={{ color: 'var(--yellow-text)' }} />
                <span className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow-text)' }}>{reveal.with.label}</span>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {reveal.with.points.map(p => (
                  <li key={p} className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg p-5 space-y-3" style={{ background: 'var(--bg-warm)', border: '1.5px solid rgba(242,155,28,0.5)' }}>
            <p className="text-base font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
              {reveal.insight}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {reveal.reuse}
            </p>
            <MarkDone idx={3} />
          </div>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/4"
            nextLabel="ADVANCE TO LEVEL 04: GIVE MINION THE WHEEL"
            levelNumber={3}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
