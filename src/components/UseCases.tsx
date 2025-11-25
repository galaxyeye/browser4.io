import { useState } from 'react';
import { Search, Sparkles, Users, Workflow, TestTube } from 'lucide-react';

const colorClasses = {
    sky: {
        panel: 'from-sky-500/10 to-blue-500/5 border-sky-500/30 text-sky-300',
        accent: 'text-sky-300',
        badge: 'bg-sky-500/10 text-sky-300'
    },
    violet: {
        panel: 'from-violet-500/10 to-purple-500/5 border-violet-500/30 text-violet-300',
        accent: 'text-violet-300',
        badge: 'bg-violet-500/10 text-violet-300'
    },
    emerald: {
        panel: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/30 text-emerald-300',
        accent: 'text-emerald-300',
        badge: 'bg-emerald-500/10 text-emerald-300'
    },
    amber: {
        panel: 'from-amber-500/10 to-orange-500/5 border-amber-500/30 text-amber-300',
        accent: 'text-amber-300',
        badge: 'bg-amber-500/10 text-amber-300'
    },
    pink: {
        panel: 'from-pink-500/10 to-rose-500/5 border-pink-500/30 text-pink-300',
        accent: 'text-pink-300',
        badge: 'bg-pink-500/10 text-pink-300'
    }
} as const;

const cases = [
    {
        icon: Search,
        number: '01',
        title: 'Automated Research & Massive Data Collection',
        description: 'Agents auto-search across platforms, pull prices, and monitor changes. A single Browser4 node can visit 100k pages per day and structure data with built-in ML, boosting research efficiency by thousands of times.',
        example: 'An e-commerce team collects hundreds of thousands of product records daily and auto-builds reports to guide merchandising.',
        color: 'sky'
    },
    {
        icon: Sparkles,
        number: '02',
        title: 'AI-Driven Interactive Experiences',
        description: 'Pair LLMs with browser agents to read, summarize, and act on content. Agents reason across pages, compare insights, and behave like a 24/7 AI analyst.',
        example: 'Many viral social videos showcase agents autonomously completing complex browsing, comparison, and synthesis tasks.',
        color: 'violet'
    },
    {
        icon: Users,
        number: '03',
        title: 'Prospecting & Data Enrichment',
        description: 'Crawl directories, event registries, and company sites to build or enrich CRM records and surface prospects fast.',
        example: 'One customer gathers 30k leads daily from Google, merges multilingual sources automatically, and accelerates sales coverage.',
        color: 'emerald'
    },
    {
        icon: Workflow,
        number: '04',
        title: 'Workflow Automation (WFA)',
        description: 'Hands-off flows for login, invoice downloads, forms, uploads, and system-to-system sync.',
        example: 'A finance team automates bank reconciliation with Browser4, saving dozens of hours monthly and driving error rates to zero.',
        color: 'amber'
    },
    {
        icon: TestTube,
        number: '05',
        title: 'Quality Assurance & Testing',
        description: 'Run E2E tests in production-like environments, simulate geo-specific users, and monitor critical paths 24/7.',
        example: 'Automated tests for payments, auth, and cross-border checkout keep customer journeys safe.',
        color: 'pink'
    }
];

export default function UseCases() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = cases[activeIndex];
    const activeColor = colorClasses[active.color as keyof typeof colorClasses];

    return (
        <section id="use-cases" className="relative py-24 bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">real-world plays</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Use Cases</h2>
                    <p className="text-xl text-slate-400">Typical Browser4 AI Agent deployments</p>
                </div>

                <div className="mb-10 flex flex-wrap gap-3 justify-center">
                    {cases.map((item, index) => (
                        <button
                            key={item.title}
                            onClick={() => setActiveIndex(index)}
                            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                                index === activeIndex
                                    ? 'border-sky-500/50 text-white bg-sky-500/10'
                                    : 'border-slate-800 text-slate-400 hover:text-white'
                            }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mb-16">
                    <article className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[active.color as keyof typeof colorClasses].panel} border ${colorClasses[active.color as keyof typeof colorClasses].panel.split(' ')[2]} flex items-center justify-center`}>
                                <active.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Scenario {active.number}</p>
                                <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-6">{active.description}</p>
                        <div className={`rounded-2xl border px-5 py-4 bg-gradient-to-br ${activeColor.panel}`}>
                            <p className="text-sm text-slate-400 mb-2">Example</p>
                            <p className="text-slate-200 leading-relaxed">{active.example}</p>
                        </div>
                    </article>

                    <div className="space-y-6">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                            <p className="text-sm text-slate-500 mb-2">Why Browser4</p>
                            <ul className="space-y-3 text-slate-300">
                                <li>✦ Agents navigate, extract, and stitch data automatically</li>
                                <li>✦ 100k pages/day per node with near-real-time monitoring</li>
                                <li>✦ Full API + workflow tooling for systems integration</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {cases.slice(0, 4).map((item) => (
                                <div key={item.title} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
                                    <p className={`text-xs font-semibold uppercase ${colorClasses[item.color as keyof typeof colorClasses].accent}`}>{item.number}</p>
                                    <p className="text-sm text-white mt-1">{item.title}</p>
                                    <p className="text-xs text-slate-500 mt-2">{item.description.slice(0, 40)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cases.map((item) => (
                        <article key={item.title} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[item.color as keyof typeof colorClasses].badge}`}>
                                    {item.number}
                                </div>
                                <h4 className="text-lg text-white">{item.title}</h4>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
