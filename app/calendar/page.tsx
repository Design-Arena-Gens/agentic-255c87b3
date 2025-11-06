"use client"

import { useMemo, useState } from 'react'
import { loadWorkspace } from '@/lib/storage'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const DEFAULT_IDEAS = [
  'Founder story: why we built this',
  'Pain teardown with a real example',
  'Demo: 90s walkthrough of the product',
  'Customer snippet or testimonial',
  'Weekly recap + CTA'
]

export default function CalendarPage() {
  const ws = useMemo(() => loadWorkspace(), [])
  const [ideas, setIdeas] = useState<string[]>(DEFAULT_IDEAS)
  const [cta, setCta] = useState(ws.callToAction || 'Join the waitlist')

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Content Calendar</h1>

      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <div className="card p-4 grid gap-3 h-max">
          <div className="grid gap-2">
            <label className="grid gap-1">
              <span className="text-xs font-medium">CTA</span>
              <input className="input" value={cta} onChange={e => setCta(e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium">Ideas (one per line)</span>
              <textarea className="textarea min-h-[180px]" value={ideas.join('\n')} onChange={e => setIdeas(e.target.value.split('\n'))} />
            </label>
          </div>
          <button className="button" onClick={() => downloadText(renderCalendar(ideas, cta), 'calendar.txt')}>Download plan</button>
        </div>

        <div className="grid gap-3">
          <div className="text-sm text-slate-600">Preview</div>
          <div className="card p-4 whitespace-pre-wrap leading-7">{renderCalendar(ideas, cta)}</div>
        </div>
      </div>
    </div>
  )
}

function renderCalendar(ideas: string[], cta: string) {
  const rows = DAYS.map((d, i) => `${d}: ${ideas[i % ideas.length]} ? ${cta}`)
  return rows.join('\n')
}

function downloadText(text: string, filename: string) {
  const data = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
