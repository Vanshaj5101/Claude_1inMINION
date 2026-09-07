'use client'

import { useState, useEffect } from 'react'
import { Clipboard, Check } from 'lucide-react'

type Variant = 'core' | 'advanced' | 'test' | 'final'

interface PromptBlockProps {
  promptText: string
  label: string
  variant?: Variant
  substituteMinion?: boolean
  highlightText?: string | null
}

const borderColors: Record<Variant, string> = {
  core:     'var(--yellow)',
  advanced: 'var(--purple)',
  test:     'var(--blue)',
  final:    'var(--yellow)',
}

const labelColors: Record<Variant, string> = {
  core:     'var(--yellow-text)',
  advanced: 'var(--purple)',
  test:     'var(--blue)',
  final:    'var(--yellow-text)',
}

export default function PromptBlock({ promptText, label, variant = 'core', substituteMinion = false, highlightText = null }: PromptBlockProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')
  const [displayText, setDisplayText] = useState(promptText)

  const getPromptText = () => {
    if (!substituteMinion) return promptText
    const name = typeof window !== 'undefined'
      ? (localStorage.getItem('minionName') || 'YOUR MINION').toUpperCase()
      : 'YOUR MINION'
    const withSubstitutions = promptText
      .replace(/\[YOUR MINION'S NAME\]/g, name)
      .replace(/\[YOUR MINION NAME\]/g, name)
      .replace(/\[MINION NAME\]/g, name)
    return `Hey ${name},\n\n${withSubstitutions}`
  }

  const handleCopy = async () => {
    const text = getPromptText()
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      try {
        const el = document.createElement('textarea')
        el.value = text
        el.style.cssText = 'position:fixed;opacity:0'
        document.body.appendChild(el)
        el.focus(); el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        setState('copied')
      } catch {
        setState('error')
      }
    }
    setTimeout(() => setState('idle'), 2000)
  }

  useEffect(() => {
    setDisplayText(getPromptText())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptText, substituteMinion])

  const borderColor = borderColors[variant]
  const labelColor  = labelColors[variant]
  const isFinal     = variant === 'final'

  return (
    <div
      className="rounded-md overflow-hidden"
      style={{
        background: 'var(--bg-code)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: isFinal
          ? 'var(--shadow-sm), 0 0 0 1px rgba(233,149,10,0.12)'
          : 'var(--shadow-xs)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <span className="font-mono text-xs tracking-widest uppercase font-semibold" style={{ color: labelColor }}>
          {label}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy prompt to clipboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wide transition-all duration-150"
          style={{
            background: state === 'copied'
              ? 'rgba(10,117,84,0.08)'
              : 'rgba(233,149,10,0.06)',
            border: `1px solid ${state === 'copied' ? 'var(--green)' : borderColor}`,
            color:  state === 'copied' ? 'var(--green)' : labelColor,
            transform: state === 'copied' ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          {state === 'copied'
            ? <><Check size={11} /> COPIED! PASTE IN CLAUDE</>
            : state === 'error'
            ? 'COPY FAILED — SELECT MANUALLY'
            : <><Clipboard size={11} /> COPY</>
          }
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
          <span style={{ color: 'var(--yellow-text)', fontWeight: 600 }}>$ </span>
          {highlightText && displayText.includes(highlightText) ? (() => {
            const idx = displayText.indexOf(highlightText)
            const hlBg = variant === 'advanced'
              ? 'rgba(139,92,246,0.18)'
              : 'var(--tint-amber-hi)'
            const hlColor = variant === 'advanced'
              ? 'var(--purple)'
              : 'var(--yellow-text)'
            return (
              <>
                <span style={{ color: 'var(--text-primary)' }}>{displayText.slice(0, idx)}</span>
                <span style={{ background: hlBg, color: hlColor, borderRadius: 2, padding: '0 1px' }}>{highlightText}</span>
                <span style={{ color: 'var(--text-primary)' }}>{displayText.slice(idx + highlightText.length)}</span>
              </>
            )
          })() : (
            <span style={{ color: 'var(--text-primary)' }}>{displayText}</span>
          )}
          <span className="cursor-blink" />
        </pre>
      </div>
    </div>
  )
}
