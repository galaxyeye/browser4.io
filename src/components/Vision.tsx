import { Rocket, Store, List, Globe } from 'lucide-react';

const highlights = [
    { label: '生态现状痛点', bullets: ['缺乏统一应用商店与可发现渠道', '缺少可搜索目录，难以匹配需求', '发布与分发生态割裂、无标准'] },
    { label: 'Agent 能力现状', bullets: ['大模型实时生成动作', '视觉网络 Agent 像人类一样浏览', 'OS 级 Agent 接管复杂交互'] }
];

const predictions = [
    { icon: Store, title: 'Agent Hub', text: '统一的 Agent 应用商店，支持分类、搜索、评分与版本管理', accent: 'sky' },
    { icon: List, title: '分类市场', text: '按数据采集/自动化/分析等场景划分，建立透明质量体系', accent: 'violet' },
    { icon: Rocket, title: '预构建目录', text: '预置订机票、费用管理、竞品监控等 Agent 套件，开箱即用', accent: 'emerald' },
    { icon: Globe, title: '协同进化', text: '网站主动适配 Agent 访问，提供更友好的数据接口与交互', accent: 'amber' }
];

const accentMap = {
    sky: 'text-sky-400 border-sky-500/30',
    violet: 'text-violet-400 border-violet-500/30',
    emerald: 'text-emerald-400 border-emerald-500/30',
    amber: 'text-amber-400 border-amber-500/30'
} as const;

export default function Vision() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(79,70,229,0.08),transparent_55%)]" />
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">vision 2030</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">未来愿景</h2>
                    <p className="text-xl text-slate-400">构建对所有参与方公平、可持续的智能体生态系统</p>
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
                        <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">三年路线图</p>
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
                    <h3 className="text-3xl font-bold text-white mb-4">Browser4 的使命</h3>
                    <p className="text-xl text-slate-300 mb-6 leading-relaxed max-w-4xl mx-auto">
                        智能体时代已经开启。Browser4 正在构建一个对所有参与方公平、可持续的智能体生态系统，
                        让 AI 具备自主决策与执行能力，推动互联网向智能体互联网演进。
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-left md:text-center">
                        <div>
                            <p className="text-4xl font-bold text-white">180+</p>
                            <p className="text-sm text-slate-400">已接入的企业场景</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white">800+</p>
                            <p className="text-sm text-slate-400">在训 Agent 模块</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white">24/7</p>
                            <p className="text-sm text-slate-400">实时运行与监测</p>
                        </div>
                    </div>
                    <div className="inline-block mt-10 px-10 py-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-xl text-white font-bold text-lg">
                        让我们一起构建未来
                    </div>
                </div>
            </div>
        </section>
    );
}
