'use client'

import { useState, useCallback } from 'react'
import { CheckSquare, Square, ExternalLink, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import LevelProgressCard from '../LevelProgressCard'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level4/level_04_briefing.json'
import resourcesData from '@/content/levels/level4/level_04_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level4Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // checked[0]: connected Google Calendar
  // checked[1]: read the real schedule
  // checked[2]: found a free slot
  // checked[3]: sent the invite
  const [checked, setChecked] = useState<boolean[]>(() => new Array(4).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'what-are-mcps', label: 'What Is an MCP?' },
    { id: 'connect',       label: 'Connect Your Calendar' },
    { id: 'read',          label: 'Read the Calendar' },
    { id: 'act',           label: 'Send the Invite' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const checkSchedule = res['prompt-check-schedule'] as { instruction: string; content: string; note: string }
  const findSlot      = res['prompt-find-slot']      as { instruction: string; content: string }
  const sendInvite    = res['prompt-send-invite']    as { instruction: string; content: string; note: string }

  const connectSteps = [
    { num: '01', title: 'Open Customize',    desc: 'Click Customize in the left sidebar of Claude — the same place you installed the Skill.', shot: '/level4_customize.png', alt: 'Customize in the Claude left sidebar', narrow: true },
    { num: '02', title: 'Go to Connectors',  desc: 'Switch from Skills to the Connectors tab to see every tool Claude can plug into.', shot: '/level4_connectors_tab.png', alt: 'The Connectors tab in Claude Customize' },
    { num: '03', title: 'Find Google Calendar', desc: 'Search the directory for Google Calendar.', shot: '/level4_gcal_card.png', alt: 'The Google Calendar entry in the connector directory' },
    { num: '04', title: 'Connect to Claude', desc: 'Hit Connect to Claude and sign in with the Google account whose calendar you actually want to use. Read what you are granting before you approve it — you can disconnect from this same screen at any time.', shot: '/level4_gcal_connect.png', alt: 'The Google Calendar connector page with the Connect to Claude button' },
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

        {/* What is an MCP */}
        <section id="what-are-mcps" className="space-y-4">
          <div>
            <p className="section-eyebrow">// THE CONCEPT</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Your Minion Leaves the Lair.
            </h2>
          </div>
          <div className="rounded-lg p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {briefingData.what_are_mcps}
            </p>
          </div>
        </section>

        {/* Step 01 — Connect */}
        <section id="connect" className="space-y-6">
          <p className="section-eyebrow">// STEP 01 — OPEN THE DOOR</p>
          <div className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300" style={cardStyle(0)}>
            <StepHeader num="01" title="Connect Google Calendar" idx={0} />

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                This takes about a minute and you only ever do it once.
              </p>
              <a href="https://claude.ai/settings/connectors" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex flex-shrink-0">
                Open Customize <ExternalLink size={13} />
              </a>
            </div>

            <div className="space-y-2">
              {connectSteps.map(step => (
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

            <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(242,155,28,0.06)', border: '1px solid rgba(242,155,28,0.25)' }}>
              <ShieldCheck size={18} style={{ color: 'var(--yellow-text)', flexShrink: 0, marginTop: 2 }} />
              <div className="space-y-1">
                <p className="font-mono font-bold text-xs" style={{ color: 'var(--yellow-text)', letterSpacing: '0.08em' }}>BEFORE YOU CONNECT ANYTHING</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  A Connector reads real data from a real account, so use one you are comfortable with and read the permission screen rather than clicking through it. Claude asks before each action, and you can disconnect at any time from the same settings page. If you are on a work account, check your organisation allows this first.
                </p>
              </div>
            </div>
            <MarkDone idx={0} />
          </div>
        </section>

        {/* Step 02 — Read */}
        <section id="read" className="space-y-6">
          <p className="section-eyebrow">// STEP 02 — BACK IN THE SAME CHAT</p>

          <div className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300" style={cardStyle(1)}>
            <StepHeader num="02" title="Read My Real Schedule" idx={1} />
            <div className="rounded-lg p-4 flex items-start gap-3" style={{ background: 'rgba(242,155,28,0.1)', border: '1.5px solid rgba(242,155,28,0.45)' }}>
              <span className="text-lg flex-shrink-0">⚠️</span>
              <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
                Still no new chats. Everything from here happens in the conversation where you built your presentation, so your Minion already has the data, the findings, the special tool, and the deck in front of it.
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {checkSchedule.instruction}
            </p>
            <PromptBlock label="READ MY SCHEDULE" promptText={checkSchedule.content} variant="test" substituteMinion={true} />
            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>💡 </span>{checkSchedule.note}
              </p>
            </div>
            <MarkDone idx={1} />
          </div>

          <div className="rounded-lg p-5 flex flex-col gap-5 transition-all duration-300" style={cardStyle(2)}>
            <StepHeader num="03" title="Find a Free Slot" idx={2} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {findSlot.instruction}
            </p>
            <PromptBlock label="FIND A FREE SLOT" promptText={findSlot.content} variant="core" substituteMinion={true} />
            <MarkDone idx={2} />
          </div>
        </section>

        {/* Step 04 — Act */}
        <section id="act">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '2px solid var(--yellow)', boxShadow: '0 0 0 4px rgba(242,155,28,0.12), 0 8px 32px rgba(242,155,28,0.18)', animation: 'shadowPulse 2.2s ease-in-out infinite' }}
          >
            <div className="flex items-center px-5 py-4" style={{ background: 'var(--yellow)' }}>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'rgba(0,0,0,0.12)', color: 'var(--text-primary)' }}>
                  04
                </span>
                <div>
                  <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.16em' }}>// ONE INSTRUCTION, SIX ACTIONS</p>
                  <p className="font-bold text-lg leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Send the Heist Invite</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-5 flex flex-col gap-4" style={{ background: 'var(--bg-warm)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{sendInvite.instruction}</p>
              <PromptBlock label="SEND THE HEIST INVITE" promptText={sendInvite.content} variant="final" substituteMinion={true} />
              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(242,155,28,0.12)', border: '1.5px solid rgba(242,155,28,0.5)' }}>
                <span className="text-lg flex-shrink-0">🚀</span>
                <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>{sendInvite.note}</p>
              </div>
              <MarkDone idx={3} />
            </div>
          </div>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/"
            nextLabel="MISSION COMPLETE — BACK TO BASE"
            levelNumber={4}
            isFinale={true}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
