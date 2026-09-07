/** One screenshot treatment for the whole site. Caption above, image below. */
export default function Figure({
  src,
  alt,
  caption,
  narrow = false,
}: {
  src: string
  alt: string
  caption?: string
  narrow?: boolean
}) {
  return (
    <figure className="m-0 space-y-2">
      {caption && <figcaption className="meta-label">{caption}</figcaption>}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--border)', maxWidth: narrow ? 300 : '100%' }}
      >
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
    </figure>
  )
}
