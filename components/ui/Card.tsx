import type { ReactNode } from 'react'

/** The standard container. Turns green once its step is complete. */
export default function Card({
  done = false,
  children,
  className = '',
}: {
  done?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`surface ${done ? 'surface-done' : ''} p-5 sm:p-6 flex flex-col gap-5 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  )
}
