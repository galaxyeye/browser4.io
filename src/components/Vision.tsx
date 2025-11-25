import { Rocket, Store, List, Globe } from 'lucide-react';

const highlights = [
    { label: 'Current ecosystem pain points', bullets: ['No unified app store or discovery channels', 'Lack of searchable directories to match needs', 'Fragmented publishing + distribution with no standards'] },
    { label: 'Agent capability snapshot', bullets: ['LLMs generate actions in real time', 'Vision agents browse like humans', 'OS-level agents take over complex flows'] }
];

const predictions = [
    { icon: Store, title: 'Agent Hub', text: 'Unified agent marketplace with categories, search, ratings, and versioning', accent: 'sky' },
    { icon: List, title: 'Segmented Markets', text: 'Scenario-based catalogs (data collection, automation, analytics) with transparent quality bars', accent: 'violet' },
    { icon: Rocket, title: 'Prebuilt Catalog', text: 'Prepackaged agents for booking, expense management, competitive monitoring—ready out of the box', accent: 'emerald' },
    { icon: Globe, title: 'Co-evolution', text: 'Websites proactively support agents with friendlier data surfaces and interactions', accent: 'amber' }
];

const accentMap = {
    sky: 'text-sky-400 border-sky-500/30',
    violet: 'text-violet-400 border-violet-500/30',
    emerald: 'text-emerald-400 border-emerald-500/30',
    amber: 'text-amber-400 border-amber-500/30'
} as const;

export default function Vision() {
    return (
        <section id="vision" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(79,70,229,0.08),transparent_55%)]" />
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">vision 2030</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Future Vision</h2>
                    <p className="text-xl text-slate-400">Build a fair, sustainable ecosystem for every agent participant</p>
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] mb-16">
                    <div className="space-y-6">
                        {highlights.map((block) => (
                            <article key={block.label} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
                                <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">{block.label}</p>
                                <ul className="space-y-3 text-slate-200">
                                    {block.bullets.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-sky-400 mt-2" />
                                            <p>{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
                        <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">Three-year roadmap</p>
                        <div className="space-y-8">
                            {predictions.map((item) => (
                                <div key={item.title} className={`rounded-2xl border ${accentMap[item.accent as keyof typeof accentMap]} bg-slate-950/40 p-6`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <item.icon className={`w-8 h-8 ${accentMap[item.accent as keyof typeof accentMap].split(' ')[0]}`} />
                                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-emerald-500/10 border border-sky-500/30 rounded-3xl p-12 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Browser4 Mission</h3>
                    <p className="text-xl text-slate-300 mb-6 leading-relaxed max-w-4xl mx-auto">
                        The agent era is already here. Browser4 is building a fair, sustainable ecosystem where AI can make autonomous decisions and act reliably, accelerating the shift toward an agentic internet.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-left md:text-center">
                        <div>
                            <p className="text-4xl font-bold text-white">180+</p>
                            <p className="text-sm text-slate-400">Enterprise scenarios already connected</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white">800+</p>
                            <p className="text-sm text-slate-400">Agent modules in training</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white">24/7</p>
                            <p className="text-sm text-slate-400">Always-on execution and monitoring</p>
                        </div>
                    </div>
                    <div className="inline-block mt-10 px-10 py-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-xl text-white font-bold text-lg">
                        Let's build the future together
                    </div>
                </div>
            </div>
        </section>
    );
}
