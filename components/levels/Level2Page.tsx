'use client'

import { useState, useCallback } from 'react'
import { Download, Copy, Check, ExternalLink } from 'lucide-react'
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
import StepRow from '../ui/StepRow'
import Figure from '../ui/Figure'
import { useMinionName } from '@/hooks/useMinionName'
import briefingData from '@/content/levels/level2/level_02_briefing.json'
import resourcesData from '@/content/levels/level2/level_02_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

const MINION_BEHAVIOUR = [
  'Shows the data in a table or chart so you can see it clearly',
  'Leads with the most surprising finding, not the obvious one',
  'Backs every claim with a specific number or percentage',
  'Ends with one clear recommendation, not a list of options',
]

export default function Level2Page() {
  const { minionName } = useMinionName()
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // 0 project · 1 instructions · 2 data + memory · 3-7 Q01-Q05 · 8 special tool
  const [checked, setChecked] = useState<boolean[]>(() => new Array(9).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const copyValue = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'build',         label: 'Build Your Project' },
    { id: 'questions',     label: '5 Mission Questions' },
    { id: 'special-tool',  label: 'Special Tool' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const projectName: string         = res['project-name'].content
  const projectDescription: string  = res['project-description'].content
  const projectInstructions: string = res['project-instructions'].content
  const meetPrompt   = res['prompt-meet-minion'] as { instruction: string; content: string }
  const memoryPrompt = res['prompt-test-memory'] as { instruction: string; content: string; note: string }
  const missionData  = res['mission-data'] as { filename: string; description: string }
  const missionInstruction: string = res['mission-questions'].instruction
  const questions: Array<{ number: string; title: string; prompt: string }> = res['mission-questions'].questions
  const specialToolContent: string = res['prompt-special-tool'].content
  const specialToolInstruction: string = res['prompt-special-tool'].instruction

  const withMinion = (t: string) => t.replace(/\[MINION NAME\]/g, minionName)

  const CopyField = ({ id, value, label }: { id: string; value: string; label: string }) => (
    <div className="space-y-1.5">
      <p className="meta-label">{label}</p>
      <div className="flex items-center gap-2">
        <code
          className="flex-1 text-sm px-3 py-2 rounded-md font-mono truncate"
          style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
        >
          {value}
        </code>
        <button
          onClick={() => copyValue(id, value)}
          className="flex-shrink-0 flex items-center gap-1 px-2.5 py-2 rounded-md text-xs font-mono font-bold transition-colors duration-150"
          style={{
            background: copiedId === id ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
            color: copiedId === id ? 'var(--green)' : 'var(--text-primary)',
            border: copiedId === id ? '1px solid var(--green)' : '1px solid transparent',
          }}
        >
          {copiedId === id ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
        </button>
      </div>
    </div>
  )

  const divider = { paddingTop: 18, paddingBottom: 18, borderBottom: '1px solid var(--border)' }

  return (
    <>
      {showBriefing && <LevelBriefingModal data={briefingData} onEnter={handleEnter} />}

      <TableOfContents sections={tocSections} checked={checked} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        <LevelHeader level={briefingData.level} briefing={briefingData} checked={checked} />

        {/* Build the project */}
        <section id="build" className="space-y-6">
          <SectionHeader
            eyebrow="// BUILD YOUR PROJECT"
            title="Give Your Minion a Base."
            intro="Six steps. You do this once, and every chat inside the Project starts already briefed."
          />

          <Card done={checked[0] && checked[1] && checked[2]}>
            <a href="https://claude.ai/projects" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex self-start">
              Open Claude <ExternalLink size={13} />
            </a>

            <div className="flex flex-col">
              <div style={divider}>
                <StepRow step={{ num: '01', title: 'Open Claude', desc: 'Go to claude.ai and sign in to your account.' }} />
              </div>
              <div style={divider}>
                <StepRow step={{ num: '02', title: 'Go to Projects', desc: 'Click Projects in the left sidebar.' }} />
              </div>

              <div style={divider}>
                <StepRow step={{ num: '03', title: 'Create Your Project', desc: 'Click New Project. Claude asks you two questions in one dialog — fill both in, then click Create project.' }}>
                  <CopyField id="project-name" value={withMinion(projectName)} label="What are you working on?" />
                  <CopyField id="project-description" value={projectDescription} label="What are you trying to achieve?" />
                  <Figure src="/level2_create_project.png" alt="Claude's Create a project dialog with the name and goal filled in" caption="The dialog" />
                  <Figure src="/level2_project_view.png" alt="A new empty Claude Project showing the Instructions and Context panels" caption="Your new project" />
                  <Callout tone="important" label="Look at the panel on the right">
                    <strong style={{ color: 'var(--text-primary)' }}>Instructions</strong> is who your Minion is.{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>Context</strong> is what it knows. You fill in both, in that order. That is the whole level.
                  </Callout>
                </StepRow>
              </div>

              <div style={divider}>
                <StepRow step={{ num: '04', title: 'Add Project Instructions', desc: 'Hit the + next to Instructions, paste these in, and save. This is what turns a blank Project into your Minion.' }}>
                  <div className="flex items-start gap-2">
                    <div
                      className="flex-1 text-xs px-3 py-2 rounded-md font-mono leading-relaxed"
                      style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-secondary)', maxHeight: 110, overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                    >
                      {withMinion(projectInstructions).slice(0, 180)}…
                    </div>
                    <button
                      onClick={() => copyValue('project-instructions', withMinion(projectInstructions))}
                      className="flex-shrink-0 flex items-center gap-1 px-2.5 py-2 rounded-md text-xs font-mono font-bold transition-colors duration-150"
                      style={{
                        background: copiedId === 'project-instructions' ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
                        color: copiedId === 'project-instructions' ? 'var(--green)' : 'var(--text-primary)',
                        border: copiedId === 'project-instructions' ? '1px solid var(--green)' : '1px solid transparent',
                      }}
                    >
                      {copiedId === 'project-instructions' ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
                    </button>
                  </div>
                  <Figure src="/level2_edit_instructions.png" alt="The Edit instructions button beside the Instructions panel" caption="Hit the + next to Instructions" narrow />
                  <Figure src="/level2_set_instructions.png" alt="The Set project instructions dialog with the Minion instructions pasted in" caption="Paste, then save" />
                </StepRow>
              </div>

              <div style={divider}>
                <StepRow step={{ num: '05', title: 'Load the Mission Data', desc: 'Download the 374 mission records and add them to your Project’s Context. You do this once and every chat in the Project can use it.' }}>
                  <a
                    href="/files/minion_mission_data.csv"
                    download={missionData.filename}
                    className="flex items-center gap-3 p-4 rounded-xl transition-colors duration-150"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <Download size={18} style={{ color: 'var(--yellow-muted)', flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{missionData.filename}</p>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{missionData.description}</p>
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                      DOWNLOAD
                    </span>
                  </a>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Hit the <strong style={{ color: 'var(--text-primary)' }}>+</strong> next to <strong style={{ color: 'var(--text-primary)' }}>Context</strong> and add the file from your Downloads folder. Context belongs to the Project, not to one chat — that difference is the whole point of this level.
                  </p>
                  <Figure src="/level2_add_files.png" alt="The Add files button beside the Context panel in a Claude Project" caption="Add files to Context" narrow />
                </StepRow>
              </div>

              <div style={{ paddingTop: 18 }}>
                <StepRow step={{ num: '06', title: 'Meet Your Minion, Then Test the Memory', desc: 'Two chats. The first introduces your Minion. The second proves it never forgets.' }}>
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {meetPrompt.instruction}
                    </p>
                    <PromptBlock label="FIRST CHAT — MEET YOUR MINION" promptText={meetPrompt.content} variant="core" substituteMinion={true} />
                    <Figure src="/level2_meet_minion.png" alt="A first chat in the Project with the mission data showing in Context" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {memoryPrompt.instruction}
                    </p>
                    <PromptBlock label="SECOND CHAT — TEST THE MEMORY" promptText={memoryPrompt.content} variant="test" substituteMinion={true} />
                    <Figure src="/level2_test_memory.png" alt="A brand new chat in the same Project, with the earlier chat listed under Recents" />
                  </div>
                  <Callout tone="important">{memoryPrompt.note}</Callout>
                </StepRow>
              </div>
            </div>

            <MarkDone
              done={checked[0] && checked[1] && checked[2]}
              onToggle={() => { toggleCheck(0); toggleCheck(1); toggleCheck(2) }}
            />
          </Card>
        </section>

        {/* Mission questions */}
        <section id="questions" className="space-y-6">
          <SectionHeader
            eyebrow="// THE 5 MISSION QUESTIONS"
            title="Interrogate the Data."
            intro={missionInstruction}
          />

          <Callout label="Every time you ask, your Minion will">
            <ul className="space-y-1 mt-1">
              {MINION_BEHAVIOUR.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: 'var(--yellow-muted)', flexShrink: 0 }}>→</span>{item}
                </li>
              ))}
            </ul>
          </Callout>

          <div className="space-y-4">
            {questions.map(({ number, title, prompt }, qi) => (
              <Card key={number} done={checked[3 + qi]}>
                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 flex items-center justify-center font-mono font-bold"
                    style={{
                      width: 26, height: 26, borderRadius: '50%', marginTop: 1,
                      background: checked[3 + qi] ? 'var(--green)' : 'var(--tint-amber-hi)',
                      color: checked[3 + qi] ? '#fff' : 'var(--yellow-text)',
                      fontSize: 12,
                    }}
                  >
                    {number}
                  </span>
                  <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                    {title}
                  </h3>
                </div>

                {qi < 3
                  ? <PromptBlock label={`${number} — ${title.toUpperCase()}`} promptText={prompt} variant="core" substituteMinion={true} />
                  : <Callout>This one is yours. Ask your Minion in your own words — you already know how.</Callout>
                }

                <MarkDone done={checked[3 + qi]} onToggle={() => toggleCheck(3 + qi)} />
              </Card>
            ))}
          </div>
        </section>

        {/* Special tool — the one payoff moment on this page */}
        <section id="special-tool" className="space-y-6">
          <SectionHeader eyebrow="// THE FINAL QUESTION" title="Invent Your Special Tool." />

          <div className="payoff">
            <div className="payoff-header">
              <p className="font-mono font-bold" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.55)' }}>
                DO THIS BEFORE YOU LEAVE
              </p>
              <p className="font-bold text-lg leading-tight mt-0.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Something No Team Has Had
              </p>
            </div>
            <div className="payoff-body flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {specialToolInstruction}
              </p>
              <PromptBlock label="INVENT YOUR SPECIAL TOOL" promptText={specialToolContent} variant="final" substituteMinion={true} />
              <MarkDone done={checked[8]} onToggle={() => toggleCheck(8)} />
            </div>
          </div>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/3"
            nextLabel="ADVANCE TO LEVEL 03: UPGRADE YOUR MINION"
            levelNumber={2}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
