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
        title: 'Autonomous Browser Agents',
        summary: 'Real-time perception, reasoning, and multi-agent orchestration keep the agent on course.',
        bullets: ['Chain-of-thought planning', 'LLM + vision mixed context', 'Multi-agent collaboration'],
        stat: '100+',
        statLabel: 'Concurrent agents per node',
        footnote: 'Core value: end-to-end reasoning plus reliable execution loops',
        codeSamples: [
            {
                label: 'Agent run',
                language: 'kotlin',
                code: `val agent = AgenticContexts.getOrCreateAgent()

val task = """
    1. go to amazon.com
    2. search for pens to draw on whiteboards
    3. compare the first 4 ones
    4. write the result to a markdown file
    """

agent.run(task)`
            }
        ]
    },
    {
        icon: Workflow,
        accent: 'emerald',
        tag: 'Automation & RPA',
        title: 'High-Precision Workflow Automation',
        summary: 'Composable primitives, coroutine-level safety, and elastic recovery for long-running work.',
        bullets: ['Visual workflow orchestration', 'Millisecond coroutine controls', 'Event-driven resilience'],
        stat: '99.2%',
        statLabel: 'Completion rate',
        footnote: 'Strength: always-on automation with graceful recovery',
        codeSamples: [
            {
                label: 'Automation loop',
                language: 'kotlin',
                code: `val session = AgenticContexts.getOrCreateSession()
val driver = session.getOrCreateBoundDriver()

// Open and parse the page
var page = session.open(url)
var document = session.parse(page)

// Interact with the page
var result = agent.act("scroll to the comment section")
var content = driver.selectFirstTextOrNull("#comments")

// Complex agent task
var history = agent.run(
    "Search for 'smart phone', read the first four products"
)`
            }
        ]
    },
    {
        icon: Database,
        accent: 'violet',
        tag: 'Data Extraction',
        title: 'One-Command Scale Extraction',
        summary: 'Hybrid of LLM, ML, and selectors for clean data across chaotic pages.',
        bullets: ['Token-free ML extraction', 'X-SQL extended queries', 'Mass entity harvesting'],
        stat: '99.9%+',
        statLabel: 'Field accuracy',
        footnote: 'No brittle rules—auto adapts to each site',
        codeSamples: [
            {
                label: 'Harvest API',
                language: 'sql',
                code: `# Learning from multiple product pages 
# and precisely extracting each field 
# without token consumption

select * from harvest('https://www.amazon.com/b?node=3117954011');
`
            },
            {
                label: 'Extended X-SQL',
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
        ]
    },
    {
        icon: Shield,
        accent: 'amber',
        tag: 'Performance & Reliability',
        title: 'Scale + Anti-Detection',
        summary: 'Behavioral simulation, multi-layer defense, and elastic scheduling keep throughput high.',
        bullets: ['100k page renders per node/day', 'Smart anti-block + retries', 'Profile/IP/behavior shields'],
        stat: '100k+',
        statLabel: 'Pages per day',
        footnote: 'Throughput and anti-detection guaranteed together',
        codeSamples: [
            {
                label: 'Throughput controls',
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
        ]
    }
] as const;

export default function Capabilities() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [tabIndices, setTabIndices] = useState(() => pillars.map(() => 0));

    const active = pillars[activeIndex];
    const activeTabIndex = tabIndices[activeIndex] ?? 0;
    const activeSample = active.codeSamples[activeTabIndex] ?? active.codeSamples[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(activeSample.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTabChange = (pillarIdx: number, tabIdx: number) => {
        setTabIndices((prev) => prev.map((current, idx) => (idx === pillarIdx ? tabIdx : current)));
        setCopied(false);
    };

    return (
        <section id="capabilities" className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-900 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.08),transparent_55%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.5em] text-slate-400 dark:text-slate-500 uppercase mb-4">browser4 stack</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Four Capability Pillars
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
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
                                    className={`relative overflow-hidden rounded-3xl border bg-white/80 dark:bg-slate-900/60 p-8 lg:p-10 transition ${
                                        isActive ? `${accent.ring} dark:${accent.ring}` : 'border-slate-200 dark:border-slate-800'
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
                                                <span className="text-slate-500 text-sm">{pillar.accent.toUpperCase()}</span>
                                            </div>
                                            <h3 className="text-3xl font-bold mb-4">{pillar.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{pillar.summary}</p>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {pillar.bullets.map((bullet) => (
                                                    <div key={bullet} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                        <span className="w-1.5 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                                                        <p className="text-sm md:text-base">{bullet}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white/90 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                                            <div>
                                                <p className="text-sm text-slate-500 mb-2">{pillar.tag}</p>
                                                <p className="text-5xl font-bold text-slate-900 dark:text-white">{pillar.stat}</p>
                                                <p className="text-sm text-slate-500">{pillar.statLabel}</p>
                                            </div>
                                            <div className={`mt-6 rounded-xl border ${accent.statBorder} bg-gradient-to-br ${accent.glow} to-transparent p-4`}
                                            >
                                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{pillar.footnote}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <aside className="bg-white/85 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 h-full flex flex-col gap-4 lg:sticky lg:top-24 lg:max-h-[80vh] lg:min-h-[60vh] lg:overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-slate-500">{active.tag}</p>
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{active.title}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{active.stat}</p>
                                <p className="text-xs text-slate-500">{active.statLabel}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500">
                            <span>{activeSample.language}</span>
                            <button
                                onClick={handleCopy}
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:border-slate-400 dark:hover:text-sky-400 ${
                                    copied ? 'border-sky-500/50 text-sky-500 dark:text-sky-300' : 'border-slate-200 dark:border-slate-800'
                                }`}
                            >
                                {copied ? 'Copied' : 'Copy code'}
                            </button>
                        </div>

                        {active.codeSamples.length > 1 && (
                            <div className="flex gap-2 flex-wrap text-xs font-medium text-slate-500 dark:text-slate-400">
                                {active.codeSamples.map((sample, idx) => {
                                    const isTabActive = idx === activeTabIndex;
                                    return (
                                        <button
                                            key={sample.label}
                                            onClick={() => handleTabChange(activeIndex, idx)}
                                            className={`px-3 py-1 rounded-full border transition ${
                                                isTabActive
                                                    ? 'border-sky-500/40 text-sky-500 dark:text-sky-300 bg-white dark:bg-slate-900'
                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                                            }`}
                                        >
                                            {sample.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="relative flex-1 bg-white dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-900 shadow-inner overflow-auto">
                            <pre className="text-sm font-mono leading-relaxed text-slate-700 dark:text-slate-200 min-h-full">
                                 <code>{activeSample.code}</code>
                             </pre>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
