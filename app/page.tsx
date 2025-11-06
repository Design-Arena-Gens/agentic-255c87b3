import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Founder Marketing Toolkit</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Everything you need to move from fuzzy positioning to clear messaging, content that resonates, and a repeatable distribution rhythm. No AI keys needed.
        </p>
        <div className="flex gap-3">
          <Link href="/planner" className="button">Start with Planner</Link>
          <Link href="/content" className="button bg-white text-slate-900 border border-slate-300 hover:bg-slate-50">Generate Content</Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard title="Planner" href="/planner" description="Define ICP, pains, value prop, offer, and CTA." />
        <FeatureCard title="Content" href="/content" description="Generate posts and landing copy from your plan." />
        <FeatureCard title="Email" href="/email" description="Draft cold and nurture sequences that get replies." />
        <FeatureCard title="Calendar" href="/calendar" description="Turn ideas into a weekly posting rhythm." />
        <FeatureCard title="Export/Import" href="/planner" description="Save or load your workspace as JSON." />
        <FeatureCard title="Privacy by default" href="#" description="Everything stays in your browser via localStorage." />
      </section>
    </div>
  )
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="card p-5 hover:shadow transition-shadow">
      <div className="text-base font-semibold">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  )
}
