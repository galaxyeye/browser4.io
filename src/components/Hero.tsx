import { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

const VERB_TOKENS = ['browse', 'automate', 'study', 'scrape', 'monitor', 'crawl', 'extract'];
const VERB_SLOT_WIDTH_CH = Math.max(...VERB_TOKENS.map((token) => token.length));
const VERB_TEMPO_WAVE_MS = [
    520, 360, 220, 160, 140, 180, 260, 420, 640, 420, 260, 180,
    5200, 3600, 2200, 1600, 1400, 1800, 2600, 4200, 6400, 4200, 2600, 1800,
    150, 150, 150, 100, 100, 100, 100, 100, 150, 150, 150, 150,
];
const ADJECTIVE_TOKENS = ['fast', 'powerful', 'intelligent', 'optimized'];
const ADJECTIVE_ROTATION_INTERVAL_MS = 15_000;

export default function Hero() {
    const [verbIndex, setVerbIndex] = useState(0);
    const [adjectiveIndex, setAdjectiveIndex] = useState(() => Math.floor(Math.random() * ADJECTIVE_TOKENS.length));
    const milestones = [
        { label: '始于2014年', detail: '深耕浏览器自动化与智能体' },
        { label: '进化2020+', detail: '大规模AI Agent生产化' },
        { label: '面向未来', detail: '全面拥抱万物数字孪生' }
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
                setVerbIndex((prev) => (prev + 1) % VERB_TOKENS.length);
                scheduleVerbRotation();
            }, delay);
        };

        scheduleVerbRotation();

        const adjectiveTimer = window.setInterval(() => {
            setAdjectiveIndex((prev) => (prev + 1) % ADJECTIVE_TOKENS.length);
        }, ADJECTIVE_ROTATION_INTERVAL_MS);

        return () => {
            if (verbTimeoutId) {
                window.clearTimeout(verbTimeoutId);
            }
            window.clearInterval(adjectiveTimer);
        };
    }, []);

    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.1),transparent_50%)]" />

            <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full mb-8">
                    <Bot className="w-4 h-4 text-sky-400" />
                    <span className="text-sky-400 text-sm font-medium">超高速浏览器与智能体时代的基础设施</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(45,212,191,0.15)]">
                    Enable AI to <span
                        className="inline-flex text-sky-300"
                        aria-live="polite"
                        style={{ width: `${VERB_SLOT_WIDTH_CH}ch` }}
                    >
                        {VERB_TOKENS[verbIndex]}
                    </span> <div>the web.</div>
                </h1>

                <p className="text-xl sm:text-2xl md:text-[26px] text-slate-300 mb-8 font-light max-w-3xl mx-auto">
                    The ECOSYSTEM built around the world's most-<span className="text-sky-300" aria-live="polite">{ADJECTIVE_TOKENS[adjectiveIndex]}</span> browser-automation library.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
                    <a
                        href="#code-examples"
                        className="px-10 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.03] shadow-lg shadow-sky-500/30"
                    >
                        GET STARTED
                    </a>
                    <a
                        href="https://github.com/platonai/Browser4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-4 border border-slate-700/80 text-white/80 rounded-xl font-semibold transition-all hover:border-slate-500/80"
                    >
                        GITHUB
                    </a>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur">
                    <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-4">
                        发展历程
                    </p>
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-center md:gap-12">
                        {milestones.map((item) => (
                            <div key={item.label} className="text-center">
                                <p className="text-sm font-semibold text-white/90">{item.label}</p>
                                <p className="text-slate-400 text-sm">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
