import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export function GET() {
  const base = 'https://agentic-255c87b3.vercel.app'
  const urls = ['', '/planner', '/content', '/email', '/calendar']
  const now = new Date().toISOString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `<url><loc>${base + u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('')}
</urlset>`
  return new NextResponse(xml, { headers: { 'content-type': 'application/xml' } })
}
