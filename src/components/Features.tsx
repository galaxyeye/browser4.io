import { Brain, Cog, Sparkles, Gauge, Globe } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: Brain,
            title: 'Browser Agents',
            subtitle: 'Autonomous browser agents',
            description: 'Agents that can reason, plan, and complete tasks directly inside the browser',
            color: 'from-sky-400 to-blue-500'
        },
        {
            icon: Cog,
            title: 'Browser Automation',
            subtitle: 'High-precision automation',
            description: 'High-performance workflows, navigation, and data extraction',
            color: 'from-emerald-400 to-teal-500'
        },
        {
            icon: Sparkles,
            title: 'Machine Learning Agent',
            subtitle: 'Machine-learning agents',
            description: 'Automatically learns complex page structures without tokens',
            color: 'from-violet-400 to-purple-500'
        },
        {
            icon: Globe,
            title: 'Web Understanding',
            subtitle: 'Deep web understanding',
            description: 'Understands dynamic, script-driven, and interactive pages',
            color: 'from-pink-400 to-rose-500',
            stat: '99%+',
            statLabel: 'Structured accuracy'
        },
        {
            icon: Gauge,
            title: 'Extreme Performance',
            subtitle: 'Extreme performance',
            description: 'Coroutine-safe engine; 100k+ complex pages per machine per day',
            color: 'from-amber-400 to-orange-500',
            stat: '100k+',
            statLabel: 'Pages per day'
        }
    ];

    return (
        <section id="features" className="relative py-24 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">Core Capabilities</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        Browser infrastructure engineered for the agent era
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.slice(0, 4).map((feature) => (
                            <article key={feature.title} className="group relative bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition hover:-translate-y-1 hover:border-sky-500/40">
                                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-20 dark:bg-opacity-10 mb-6`}>
                                    <feature.icon className="w-8 h-8 text-slate-900 dark:text-white" />
                                </div>
                                <div className="flex items-baseline justify-between mb-4">
                                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                                    <span className="text-sm text-slate-500">{feature.subtitle}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                            </article>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {features.slice(4).map((feature) => (
                            <article key={feature.title} className="bg-gradient-to-br from-white/90 to-slate-100/90 dark:from-slate-900/70 dark:to-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-30 dark:bg-opacity-20`}>
                                        <feature.icon className="w-10 h-10 text-slate-900 dark:text-white" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-bold">{feature.stat}</p>
                                        <p className="text-sm text-slate-500">{feature.statLabel}</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
