import { ReactNode } from 'react'
import Card from './ui/Card'
import MarkDone from './ui/MarkDone'

interface StepCardProps {
  stepNumber: string
  title: string
  description?: string
  children?: ReactNode
  checked?: boolean
  onCheck?: () => void
}

/** A numbered step that owns a whole card. The number sits with the title. */
export default function StepCard({ stepNumber, title, description, children, checked, onCheck }: StepCardProps) {
  return (
    <Card done={!!checked}>
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 flex items-center justify-center font-mono font-bold"
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            marginTop: 1,
            background: checked ? 'var(--green)' : 'var(--tint-amber-hi)',
            color: checked ? '#fff' : 'var(--yellow-text)',
            fontSize: 12,
          }}
        >
          {stepNumber}
        </span>
        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
            {title}
          </h3>
          {description && (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {children && <div className="flex flex-col gap-4">{children}</div>}

      {onCheck && <MarkDone done={!!checked} onToggle={onCheck} />}
    </Card>
  )
}
