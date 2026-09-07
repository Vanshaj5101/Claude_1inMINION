'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface GearItem {
  id: string
  name: string
  definition: string
  theme_translation: string
  why_useful: string[]
}

interface BriefingData {
  level: { number: string; title: string; concept: string; duration: string; subdescription: string }
  mission_targets: string[]
  mission_gear: GearItem[]
}

type TopTab = 'targets' | 'gears' | null

export default function LevelBriefingSection({ data }: { data: BriefingData }) {
  const [activeTab, setActiveTab] = useState<TopTab>('targets')
  const [activeGear, setActiveGear] = useState<string>(data.mission_gear[0]?.id ?? '')

  const { mission_targets, mission_gear } = data
  const selectedGear = mission_gear.find(g => g.id === activeGear)

  const toggle = (tab: TopTab) => setActiveTab(prev => (prev === tab ? null : tab))

  return (
    <div
      className="rounded-2xl p-6 space-y-4"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
    >
      {/* Two side-by-side tab buttons */}
      <div className="grid grid-cols-2 gap-3">
        {(['targets', 'gears'] as TopTab[]).map(tab => {
          const label = tab === 'targets' ? 'Mission Targets' : 'Mission Gears'
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => toggle(tab)}
              className="py-4 rounded-xl font-bold text-base transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                fontFamily: 'var(--font-body)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive ? '#FFFBEB' : 'var(--bg-primary)',
                border: isActive ? '1.5px solid var(--yellow)' : '1.5px solid var(--border)',
                cursor: 'pointer',
              }}
            >
              {label}
              <ChevronDown
                size={16}
                style={{
                  transition: 'transform 0.2s ease',
                  transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                  flexShrink: 0,
                }}
              />
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      {activeTab && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1.5px solid var(--border)', background: 'var(--bg-primary)' }}
        >
          {/* Mission Targets */}
          {activeTab === 'targets' && (
            <ul className="p-5 space-y-3">
              {mission_targets.map((target, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: 'var(--yellow)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {i + 1}
                  </span>
                  {target}
                </li>
              ))}
            </ul>
          )}

          {/* Mission Gears */}
          {activeTab === 'gears' && (
            <>
              {/* Sub-buttons */}
              <div className="flex items-center gap-2 px-4 pt-4 pb-3 flex-wrap" style={{ borderBottom: '1px solid var(--border)' }}>
                {mission_gear.map(gear => {
                  const isActive = activeGear === gear.id
                  return (
                    <button
                      key={gear.id}
                      onClick={() => setActiveGear(gear.id)}
                      className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-150"
                      style={{
                        fontFamily: 'var(--font-body)',
                        background: isActive ? '#FFFBEB' : 'var(--bg-secondary)',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                        border: isActive ? '1.5px solid var(--yellow)' : '1.5px solid var(--border)',
                        cursor: 'pointer',
                      }}
                    >
                      {gear.name}
                    </button>
                  )
                })}
              </div>

              {/* Selected gear content */}
              {selectedGear && (
                <div className="p-5 space-y-4">
                  <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {selectedGear.definition}
                  </p>
                  <div className="important">
                    <p className="text-xs font-bold mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--yellow-text)', letterSpacing: '0.1em' }}>
                      🍌 GRU TRANSLATION
                    </p>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                      {selectedGear.theme_translation}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {selectedGear.why_useful.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--yellow-text)', fontWeight: 700, flexShrink: 0, lineHeight: 1.8 }}>→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
