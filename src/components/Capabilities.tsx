import { useState, useEffect } from 'react';
import { BrainCircuit, Workflow, Database, Shield } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { Highlight, type Language, themes } from 'prism-react-renderer';

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

const getPillars = (t: (key: string) => string) => [
    {
        icon: BrainCircuit,
        accent: 'sky' as const,
        tag: t('capabilities.pillars.aiAgents.tag'),
        title: t('capabilities.pillars.aiAgents.title'),
        summary: t('capabilities.pillars.aiAgents.summary'),
        bullets: [
            t('capabilities.pillars.aiAgents.bullet1'),
            t('capabilities.pillars.aiAgents.bullet2'),
            t('capabilities.pillars.aiAgents.bullet3')
        ],
        stat: t('capabilities.pillars.aiAgents.stat'),
        statLabel: t('capabilities.pillars.aiAgents.statLabel'),
        footnote: t('capabilities.pillars.aiAgents.footnote'),
        codeSamples: [
            {
                label: 'Agent run',
                language: 'bash',
                code: `# Submit a natural-language task
browser4-cli agent run "Go to amazon.com, search for pens, compare the first 4, write result to markdown"

# Poll progress
browser4-cli agent status agent-task-1

# Get final result
browser4-cli agent result agent-task-1`
            }
        ]
    },
    {
        icon: Workflow,
        accent: 'emerald' as const,
        tag: t('capabilities.pillars.workflow.tag'),
        title: t('capabilities.pillars.workflow.title'),
        summary: t('capabilities.pillars.workflow.summary'),
        bullets: [
            t('capabilities.pillars.workflow.bullet1'),
            t('capabilities.pillars.workflow.bullet2')
        ],
        stat: t('capabilities.pillars.workflow.stat'),
        statLabel: t('capabilities.pillars.workflow.statLabel'),
        footnote: t('capabilities.pillars.workflow.footnote'),
        codeSamples: [
            {
                label: 'Workflow',
                language: 'bash',
                code: `# Open page, inspect, then automate step by step
browser4-cli open https://example.com/form
browser4-cli snapshot

# Fill form using refs from snapshot
browser4-cli fill e1 "user@example.com"
browser4-cli fill e2 "password123"
browser4-cli click e3
browser4-cli screenshot --filename=done.png
browser4-cli close`
            }
        ]
    },
    {
        icon: Database,
        accent: 'violet' as const,
        tag: t('capabilities.pillars.intelligence.tag'),
        title: t('capabilities.pillars.intelligence.title'),
        summary: t('capabilities.pillars.intelligence.summary'),
        bullets: [
            t('capabilities.pillars.intelligence.bullet1'),
            t('capabilities.pillars.intelligence.bullet2'),
            t('capabilities.pillars.intelligence.bullet3')
        ],
        stat: t('capabilities.pillars.intelligence.stat'),
        statLabel: t('capabilities.pillars.intelligence.statLabel'),
        footnote: t('capabilities.pillars.intelligence.footnote'),
        codeSamples: [
            {
                label: 'X-SQL Query',
                language: 'bash',
                code: `# Capture static DOM and run X-SQL
browser4-cli goto https://www.amazon.com/dp/B08PP5MSVB
browser4-cli domsnapshot

browser4-cli domsnapshot query --sql "
  SELECT
    dom_first_text(dom, '#productTitle') AS title,
    dom_first_text(dom, '#bylineInfo') AS brand,
    str_first_float(dom_first_text(dom,
      '#reviewsMedley .AverageCustomerReviews span'
    ), 0.0) AS score
  FROM dom(dom)
"`
            },
        ]
    },
    {
        icon: Shield,
        accent: 'amber' as const,
        tag: t('capabilities.pillars.security.tag'),
        title: t('capabilities.pillars.security.title'),
        summary: t('capabilities.pillars.security.summary'),
        bullets: [
            t('capabilities.pillars.security.bullet1'),
            t('capabilities.pillars.security.bullet2'),
            t('capabilities.pillars.security.bullet3')
        ],
        stat: t('capabilities.pillars.security.stat'),
        statLabel: t('capabilities.pillars.security.statLabel'),
        footnote: t('capabilities.pillars.security.footnote'),
        codeSamples: [
            {
                label: 'Swarm scraping',
                language: 'bash',
                code: `# Create swarm with parallel contexts
browser4-cli swarm create \\
  --profile-mode=TEMPORARY \\
  --max-browser-contexts=3 \\
  --display-mode=HEADLESS

# Submit URLs at scale
browser4-cli swarm submit \\
  --seed-file=urls.txt \\
  --refresh --store-content

# Poll and retrieve results
browser4-cli swarm status scrape-task-4
browser4-cli swarm result scrape-task-4`
            }
        ]
    }
];

export default function Capabilities() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [tabIndices, setTabIndices] = useState<number[]>([]);
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const prismTheme = isDark ? themes.vsDark : themes.duotoneLight;

    const pillars = getPillars(t);

    useEffect(() => {
        setTabIndices(pillars.map(() => 0));
    }, [pillars.length]);

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
                        {t('capabilities.sectionTitle')}
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        {t('capabilities.sectionSubtitle')}
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

                    <aside className="bg-white/85 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 lg:p-6 h-full flex flex-col gap-3 lg:sticky lg:top-24 lg:max-h-[85vh] lg:min-h-[65vh] lg:overflow-hidden">
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
                                {copied ? t('capabilities.copied') : t('capabilities.copyCode')}
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

                        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                            <div className="relative flex-1 bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200
                             dark:border-slate-900 shadow-inner overflow-x-auto overflow-y-hidden min-h-[280px]">
                                <Highlight
                                    code={activeSample.code.trim()}
                                    language={activeSample.language as Language}
                                    theme={prismTheme}
                                >
                                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                        <pre
                                            className={`${className ?? ''} text-sm font-mono leading-relaxed text-slate-700 dark:text-slate-100 min-h-full`}
                                            style={{ ...style, background: 'transparent' }}
                                        >
                                            {tokens.map((line, lineIndex) => (
                                                <div key={lineIndex} {...getLineProps({ line })}>
                                                    {line.map((token, tokenIndex) => (
                                                        <span key={tokenIndex} {...getTokenProps({ token })} />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
