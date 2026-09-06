'use client'

import { useState, useCallback } from 'react'
import { Download, Copy, Check, CheckSquare, Square, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import LevelProgressCard from '../LevelProgressCard'
import TableOfContents from '../TableOfContents'
import { useMinionName } from '@/hooks/useMinionName'
import briefingData from '@/content/levels/level2/level_02_briefing.json'
import resourcesData from '@/content/levels/level2/level_02_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level2Page() {
  const { minionName } = useMinionName()
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // 9 checked items matching mission_check (0 created Project, 1 instructions,
  // 2 loaded data + tested memory, 3-7 the five questions Q01-Q05, 8 special tool)
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
  const meetPrompt                  = res['prompt-meet-minion'] as { instruction: string; content: string }
  const memoryPrompt                = res['prompt-test-memory'] as { instruction: string; content: string; note: string }
  const missionData             = res['mission-data'] as { filename: string; description: string }
  const missionInstruction: string = res['mission-questions'].instruction
  const questions: Array<{ number: string; title: string; prompt: string }> = res['mission-questions'].questions
  const specialToolContent: string    = res['prompt-special-tool'].content
  const specialToolInstruction: string = res['prompt-special-tool'].instruction

  const withMinion = (t: string) => t.replace(/\[MINION NAME\]/g, minionName)

  const CopyField = ({ id, value }: { id: string; value: string }) => (
    <div className="flex items-center gap-2">
      <code className="flex-1 text-xs px-3 py-1.5 rounded-md font-mono truncate" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
        {value}
      </code>
      <button
        onClick={() => copyValue(id, value)}
        className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
        style={{
          background: copiedId === id ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
          color: copiedId === id ? 'var(--green)' : 'var(--text-primary)',
          border: copiedId === id ? '1px solid var(--green)' : 'none',
        }}
      >
        {copiedId === id ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
      </button>
    </div>
  )

  const buildSteps = [
    { num: '01', title: 'Open Claude',   desc: 'Go to claude.ai and sign in to your account.' },
    { num: '02', title: 'Go to Projects', desc: 'Click Projects in the left sidebar.' },
    { num: '03', title: 'Create Your Project', desc: 'Click New Project. Claude asks you two questions in one dialog \u2014 fill both in, then click Create project.', field: 'create' },
    { num: '04', title: 'Add Project Instructions', desc: 'In your new Project, hit the + next to Instructions, paste these in, and save. This is what turns a blank Project into your Minion.', field: 'instructions' },
    { num: '05', title: 'Load the Mission Data', desc: 'Download the 374 mission records and add them to your Project\u2019s Context. You do this once and every chat in the Project can use it.', field: 'data' },
    { num: '06', title: 'Meet Your Minion, Then Test the Memory', desc: 'Two chats. The first introduces your Minion. The second proves it never forgets.', field: 'meet' },
  ]

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

        {/* Build Your Project */}
        <section id="build" className="space-y-6">
          <p className="section-eyebrow">// BUILD YOUR PROJECT</p>

          <div
            className="rounded-lg p-5 flex flex-col gap-4 transition-all duration-300"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${checked[0] && checked[1] && checked[2] ? 'var(--green)' : 'var(--border)'}`,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Follow these steps to build your Project
              </h3>
              <a
                href="https://claude.ai/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex flex-shrink-0"
              >
                Open Claude <ExternalLink size={13} />
              </a>
            </div>

            <div className="space-y-2">
              {buildSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                    {step.num}
                  </span>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <p className="font-bold text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{step.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                    </div>
                    {step.field === 'create' && (
                      <div className="space-y-3 pt-1">
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>WHAT ARE YOU WORKING ON?</p>
                          <CopyField id="project-name" value={withMinion(projectName)} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>WHAT ARE YOU TRYING TO ACHIEVE?</p>
                          <CopyField id="project-description" value={projectDescription} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>THE DIALOG LOOKS LIKE THIS</p>
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img src="/level2_create_project.png" alt="Claude's Create a project dialog with the name and goal filled in" style={{ width: '100%', display: 'block' }} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>YOUR NEW PROJECT LANDS HERE</p>
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img src="/level2_project_view.png" alt="A new empty Claude Project showing the Instructions and Context panels" style={{ width: '100%', display: 'block' }} />
                          </div>
                          <div className="rounded-lg p-4 space-y-2.5 mt-2" style={{ background: 'rgba(242,155,28,0.07)', border: '1px solid rgba(242,155,28,0.3)', borderLeft: '3px solid var(--yellow)' }}>
                            <p className="font-mono font-bold text-xs" style={{ color: 'var(--yellow-text)', letterSpacing: '0.1em' }}>LOOK AT THE PANEL ON THE RIGHT</p>
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>INSTRUCTIONS</span>
                              <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>= <strong style={{ color: 'var(--text-primary)' }}>who</strong> your Minion is</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>CONTEXT</span>
                              <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>= <strong style={{ color: 'var(--text-primary)' }}>what</strong> it knows</span>
                            </div>
                            <p className="text-xs pt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                              You fill in both, in that order. That is the whole level.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {step.field === 'instructions' && (
                      <>
                        <div className="flex items-start gap-2">
                          <div className="flex-1 text-xs px-3 py-2 rounded-md font-mono leading-relaxed" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)', maxHeight: 120, overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {withMinion(projectInstructions).slice(0, 180)}…
                          </div>
                          <button
                            onClick={() => copyValue('project-instructions', withMinion(projectInstructions))}
                            className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
                            style={{
                              background: copiedId === 'project-instructions' ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
                              color: copiedId === 'project-instructions' ? 'var(--green)' : 'var(--text-primary)',
                              border: copiedId === 'project-instructions' ? '1px solid var(--green)' : 'none',
                            }}
                          >
                            {copiedId === 'project-instructions' ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
                          </button>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>HIT THE + NEXT TO INSTRUCTIONS</p>
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: 440 }}>
                            <img src="/level2_edit_instructions.png" alt="The Edit instructions button beside the Instructions panel" style={{ width: '100%', display: 'block' }} />
                          </div>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>PASTE, THEN SAVE INSTRUCTIONS</p>
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img src="/level2_set_instructions.png" alt="The Set project instructions dialog with the Minion instructions pasted in" style={{ width: '100%', display: 'block' }} />
                          </div>
                        </div>
                      </>
                    )}
                    {step.field === 'data' && (
                      <div className="space-y-3 pt-1">
                        <a
                          href="/files/minion_mission_data.csv"
                          download={missionData.filename}
                          className="flex items-center gap-3 p-4 rounded-xl transition-all duration-150"
                          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                            <Download size={18} style={{ color: 'var(--yellow)' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-mono font-bold text-xs" style={{ color: 'var(--yellow-text)' }}>{missionData.filename}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{missionData.description}</p>
                          </div>
                          <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                            DOWNLOAD
                          </span>
                        </a>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                          Hit the <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>+</span> next to <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>Context</span> and add the file from your Downloads folder. Context belongs to the Project, not to one chat &mdash; that difference is the whole point of this level.
                        </p>
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: 440 }}>
                          <img src="/level2_add_files.png" alt="The Add files button beside the Context panel in a Claude Project" style={{ width: '100%', display: 'block' }} />
                        </div>
                      </div>
                    )}
                    {step.field === 'meet' && (
                      <div className="space-y-4 pt-1">
                        <div className="space-y-2">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>FIRST CHAT &mdash; MEET YOUR MINION</p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                            {meetPrompt.instruction}
                          </p>
                          <PromptBlock label="MEET YOUR MINION" promptText={meetPrompt.content} variant="core" substituteMinion={true} />
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img src="/level2_meet_minion.png" alt="A first chat in the Project with the mission data showing in Context" style={{ width: '100%', display: 'block' }} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>SECOND CHAT &mdash; TEST THE MEMORY</p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                            {memoryPrompt.instruction}
                          </p>
                          <PromptBlock label="TEST THE MEMORY" promptText={memoryPrompt.content} variant="test" substituteMinion={true} />
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img src="/level2_test_memory.png" alt="A brand new chat in the same Project, with the earlier chat listed under Recents" style={{ width: '100%', display: 'block' }} />
                          </div>
                        </div>
                        <div className="rounded-lg p-4 flex items-start gap-3" style={{ background: 'rgba(242,155,28,0.1)', border: '1.5px solid rgba(242,155,28,0.45)' }}>
                          <span className="text-lg flex-shrink-0">🧠</span>
                          <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>{memoryPrompt.note}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => { toggleCheck(0); toggleCheck(1); toggleCheck(2) }}
                className="flex items-center gap-1.5 transition-all duration-150"
                style={{ color: (checked[0] && checked[1] && checked[2]) ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {(checked[0] && checked[1] && checked[2]) ? <CheckSquare size={18} /> : <Square size={18} />}
                <span className="hidden sm:inline">{(checked[0] && checked[1] && checked[2]) ? 'Done' : 'Mark done'}</span>
              </button>
            </div>

          </div>
        </section>

        {/* 5 Mission Questions */}
        <section id="questions" className="space-y-8">
          <div>
            <p className="section-eyebrow">// THE 5 MISSION QUESTIONS</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Interrogate the Data.
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {missionInstruction}
            </p>

            {/* Minion behaviour callout */}
            <div className="mt-4 rounded-lg p-4 space-y-2" style={{ background: 'rgba(242,155,28,0.06)', border: '1px solid rgba(242,155,28,0.25)' }}>
              <span className="text-xs font-mono font-bold" style={{ color: 'var(--yellow-text)', letterSpacing: '0.08em' }}>EVERY TIME YOU ASK, YOUR MINION WILL:</span>
              <ul className="space-y-1">
                {[
                  'Show the data in a table or chart so you can see it clearly',
                  'Lead with the most surprising finding — not the obvious one',
                  'Back every claim with a specific number or percentage',
                  'End with one clear recommendation — no list of options',
                  'Keep it sharp, warm, and slightly Minion-flavored',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--yellow-text)', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map(({ number, title, prompt }, qi) => {
              return (
                <div
                  key={number}
                  className="rounded-lg p-5 flex flex-col gap-4 transition-all duration-300"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderLeft: '2px solid var(--yellow)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                      {number}
                    </span>
                    <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                      {title}
                    </h3>
                  </div>
                  {qi < 3 && <PromptBlock label={`${number} - ${title.toUpperCase()}`} promptText={prompt} variant="core" substituteMinion={true} />}
                  {qi >= 3 && (
                    <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>
                      // This one is yours — ask your Minion in your own words. You already know how.
                    </p>
                  )}
                  <div className="flex justify-end">
                    <button onClick={() => toggleCheck(3 + qi)} className="flex items-center gap-1.5" style={{ color: checked[3 + qi] ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {checked[3 + qi] ? <CheckSquare size={18} /> : <Square size={18} />}
                      <span className="hidden sm:inline">{checked[3 + qi] ? 'Done' : 'Mark done'}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Special Tool */}
        <section id="special-tool" style={{ borderTop: '2px solid var(--yellow)', paddingTop: 24 }}>
          <p className="section-eyebrow mb-4">// THE FINAL QUESTION</p>
          <div className="rounded-lg p-5 flex flex-col gap-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '2px solid var(--yellow)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Invent Your Special Tool
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {specialToolInstruction}
            </p>
            <PromptBlock label="SPECIAL TOOL — ASK AFTER Q5" promptText={specialToolContent} variant="final" substituteMinion={true} />
            <div className="flex justify-end">
              <button onClick={() => toggleCheck(8)} className="flex items-center gap-1.5" style={{ color: checked[8] ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {checked[8] ? <CheckSquare size={18} /> : <Square size={18} />}
                <span className="hidden sm:inline">{checked[8] ? 'Done' : 'Mark done'}</span>
              </button>
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
