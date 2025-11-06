import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://agentic-255c87b3.vercel.app'),
  title: {
    default: 'Founder Marketing Toolkit',
    template: '%s ? Founder Marketing Toolkit'
  },
  description: 'Plan, generate, and organize founder-led marketing assets without friction.',
  openGraph: {
    title: 'Founder Marketing Toolkit',
    description: 'Plan, generate, and organize founder-led marketing assets without friction.',
    url: 'https://agentic-255c87b3.vercel.app',
    siteName: 'Founder Marketing Toolkit',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-600" />
              <span className="text-lg font-semibold">Founder Marketing</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/planner" className="nav-link">Planner</Link>
              <Link href="/content" className="nav-link">Content</Link>
              <Link href="/email" className="nav-link">Email</Link>
              <Link href="/calendar" className="nav-link">Calendar</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
          <div className="mx-auto max-w-6xl px-4">Built for founders to market smarter.</div>
        </footer>
      </body>
    </html>
  )
}
