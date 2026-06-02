import { ReactNode } from 'react'
import { CheckSquare, Square } from 'lucide-react'

interface StepCardProps {
  stepNumber: string
  title: string
  description?: string
  children?: ReactNode
  checked?: boolean
  onCheck?: () => void
}

export default function StepCard({ stepNumber, title, description, children, checked, onCheck }: StepCardProps) {
  return (
    <div
      className="rounded-lg p-6 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: 'var(--bg-secondary)',
        border: `1px solid ${checked ? 'var(--green)' : 'var(--border)'}`,
        borderLeft: `2px solid ${checked ? 'var(--green)' : 'var(--yellow)'}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: checked ? 'var(--green)' : 'var(--yellow-text)' }}>
            STEP {stepNumber}
          </p>
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          {description && (
            <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>
          )}
        </div>
      </div>
      {children && <div className="flex flex-col gap-4">{children}</div>}
      {onCheck && (
        <div className="flex justify-end">
          <button
            onClick={onCheck}
            className="flex items-center gap-1.5 transition-all duration-150"
            style={{ color: checked ? 'var(--green)' : '#4B5563', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {checked ? <CheckSquare size={18} /> : <Square size={18} />}
            <span className="hidden sm:inline">{checked ? 'Done' : 'Mark done'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
