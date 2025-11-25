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
        title: '自动化研究与大规模数据收集',
        description: 'Agent 可跨平台自动搜索信息、获取价格、监控变化。Browser4 单机每天可访问十万页面，并通过内置 ML 自动结构化网页数据，使研究效率提升数千倍',
        example: '某电商客户每天采集数十万商品信息，自动生成分析报告，指导选品策略',
        color: 'sky'
    },
    {
        icon: Sparkles,
        number: '02',
        title: 'AI 驱动的互动体验',
        description: '将 LLM 与浏览器 Agent 结合，可阅读、总结并基于内容采取行动。Agent 能跨页面推理、对比、产生洞察，就像一名 24/7 的 AI 实习生',
        example: '许多社交媒体的热门演示视频，都源自此类场景，展示 AI Agent 如何自主完成复杂的网页交互和信息整合任务',
        color: 'violet'
    },
    {
        icon: Users,
        number: '03',
        title: '潜在客户发现与数据丰富化',
        description: '自动爬取目录、活动名单、企业官网等，构建或丰富 CRM 数据库，快速识别潜在客户',
        example: '某客户每天利用 Browser4 从 Google 检索3万客户线索，自动整合多国网站信息，大幅提升销售效率',
        color: 'emerald'
    },
    {
        icon: Workflow,
        number: '04',
        title: '工作流程自动化 (WFA)',
        description: '自动登录、下载发票、提交表单、上传数据、系统之间同步等"设定后忘记"的自动化任务',
        example: '某企业使用 Browser4 自动化处理银行对账流程，每月节省数十小时人工操作，错误率降至零',
        color: 'amber'
    },
    {
        icon: TestTube,
        number: '05',
        title: '质量保证与测试 (QA)',
        description: '在类生产环境中进行 E2E 测试、模拟不同地域用户、24/7监控关键流程',
        example: '自动化测试支付流程、登录认证、跨境购物等关键用户路径，确保产品质量和用户体验',
        color: 'pink'
    }
];

export default function UseCases() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = cases[activeIndex];
    const activeColor = colorClasses[active.color as keyof typeof colorClasses];

    return (
        <section className="relative py-24 bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">real-world plays</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">应用场景</h2>
                    <p className="text-xl text-slate-400">Browser4 AI Agent 的典型业务落地</p>
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
                                <p className="text-sm text-slate-500">场景 {active.number}</p>
                                <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-6">{active.description}</p>
                        <div className={`rounded-2xl border px-5 py-4 bg-gradient-to-br ${activeColor.panel}`}>
                            <p className="text-sm text-slate-400 mb-2">案例</p>
                            <p className="text-slate-200 leading-relaxed">{active.example}</p>
                        </div>
                    </article>

                    <div className="space-y-6">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                            <p className="text-sm text-slate-500 mb-2">为何选择</p>
                            <ul className="space-y-3 text-slate-300">
                                <li>✦ Agent 自动跨站导航、提取与整合</li>
                                <li>✦ 单机十万页/天吞吐，支持近实时监控</li>
                                <li>✦ 完整 API / Workflow，可接入现有系统</li>
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
