import LevelBriefingSection from '../LevelBriefingSection'
import LevelProgressCard from '../LevelProgressCard'

interface BriefingLevel {
  eyebrow: string
  title: string
  duration: string
  subdescription: string
}

/** The overview block every level page opens with. */
export default function LevelHeader({
  level,
  briefing,
  checked,
}: {
  level: BriefingLevel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  briefing: any
  checked: boolean[]
}) {
  return (
    <section id="overview" className="space-y-5 pt-8">
      <div className="space-y-3">
        <p className="section-eyebrow">{level.eyebrow}</p>
        <h1
          className="text-4xl sm:text-5xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          {level.title}
        </h1>
        <p
          className="leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
            maxWidth: '62ch',
          }}
        >
          {level.subdescription}
        </p>
        <span className="pill-badge">⏱ {level.duration.toUpperCase()}</span>
      </div>

      <LevelBriefingSection data={briefing} />
      <LevelProgressCard checked={checked} />
    </section>
  )
}
