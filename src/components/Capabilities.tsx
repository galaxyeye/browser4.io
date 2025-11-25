import { useState } from 'react';
import { BrainCircuit, Workflow, Database, Shield } from 'lucide-react';

const accentStyles = {
    sky: {
        badge: 'bg-sky-500/10 border border-sky-500/20 text-sky-300',
        icon: 'text-sky-300',
        glow: 'from-sky-500/10',
        accentBar: 'from-sky-400/60 via-sky-500/20 to-transparent',
        statBorder: 'border-sky-500/20',
        ring: 'ring-1 ring-sky-500/40'
    },
    emerald: {
        badge: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300',
        icon: 'text-emerald-300',
        glow: 'from-emerald-500/10',
        accentBar: 'from-emerald-400/60 via-emerald-500/20 to-transparent',
        statBorder: 'border-emerald-500/20',
        ring: 'ring-1 ring-emerald-500/30'
    },
    violet: {
        badge: 'bg-violet-500/10 border border-violet-500/20 text-violet-300',
        icon: 'text-violet-300',
        glow: 'from-violet-500/10',
        accentBar: 'from-violet-400/60 via-violet-500/20 to-transparent',
        statBorder: 'border-violet-500/20',
        ring: 'ring-1 ring-violet-500/30'
    },
    amber: {
        badge: 'bg-amber-500/10 border border-amber-500/20 text-amber-300',
        icon: 'text-amber-300',
        glow: 'from-amber-500/10',
        accentBar: 'from-amber-400/60 via-amber-500/20 to-transparent',
        statBorder: 'border-amber-500/20',
        ring: 'ring-1 ring-amber-500/30'
    }
} as const;

const pillars = [
    {
        icon: BrainCircuit,
        accent: 'sky',
        tag: 'AI & Agents',
        title: '自主型浏览器智能体',
        summary: '以主动感知、推理与多Agent编排为核心，实时理解页面状态并自我修正。',
        bullets: ['链式推理 + 场景规划', 'LLM/视觉混合上下文', '多Agent协同'],
        stat: '100+',
        statLabel: '单机并发 Agent',
        footnote: '核心价值：让AI具备自洽的决策与执行力',
        language: 'kotlin',
        code: `val agent = AgenticContexts.getOrCreateAgent()

val task = """
    1. go to amazon.com
    2. search for pens to draw on whiteboards
    3. compare the first 4 ones
    4. write the result to a markdown file
    """

agent.run(task)`
    },
    {
        icon: Workflow,
        accent: 'emerald',
        tag: 'Automation & RPA',
        title: '高精度工作流自动化',
        summary: '可组合的工作流原语、协程级别的动作安全，以及复杂事件的弹性恢复。',
        bullets: ['工作流/步骤可视化编排', '毫秒级协程动作控制', '事件驱动的容错恢复'],
        stat: '99.2%',
        statLabel: '成功率',
        footnote: '优势：长时间运行的业务自动化依旧稳定',
        language: 'kotlin',
        code: `val session = AgenticContexts.getOrCreateSession()
val driver = session.getOrCreateBoundDriver()

// 打开并解析页面
var page = session.open(url)
var document = session.parse(page)

// 与页面交互
var result = agent.act("scroll to the comment section")
var content = driver.selectFirstTextOrNull("#comments")

// 复杂的agent任务
var history = agent.run(
    "Search for 'smart phone', read the first four products"
)`
    },
    {
        icon: Database,
        accent: 'violet',
        tag: 'Data Extraction',
        title: '一句话完成规模化提取',
        summary: 'LLM + ML + selector 的混合策略，跨复杂网页快速输出干净数据。',
        bullets: ['零 Token 机器学习提取', 'X-SQL 扩展查询', '大规模实体抽取'],
        stat: '99.9%+',
        statLabel: '字段准确率',
        footnote: '无需手写繁琐规则，自动适配站点结构',
        language: 'kotlin',
        code: `val sql = """
select
  llm_extract(dom, 'product name, price, ratings') as llm_data,
  dom_first_text(dom, '#productTitle') as title,
  dom_first_text(dom, '#bylineInfo') as brand,
  str_first_float(dom_first_text(dom,
    '#reviewsMedley .AverageCustomerReviews span'
  ), 0.0) as score
from load_and_select(
    'https://www.amazon.com/dp/B08PP5MSVB', 'body'
);
"""

val rs = context.executeQuery(sql)
println(ResultSetFormatter(rs, withHeader = true))`
    },
    {
        icon: Shield,
        accent: 'amber',
        tag: 'Performance & Reliability',
        title: '规模化与高级反检测',
        summary: '多层防护、行为模拟与弹性调度，让十万级页面处理保持高可用。',
        bullets: ['单机十万页/天渲染', '智能抗封锁与重试', 'Profile/IP/行为多维防护'],
        stat: '10万+',
        statLabel: '日处理页面',
        footnote: '指标：吞吐与反检测双保障',
        language: 'kotlin',
        code: `val args = "-refresh -dropContent -interactLevel fastest"
val blockingUrls = listOf("*.png", "*.jpg")

val links = LinkExtractors.fromResource("urls.txt")
    .map { ListenableHyperlink(it, "", args = args) }
    .onEach {
        it.eventHandlers.browseEventHandlers
          .onWillNavigate.addLast { page, driver ->
            driver.addBlockedURLs(blockingUrls)
        }
    }

session.submitAll(links)`
    }
] as const;

