import type { Metadata } from 'next'
import { Bangers, Nunito, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import Navigation from '@/components/Navigation'
import StickyClaudeButton from '@/components/StickyClaudeButton'

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Heist to the Sun — Learn Claude in 4 Levels',
  description:
    'A hands-on AI training experience for non-technical teams. Build your own AI Minion with Claude across four levels: prompt engineering, Projects, Skills, and MCPs.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${nunito.variable} ${jetbrainsMono.variable}`}
      style={{
        // Make CSS variable fonts available globally
        '--font-display': 'var(--font-bangers), Bangers, cursive',
        '--font-body': 'var(--font-nunito), Nunito, sans-serif',
        '--font-sans': 'var(--font-nunito), Nunito, sans-serif',
        '--font-mono': 'var(--font-jetbrains), JetBrains Mono, monospace',
      } as React.CSSProperties}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navigation />
        {children}
        <StickyClaudeButton />
        <Analytics />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  )
}
