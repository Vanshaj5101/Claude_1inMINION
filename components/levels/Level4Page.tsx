'use client'

import { useState, useCallback } from 'react'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import TableOfContents from '../TableOfContents'
import LevelHeader from '../ui/LevelHeader'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Callout from '../ui/Callout'
import MarkDone from '../ui/MarkDone'
import StepList from '../ui/StepList'
import briefingData from '@/content/levels/level4/level_04_briefing.json'
import resourcesData from '@/content/levels/level4/level_04_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

const CONNECT_STEPS = [
  { num: '01', title: 'Open Customize', desc: 'Click Customize in the left sidebar of Claude — the same place you installed the Skill.', shot: '/level4_customize.png', alt: 'Customize in the Claude left sidebar', narrow: true },
  { num: '02', title: 'Go to Connectors', desc: 'Switch from Skills to the Connectors tab to see every tool Claude can plug into.', shot: '/level4_connectors_tab.png', alt: 'The Connectors tab in Claude Customize' },
  { num: '03', title: 'Find Google Calendar', desc: 'Search the directory for Google Calendar.', shot: '/level4_gcal_card.png', alt: 'The Google Calendar entry in the connector directory' },
  { num: '04', title: 'Connect to Claude', desc: 'Hit Connect to Claude and sign in with the Google account whose calendar you actually want to use. Read what you are granting before you approve it — you can disconnect from this same screen at any time.', shot: '/level4_gcal_connect.png', alt: 'The Google Calendar connector page with the Connect to Claude button' },
]

export default function Level4Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // 0 connected · 1 read schedule · 2 found slot · 3 sent invite
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

  return (
    <>
      {showBriefing && <LevelBriefingModal data={briefingData} onEnter={handleEnter} />}

      <TableOfContents sections={tocSections} checked={checked} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        <LevelHeader level={briefingData.level} briefing={briefingData} checked={checked} />

        {/* Concept */}
        <section id="what-are-mcps" className="space-y-5">
          <SectionHeader eyebrow="// THE CONCEPT" title="Your Minion Leaves the Lair." />
          <p
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-line', maxWidth: '62ch' }}
          >
            {briefingData.what_are_mcps}
          </p>
        </section>

        {/* Connect */}
        <section id="connect" className="space-y-6">
          <SectionHeader
            eyebrow="// OPEN THE DOOR"
            title="Connect Google Calendar."
            intro="This takes about a minute and you only ever do it once."
          />
          <Card done={checked[0]}>
            <a href="https://claude.ai/settings/connectors" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex self-start">
              Open Customize <ExternalLink size={13} />
            </a>

            <StepList steps={CONNECT_STEPS} />

            <div className="important flex items-start gap-3">
              <ShieldCheck size={18} style={{ color: 'var(--yellow-text)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="meta-label" style={{ marginBottom: 4 }}>Before you connect anything</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  A Connector reads real data from a real account, so use one you are comfortable with and read the permission screen rather than clicking through it. Claude asks before each action, and you can disconnect at any time. If you are on a work account, check your organisation allows this first.
                </p>
              </div>
            </div>

            <MarkDone done={checked[0]} onToggle={() => toggleCheck(0)} />
          </Card>
        </section>

        {/* Read */}
        <section id="read" className="space-y-6">
          <SectionHeader
            eyebrow="// BACK IN THE SAME CHAT"
            title="See What It Can Now See."
            intro="Everything from here happens in the conversation where you built your presentation, so your Minion already has the data, the findings, the special tool, and the deck in front of it."
          />

          <Card done={checked[1]}>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                Read My Real Schedule
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {checkSchedule.instruction}
              </p>
            </div>
            <PromptBlock label="READ MY SCHEDULE" promptText={checkSchedule.content} variant="test" substituteMinion={true} />
            <Callout>{checkSchedule.note}</Callout>
            <MarkDone done={checked[1]} onToggle={() => toggleCheck(1)} />
          </Card>

          <Card done={checked[2]}>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                Find a Free Slot
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {findSlot.instruction}
              </p>
            </div>
            <PromptBlock label="FIND A FREE SLOT" promptText={findSlot.content} variant="core" substituteMinion={true} />
            <MarkDone done={checked[2]} onToggle={() => toggleCheck(2)} />
          </Card>
        </section>

        {/* Act — the one payoff moment on this page */}
        <section id="act" className="space-y-6">
          <SectionHeader eyebrow="// GIVE IT THE GOAL" title="Send the Heist Invite." />

          <div className="payoff">
            <div className="payoff-header">
              <p className="font-mono font-bold" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.55)' }}>
                ONE INSTRUCTION, SIX ACTIONS
              </p>
              <p className="font-bold text-lg leading-tight mt-0.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                This Is the Whole Point
              </p>
            </div>
            <div className="payoff-body flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {sendInvite.instruction}
              </p>
              <PromptBlock label="SEND THE HEIST INVITE" promptText={sendInvite.content} variant="final" substituteMinion={true} />
              <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
                {sendInvite.note}
              </p>
              <MarkDone done={checked[3]} onToggle={() => toggleCheck(3)} />
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
