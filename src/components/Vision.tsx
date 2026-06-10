import { Rocket, Store, List, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const accentMap = {
    sky: {
        border: 'border-sky-200 dark:border-sky-500/30',
        text: 'text-sky-600 dark:text-sky-300'
    },
    violet: {
        border: 'border-violet-200 dark:border-violet-500/30',
        text: 'text-violet-600 dark:text-violet-300'
    },
    emerald: {
        border: 'border-emerald-200 dark:border-emerald-500/30',
        text: 'text-emerald-600 dark:text-emerald-300'
    },
    amber: {
        border: 'border-amber-200 dark:border-amber-500/30',
        text: 'text-amber-600 dark:text-amber-300'
    }
} as const;

export default function Vision() {
    const { t } = useTranslation();
    
    const highlights = [
        { 
            label: t('vision.painPoints.label'), 
            bullets: [
                t('vision.painPoints.bullet1'),
                t('vision.painPoints.bullet2'),
                t('vision.painPoints.bullet3')
            ]
        },
        { 
            label: t('vision.snapshot.label'), 
            bullets: [
                t('vision.snapshot.bullet1'),
                t('vision.snapshot.bullet2'),
                t('vision.snapshot.bullet3')
            ]
        }
    ];

    const predictions = [
        { icon: Store, title: t('vision.roadmap.agentHub.title'), text: t('vision.roadmap.agentHub.text'), accent: 'sky' },
        { icon: List, title: t('vision.roadmap.segmentedMarkets.title'), text: t('vision.roadmap.segmentedMarkets.text'), accent: 'violet' },
        { icon: Rocket, title: t('vision.roadmap.prebuiltCatalog.title'), text: t('vision.roadmap.prebuiltCatalog.text'), accent: 'emerald' },
        { icon: Globe, title: t('vision.roadmap.coevolution.title'), text: t('vision.roadmap.coevolution.text'), accent: 'amber' }
    ];
    return (
        <section id="vision" className="relative py-24 bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(79,70,229,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(79,70,229,0.08),transparent_55%)]" />
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.5em] text-slate-500 uppercase mb-4">{t('vision.label')}</p>
                    <h2 className="text-4xl md:text-5xl font-bold">{t('vision.title')}</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">{t('vision.subtitle')}</p>
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] mb-16">
                    <div className="space-y-6">
                        {highlights.map((block) => (
                            <article key={block.label} className="bg-white/90 border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none">
                                <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">{block.label}</p>
                                <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                                    {block.bullets.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-sky-500 mt-2" />
                                            <p>{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <div className="bg-white/90 border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none">
                        <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">{t('vision.roadmap.label')}</p>
                        <div className="space-y-8">
                            {predictions.map((item) => (
                                <div key={item.title} className={`rounded-2xl border bg-white dark:bg-slate-900/70 p-6 ${accentMap[item.accent as keyof typeof accentMap].border}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <item.icon className={`w-8 h-8 ${accentMap[item.accent as keyof typeof accentMap].text}`} />
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-sky-100 via-violet-100 to-emerald-100 border border-sky-200 rounded-3xl p-12 text-center shadow-xl shadow-slate-200/40 dark:from-sky-500/10 dark:via-violet-500/10 dark:to-emerald-500/10 dark:border-sky-500/30 dark:shadow-none">
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('vision.mission.title')}</h3>
                    <p className="text-xl text-slate-700 dark:text-slate-300 mb-6 leading-relaxed max-w-4xl mx-auto">
                        {t('vision.mission.text')}
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-left md:text-center">
                        <div>
                            <p className="text-4xl font-bold text-slate-900 dark:text-white">{t('vision.mission.stat1')}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('vision.mission.stat1Label')}</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-slate-900 dark:text-white">{t('vision.mission.stat2')}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('vision.mission.stat2Label')}</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-slate-900 dark:text-white">{t('vision.mission.stat3')}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('vision.mission.stat3Label')}</p>
                        </div>
                    </div>
                    <div className="inline-block mt-10 px-10 py-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-xl text-white font-bold text-lg">
                        {t('vision.mission.cta')}
                    </div>
                </div>
            </div>
        </section>
    );
}
