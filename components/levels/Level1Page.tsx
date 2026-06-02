'use client'

import { useState, useCallback } from 'react'
import { ExternalLink, ChevronDown, ChevronUp, CheckSquare, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import StepCard from '../StepCard'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import LevelProgressCard from '../LevelProgressCard'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level1/level_01_briefing.json'
import stepsData from '@/content/levels/level1/level_01_steps.json'
import resourcesData from '@/content/levels/level1/level_01_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level1Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // checked[0]: StepCard 01 — ran vague prompt
  // checked[1]: StepCard 02 — ran structured prompt
  // checked[2-7]: Layer cards L0-L5
  const [checked, setChecked] = useState<boolean[]>(() => new Array(8).fill(false))
  const [openAdv, setOpenAdv] = useState<string | null>(null)
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'difference',   label: 'See the Difference' },
    { id: 'what-changed', label: 'What Changed' },
    { id: 'build',        label: 'Build It Layer by Layer' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const cards     = stepsData.cards
  const vagueCard = cards[0]
  const goodCard  = cards[1]

  const vaguePrompt: string = res['prompt-vague'].content
  const goodPrompt: string  = res['prompt-good'].content
  const breakdown: Array<{ layer: string; highlight: string; explanation: string }> = res['prompt-good'].breakdown

  const conceptResources = resourcesData.resources.filter(r => r.type === 'concept')
  const advancedResources = resourcesData.resources.filter(r => r.type === 'advanced')

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
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.7, textAlign: 'justify' }}>
            {briefingData.level.subdescription}
          </p>
          <span className="pill-badge">⏱ {briefingData.level.duration.toUpperCase()}</span>
          <LevelBriefingSection data={briefingData} />
          <LevelProgressCard checked={checked} />
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </section>

        {/* Part 01: See the Difference */}
        <section id="difference" className="space-y-6">
          <p className="section-eyebrow">// PART 01 — SEE THE DIFFERENCE</p>

          <StepCard stepNumber={vagueCard.card} title={vagueCard.title} description={vagueCard.description} checked={checked[0]} onCheck={() => toggleCheck(0)}>
            <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              OPEN CHATGPT <ExternalLink size={12} />
            </a>
            <PromptBlock label={res['prompt-vague'].label.toUpperCase()} promptText={vaguePrompt} variant="test" substituteMinion={true} />
            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>💡 </span>{res['prompt-vague'].note}
              </p>
            </div>
          </StepCard>

          <StepCard stepNumber={goodCard.card} title={goodCard.title} description={goodCard.description} checked={checked[1]} onCheck={() => toggleCheck(1)}>
            <PromptBlock label={res['prompt-good'].label.toUpperCase()} promptText={goodPrompt} variant="core" substituteMinion={true} />
            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>💡 </span>{res['prompt-good'].note}
              </p>
            </div>
          </StepCard>
        </section>

        {/* What Changed — 5-layer breakdown */}
        <section id="what-changed" className="space-y-5">
          <div>
            <p className="section-eyebrow">// WHAT CHANGED?</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              The Structured Prompt Has 5 Layers.
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              Every layer does something different. Together they turn a vague request into a precise instruction. Here is exactly what was added and why it works.
            </p>
          </div>

          <div className="space-y-3">
            {breakdown.map((item, i) => (
              <div
                key={item.layer}
                className="rounded-lg overflow-hidden"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                    style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-mono font-bold text-sm tracking-widest" style={{ color: 'var(--yellow-text)' }}>
                    {item.layer.toUpperCase()}
                  </span>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <p className="text-sm font-mono leading-relaxed" style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
                    &ldquo;{item.highlight}&rdquo;
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Part 02: Build It Layer by Layer */}
        <section id="build" className="space-y-6">
          <div>
            <p className="section-eyebrow">// PART 02 — BUILD IT LAYER BY LAYER</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Now Add Each Layer Yourself.
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              Start from the vague prompt. Add one layer at a time. Run it after each addition. Watch how the output changes with every step.
            </p>
          </div>

          <div className="space-y-4">
            {conceptResources.map((concept, i) => {
              const layerCheckIdx = 2 + i
              const isLayerDone = checked[layerCheckIdx]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const whatChanged = (concept.try_prompt as any)?.what_changed as string | null
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const addedHighlight = (concept as any).added_highlight as string | null
              return (
                <div
                  key={concept.id}
                  className="rounded-lg overflow-hidden"
                  style={{ background: 'var(--bg-secondary)', border: `1px solid ${isLayerDone ? 'var(--green)' : 'var(--border)'}`, borderLeft: `2px solid ${isLayerDone ? 'var(--green)' : 'var(--yellow)'}` }}
                >
                  {/* Concept header */}
                  <div className="px-5 py-4 space-y-1" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono font-bold text-xs px-2 py-0.5 rounded"
                        style={{ background: isLayerDone ? 'var(--green)' : 'var(--yellow)', color: isLayerDone ? 'white' : 'var(--text-primary)', whiteSpace: 'nowrap' }}
                      >
                        {concept.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed pt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {concept.concept_intro}
                    </p>
                  </div>

                  {/* Try prompt */}
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-xs font-mono font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(() => { const hl = (concept.try_prompt as any)?.instruction_highlight; const instr = concept.try_prompt?.instruction ?? ''; if (!hl || !instr.includes(hl)) return instr; const idx = instr.indexOf(hl); return <>{instr.slice(0, idx)}<span style={{ color: '#1F2937', background: 'var(--yellow)', borderRadius: 3, padding: '1px 5px', fontWeight: 800 }}>{hl}</span>{instr.slice(idx + hl.length)}</>})()}
                    </p>
                    <PromptBlock
                      label={concept.label.toUpperCase()}
                      promptText={concept.try_prompt?.content ?? ''}
                      variant="core"
                      substituteMinion={true}
                      highlightText={addedHighlight}
                    />
                    {whatChanged && (
                      <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(242,155,28,0.06)', border: '1px solid rgba(242,155,28,0.2)' }}>
                        <span className="font-mono font-bold text-xs flex-shrink-0" style={{ color: 'var(--yellow-text)' }}>+ WHAT CHANGED:</span>
                        <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{whatChanged}</p>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={() => toggleCheck(layerCheckIdx)}
                        className="flex items-center gap-1.5 transition-all duration-150"
                        style={{ color: isLayerDone ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        {isLayerDone ? <CheckSquare size={18} /> : <Square size={18} />}
                        <span className="hidden sm:inline">{isLayerDone ? 'Done' : 'Mark done'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Advanced techniques — collapsible accordion */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-purple)' }}>
            <div className="px-5 py-4" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
              <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--purple)' }}>
                // ADVANCED — WHEN YOU WANT TO GO FURTHER
              </p>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {advancedResources.map(adv => {
                const isOpen = openAdv === adv.id
                return (
                  <div key={adv.id}>
                    <button
                      onClick={() => setOpenAdv(isOpen ? null : adv.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
                      style={{ background: isOpen ? 'rgba(139,92,246,0.04)' : 'transparent', cursor: 'pointer' }}
                    >
                      <div>
                        <p className="font-mono font-bold text-sm" style={{ color: 'var(--purple)' }}>{adv.label}</p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                          {adv.concept_intro}
                        </p>
                      </div>
                      {isOpen
                        ? <ChevronUp size={15} className="flex-shrink-0 ml-4" style={{ color: 'var(--purple)' }} />
                        : <ChevronDown size={15} className="flex-shrink-0 ml-4" style={{ color: 'var(--text-muted)' }} />
                      }
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
                        <p className="text-xs font-mono font-bold tracking-widest pt-4" style={{ color: 'var(--text-muted)' }}>
                          {adv.try_prompt?.instruction}
                        </p>
                        <PromptBlock
                          label={adv.label.toUpperCase()}
                          promptText={adv.try_prompt?.content ?? ''}
                          variant="advanced"
                          substituteMinion={true}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          highlightText={(adv as any).added_highlight ?? null}
                        />
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(adv.try_prompt as any)?.what_changed && (
                          <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                            <span className="font-mono font-bold text-xs flex-shrink-0" style={{ color: 'var(--purple)' }}>+ WHAT CHANGED:</span>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{(adv.try_prompt as any).what_changed}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission Check */}
        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/2"
            nextLabel="ADVANCE TO LEVEL 02: ARM YOUR MINION"
            levelNumber={1}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
