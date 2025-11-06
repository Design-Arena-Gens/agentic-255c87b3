"use client"

import { useMemo, useState } from 'react'
import { loadWorkspace } from '@/lib/storage'
import { emailTemplates, fillTemplate } from '@/lib/templates'

export default function EmailPage() {
  const ws = useMemo(() => loadWorkspace(), [])
  const [selected, setSelected] = useState(emailTemplates.map(t => t.id))
  const [insight, setInsight] = useState('cut busywork so teams can focus on shipping')
  const [outcome, setOutcome] = useState(ws.valueProposition || 'save 5-10h/week')
  const [how, setHow] = useState('an opinionated workflow and automations')

  const sequence = emailTemplates
    .filter(t => selected.includes(t.id))
    .map(t => ({
      ...t,
      body: fillTemplate({ workspace: ws, template: t.template, insight, outcome, how })
    }))

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Email Sequences</h1>

      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <div className="card p-4 grid gap-3 h-max">
          <div>
            <div className="text-sm font-medium mb-2">Include templates</div>
            <div className="grid gap-2">
              {emailTemplates.map(t => (
                <label key={t.id} className="flex items-start gap-2">
                  <input type="checkbox" checked={selected.includes(t.id)} onChange={(e) => {
                    setSelected(prev => e.target.checked ? [...prev, t.id] : prev.filter(id => id !== t.id))
                  }} />
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-slate-600">{t.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <label className="grid gap-1">
              <span className="text-xs font-medium">Insight</span>
              <input className="input" value={insight} onChange={e => setInsight(e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium">Outcome</span>
              <input className="input" value={outcome} onChange={e => setOutcome(e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium">How</span>
              <input className="input" value={how} onChange={e => setHow(e.target.value)} />
            </label>
          </div>
          <button className="button" onClick={() => downloadText(renderSequence(sequence), 'emails.txt')}>Download sequence</button>
        </div>

        <div className="grid gap-3">
          <div className="text-sm text-slate-600">Preview</div>
          <div className="card p-4 whitespace-pre-wrap leading-7">{renderSequence(sequence)}</div>
        </div>
      </div>
    </div>
  )
}

function renderSequence(seq: { name: string; body: string }[]) {
  return seq.map((s, i) => `Email ${i + 1}: ${s.name}\n\n${s.body}`).join('\n\n---\n\n')
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
