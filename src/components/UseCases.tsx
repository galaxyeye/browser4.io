import { useState } from 'react';
import { Search, Sparkles, Users, Workflow, TestTube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const colorClasses = {
    sky: {
        gradient: 'from-sky-50 to-blue-50 dark:from-sky-500/10 dark:to-blue-500/5',
        iconGradient: 'from-sky-100 to-blue-100 dark:from-sky-500/20 dark:to-blue-500/10',
        border: 'border-sky-200 dark:border-sky-500/30',
        accent: 'text-sky-600 dark:text-sky-300',
        badge: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300'
    },
    violet: {
        gradient: 'from-violet-50 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/5',
        iconGradient: 'from-violet-100 to-purple-100 dark:from-violet-500/20 dark:to-purple-500/10',
        border: 'border-violet-200 dark:border-violet-500/30',
        accent: 'text-violet-600 dark:text-violet-300',
        badge: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300'
    },
    emerald: {
        gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/5',
        iconGradient: 'from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/10',
        border: 'border-emerald-200 dark:border-emerald-500/30',
        accent: 'text-emerald-600 dark:text-emerald-300',
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
    },
    amber: {
        gradient: 'from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/5',
        iconGradient: 'from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/10',
        border: 'border-amber-200 dark:border-amber-500/30',
        accent: 'text-amber-600 dark:text-amber-300',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
    },
    pink: {
        gradient: 'from-pink-50 to-rose-50 dark:from-pink-500/10 dark:to-rose-500/5',
        iconGradient: 'from-pink-100 to-rose-100 dark:from-pink-500/20 dark:to-rose-500/10',
        border: 'border-pink-200 dark:border-pink-500/30',
        accent: 'text-pink-600 dark:text-pink-300',
        badge: 'bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300'
    }
} as const;

export default function UseCases() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    
    const cases = [
        {
            icon: Search,
            number: t('useCases.case1.number'),
            title: t('useCases.case1.title'),
            description: t('useCases.case1.description'),
            example: t('useCases.case1.example'),
            color: 'sky'
        },
        {
            icon: Sparkles,
            number: t('useCases.case2.number'),
            title: t('useCases.case2.title'),
            description: t('useCases.case2.description'),
            example: t('useCases.case2.example'),
            color: 'violet'
        },
        {
            icon: Users,
            number: t('useCases.case3.number'),
            title: t('useCases.case3.title'),
            description: t('useCases.case3.description'),
            example: t('useCases.case3.example'),
            color: 'emerald'
        },
        {
            icon: Workflow,
            number: t('useCases.case4.number'),
            title: t('useCases.case4.title'),
            description: t('useCases.case4.description'),
            example: t('useCases.case4.example'),
            color: 'amber'
        },
        {
            icon: TestTube,
            number: t('useCases.case5.number'),
            title: t('useCases.case5.title'),
            description: t('useCases.case5.description'),
            example: t('useCases.case5.example'),
            color: 'pink'
        }
    ];
    
    const videos = [
        {
            id: 'WO3M7g35Zt4',
            title: t('useCases.videoDemos.video1.title'),
            description: t('useCases.videoDemos.video1.description'),
            notes: [
                t('useCases.videoDemos.video1.note1'),
                t('useCases.videoDemos.video1.note2'),
                t('useCases.videoDemos.video1.note3')
            ],
            color: 'sky'
        },
        {
            id: 'qoXbnL4wdtc',
            title: t('useCases.videoDemos.video2.title'),
            description: t('useCases.videoDemos.video2.description'),
            notes: [
                t('useCases.videoDemos.video2.note1'),
                t('useCases.videoDemos.video2.note2'),
                t('useCases.videoDemos.video2.note3')
            ],
            color: 'violet'
        }
    ];
    
    const active = cases[activeIndex];
    const palette = colorClasses[active.color as keyof typeof colorClasses];

    return (
        <section id="use-cases" className="relative py-24 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">{t('useCases.label')}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t('useCases.title')}</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">{t('useCases.subtitle')}</p>
                </div>

                <div className="mb-10 flex flex-wrap gap-3 justify-center">
                    {cases.map((item, index) => (
                        <button
                            key={item.title}
                            onClick={() => setActiveIndex(index)}
                            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                                index === activeIndex
                                    ? 'border-sky-500/60 bg-sky-500/10 text-sky-700 dark:text-white'
                                    : 'border-slate-200 text-slate-600 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mb-16">
                    <article className="bg-white/90 border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${palette.iconGradient} border ${palette.border} flex items-center justify-center`}>
                                <active.icon className={`w-8 h-8 ${palette.accent}`} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('useCases.scenario')} {active.number}</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{active.title}</h3>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{active.description}</p>
                        <div className={`rounded-2xl border px-5 py-4 bg-gradient-to-br ${palette.gradient} ${palette.border}`}>
                            <p className={`text-sm font-semibold mb-2 ${palette.accent}`}>{t('useCases.example')}</p>
                            <p className="text-slate-700 dark:text-white/80 leading-relaxed">{active.example}</p>
                        </div>
                    </article>

                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg shadow-slate-200/30 dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{t('useCases.whyBrowser4')}</p>
                            <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                                <li>✦ {t('useCases.benefit1')}</li>
                                <li>✦ {t('useCases.benefit2')}</li>
                                <li>✦ {t('useCases.benefit3')}</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {cases.slice(0, 4).map((item) => {
                                const tone = colorClasses[item.color as keyof typeof colorClasses];
                                return (
                                    <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
                                        <p className={`text-xs font-semibold uppercase ${tone.accent}`}>{item.number}</p>
                                        <p className="text-sm text-slate-900 dark:text-white mt-1">{item.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.description.slice(0, 40)}...</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cases.map((item) => {
                        const tone = colorClasses[item.color as keyof typeof colorClasses];
                        return (
                            <article key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${tone.badge}`}>
                                        {item.number}
                                    </div>
                                    <h4 className="text-lg text-slate-900 dark:text-white">{item.title}</h4>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-20">
                    <div className="text-center mb-10">
                        <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-3">{t('useCases.videoDemos.label')}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{t('useCases.videoDemos.title')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">{t('useCases.videoDemos.subtitle')}</p>
                    </div>
                    <div className="grid gap-10 md:grid-cols-2">
                        {videos.map((video) => {
                            const tone = colorClasses[video.color as keyof typeof colorClasses];
                            return (
                                <article key={video.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-lg shadow-slate-200/30 dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none">
                                    <div className="flex items-center gap-3">
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${tone.badge}`}>
                                            {t('useCases.videoDemos.video')}
                                        </div>
                                        <h4 className="text-slate-900 dark:text-white text-xl font-semibold">{video.title}</h4>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{video.description}</p>
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.id}`}
                                            title={video.title}
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                                        {video.notes.map((note) => (
                                            <li key={note}>✦ {note}</li>
                                        ))}
                                    </ul>
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
                                    >
                                        {t('useCases.videoDemos.watchOnYouTube')}
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
