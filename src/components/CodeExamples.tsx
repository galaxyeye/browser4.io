import { Code, Play, Copy, Check } from 'lucide-react';
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

export default function CodeExamples() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const prismTheme = isDark ? themes.vsDark : themes.duotoneLight;

    const examples = [
        {
            title: t('codeExamples.browserAgents.title'),
            description: t('codeExamples.browserAgents.description'),
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
            title: t('codeExamples.workflowAutomation.title'),
            description: t('codeExamples.workflowAutomation.description'),
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
)`,
            color: 'emerald'
        },
        {
            title: t('codeExamples.llmXsql.title'),
            description: t('codeExamples.llmXsql.description'),
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
            title: t('codeExamples.highSpeedParallel.title'),
            description: t('codeExamples.highSpeedParallel.description'),
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
        <section id="code-examples" className="relative py-24 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 border border-sky-200 rounded-full mb-6 text-sky-600 dark:bg-sky-500/10 dark:border-sky-500/20 dark:text-sky-300">
                        <Code className="w-4 h-4" />
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

                    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] items-center">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/30 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none">
                            <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-3">{t('codeExamples.quickstart.label')}</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('codeExamples.quickstart.title')}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                {t('codeExamples.quickstart.description')}
                            </p>
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-sm text-slate-100 space-y-2 overflow-x-auto dark:bg-slate-950">
                                <div>git clone https://github.com/platonai/browser4.git</div>
                                <div>cd browser4 && ./mvnw -DskipTests</div>
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

                        <div className="bg-gradient-to-br from-sky-50 via-violet-50 to-emerald-50 border border-sky-200 rounded-3xl p-8 text-center dark:from-sky-500/10 dark:via-violet-500/10 dark:to-emerald-500/10 dark:border-sky-500/20">
                            <Code className="w-10 h-10 text-sky-500 dark:text-sky-300 mx-auto mb-4" />
                            <p className="text-slate-900 dark:text-white text-xl font-semibold mb-2">{t('codeExamples.developerToolbox.title')}</p>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                {t('codeExamples.developerToolbox.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
