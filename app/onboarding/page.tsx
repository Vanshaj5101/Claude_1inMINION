import { Suspense } from 'react'
import OnboardingCarousel from '@/components/landing/OnboardingCarousel'

export default function OnboardingPage() {
  return (
    <main style={{
      backgroundImage: 'url(/hero_bg3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#060a16',
      position: 'relative',
    }}>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.60) 75%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Suspense fallback={null}>
          <OnboardingCarousel />
        </Suspense>
      </div>
    </main>
  )
}
