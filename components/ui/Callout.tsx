import type { ReactNode } from 'react'

/**
 * `note`      — an aside or tip. Quiet, grey, no tint.
 * `important` — the one thing in this section they must not miss.
 *
 * If a section seems to need two `important` callouts, one of them is a note.
 */
export default function Callout({
  tone = 'note',
  label,
  children,
}: {
  tone?: 'note' | 'important'
  label?: string
  children: ReactNode
}) {
  return (
    <div className={tone}>
      {label && <p className="meta-label" style={{ marginBottom: 4 }}>{label}</p>}
      <div
        className="text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {children}
      </div>
    </div>
  )
}
