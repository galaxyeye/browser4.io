import { useEffect, useState } from 'react';
import { Bot, Copy, Check, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useTheme } from '../theme/ThemeProvider';

const VERB_KEYS = ['browse', 'automate', 'observe', 'scrape', 'study', 'investigate', 'extract', 'browse', 'monitor',
    'crawl', 'automate', 'extract', 'browse', 'automate', 'study', 'understand', 'investigate'];
const ADJECTIVE_KEYS = ['fast', 'powerful', 'intelligent', 'optimized'];
const ADJECTIVE_ROTATION_INTERVAL_MS = 15_000;

export default function Hero() {
    const { t, i18n } = useTranslation();
    const { isDark } = useTheme();
    const [verbIndex, setVerbIndex] = useState(0);
    const [adjectiveIndex, setAdjectiveIndex] = useState(() => Math.floor(Math.random() * ADJECTIVE_KEYS.length));
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    
    // Get translated verbs and calculate max width.
    // CJK characters are ~1em wide, Latin characters ~1ch wide.
    const verbs = VERB_KEYS.map(key => t(`hero.verbs.${key}`));
    const VERB_SLOT_WIDTH_CH = Math.max(...verbs.map((token) => token.length));
    const isCJK = /^zh/.test(i18n.language);
    const widthUnit = isCJK ? 'em' : 'ch';
    const VERB_TEMPO_WAVE_MS = [
        520, 360, 220, 160, 140, 180, 260, 420, 640, 420, 260, 180,
        5200, 3600, 2200, 1600, 1400, 1800, 2600, 4200, 6400, 4200, 2600, 1800,
        150, 150, 150, 100, 100, 100, 100, 100, 150, 150, 150, 150,
    ];
    
    const milestones = [
        { label: t('hero.milestones.founded.label'), detail: t('hero.milestones.founded.detail') },
        { label: t('hero.milestones.evolving.label'), detail: t('hero.milestones.evolving.detail') },
        { label: t('hero.milestones.future.label'), detail: t('hero.milestones.future.detail') },
    ];

    const handleCopy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const installMethods = [
        { key: 'npmInstall', command: t('hero.install.npmInstall'), label: t('hero.install.npmMethod') },
        { key: 'npmPostInstall', command: t('hero.install.npmPostInstall'), label: '' },
        { key: 'curlCommand', command: t('hero.install.curlCommand'), label: t('hero.install.curlMethod') },
        { key: 'psCommand', command: t('hero.install.psCommand'), label: t('hero.install.psMethod') },
    ];

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (media.matches) {
            return undefined;
        }

        let tempoIndex = 0;
        let verbTimeoutId: number | undefined;
        const scheduleVerbRotation = () => {
            const delay = VERB_TEMPO_WAVE_MS[tempoIndex % VERB_TEMPO_WAVE_MS.length];
            tempoIndex += 1;
            verbTimeoutId = window.setTimeout(() => {
                setVerbIndex((prev) => (prev + 1) % VERB_KEYS.length);
                scheduleVerbRotation();
            }, delay);
        };

        scheduleVerbRotation();

        const adjectiveTimer = window.setInterval(() => {
            setAdjectiveIndex((prev) => (prev + 1) % ADJECTIVE_KEYS.length);
        }, ADJECTIVE_ROTATION_INTERVAL_MS);

        return () => {
            if (verbTimeoutId) {
                window.clearTimeout(verbTimeoutId);
            }
            window.clearInterval(adjectiveTimer);
        };
    }, []);

    return (
        <section id="hero" className="relative overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.1),transparent_50%)]" />

            <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full mb-8">
                    <Bot className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('hero.badge')}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight dark:drop-shadow-[0_10px_35px_rgba(45,212,191,0.15)]">
                    {t('hero.title').split('{{verb}}')[0]}
                    <span
                        className="inline-flex justify-center text-sky-600 dark:text-sky-300"
                        aria-live="polite"
                        style={{ width: `${VERB_SLOT_WIDTH_CH}${widthUnit}` }}
                    >
                        {verbs[verbIndex]}
                    </span>
                    {t('hero.title').split('{{verb}}').slice(1).join('')}
                </h1>

                <p className="text-xl sm:text-2xl md:text-[26px] text-slate-600 dark:text-slate-300 mb-8 font-light max-w-3xl mx-auto">
                    {t('hero.subtitle').split('{{adjective}}')[0]}
                    <span className="text-sky-600 dark:text-sky-300" aria-live="polite">
                        {t(`hero.adjectives.${ADJECTIVE_KEYS[adjectiveIndex]}`)}
                    </span>
                    {t('hero.subtitle').split('{{adjective}}').slice(1).join('')}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
                    <a
                        href="#code-examples"
                        className="px-10 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.03] shadow-lg shadow-sky-500/30"
                    >
                        {t('hero.getStarted')}
                    </a>
                    <a
                        href="https://github.com/platonai/Browser4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-4 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-white/80 rounded-xl font-semibold transition-all hover:border-slate-400 dark:hover:border-slate-500/80"
                    >
                        {t('hero.github')}
                    </a>
                </div>

                {/* Installation Guide */}
                <div className="mb-14 max-w-2xl mx-auto">
                    <div className={clsx(
                        'relative overflow-hidden rounded-2xl border shadow-lg',
                        isDark
                            ? 'bg-slate-900/80 border-slate-700/80 shadow-slate-900/20'
                            : 'bg-white/80 border-slate-200 shadow-slate-200/30'
                    )}>
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200 dark:border-slate-700/60">
                            <Terminal className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {t('hero.install.label')}
                            </span>
                        </div>
                        <div className="p-5 space-y-2">
                            {installMethods.map((method) => (
                                <div key={method.key}>
                                    {method.label ? (
                                        <div className="text-xs text-slate-500 dark:text-slate-500 mb-1 mt-2 first:mt-0">
                                            {method.label}
                                        </div>
                                    ) : null}
                                    <div className="flex items-center gap-2 group">
                                        <code className={clsx(
                                            'flex-1 font-mono text-sm rounded-lg px-4 py-2 select-all',
                                            isDark
                                                ? 'bg-slate-950 text-slate-200 border border-slate-800'
                                                : 'bg-slate-900 text-slate-100 border border-slate-700'
                                        )}>
                                            <span className="text-slate-500 select-none">$ </span>
                                            {method.command}
                                        </code>
                                        <button
                                            onClick={() => handleCopy(method.command, method.key)}
                                            className={clsx(
                                                'shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all',
                                                isDark
                                                    ? 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                                    : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                                            )}
                                            title={t('hero.install.copyButton')}
                                        >
                                            {copiedKey === method.key ? (
                                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                            <span>{copiedKey === method.key ? t('hero.install.copied') : t('hero.install.copyButton')}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 backdrop-blur">
                    <p className="text-slate-500 dark:text-slate-500 text-xs tracking-[0.3em] uppercase mb-4">
                        {t('hero.milestones.title')}
                    </p>
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-center md:gap-12">
                        {milestones.map((item) => (
                            <div key={item.label} className="text-center">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white/90">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
