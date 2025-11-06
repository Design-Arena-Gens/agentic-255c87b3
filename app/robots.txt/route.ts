import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://agentic-255c87b3.vercel.app/sitemap.xml\n`
  return new NextResponse(body, { headers: { 'content-type': 'text/plain' } })
}
