"use client"

import { useEffect, useState } from 'react'
import { exportWorkspace, importWorkspace, loadWorkspace, saveWorkspace, type Workspace } from '@/lib/storage'

export default function PlannerPage() {
  const [ws, setWs] = useState<Workspace>(loadWorkspace())

  useEffect(() => { saveWorkspace(ws) }, [ws])

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Planner</h1>
        <div className="flex gap-2">
          <button className="button" onClick={() => exportWorkspace(ws)}>Export</button>
          <label className="button bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 cursor-pointer">
            Import
            <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              const imported = await importWorkspace(f)
              setWs(imported)
            }} />
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Company name">
          <input className="input" value={ws.companyName} onChange={e => setWs({ ...ws, companyName: e.target.value })} />
        </Field>
        <Field label="Ideal Customer Profile (ICP)">
          <input className="input" value={ws.idealCustomerProfile} onChange={e => setWs({ ...ws, idealCustomerProfile: e.target.value })} />
        </Field>
        <Field label="Top pains / jobs-to-be-done">
          <textarea className="textarea" value={ws.painPoints} onChange={e => setWs({ ...ws, painPoints: e.target.value })} />
        </Field>
        <Field label="Value proposition (clear outcome)">
          <textarea className="textarea" value={ws.valueProposition} onChange={e => setWs({ ...ws, valueProposition: e.target.value })} />
        </Field>
        <Field label="Positioning (category + contrast)">
          <textarea className="textarea" value={ws.positioning} onChange={e => setWs({ ...ws, positioning: e.target.value })} />
        </Field>
        <Field label="Offer (what they buy)">
          <textarea className="textarea" value={ws.offer} onChange={e => setWs({ ...ws, offer: e.target.value })} />
        </Field>
        <Field label="Primary Call-To-Action">
          <input className="input" value={ws.callToAction} onChange={e => setWs({ ...ws, callToAction: e.target.value })} />
        </Field>
        <Field label="Notes">
          <textarea className="textarea" value={ws.notes} onChange={e => setWs({ ...ws, notes: e.target.value })} />
        </Field>
      </div>

      <div className="card p-4">
        <h2 className="text-lg font-semibold">Positioning snapshot</h2>
        <ul className="mt-2 text-slate-700 text-sm list-disc pl-5 space-y-1">
          <li><strong>For</strong> {ws.idealCustomerProfile || 'your ICP'}</li>
          <li><strong>Who struggle with</strong> {ws.painPoints || 'a painful status quo'}</li>
          <li><strong>We offer</strong> {ws.offer || 'a focused solution'}</li>
          <li><strong>That delivers</strong> {ws.valueProposition || 'a clear outcome'}</li>
          <li><strong>Unlike</strong> {ws.positioning || 'the old way'}</li>
          <li><strong>Next step</strong>: {ws.callToAction || 'Join the waitlist'}</li>
        </ul>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}
