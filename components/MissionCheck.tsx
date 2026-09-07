'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckSquare, Square } from 'lucide-react'

interface MissionCheckProps {
  items: string[]
  nextLevel: string
  nextLabel: string
  levelNumber?: number
  isFinale?: boolean
  // controlled mode — when provided, syncs with external state
  checked?: boolean[]
  onToggle?: (i: number) => void
}

export default function MissionCheck({ items, nextLevel, nextLabel, levelNumber, isFinale, checked: externalChecked, onToggle }: MissionCheckProps) {
  const [internalChecked, setInternalChecked] = useState<boolean[]>(() => new Array(items.length).fill(false))
  const router = useRouter()

  const checked = externalChecked ?? internalChecked
  const allChecked = checked.every(Boolean)

  const toggle = (i: number) => {
    if (onToggle) {
      onToggle(i)
    } else {
      setInternalChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
    }
  }

  const selectAll = () => {
    if (onToggle) {
      checked.forEach((val, i) => { if (!val) onToggle(i) })
    } else {
      setInternalChecked(new Array(items.length).fill(true))
    }
  }

  const deselectAll = () => {
    if (onToggle) {
      checked.forEach((val, i) => { if (val) onToggle(i) })
    } else {
      setInternalChecked(new Array(items.length).fill(false))
    }
  }

  const handleAdvance = () => {
    if (levelNumber !== undefined) {
      const stored = JSON.parse(localStorage.getItem('completedLevels') || '[]') as number[]
      if (!stored.includes(levelNumber)) {
        localStorage.setItem('completedLevels', JSON.stringify([...stored, levelNumber]))
      }
    }
    router.push(nextLevel)
  }

  const borderColor = allChecked ? 'var(--green)' : 'var(--border)'
  const btnGlow = allChecked
    ? isFinale
      ? '0 8px 24px rgba(233,149,10,0.35), 0 2px 6px rgba(233,149,10,0.2)'
      : '0 4px 14px rgba(233,149,10,0.25), 0 1px 4px rgba(233,149,10,0.15)'
    : 'var(--shadow-xs)'

  return (
    <div
      className="rounded-lg p-6 flex flex-col gap-5 transition-all duration-300"
      style={{ background: 'var(--bg-secondary)', border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          // MISSION CHECK - BEFORE YOU ADVANCE
        </p>
        <button
          onClick={allChecked ? deselectAll : selectAll}
          className="font-mono font-bold text-xs tracking-wide transition-all duration-150 px-3 py-1.5 rounded-md"
          style={{
            color: 'var(--yellow-text)',
            background: 'var(--tint-amber)',
            border: '1px solid var(--rule-amber)',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          {allChecked ? 'DESELECT ALL' : 'SELECT ALL'}
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex items-start gap-3 text-left w-full group"
            >
              {checked[i]
                ? <CheckSquare size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--yellow)' }} />
                : <Square     size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
              }
              <span
                className="text-sm leading-snug transition-colors duration-150"
                style={{ color: checked[i] ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAdvance}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-lg font-mono font-bold tracking-widest transition-all duration-200"
        style={{
          background: 'var(--yellow)',
          color: '#0F0F1A',
          fontSize: isFinale ? 14 : 12,
          boxShadow: btnGlow,
          opacity: allChecked ? 1 : 0.6,
          letterSpacing: '0.1em',
        }}
      >
        {nextLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
