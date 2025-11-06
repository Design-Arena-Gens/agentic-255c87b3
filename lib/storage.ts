export type Workspace = {
  companyName: string
  idealCustomerProfile: string
  painPoints: string
  valueProposition: string
  positioning: string
  offer: string
  callToAction: string
  notes: string
}

const DEFAULT_WORKSPACE: Workspace = {
  companyName: '',
  idealCustomerProfile: '',
  painPoints: '',
  valueProposition: '',
  positioning: '',
  offer: '',
  callToAction: '',
  notes: ''
}

const KEY = 'founder-marketing-workspace-v1'

export function loadWorkspace(): Workspace {
  if (typeof window === 'undefined') return DEFAULT_WORKSPACE
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return DEFAULT_WORKSPACE
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_WORKSPACE, ...parsed }
  } catch {
    return DEFAULT_WORKSPACE
  }
}

export function saveWorkspace(workspace: Workspace) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(workspace))
}

export function exportWorkspace(workspace: Workspace) {
  const data = new Blob([JSON.stringify(workspace, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = 'workspace.json'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export async function importWorkspace(file: File): Promise<Workspace> {
  const text = await file.text()
  const json = JSON.parse(text)
  return { ...DEFAULT_WORKSPACE, ...json }
}
