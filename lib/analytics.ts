import { sendGAEvent } from '@next/third-parties/google'

/**
 * Fire a named GA4 event.
 *
 * No-ops when analytics is not loaded — no measurement ID configured, or a
 * blocker is active — so callers never need to check first.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.dataLayer) return
  sendGAEvent('event', name, params)
}
