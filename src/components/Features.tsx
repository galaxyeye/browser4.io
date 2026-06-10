import { Brain, Cog, Sparkles, Gauge, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Features() {
    const { t } = useTranslation();
    const features = [
        {
            icon: Brain,
            titleKey: 'features.browserAgents.title',
            subtitleKey: 'features.browserAgents.subtitle',
            descriptionKey: 'features.browserAgents.description',
            color: 'from-sky-400 to-blue-500'
        },
        {
            icon: Cog,
            titleKey: 'features.browserAutomation.title',
            subtitleKey: 'features.browserAutomation.subtitle',
            descriptionKey: 'features.browserAutomation.description',
            color: 'from-emerald-400 to-teal-500'
        },
        {
            icon: Sparkles,
            titleKey: 'features.machineLearning.title',
            subtitleKey: 'features.machineLearning.subtitle',
            descriptionKey: 'features.machineLearning.description',
            color: 'from-violet-400 to-purple-500'
        },
        {
            icon: Globe,
            titleKey: 'features.webUnderstanding.title',
            subtitleKey: 'features.webUnderstanding.subtitle',
            descriptionKey: 'features.webUnderstanding.description',
            color: 'from-pink-400 to-rose-500',
            statKey: 'features.webUnderstanding.stat',
            statLabelKey: 'features.webUnderstanding.statLabel'
        },
        {
            icon: Gauge,
            titleKey: 'features.extremePerformance.title',
            subtitleKey: 'features.extremePerformance.subtitle',
            descriptionKey: 'features.extremePerformance.description',
            color: 'from-amber-400 to-orange-500',
            statKey: 'features.extremePerformance.stat',
            statLabelKey: 'features.extremePerformance.statLabel'
        }
    ];
    const featureVideo = {
        titleKey: 'features.video.title',
        descriptionKey: 'features.video.description',
        embedUrl: 'https://www.youtube.com/embed/rJzXNXH3Gwk?rel=0'
    };

    return (
        <section id="features" className="relative py-24 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.05),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">{t('features.title')}</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        {t('features.subtitle')}
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.slice(0, 4).map((feature) => (
                            <article key={feature.titleKey} className="group relative bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition hover:-translate-y-1 hover:border-sky-500/40">
                                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-20 dark:bg-opacity-10 mb-6`}>
                                    <feature.icon className="w-8 h-8 text-slate-900 dark:text-white" />
                                </div>
                                <div className="flex items-baseline justify-between mb-4">
                                    <h3 className="text-2xl font-semibold">{t(feature.titleKey)}</h3>
                                    <span className="text-sm text-slate-500">{t(feature.subtitleKey)}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t(feature.descriptionKey)}</p>
                            </article>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {features.slice(4).map((feature) => (
                            <article key={feature.titleKey} className="bg-gradient-to-br from-white/90 to-slate-100/90 dark:from-slate-900/70 dark:to-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-30 dark:bg-opacity-20`}>
                                        <feature.icon className="w-10 h-10 text-slate-900 dark:text-white" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-bold">{feature.statKey && t(feature.statKey)}</p>
                                        <p className="text-sm text-slate-500">{feature.statLabelKey && t(feature.statLabelKey)}</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{t(feature.descriptionKey)}</p>
                            </article>
                        ))}
                        <article className="bg-gradient-to-br from-white/90 to-slate-100/90 dark:from-slate-900/70 dark:to-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold mb-2">{t(featureVideo.titleKey)}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{t(featureVideo.descriptionKey)}</p>
                            </div>
                            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-950/40">
                                <iframe
                                    src={featureVideo.embedUrl}
                                    title={t(featureVideo.titleKey)}
                                    loading="lazy"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
