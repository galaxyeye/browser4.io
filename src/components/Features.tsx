import { Brain, Cog, Sparkles, Gauge, Globe } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: Brain,
            title: 'Browser Agents',
            subtitle: '浏览器智能体',
            description: '能够在浏览器内自主推理、规划并完成任务的智能体',
            color: 'from-sky-400 to-blue-500'
        },
        {
            icon: Cog,
            title: 'Browser Automation',
            subtitle: '浏览器自动化',
            description: '高性能自动化：工作流、导航与数据提取',
            color: 'from-emerald-400 to-teal-500'
        },
        {
            icon: Sparkles,
            title: 'Machine Learning Agent',
            subtitle: '机器学习智能体',
            description: '跨复杂页面自动学习字段结构，无需Token',
            color: 'from-violet-400 to-purple-500'
        },
        {
            icon: Gauge,
            title: 'Extreme Performance',
            subtitle: '极致性能',
            description: '完整协程安全；每台机器每天可处理10万级最复杂页面',
            color: 'from-amber-400 to-orange-500',
            stat: '10万+',
            statLabel: '日处理页面'
        },
        {
            icon: Globe,
            title: 'Web Understanding',
            subtitle: '网页理解',
            description: '深度理解动态、脚本驱动与交互式网页',
            color: 'from-pink-400 to-rose-500',
            stat: '90%+',
            statLabel: '结构化准确率'
        }
    ];

    return (
        <section className="relative py-24 bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        核心能力
                    </h2>
                    <p className="text-xl text-slate-400">
                        为智能体时代打造的浏览器基础设施
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.slice(0, 4).map((feature) => (
                            <article key={feature.title} className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 transition hover:-translate-y-1 hover:border-sky-500/40">
                                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-6`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex items-baseline justify-between mb-4">
                                    <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                                    <span className="text-sm text-slate-500">{feature.subtitle}</span>
                                </div>
                                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                            </article>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {features.slice(4).map((feature) => (
                            <article key={feature.title} className="bg-gradient-to-br from-slate-900/70 to-slate-950/80 border border-slate-800 rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-20`}>
                                        <feature.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-bold text-white">{feature.stat}</p>
                                        <p className="text-sm text-slate-500">{feature.statLabel}</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
