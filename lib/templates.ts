import { Workspace } from './storage'

type Template = {
  id: string
  name: string
  description: string
  template: string
}

export const postTemplates: Template[] = [
  {
    id: 'pain-audit',
    name: 'Problem ? Insight ? Call-to-Action',
    description: 'Short post surfacing a pain and inviting action.',
    template:
      `If you're a {{ICP}}, you're probably tired of {{PAIN}}.

Here's what we found building {{COMPANY}}: {{INSIGHT}}.

If you want {{OUTCOME}} without {{OLD_WAY}}, we're building {{OFFER}}.
{{CTA}}`
  },
  {
    id: 'before-after-bridge',
    name: 'Before ? After ? Bridge',
    description: 'Classic structure for clear transformation.',
    template:
      `Before: {{PAIN}}.
After: {{OUTCOME}}.
Bridge: {{HOW}} (with {{OFFER}} at {{COMPANY}}). {{CTA}}`
  },
  {
    id: 'landing-hero',
    name: 'Landing Hero',
    description: 'Headline, subhead, and CTA for landing pages.',
    template:
      `Headline: {{OUTCOME}} for {{ICP}}.
Subhead: {{COMPANY}} helps you {{HOW}} so you can stop {{PAIN}}.
CTA: {{CTA}}`
  }
]

export function fillTemplate(input: {
  workspace: Workspace
  insight?: string
  outcome?: string
  oldWay?: string
  how?: string
} & { template: string }) {
  const { workspace, template, insight = 'a counterintuitive lesson', outcome = 'achieve your goal', oldWay = 'the usual grind', how = 'a simple workflow' } = input

  return template
    .replaceAll('{{COMPANY}}', workspace.companyName || 'our startup')
    .replaceAll('{{ICP}}', workspace.idealCustomerProfile || 'busy founders')
    .replaceAll('{{PAIN}}', workspace.painPoints || 'wasting time without traction')
    .replaceAll('{{OFFER}}', workspace.offer || 'a focused solution')
    .replaceAll('{{CTA}}', workspace.callToAction || 'Join the waitlist')
    .replaceAll('{{INSIGHT}}', insight)
    .replaceAll('{{OUTCOME}}', outcome)
    .replaceAll('{{OLD_WAY}}', oldWay)
    .replaceAll('{{HOW}}', how)
}

export const emailTemplates: Template[] = [
  {
    id: 'cold-1',
    name: 'Cold Email #1 (Pain opener)',
    description: 'Short, specific, and easy to reply',
    template:
      `Subject: Quick question about {{PAIN}}

Hi {{ICP}},

Saw you're dealing with {{PAIN}}. At {{COMPANY}}, we help with {{HOW}}.
Worth a 10-min chat to see if this saves you {{OUTCOME}}?

? {{COMPANY}} team`
  },
  {
    id: 'nurture-1',
    name: 'Nurture: Value drop',
    description: 'Share a specific, useful tactic',
    template:
      `Subject: A small win for {{ICP}}

Here?s a quick playbook we used to avoid {{PAIN}} and get closer to {{OUTCOME}}:
1) {{HOW}}
2) {{INSIGHT}}
3) {{CTA}}

If helpful, happy to send more like this.`
  }
]
