import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

/**
 * `note`      — an aside or tip. Quiet, grey, no tint.
 * `important` — the one thing in this section they must not miss.
 *
 * The two must look clearly different, or the ranking means nothing: an
 * important callout gets the amber label, darker body text and an icon.
 * If a section seems to need two of them, one of them is a note.
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
  const isImportant = tone === 'important'

  const body = (
    <div className="min-w-0 flex-1">
      {label && (
        <p
          className="meta-label"
          style={{ marginBottom: 5, color: isImportant ? 'var(--yellow-text)' : 'var(--text-muted)' }}
        >
          {label}
        </p>
      )}
      <div
        className="text-sm leading-relaxed"
        style={{
          color: isImportant ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {children}
      </div>
    </div>
  )

  if (!isImportant) return <div className="note">{body}</div>

  return (
    <div className="important flex items-start gap-3">
      <AlertCircle size={17} style={{ color: 'var(--yellow-muted)', flexShrink: 0, marginTop: 1 }} />
      {body}
    </div>
  )
}