export default function Capabilities() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const active = pillars[activeIndex];

    const handleCopy = () => {
        navigator.clipboard.writeText(active.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.08),transparent_55%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">browser4 stack</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        四大能力矩阵
                    </h2>
                    <p className="text-xl text-slate-400">
                        Agents · Automation · Data · Reliability
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        {pillars.map((pillar, index) => {
                            const accent = accentStyles[pillar.accent];
                            const isActive = index === activeIndex;
                            return (
                                <article
                                    key={pillar.tag}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                    tabIndex={0}
                                    className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 lg:p-10 transition ${
                                        isActive ? accent.ring : ''
                                    }`}
                                >
                                    <div className={`absolute inset-y-4 left-4 w-1 rounded-full bg-gradient-to-b ${accent.accentBar}`} />
                                    <div className="relative grid gap-8 lg:grid-cols-[1fr_220px]">
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${accent.badge}`}>
                                                    <pillar.icon className={`w-4 h-4 ${accent.icon}`} />
                                                    <span>{pillar.tag}</span>
                                                </div>
                                                <span className="text-slate-600 text-sm">{pillar.accent.toUpperCase()}</span>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4">{pillar.title}</h3>
                                            <p className="text-slate-400 mb-6 leading-relaxed">{pillar.summary}</p>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {pillar.bullets.map((bullet) => (
                                                    <div key={bullet} className="flex items-center gap-3 text-slate-300">
                                                        <span className="w-1.5 h-8 rounded-full bg-slate-800" />
                                                        <p className="text-sm md:text-base">{bullet}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                                            <div>
                                                <p className="text-sm text-slate-500 mb-2">{pillar.tag}</p>
                                                <p className="text-5xl font-bold text-white">{pillar.stat}</p>
                                                <p className="text-sm text-slate-500">{pillar.statLabel}</p>
                                            </div>
                                            <div className={`mt-6 rounded-xl border ${accent.statBorder} bg-gradient-to-br ${accent.glow} to-transparent p-4`}>
                                                <p className="text-slate-300 text-sm leading-relaxed">{pillar.footnote}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <aside className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 lg:p-8 h-full flex flex-col gap-4 lg:sticky lg:top-24 lg:max-h-[80vh] lg:min-h-[60vh] lg:overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-slate-500">{active.tag}</p>
                                <h3 className="text-2xl font-semibold text-white">{active.title}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-white">{active.stat}</p>
                                <p className="text-xs text-slate-500">{active.statLabel}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500">
                            <span>{active.language}</span>
                            <button
                                onClick={handleCopy}
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-slate-400 hover:text-sky-400 hover:border-slate-600 ${
                                    copied ? 'border-sky-500/50 text-sky-300' : 'border-slate-800'
                                }`}
                            >
                                {copied ? '已复制' : '复制代码'}
                            </button>
                        </div>

                        <div className="relative flex-1 bg-slate-950 rounded-2xl p-5 border border-slate-900 shadow-inner overflow-auto">
                            <pre className="text-sm font-mono leading-relaxed text-slate-200 min-h-full">
                                 <code>{active.code}</code>
                             </pre>
                         </div>
                     </aside>
                </div>
            </div>
        </section>
    );
}
