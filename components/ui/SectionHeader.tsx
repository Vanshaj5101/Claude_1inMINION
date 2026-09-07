/**
 * Every section on every level page starts with this.
 *
 * One loud signal per section: a quiet eyebrow, then the heading carries the
 * weight. Do not render a section without one — a section with no h2 breaks
 * the heading ladder and the eye loses its anchor.
 */
export default function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="space-y-2">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2
        className="text-3xl sm:text-4xl font-bold leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', maxWidth: '62ch' }}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
