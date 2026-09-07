import Figure from './Figure'

export interface Step {
  num: string
  title: string
  desc: string
  shot?: string
  alt?: string
  narrow?: boolean
}

/**
 * A numbered sub-step inside a card. Flat by design — no border, no fill.
 * Nesting a bordered box inside a bordered card is what made these pages
 * feel busy, so the number and the title carry the structure instead.
 */
export default function StepRow({
  step,
  children,
}: {
  step: Step
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="flex-shrink-0 flex items-center justify-center font-mono font-bold"
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          marginTop: 1,
          background: 'var(--tint-amber-hi)',
          color: 'var(--yellow-text)',
          fontSize: 11,
        }}
      >
        {step.num}
      </span>
      <div className="flex-1 min-w-0 space-y-2.5">
        <div className="space-y-1">
          <p
            className="font-bold text-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}
          >
            {step.title}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            {step.desc}
          </p>
        </div>
        {children}
        {step.shot && <Figure src={step.shot} alt={step.alt ?? ''} narrow={step.narrow} />}
      </div>
    </div>
  )
}
