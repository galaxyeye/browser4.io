import { Code, Play, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const accentMap = {
    sky: 'from-sky-500/20 via-sky-500/5 to-transparent',
    emerald: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    violet: 'from-violet-500/20 via-violet-500/5 to-transparent',
    amber: 'from-amber-500/20 via-amber-500/5 to-transparent'
} as const;

export default function CodeExamples() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const examples = [
        {
            title: 'Browser Agents',
            description: '自主推理、规划并完成复杂的浏览器任务',
            language: 'kotlin',
            code: `val agent = AgenticContexts.getOrCreateAgent()

val task = """
    1. go to amazon.com
    2. search for pens to draw on whiteboards
    3. compare the first 4 ones
    4. write the result to a markdown file
    """

agent.run(task)`,
            color: 'sky'
        },
        {
            title: 'Workflow Automation',
            description: '精确的元素交互与快速数据提取',
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
)`,
            color: 'emerald'
        },
        {
            title: 'LLM + X-SQL',
            description: '结合LLM智能和精确选择器的高效数据提取',
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
println(ResultSetFormatter(rs, withHeader = true))`,
            color: 'violet'
        },
        {
            title: 'High-Speed Parallel Processing',
            description: '单机每天处理10万+页面的并行浏览器控制',
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

session.submitAll(links)`,
            color: 'amber'
        }
    ];

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section id="code-examples" className="relative py-24 bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full mb-6">
                        <Code className="w-4 h-4 text-sky-400" />
                        <span className="text-sky-400 text-sm font-medium">代码示例</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        开发者友好的API
                    </h2>
                    <p className="text-xl text-slate-400">
                        简洁优雅的代码示例，快速上手Browser4
                    </p>
                </div>

                <div className="space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {examples.map((example, index) => (
                            <article key={index} className="group relative overflow-hidden rounded-3xl border border-slate-900/70 bg-slate-900/50">
                                <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100', accentMap[example.color as keyof typeof accentMap])} />
                                <div className="relative flex flex-col h-full">
                                    <header className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                                        <div>
                                            <p className="text-sm text-slate-400">{example.title}</p>
                                            <p className="text-lg font-semibold text-white">{example.description}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                    </header>

                                    <div className="flex-1 p-6 flex flex-col gap-4">
                                        <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500">
                                            <span>{example.language}</span>
                                            <button
                                                onClick={() => handleCopy(example.code, index)}
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-sky-400"
                                            >
                                                {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                <span>{copiedIndex === index ? '已复制' : '复制'}</span>
                                            </button>
                                        </div>
                                        <div className="relative flex-1 bg-slate-950 rounded-2xl p-5 border border-slate-900 shadow-inner">
                                            <pre className="h-full overflow-x-auto text-sm font-mono leading-relaxed text-slate-200">
                                                <code>{example.code}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <article className="group relative overflow-hidden rounded-3xl border border-slate-900/70 bg-slate-900/50">
                            <div className="aspect-video relative">
                                <img src="https://img.youtube.com/vi/_BcryqWzVMI/0.jpg" alt="YouTube Demo" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <a
                                        href="https://www.youtube.com/watch?v=_BcryqWzVMI"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center"
                                    >
                                        <Play className="w-6 h-6 text-white ml-1" />
                                    </a>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-500 mb-1">YouTube Demo</p>
                                <h3 className="text-xl font-semibold text-white mb-2">Browser4 Agents 实战</h3>
                                <p className="text-slate-400 text-sm mb-4">展示自动研究、数据提取和报告生成的完整流程。</p>
                                <a href="https://www.youtube.com/watch?v=_BcryqWzVMI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-400">
                                    <span>查看视频</span>
                                    <Play className="w-4 h-4" />
                                </a>
                            </div>
                        </article>

                        <article className="group relative overflow-hidden rounded-3xl border border-slate-900/70 bg-slate-900/50">
                            <div className="aspect-video relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center mx-auto mb-4">
                                            <Play className="w-6 h-6 text-white ml-1" />
                                        </div>
                                        <p className="text-white font-medium">哔哩哔哩演示</p>
                                    </div>
                                </div>
                                <a href="https://www.bilibili.com/video/BV1kM2rYrEFC" target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                                    <span className="sr-only">Bilibili Demo</span>
                                </a>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-500 mb-1">Bilibili Demo</p>
                                <h3 className="text-xl font-semibold text-white mb-2">中文深度讲解</h3>
                                <p className="text-slate-400 text-sm mb-4">面向华语开发者的详细演示，覆盖部署、运行与实战。</p>
                                <a href="https://www.bilibili.com/video/BV1kM2rYrEFC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-400">
                                    <span>去观看</span>
                                    <Play className="w-4 h-4" />
                                </a>
                            </div>
                        </article>
                    </div>

                    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] items-center">
                        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8">
                            <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-3">快速开始</p>
                            <h3 className="text-3xl font-bold text-white mb-4">10 分钟完成环境部署</h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Browser4 需要 Java 17+ 与 Maven。克隆仓库、配置 LLM API 后即可运行示例。
                            </p>
                            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 font-mono text-sm text-slate-200 space-y-2 overflow-x-auto">
                                <div>git clone https://github.com/platonai/browser4.git</div>
                                <div>cd browser4 && ./mvnw -q -DskipTests</div>
                            </div>
                            <a
                                href="https://github.com/platonai/browser4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl"
                            >
                                访问 GitHub
                            </a>
                        </div>

                        <div className="bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-emerald-500/10 border border-sky-500/20 rounded-3xl p-8 text-center">
                            <Code className="w-10 h-10 text-sky-400 mx-auto mb-4" />
                            <p className="text-white text-xl font-semibold mb-2">开发者工具箱</p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                IDE 模板、脚本片段与 CLI 助手即将发布，申请内测获取第一波体验。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
