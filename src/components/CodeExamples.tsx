import { Play, Copy, Check, Terminal, ChevronRight, Monitor, MousePointer2, FolderOpen, Server, Globe } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '../theme/ThemeProvider';
import { Highlight, type Language, themes } from 'prism-react-renderer';
import { useTranslation } from 'react-i18next';

const accentMap = {
    sky: {
        light: 'from-sky-400/15 via-sky-400/5 to-transparent',
        dark: 'from-sky-500/20 via-sky-500/5 to-transparent'
    },
    emerald: {
        light: 'from-emerald-400/15 via-emerald-400/5 to-transparent',
        dark: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
    },
    violet: {
        light: 'from-violet-400/15 via-violet-400/5 to-transparent',
        dark: 'from-violet-500/20 via-violet-500/5 to-transparent'
    },
    amber: {
        light: 'from-amber-400/15 via-amber-400/5 to-transparent',
        dark: 'from-amber-500/20 via-amber-500/5 to-transparent'
    }
} as const;

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    core: Monitor,
    navigation: Globe,
    keyboardMouse: MousePointer2,
    screenshots: Camera,
    tabs: FolderOpen,
    storage: Database,
    sessions: Server,
    server: Server,
    advanced: Terminal,
};

function Camera({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}

function Database({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    );
}

export default function CodeExamples() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const prismTheme = isDark ? themes.vsDark : themes.duotoneLight;

    const examples = [
        {
            title: t('codeExamples.autonomousAgent.title'),
            description: t('codeExamples.autonomousAgent.description'),
            language: 'bash',
            code: `# Submit a natural-language task — the agent plans and executes autonomously
browser4-cli agent run "Go to amazon.com, search for mechanical keyboards, compare the first 4 results, and write a summary to keyboards.md"

# Poll progress
browser4-cli agent status agent-task-1

# Retrieve the final result
browser4-cli agent result agent-task-1`,
            color: 'sky'
        },
        {
            title: t('codeExamples.formAutomation.title'),
            description: t('codeExamples.formAutomation.description'),
            language: 'bash',
            code: `# Open a page, inspect interactive elements, then automate
browser4-cli open https://example.com/checkout
browser4-cli snapshot

# Fill the form using refs from the snapshot
browser4-cli fill e1 "user@example.com"
browser4-cli fill e2 "John Doe"
browser4-cli select e3 "US"
browser4-cli check e4
browser4-cli click e5

# Capture proof and close
browser4-cli screenshot --filename=checkout-complete.png
browser4-cli close`,
            color: 'emerald'
        },
        {
            title: t('codeExamples.dataExtraction.title'),
            description: t('codeExamples.dataExtraction.description'),
            language: 'bash',
            code: `# Navigate to a product page and capture the DOM
browser4-cli goto https://www.amazon.com/dp/B08PP5MSVB
browser4-cli domsnapshot

# Extract structured fields with CSS selectors
browser4-cli domsnapshot get text "#productTitle"
browser4-cli domsnapshot get attr "#bylineInfo" "href"

# Or run a full X-SQL query for multi-field extraction
browser4-cli domsnapshot query --sql "
  SELECT
    dom_first_text(dom, '#productTitle') AS title,
    dom_first_text(dom, '#bylineInfo') AS brand,
    str_first_float(dom_first_text(dom, '.a-price .a-offscreen'), 0.0) AS price
  FROM dom(dom)
"`,
            color: 'violet'
        },
        {
            title: t('codeExamples.swarmScraping.title'),
            description: t('codeExamples.swarmScraping.description'),
            language: 'bash',
            code: `# Create a swarm session with parallel browser contexts
browser4-cli swarm create \\
  --profile-mode=TEMPORARY \\
  --max-open-tabs=12 \\
  --max-browser-contexts=3 \\
  --display-mode=HEADLESS

# Submit a batch of URLs for high-throughput scraping
browser4-cli swarm submit \\
  --seed-file=./urls.txt \\
  --refresh --store-content \\
  --deadline=2026-06-30T00:00:00Z

# Poll and fetch results per job
browser4-cli swarm status scrape-task-4
browser4-cli swarm result scrape-task-4`,
            color: 'amber'
        }
    ];

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // CLI command categories for the reference grid
    const commandCategories = [
        {
            catKey: 'core',
            color: 'sky' as const,
            commands: [
                ['open', 'open [url]'],
                ['goto', 'goto <url>'],
                ['click', 'click <ref>'],
                ['dblclick', 'dblclick <ref>'],
                ['type', 'type <text> [ref]'],
                ['fill', 'fill <ref> <text>'],
                ['hover', 'hover <ref>'],
                ['select', 'select <ref> <val>'],
                ['check', 'check <ref>'],
                ['uncheck', 'uncheck <ref>'],
                ['drag', 'drag <src> <dst>'],
                ['upload', 'upload <ref> <file>'],
                ['snapshot', 'snapshot'],
                ['eval', 'eval <expr> [ref]'],
                ['get', 'get <mode> <sel> [name]'],
                ['scroll', 'scroll <dir> <px>'],
                ['wait', 'wait [target]'],
                ['resize', 'resize <w> <h>'],
            ]
        },
        {
            catKey: 'navigation',
            color: 'emerald' as const,
            commands: [
                ['go-back', 'go-back'],
                ['go-forward', 'go-forward'],
                ['reload', 'reload'],
            ]
        },
        {
            catKey: 'keyboardMouse',
            color: 'violet' as const,
            commands: [
                ['press', 'press <key> [ref]'],
                ['keydown', 'keydown <key>'],
                ['keyup', 'keyup <key>'],
                ['mousemove', 'mousemove <x> <y>'],
                ['mousedown', 'mousedown [btn]'],
                ['mouseup', 'mouseup [btn]'],
                ['mousewheel', 'mousewheel <dx> <dy>'],
            ]
        },
        {
            catKey: 'screenshots',
            color: 'amber' as const,
            commands: [
                ['screenshot', 'screenshot [ref]'],
                ['pdf', 'pdf'],
            ]
        },
        {
            catKey: 'tabs',
            color: 'sky' as const,
            commands: [
                ['tab-list', 'tab-list'],
                ['tab-new', 'tab-new [url]'],
                ['tab-select', 'tab-select <idx>'],
                ['tab-close', 'tab-close [idx]'],
            ]
        },
        {
            catKey: 'storage',
            color: 'emerald' as const,
            commands: [
                ['cookie-list', 'cookie-list'],
                ['cookie-get', 'cookie-get <name>'],
                ['cookie-set', 'cookie-set <n> <v>'],
                ['cookie-delete', 'cookie-delete <name>'],
                ['cookie-clear', 'cookie-clear'],
                ['ls-get', 'localstorage-get <key>'],
                ['ls-set', 'localstorage-set <k> <v>'],
                ['state-save', 'state-save <path>'],
                ['state-load', 'state-load <path>'],
            ]
        },
        {
            catKey: 'sessions',
            color: 'violet' as const,
            commands: [
                ['list', 'list'],
                ['close', 'close'],
                ['close-all', 'close-all'],
                ['kill-all', 'kill-all'],
            ]
        },
        {
            catKey: 'server',
            color: 'amber' as const,
            commands: [
                ['install', 'install'],
                ['upgrade', 'upgrade'],
                ['uninstall', 'uninstall'],
                ['stop', 'stop'],
                ['status', 'status'],
            ]
        },
        {
            catKey: 'advanced',
            color: 'rose' as const,
            commands: [
                ['batch', 'batch <cmd> [cmd...]'],
                ['agent run', 'agent run <task>'],
                ['agent status', 'agent status <id>'],
                ['agent result', 'agent result <id>'],
                ['domsnapshot', 'domsnapshot'],
                ['domsnapshot get', 'domsnapshot get <...>'],
                ['domsnapshot query', 'domsnapshot query --sql'],
                ['extract', 'extract <instruction>'],
                ['summarize', 'summarize [instruction]'],
                ['swarm create', 'swarm create'],
                ['swarm submit', 'swarm submit [url]'],
                ['swarm query', 'swarm query <url> --sql'],
            ]
        },
    ];

    const categoryColorMap: Record<string, { light: string; dark: string; badge: string; icon: string }> = {
        sky: {
            light: 'text-sky-600', dark: 'text-sky-400',
            badge: 'bg-sky-100 border-sky-200 text-sky-600 dark:bg-sky-500/10 dark:border-sky-500/20 dark:text-sky-300',
            icon: 'text-sky-500 dark:text-sky-400',
        },
        emerald: {
            light: 'text-emerald-600', dark: 'text-emerald-400',
            badge: 'bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300',
            icon: 'text-emerald-500 dark:text-emerald-400',
        },
        violet: {
            light: 'text-violet-600', dark: 'text-violet-400',
            badge: 'bg-violet-100 border-violet-200 text-violet-600 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-300',
            icon: 'text-violet-500 dark:text-violet-400',
        },
        amber: {
            light: 'text-amber-600', dark: 'text-amber-400',
            badge: 'bg-amber-100 border-amber-200 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300',
            icon: 'text-amber-500 dark:text-amber-400',
        },
        rose: {
            light: 'text-rose-600', dark: 'text-rose-400',
            badge: 'bg-rose-100 border-rose-200 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-300',
            icon: 'text-rose-500 dark:text-rose-400',
        },
    };

    return (
        <section id="code-examples" className="relative py-24 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 border border-sky-200 rounded-full mb-6 text-sky-600 dark:bg-sky-500/10 dark:border-sky-500/20 dark:text-sky-300">
                        <Terminal className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('codeExamples.badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {t('codeExamples.title')}
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        {t('codeExamples.subtitle')}
                    </p>
                </div>

                <div className="space-y-12">
                    {/* 4 CLI Code Example Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {examples.map((example, index) => (
                            <article
                                key={index}
                                className="group relative overflow-hidden rounded-3xl border bg-white/85 border-slate-200 shadow-xl shadow-slate-200/30 backdrop-blur dark:border-slate-900/70 dark:bg-slate-900/50 dark:shadow-none"
                            >
                                <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100', accentMap[example.color as keyof typeof accentMap][isDark ? 'dark' : 'light'])} />
                                <div className="relative flex flex-col h-full">
                                    <header className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{example.title}</p>
                                            <p className="text-lg font-semibold text-slate-900 dark:text-white">{example.description}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                    </header>

                                    <div className="flex-1 p-6 flex flex-col gap-4">
                                        <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                                            <span>{example.language}</span>
                                            <button
                                                onClick={() => handleCopy(example.code, index)}
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-sky-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-sky-300"
                                            >
                                                {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                <span>{copiedIndex === index ? t('codeExamples.copied') : t('codeExamples.copy')}</span>
                                            </button>
                                        </div>
                                        <div className="relative flex-1 rounded-2xl border border-slate-200/70 bg-slate-900 shadow-inner dark:border-slate-900 dark:bg-slate-950">
                                            <Highlight
                                                code={example.code.trim()}
                                                language={example.language as Language}
                                                theme={prismTheme}
                                            >
                                                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                                    <pre
                                                        className={clsx('h-full overflow-x-auto text-sm font-mono leading-relaxed text-slate-100 px-4 py-4', className)}
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
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Video Demos */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <article className="group relative overflow-hidden rounded-3xl border bg-white/90 border-slate-200 shadow-lg shadow-slate-200/30 dark:border-slate-900/70 dark:bg-slate-900/50 dark:shadow-none">
                            <div className="aspect-video relative">
                                <img src="https://img.youtube.com/vi/_BcryqWzVMI/0.jpg" alt="YouTube Demo" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center dark:bg-black/40 dark:group-hover:bg-black/10">
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
                                <p className="text-sm text-slate-500 mb-1">{t('codeExamples.youtube.label')}</p>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t('codeExamples.youtube.title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{t('codeExamples.youtube.description')}</p>
                                <a href="https://www.youtube.com/watch?v=_BcryqWzVMI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-300">
                                    <span>{t('codeExamples.youtube.watchVideo')}</span>
                                    <Play className="w-4 h-4" />
                                </a>
                            </div>
                        </article>

                        <article className="group relative overflow-hidden rounded-3xl border bg-white/90 border-slate-200 shadow-lg shadow-slate-200/30 dark:border-slate-900/70 dark:bg-slate-900/50 dark:shadow-none">
                            <div className="aspect-video relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center dark:from-slate-900 dark:to-slate-950">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center mx-auto mb-4">
                                            <Play className="w-6 h-6 text-white ml-1" />
                                        </div>
                                        <p className="text-slate-900 dark:text-white font-medium">{t('codeExamples.bilibili.label')}</p>
                                    </div>
                                </div>
                                <a href="https://www.bilibili.com/video/BV1kM2rYrEFC" target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                                    <span className="sr-only">Bilibili Demo</span>
                                </a>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-500 mb-1">{t('codeExamples.bilibili.label')}</p>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t('codeExamples.bilibili.title')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{t('codeExamples.bilibili.description')}</p>
                                <a href="https://www.bilibili.com/video/BV1kM2rYrEFC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-300">
                                    <span>{t('codeExamples.bilibili.watchNow')}</span>
                                    <Play className="w-4 h-4" />
                                </a>
                            </div>
                        </article>
                    </div>

                    {/* Expanded CLI Commands Reference */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full mb-4 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300">
                                <Terminal className="w-4 h-4" />
                                <span className="text-sm font-medium">{t('codeExamples.cli.label')}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {t('codeExamples.cli.title')}
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                {t('codeExamples.cli.description')}
                            </p>
                        </div>

                        {/* Install banner */}
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg dark:from-slate-950 dark:to-slate-900 dark:border-slate-800">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <span className="shrink-0 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    {t('codeExamples.cli.installLabel')}
                                </span>
                                <code className="flex-1 font-mono text-sm text-emerald-300 bg-black/40 rounded-lg px-4 py-2 select-all">
                                    {t('codeExamples.cli.installCommand')}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(t('codeExamples.cli.installCommand'));
                                        setCopiedIndex(-1);
                                        setTimeout(() => setCopiedIndex(null), 2000);
                                    }}
                                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-colors text-sm"
                                >
                                    {copiedIndex === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    <span>{copiedIndex === -1 ? t('codeExamples.copied') : t('codeExamples.copy')}</span>
                                </button>
                            </div>
                            <p className="mt-3 text-xs text-slate-500">{t('codeExamples.cli.installNote')}</p>
                        </div>

                        {/* Command category grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {commandCategories.map((cat) => {
                                const cc = categoryColorMap[cat.color];
                                const Icon = categoryIcons[cat.catKey] ?? Terminal;
                                return (
                                    <div key={cat.catKey} className="bg-white/85 border border-slate-200 rounded-2xl p-5 dark:bg-slate-900/50 dark:border-slate-800">
                                        <div className={clsx('inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border', cc.badge)}>
                                            <Icon className={clsx('w-3.5 h-3.5', cc.icon)} />
                                            <span>{t(`codeExamples.cli.categories.${cat.catKey}`)}</span>
                                        </div>
                                        <div className="space-y-1.5 font-mono text-xs">
                                            {cat.commands.map(([cmd, sig]) => (
                                                <div key={cmd} className="flex items-center gap-2">
                                                    <span className={clsx('shrink-0', isDark ? cc.dark : cc.light)}>{cmd}</span>
                                                    <span className="text-slate-500 dark:text-slate-600 truncate">{sig}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quickstart + Developer Toolbox */}
                    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] items-center">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/30 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none">
                            <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-3">{t('codeExamples.quickstart.label')}</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('codeExamples.quickstart.title')}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                {t('codeExamples.quickstart.description')}
                            </p>
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-sm text-slate-100 space-y-2 overflow-x-auto dark:bg-slate-950">
                                <div className="text-slate-500 text-xs mb-1"># Via npm (requires Node.js)</div>
                                <div><span className="text-slate-500">$</span> npm install -g browser4-cli</div>
                                <div><span className="text-slate-500">$</span> browser4-cli install</div>
                                <div className="mt-3 pt-3 border-t border-slate-700 text-slate-500 text-xs mb-1"># Or one-liner — no prerequisites</div>
                                <div className="text-slate-400 text-xs"># Linux / macOS:</div>
                                <div><span className="text-slate-500">$</span> curl -fsSL https://browser4.oss-cn-beijing.aliyuncs.com/scripts/install-browser4-cli.sh | bash</div>
                                <div className="text-slate-400 text-xs mt-1"># Windows PowerShell:</div>
                                <div><span className="text-slate-500">$</span> irm https://browser4.oss-cn-beijing.aliyuncs.com/scripts/install-browser4-cli.ps1 | iex</div>
                            </div>
                            <a
                                href="https://github.com/platonai/browser4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl"
                            >
                                {t('codeExamples.quickstart.visitGithub')}
                            </a>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50 border border-emerald-200 rounded-3xl p-8 text-center dark:from-emerald-500/10 dark:via-sky-500/10 dark:to-violet-500/10 dark:border-emerald-500/20">
                            <Terminal className="w-10 h-10 text-emerald-500 dark:text-emerald-300 mx-auto mb-4" />
                            <p className="text-slate-900 dark:text-white text-xl font-semibold mb-2">{t('codeExamples.developerToolbox.title')}</p>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                {t('codeExamples.developerToolbox.description')}
                            </p>
                            <a
                                href="https://github.com/platonai/Browser4/tree/main/cli"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-300 text-sm font-medium hover:underline"
                            >
                                <span>{t('codeExamples.cli.docsLink')}</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
