'use client'

import { CheckSquare, Square } from 'lucide-react'

/** Completion toggle. Always bottom-right of its card, never in a header. */
export default function MarkDone({
  done,
  onToggle,
}: {
  done: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 transition-colors duration-150"
        style={{
          color: done ? 'var(--green)' : 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {done ? <CheckSquare size={18} /> : <Square size={18} />}
        <span className="hidden sm:inline">{done ? 'Done' : 'Mark done'}</span>
      </button>
    </div>
  )
}
