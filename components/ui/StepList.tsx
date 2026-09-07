import StepRow, { type Step } from './StepRow'

/** Vertical run of numbered sub-steps, evenly spaced and divided. */
export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div
          key={step.num}
          style={{
            paddingTop: i === 0 ? 0 : 18,
            paddingBottom: i === steps.length - 1 ? 0 : 18,
            borderBottom: i === steps.length - 1 ? 'none' : '1px solid var(--border)',
          }}
        >
          <StepRow step={step} />
        </div>
      ))}
    </div>
  )
}
