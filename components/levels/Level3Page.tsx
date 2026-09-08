'use client'

import { useState, useCallback } from 'react'
import { Download, X, Check } from 'lucide-react'
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
import briefingData from '@/content/levels/level3/level_03_briefing.json'
import resourcesData from '@/content/levels/level3/level_03_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

const INSTALL_STEPS = [
  { num: '01', title: 'Open Customize', desc: 'Click Customize in the left sidebar of Claude.', shot: '/level3_customize.png', alt: 'Customize in the Claude left sidebar', narrow: true },
  { num: '02', title: 'Add a Skill', desc: 'You land on the Skills tab. Open the Add menu on the right and choose Upload skill.', shot: '/level3_add_skill.png', alt: 'The Add menu on the Skills tab, showing Upload skill' },
  { num: '03', title: 'Choose the file', desc: 'Drag pitch_skill.md onto the drop zone, or browse for it in your Downloads folder.', shot: '/level3_upload_empty.png', alt: 'The empty Upload skill drag and drop screen' },
  { num: '04', title: 'Check the preview, then Save', desc: 'Claude reads the name and description from the top of the file and shows them back to you. That is how it later decides when this Skill applies. A security scan runs when you save.', shot: '/level3_upload_preview.png', alt: 'Upload skill screen with pitch_skill.md loaded and Presentation Builder shown in the preview' },
  { num: '05', title: 'Check it is switched on', desc: 'The Skill appears as presentation-builder with its toggle on. Your Minion is now a presentation specialist in every chat.', shot: '/level3_skill_installed.png', alt: 'The installed presentation-builder Skill with its toggle enabled' },
]

const SKILL_QUESTIONS = [
  'Who is this for? (pick as many as apply)',
  'What do you want them to do afterwards? (pick as many as apply)',
  'What should it feel like — bold, clean, warm, or energetic?',
  'Any colour or visual direction?',
  'Anything it must include that Claude would not know?',
]

export default function Level3Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // 0 ran without Skill · 1 installed Skill · 2 ran again · 3 compared
  const [checked, setChecked] = useState<boolean[]>(() => new Array(4).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'before',        label: 'Ask Without a Skill' },
    { id: 'install',       label: 'Install the Skill' },
    { id: 'after',         label: 'Ask Again' },
    { id: 'reveal',        label: 'What Changed' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const noSkill   = res['prompt-no-skill']   as { instruction: string; content: string; note: string }
  const brief     = res['prompt-mission-brief'] as { instruction: string; content: string; note: string }
  const withSkill = res['prompt-with-skill'] as { instruction: string; content: string; note: string }
  const skillFile = res['skill-file']        as { filename: string; description: string }
  const reveal    = briefingData.reveal

  return (
    <>
      {showBriefing && <LevelBriefingModal data={briefingData} onEnter={handleEnter} />}

      <TableOfContents sections={tocSections} checked={checked} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        <LevelHeader level={briefingData.level} briefing={briefingData} checked={checked} />

        {/* Before */}
        <section id="before" className="space-y-6">
          <SectionHeader
            eyebrow="// ASK WITHOUT A SKILL"
            title="Set Your Baseline."
            intro={noSkill.instruction}
          />
          <Card done={checked[0]}>
            <Callout tone="important" label="Stay on the same chat">
              Use the Level 02 conversation, where your Minion still has all five answers and your special tool in front of it.
            </Callout>
            <PromptBlock label="PRESENTATION PROMPT — NO SKILL" promptText={noSkill.content} variant="test" substituteMinion={true} />
            <Callout>{noSkill.note}</Callout>
            <MarkDone done={checked[0]} onToggle={() => toggleCheck(0)} />
          </Card>
        </section>

        {/* Install */}
        <section id="install" className="space-y-6">
          <SectionHeader
            eyebrow="// INSTALL THE SKILL"
            title="Give It the Method."
            intro="A Skill is a page of plain English — the method you would explain to a new colleague, written down once. Open the file and read it before you upload it."
          />
          <Card done={checked[1]}>
            <a
              href="/files/pitch_skill.md"
              download={skillFile.filename}
              className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-150"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <Download size={20} style={{ color: 'var(--yellow-muted)', flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <p className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{skillFile.filename}</p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{skillFile.description}</p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                DOWNLOAD
              </span>
            </a>

            <StepList steps={INSTALL_STEPS} />

            <Callout tone="important" label="A Skill attaches when a chat starts">
              It cannot join a conversation already in progress, even if you invoke it by name. That is why the next step needs a fresh chat — and why you will carry your findings across first.
            </Callout>

            <MarkDone done={checked[1]} onToggle={() => toggleCheck(1)} />
          </Card>
        </section>

        {/* After */}
        <section id="after" className="space-y-6">
          <SectionHeader
            eyebrow="// ASK AGAIN"
            title="Fresh Chat. Same Words."
            intro="Two moves. Package up what you found, then hand it to a new chat that has the Skill."
          />
          <Card done={checked[2]}>
            <div className="space-y-2">
              <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                First, package up your findings
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {brief.instruction}
              </p>
            </div>
            <PromptBlock label="MISSION BRIEF — RUN IN YOUR OLD CHAT" promptText={brief.content} variant="core" substituteMinion={true} />

            <div className="space-y-2" style={{ paddingTop: 4 }}>
              <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                Then hand it to a fresh chat
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {withSkill.instruction}
              </p>
            </div>
            <PromptBlock label="PRESENTATION PROMPT — WITH SKILL" promptText={withSkill.content} variant="final" substituteMinion={true} />
            <Callout label="The brief it will ask you to fill in">
              <ul className="space-y-1 mt-1">
                {SKILL_QUESTIONS.map(q => (
                  <li key={q} className="flex items-start gap-2">
                    <span style={{ color: 'var(--yellow-muted)', flexShrink: 0 }}>→</span>{q}
                  </li>
                ))}
              </ul>
            </Callout>
            <Callout>{withSkill.note}</Callout>
            <MarkDone done={checked[2]} onToggle={() => toggleCheck(2)} />
          </Card>
        </section>

        {/* Reveal */}
        <section id="reveal" className="space-y-6">
          <SectionHeader eyebrow="// WHAT CHANGED" title="Same Prompt. Different Minion." />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <X size={14} style={{ color: 'var(--text-muted)' }} />
                <span className="meta-label">{reveal.without.label}</span>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {reveal.without.points.map(p => (
                  <li key={p} className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="surface overflow-hidden" style={{ borderColor: 'var(--yellow)' }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)', background: 'var(--tint-amber)' }}>
                <Check size={14} style={{ color: 'var(--yellow-text)' }} />
                <span className="meta-label" style={{ color: 'var(--yellow-text)' }}>{reveal.with.label}</span>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {reveal.with.points.map(p => (
                  <li key={p} className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <Card done={checked[3]}>
            <div className="space-y-2">
              <p className="text-base font-bold leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                {reveal.insight}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {reveal.reuse}
              </p>
            </div>
            <MarkDone done={checked[3]} onToggle={() => toggleCheck(3)} />
          </Card>
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
