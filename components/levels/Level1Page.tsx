'use client'

import { useState, useCallback } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import StepCard from '../StepCard'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import TableOfContents from '../TableOfContents'
import LevelHeader from '../ui/LevelHeader'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Callout from '../ui/Callout'
import MarkDone from '../ui/MarkDone'
import briefingData from '@/content/levels/level1/level_01_briefing.json'
import stepsData from '@/content/levels/level1/level_01_steps.json'
import resourcesData from '@/content/levels/level1/level_01_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level1Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // checked[0]: ran vague prompt · checked[1]: ran structured prompt
  // checked[2-7]: the six layer cards L0-L5
  const [checked, setChecked] = useState<boolean[]>(() => new Array(8).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'difference',    label: 'See the Difference' },
    { id: 'what-changed',  label: 'What Changed' },
    { id: 'build',         label: 'Build It Yourself' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const cards      = stepsData.cards
  const vagueCard  = cards[0]
  const goodCard   = cards[1]
  const vaguePrompt: string = res['prompt-vague'].content
  const goodPrompt: string  = res['prompt-good'].content
  const breakdown: Array<{ layer: string; highlight: string; explanation: string }> = res['prompt-good'].breakdown
  const conceptResources = resourcesData.resources.filter(r => r.type === 'concept')

  return (
    <>
      {showBriefing && <LevelBriefingModal data={briefingData} onEnter={handleEnter} />}

      <TableOfContents sections={tocSections} checked={checked} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        <LevelHeader level={briefingData.level} briefing={briefingData} checked={checked} />

        {/* See the difference */}
        <section id="difference" className="space-y-6">
          <SectionHeader
            eyebrow="// SEE THE DIFFERENCE"
            title="Two Ways to Ask."
            intro="Same Minion, same topic, two very different results. Run both before you read any further — the point only lands if you see it yourself."
          />

          <StepCard
            stepNumber={vagueCard.card}
            title={vagueCard.title}
            description={vagueCard.description}
            checked={checked[0]}
            onCheck={() => toggleCheck(0)}
          >
            <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              OPEN CLAUDE <ExternalLink size={12} />
            </a>
            <PromptBlock label={res['prompt-vague'].label.toUpperCase()} promptText={vaguePrompt} variant="test" substituteMinion={true} />
            <Callout>{res['prompt-vague'].note}</Callout>
          </StepCard>

          <StepCard
            stepNumber={goodCard.card}
            title={goodCard.title}
            description={goodCard.description}
            checked={checked[1]}
            onCheck={() => toggleCheck(1)}
          >
            <PromptBlock label={res['prompt-good'].label.toUpperCase()} promptText={goodPrompt} variant="core" substituteMinion={true} />
            <Callout tone="important">{res['prompt-good'].note}</Callout>
          </StepCard>
        </section>

        {/* What changed — the five layers */}
        <section id="what-changed" className="space-y-6">
          <SectionHeader
            eyebrow="// WHAT CHANGED"
            title="The Structured Prompt Has 5 Layers."
            intro="Every layer does one job. Together they turn a vague request into a precise instruction. Read what each one contributes — you will add them yourself next."
          />

          <div className="flex flex-col">
            {breakdown.map((item, i) => (
              <div
                key={item.layer}
                className="flex items-start gap-4"
                style={{
                  paddingTop: i === 0 ? 0 : 20,
                  paddingBottom: i === breakdown.length - 1 ? 0 : 20,
                  borderBottom: i === breakdown.length - 1 ? 'none' : '1px solid var(--border)',
                }}
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center font-mono font-bold"
                  style={{ width: 26, height: 26, borderRadius: '50%', marginTop: 2, background: 'var(--tint-amber-hi)', color: 'var(--yellow-text)', fontSize: 12 }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                    {item.layer}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
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

        {/* Build it layer by layer */}
        <section id="build" className="space-y-6">
          <SectionHeader
            eyebrow="// BUILD IT YOURSELF"
            title="Now Add Each Layer."
            intro="Start with a raw question, add a single layer, run it, and read what changed before moving on. The highlighted text is the only thing that is new — everything else carries forward untouched."
          />

          <div className="space-y-4">
            {conceptResources.map((concept, i) => {
              const idx = 2 + i
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const whatChanged = (concept.try_prompt as any)?.what_changed as string | null
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const addedHighlight = (concept as any).added_highlight as string | null
              return (
                <Card key={concept.id} done={checked[idx]}>
                  <div className="space-y-2">
                    <p className="meta-label" style={{ color: 'var(--yellow-muted)' }}>{concept.label}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {concept.concept_intro}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 700 }}>
                    {concept.try_prompt?.instruction}
                  </p>

                  <PromptBlock
                    label={concept.label.toUpperCase()}
                    promptText={concept.try_prompt?.content ?? ''}
                    variant="core"
                    substituteMinion={true}
                    highlightText={addedHighlight}
                  />

                  {whatChanged && <Callout label="What changed">{whatChanged}</Callout>}

                  <MarkDone done={checked[idx]} onToggle={() => toggleCheck(idx)} />
                </Card>
              )
            })}
          </div>
        </section>

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
