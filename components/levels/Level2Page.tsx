'use client'

import { useState, useCallback } from 'react'
import { Download, Copy, Check, CheckSquare, Square, ExternalLink, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import LevelProgressCard from '../LevelProgressCard'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level2/level_02_briefing.json'
import resourcesData from '@/content/levels/level2/level_02_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level2Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // 10 checked items matching mission_check (0 created GPT, 1 name/desc/instructions,
  // 2 uploaded data, 3-7 the five questions Q01-Q05, 8 special tool, 9 debrief)
  const [checked, setChecked] = useState<boolean[]>(() => new Array(10).fill(false))
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
    { id: 'build',         label: 'Build Your GPT' },
    { id: 'data',          label: 'Upload Mission Data' },
    { id: 'questions',     label: '5 Mission Questions' },
    { id: 'special-tool',  label: 'Special Tool' },
    { id: 'debrief',       label: 'Mission Debrief' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const gptName: string         = res['gpt-name'].content
  const gptDescription: string  = res['gpt-description'].content
  const gptInstructions: string = res['gpt-instructions'].content
  const missionData             = res['mission-data'] as { filename: string; description: string }
  const missionInstruction: string = res['mission-questions'].instruction
  const questions: Array<{ number: string; title: string; prompt: string }> = res['mission-questions'].questions
  const specialToolContent: string    = res['prompt-special-tool'].content
  const specialToolInstruction: string = res['prompt-special-tool'].instruction
  const debriefContent: string       = res['prompt-create-txt'].content
  const debriefInstruction: string   = res['prompt-create-txt'].instruction
  const debriefNote: string          = res['prompt-create-txt'].note

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
    { num: '01', title: 'Open Explore GPTs',       desc: 'Click GPTs in the left sidebar of ChatGPT, then click Explore GPTs.' },
    { num: '02', title: 'Click + Create',           desc: 'Click the + Create button in the top right corner of the Explore GPTs page.' },
    { num: '03', title: 'Switch to Configure',      desc: 'Click the Configure tab at the top of the GPT builder. Your screen should look like this.', field: 'configure' },
    { num: '04', title: 'Upload GPT Image',         desc: 'Click the + circle at the top to upload a profile image for your GPT. Download and use the image below.', field: 'icon' },
    { num: '05', title: 'Add Name',                 desc: 'Copy and paste the GPT name into the Name field.', field: 'name' },
    { num: '06', title: 'Add Description',          desc: 'Copy and paste the description into the Description field.', field: 'description' },
    { num: '07', title: 'Add Instructions',         desc: 'Copy the full GPT instructions and paste into the Instructions field.', field: 'instructions' },
    { num: '08', title: 'Enable All Capabilities',  desc: 'Scroll down to Capabilities and check all 5 options — Web Search, Apps, Canvas, Image Generation, and Code Interpreter & Data Analysis.', field: 'capabilities' },
    { num: '09', title: 'Share with Your Partner',  desc: 'Click the Share button and add your partner\'s email.', field: 'share' },
    { num: '10', title: 'Hit Create',               desc: 'Click the Create button in the top right corner to save your GPT.', field: 'saved' },
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

        {/* Build Your GPT */}
        <section id="build" className="space-y-6">
          <p className="section-eyebrow">// BUILD YOUR CUSTOM GPT</p>

          <div
            className="rounded-lg p-5 flex flex-col gap-4 transition-all duration-300"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${checked[0] && checked[1] ? 'var(--green)' : 'var(--border)'}`,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Follow these steps to build your Custom GPT
              </h3>
              <a
                href="https://chatgpt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex flex-shrink-0"
              >
                Open ChatGPT <ExternalLink size={13} />
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
                    {step.field === 'icon' && (
                      <div className="flex flex-col gap-2 pt-1">
                        <div className="flex items-center gap-4">
                          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)', width: 80, height: 80 }}>
                            <img src="/level2_gpt_icon.png" alt="1inMINION Data Strategist GPT icon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>
                          <a
                            href="/level2_gpt_icon.png"
                            download="1inMINION_Data_Strategist_icon.png"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
                            style={{ background: 'var(--yellow)', color: 'var(--text-primary)', textDecoration: 'none' }}
                          >
                            <Download size={12} /> DOWNLOAD ICON
                          </a>
                        </div>
                        <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                          The downloaded file will be available in your Downloads folder.
                        </p>
                      </div>
                    )}
                    {step.field === 'configure' && (
                      <div className="space-y-1 pt-1">
                        <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>THE CONFIGURE TAB LOOKS LIKE THIS</p>
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                          <img src="/level2_gpt_configure_empty.png" alt="Empty GPT Configure tab showing Name, Description, and Instructions fields" style={{ width: '100%', display: 'block' }} />
                        </div>
                      </div>
                    )}
                    {step.field === 'name' && <CopyField id="gpt-name" value={gptName} />}
                    {step.field === 'description' && <CopyField id="gpt-description" value={gptDescription} />}
                    {step.field === 'instructions' && (
                      <>
                        <div className="flex items-start gap-2">
                          <div className="flex-1 text-xs px-3 py-2 rounded-md font-mono leading-relaxed" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)', maxHeight: 120, overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {gptInstructions.slice(0, 180)}…
                          </div>
                          <button
                            onClick={() => copyValue('gpt-instructions', gptInstructions)}
                            className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
                            style={{
                              background: copiedId === 'gpt-instructions' ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
                              color: copiedId === 'gpt-instructions' ? 'var(--green)' : 'var(--text-primary)',
                              border: copiedId === 'gpt-instructions' ? '1px solid var(--green)' : 'none',
                            }}
                          >
                            {copiedId === 'gpt-instructions' ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
                          </button>
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>YOUR CONFIGURE SCREEN SHOULD LOOK LIKE THIS</p>
                          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img src="/level2_gpt_configure.png" alt="GPT Configure screen with name, description, and instructions filled in" style={{ width: '100%', display: 'block' }} />
                          </div>
                        </div>
                      </>
                    )}
                    {step.field === 'capabilities' && (
                      <div className="space-y-1 pt-1">
                        <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>CHECK ALL 5 CAPABILITIES</p>
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: 420 }}>
                          <img src="/level2_gpt_capabilities.png" alt="All capabilities checked including Code Interpreter and Data Analysis" style={{ width: '100%', display: 'block' }} />
                        </div>
                      </div>
                    )}
                    {step.field === 'share' && (
                      <div className="space-y-2 pt-1">
                        <div className="flex flex-wrap gap-2 p-3 rounded-lg" style={{ background: 'rgba(242,155,28,0.06)', border: '1px solid rgba(242,155,28,0.2)' }}>
                          <span className="font-mono font-bold text-xs" style={{ color: 'var(--yellow-text)' }}>WHY THIS MATTERS:</span>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>→ Your partner can use the same GPT for their use case</span>
                            <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>→ Encourages collaboration and consistency across the team</span>
                            <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>→ Helps standardize a process</span>
                          </div>
                        </div>
                        <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>THE SHARE DIALOG LOOKS LIKE THIS</p>
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: 480 }}>
                          <img src="/level2_gpt_share.png" alt="Share GPT dialog showing how to add people from your workspace" style={{ width: '100%', display: 'block' }} />
                        </div>
                      </div>
                    )}
                    {step.field === 'saved' && (
                      <div className="space-y-1 pt-1">
                        <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>CLICK VIEW GPT TO OPEN YOUR NEW GPT</p>
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: 480 }}>
                          <img src="/level2_gpt_saved.png" alt="GPT Updated dialog showing 1inMINION Data Strategist with View GPT button" style={{ width: '100%', display: 'block' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => { toggleCheck(0); toggleCheck(1) }}
                className="flex items-center gap-1.5 transition-all duration-150"
                style={{ color: (checked[0] && checked[1]) ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {(checked[0] && checked[1]) ? <CheckSquare size={18} /> : <Square size={18} />}
                <span className="hidden sm:inline">{(checked[0] && checked[1]) ? 'Done' : 'Mark done'}</span>
              </button>
            </div>

          </div>
        </section>

        {/* Upload Mission Data */}
        <section id="data" className="space-y-6">
          <p className="section-eyebrow">// UPLOAD MISSION DATA</p>

          <div
            className="rounded-lg p-5 flex flex-col gap-4 transition-all duration-300"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${checked[2] ? 'var(--green)' : 'var(--border)'}`,
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Download the mission data file below, then upload it directly into your Custom GPT chat.
              </p>
              <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                The downloaded file will be available in your Downloads folder.
              </p>
            </div>

            <a
              href="/files/minion_mission_data.csv"
              download={missionData.filename}
              className="flex items-center gap-4 p-5 rounded-xl transition-all duration-150"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                <Download size={22} style={{ color: 'var(--yellow)' }} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-bold text-sm" style={{ color: 'var(--yellow-text)' }}>{missionData.filename}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{missionData.description}</p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                DOWNLOAD
              </span>
            </a>

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>HOW TO UPLOAD THE FILE</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Click the <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>+</span> symbol on the chat screen, click <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>Add photos &amp; files</span>, then select the recently downloaded file from your Downloads folder.
                </p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <img src="/level2_upload_file.png" alt="Click + then Add photos and files to upload the mission data" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>YOUR GPT CHAT SHOULD LOOK LIKE THIS</p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <img src="/level2_data_uploaded.png" alt="1inMINION Data Strategist GPT with minion_mission_data.csv uploaded in chat" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => toggleCheck(2)}
                className="flex items-center gap-1.5 transition-all duration-150"
                style={{ color: checked[2] ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {checked[2] ? <CheckSquare size={18} /> : <Square size={18} />}
                <span className="hidden sm:inline">{checked[2] ? 'Done' : 'Mark done'}</span>
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
                      // This one is yours — ask your GPT in your own words. You already know how.
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

        {/* Mission Debrief */}
        <section id="debrief">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '2px solid var(--yellow)', boxShadow: '0 0 0 4px rgba(242,155,28,0.12), 0 8px 32px rgba(242,155,28,0.18)', animation: 'shadowPulse 2.2s ease-in-out infinite' }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ background: 'var(--yellow)' }}>
              <div className="flex items-center gap-3">
                <FileText size={20} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                <div>
                  <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.16em' }}>// DO THIS BEFORE YOU LEAVE</p>
                  <p className="font-bold text-lg leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Generate Your Mission Debrief File</p>
                </div>
              </div>
              <button onClick={() => toggleCheck(9)} className="flex-shrink-0 flex items-center gap-1.5 transition-all duration-150" style={{ color: checked[9] ? 'var(--green)' : 'rgba(0,0,0,0.45)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {checked[9] ? <CheckSquare size={20} /> : <Square size={20} />}
                <span className="hidden sm:inline font-bold">{checked[9] ? 'Done' : 'Mark done'}</span>
              </button>
            </div>
            <div className="px-5 py-5 flex flex-col gap-4" style={{ background: 'var(--bg-warm)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{debriefInstruction}</p>
              <PromptBlock label="MISSION DEBRIEF — COMPILE EVERYTHING" promptText={debriefContent} variant="final" substituteMinion={true} />
              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(242,155,28,0.12)', border: '1.5px solid rgba(242,155,28,0.5)' }}>
                <span className="text-lg flex-shrink-0">💾</span>
                <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>{debriefNote}</p>
              </div>
            </div>
          </div>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/3"
            nextLabel="ADVANCE TO LEVEL 03: THE MISSION PLAN"
            levelNumber={2}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
