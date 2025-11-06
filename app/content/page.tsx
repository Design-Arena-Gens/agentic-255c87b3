"use client"

import { useMemo, useState } from 'react'
import { loadWorkspace } from '@/lib/storage'
import { fillTemplate, postTemplates } from '@/lib/templates'

export default function ContentPage() {
  const ws = useMemo(() => loadWorkspace(), [])
  const [selected, setSelected] = useState(postTemplates[0])
  const [insight, setInsight] = useState('we shipped faster by cutting scope ruthlessly')
  const [outcome, setOutcome] = useState(ws.valueProposition || 'ship features 3x faster')
  const [oldWay, setOldWay] = useState('manual spreadsheets and status meetings')
  const [how, setHow] = useState('a focused weekly ritual and a shared board')

  const output = fillTemplate({ workspace: ws, template: selected.template, insight, outcome, oldWay, how })

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Content Generator</h1>

      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <div className="card p-4 grid gap-3 h-max">
          <div>
            <div className="text-sm font-medium mb-2">Template</div>
            <div className="grid gap-2">
              {postTemplates.map(t => (
                <label key={t.id} className={`flex gap-2 items-start p-2 rounded-md border cursor-pointer ${selected.id === t.id ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}>
                  <input type="radio" name="tpl" checked={selected.id === t.id} onChange={() => setSelected(t)} />
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
              <span className="text-xs font-medium">Old way</span>
              <input className="input" value={oldWay} onChange={e => setOldWay(e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium">How</span>
              <input className="input" value={how} onChange={e => setHow(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="text-sm text-slate-600">Preview</div>
          <div className="card p-4 whitespace-pre-wrap leading-7">{output}</div>
          <div className="flex gap-2">
            <button className="button" onClick={() => copyToClipboard(output)}>Copy</button>
            <button className="button bg-white text-slate-900 border border-slate-300 hover:bg-slate-50" onClick={() => downloadText(output, 'content.txt')}>Download</button>
          </div>
          <Tips />
        </div>
      </div>
    </div>
  )
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
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

function Tips() {
  return (
    <div className="card p-4">
      <div className="text-sm font-medium">Pro tips</div>
      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mt-2">
        <li>Swap generic nouns for specifics from your planner.</li>
        <li>Cut fluff. Aim for clarity and one idea per post.</li>
        <li>Add 1-2 concrete examples or numbers.</li>
      </ul>
    </div>
  )
}
