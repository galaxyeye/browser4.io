import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
    ArrowUpRight,
    BadgeCheck,
    Bot,
    Brain,
    CalendarDays,
    CheckCircle2,
    CircleDashed,
    Coins,
    Database,
    FileSpreadsheet,
    Flame,
    Globe,
    Info,
    Network,
    Server,
    Terminal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Status = 'verified' | 'claim' | 'notfound';
type Filter = 'all' | 'differences' | 'advantages';

type MatrixRow = {
    id: string;
    group: 'basics' | 'data';
    b4: Status;
    bu: Status;
    ab: Status;
    fc: Status;
    note?: boolean;
};

const MATRIX_ROWS: MatrixRow[] = [
    // Basics
    { id: 'browserAutomation', group: 'basics', b4: 'verified', bu: 'verified', ab: 'verified', fc: 'claim' },
    { id: 'aiAgent', group: 'basics', b4: 'verified', bu: 'verified', ab: 'verified', fc: 'verified' },
    { id: 'mcp', group: 'basics', b4: 'verified', bu: 'verified', ab: 'verified', fc: 'verified' },
    { id: 'cdpControl', group: 'basics', b4: 'verified', bu: 'verified', ab: 'verified', fc: 'notfound' },
    { id: 'crawl', group: 'basics', b4: 'verified', bu: 'verified', ab: 'notfound', fc: 'verified' },
    { id: 'search', group: 'basics', b4: 'notfound', bu: 'notfound', ab: 'notfound', fc: 'verified' },
    { id: 'structuredExtraction', group: 'basics', b4: 'verified', bu: 'verified', ab: 'claim', fc: 'verified' },
    { id: 'networkHar', group: 'basics', b4: 'claim', bu: 'claim', ab: 'verified', fc: 'notfound', note: true },
    // Data & scale layer
    { id: 'xSql', group: 'data', b4: 'verified', bu: 'notfound', ab: 'notfound', fc: 'notfound' },
    { id: 'zeroLlmToken', group: 'data', b4: 'verified', bu: 'notfound', ab: 'notfound', fc: 'notfound' },
    { id: 'mlPipeline', group: 'data', b4: 'verified', bu: 'notfound', ab: 'notfound', fc: 'notfound' },
    { id: 'webMiner', group: 'data', b4: 'verified', bu: 'notfound', ab: 'notfound', fc: 'notfound' },
    { id: 'swarmParallel', group: 'data', b4: 'verified', bu: 'notfound', ab: 'notfound', fc: 'verified' },
    { id: 'experienceLearning', group: 'data', b4: 'verified', bu: 'notfound', ab: 'notfound', fc: 'notfound' },
];

const STATUS_META: Record<
    Status,
    { labelKey: string; descKey: string; pill: string; Icon: LucideIcon }
> = {
    verified: {
        labelKey: 'compare.legend.verified',
        descKey: 'compare.legend.verifiedDesc',
        pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
        Icon: CheckCircle2,
    },
    claim: {
        labelKey: 'compare.legend.claim',
        descKey: 'compare.legend.claimDesc',
        pill: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25',
        Icon: BadgeCheck,
    },
    notfound: {
        labelKey: 'compare.legend.notfound',
        descKey: 'compare.legend.notfoundDesc',
        pill: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/25',
        Icon: CircleDashed,
    },
};

const PRODUCTS: { id: string; href: string; Icon: LucideIcon; chip: string }[] = [
    { id: 'browser4', href: 'https://github.com/platonai/Browser4', Icon: Bot, chip: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
    { id: 'browserUse', href: 'https://github.com/browser-use/browser-use', Icon: Globe, chip: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
    { id: 'agentBrowser', href: 'https://github.com/vercel-labs/agent-browser', Icon: Terminal, chip: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { id: 'firecrawl', href: 'https://github.com/firecrawl/firecrawl', Icon: Flame, chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
];

const DIFFERENTIATORS: { id: string; Icon: LucideIcon; chip: string }[] = [
    { id: 'xSql', Icon: Database, chip: 'from-sky-500/15 to-sky-500/5 text-sky-600 dark:text-sky-400' },
    { id: 'zeroLlmToken', Icon: Coins, chip: 'from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400' },
    { id: 'webMiner', Icon: FileSpreadsheet, chip: 'from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-400' },
    { id: 'experience', Icon: Brain, chip: 'from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400' },
    { id: 'swarm', Icon: Network, chip: 'from-sky-500/15 to-violet-500/5 text-sky-600 dark:text-sky-400' },
    { id: 'local', Icon: Server, chip: 'from-emerald-500/15 to-sky-500/5 text-emerald-600 dark:text-emerald-400' },
];

const NARRATIVE_ROWS: { id: string; Icon: LucideIcon }[] = [
    { id: 'browserUse', Icon: Globe },
    { id: 'agentBrowser', Icon: Terminal },
    { id: 'firecrawl', Icon: Flame },
];

const FILTERS: { id: Filter; labelKey: string }[] = [
    { id: 'all', labelKey: 'compare.filters.all' },
    { id: 'differences', labelKey: 'compare.filters.differences' },
    { id: 'advantages', labelKey: 'compare.filters.advantages' },
];

function matchesFilter(row: MatrixRow, filter: Filter): boolean {
    if (filter === 'all') {
        return true;
    }
    const statuses = [row.b4, row.bu, row.ab, row.fc];
    if (filter === 'differences') {
        return new Set(statuses).size > 1;
    }
    return row.b4 === 'verified' && [row.bu, row.ab, row.fc].every((status) => status !== 'verified');
}

function StatusCell({ status, highlight }: { status: Status; highlight?: boolean }) {
    const { t } = useTranslation();
    const meta = STATUS_META[status];
    const label = t(meta.labelKey);
    const desc = t(meta.descKey);

    return (
        <td
            className={clsx(
                'px-4 py-3 text-center whitespace-nowrap',
                highlight && 'bg-sky-500/[0.07] dark:bg-sky-400/[0.06]'
            )}
        >
            <div className="group relative inline-flex">
                <span
                    title={desc}
                    tabIndex={0}
                    className={clsx(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium cursor-help',
                        'outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50',
                        meta.pill
                    )}
                >
                    <meta.Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {label}
                </span>
                <span
                    role="tooltip"
                    className={clsx(
                        'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-56 rounded-xl',
                        'border border-slate-200 bg-white px-3 py-2.5 text-xs font-normal leading-relaxed text-slate-600 shadow-xl',
                        'opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100',
                        'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    )}
                >
                    {desc}
                </span>
            </div>
        </td>
    );
}

function ProductHeader({ name, accent }: { name: string; accent?: boolean }) {
    return (
        <th
            scope="col"
            className={clsx(
                'px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400',
                accent && 'bg-sky-500/10 dark:bg-sky-400/10 text-slate-900 dark:text-white'
            )}
        >
            {accent && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 align-middle" />}
            {name}
        </th>
    );
}

export default function Compare() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<Filter>('all');

    const visibleRows = useMemo(
        () => MATRIX_ROWS.filter((row) => matchesFilter(row, filter)),
        [filter]
    );

    const groups = useMemo(() => {
        const result: { group: 'basics' | 'data'; rows: MatrixRow[] }[] = [];
        (['basics', 'data'] as const).forEach((group) => {
            const rows = visibleRows.filter((row) => row.group === group);
            if (rows.length > 0) {
                result.push({ group, rows });
            }
        });
        return result;
    }, [visibleRows]);

    useEffect(() => {
        document.title = `${t('compare.title')} · Browser4`;
    }, [t]);

    const dateLabel = t('compare.snapshotDate');

    return (
        <section id="compare" className="relative overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(56,189,248,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_-10%,rgba(56,189,248,0.08),transparent_55%)]" />

            <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full mb-6">
                        <CalendarDays className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium">
                            {t('compare.badge')} · {dateLabel}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
                        Browser4 <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">{t('compare.titleSuffix')}</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-light">
                        {t('compare.subtitle')}
                    </p>
                </div>

                {/* Legend + filter */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {t('compare.legend.title')}
                        </span>
                        {(Object.keys(STATUS_META) as Status[]).map((status) => {
                            const meta = STATUS_META[status];
                            return (
                                <span
                                    key={status}
                                    title={t(meta.descKey)}
                                    className={clsx(
                                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium cursor-help',
                                        meta.pill
                                    )}
                                >
                                    <meta.Icon className="w-3.5 h-3.5" aria-hidden="true" />
                                    {t(meta.labelKey)}
                                </span>
                            );
                        })}
                    </div>

                    <div className="inline-flex self-start lg:self-auto items-center gap-1 p-1 rounded-xl border border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/80">
                        {FILTERS.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setFilter(item.id)}
                                aria-pressed={filter === item.id}
                                className={clsx(
                                    'px-3.5 py-2 rounded-lg text-sm font-medium transition',
                                    filter === item.id
                                        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                                )}
                            >
                                {t(item.labelKey)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Matrix */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[780px] text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th
                                        scope="col"
                                        className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 min-w-[180px]"
                                    >
                                        {t('compare.matrix.capability')}
                                    </th>
                                    <ProductHeader name="Browser4" accent />
                                    <ProductHeader name="browser-use" />
                                    <ProductHeader name="agent-browser" />
                                    <ProductHeader name="Firecrawl" />
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map(({ group, rows }) => (
                                    <Fragment key={group}>
                                        <tr className="bg-slate-50/80 dark:bg-slate-800/40">
                                            <th
                                                colSpan={5}
                                                scope="colgroup"
                                                className="sticky left-0 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                            >
                                                {t(`compare.matrix.group.${group}`)}
                                            </th>
                                        </tr>
                                        {rows.map((row) => (
                                            <tr
                                                key={row.id}
                                                className="border-t border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                                            >
                                                <th
                                                    scope="row"
                                                    className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-4 py-3 text-left font-medium text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 min-w-[180px] whitespace-nowrap"
                                                >
                                                    {t(`compare.rows.${row.id}`)}
                                                    {row.note && <span className="ml-0.5 text-sky-500 dark:text-sky-400">*</span>}
                                                </th>
                                                <StatusCell status={row.b4} highlight />
                                                <StatusCell status={row.bu} />
                                                <StatusCell status={row.ab} />
                                                <StatusCell status={row.fc} />
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                        <p>{t('compare.matrix.note.networkHar')}</p>
                        <p className="whitespace-nowrap">
                            {t('compare.matrix.count', { visible: visibleRows.length, total: MATRIX_ROWS.length })}
                        </p>
                    </div>
                </div>

                <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500 sm:hidden">
                    {t('compare.matrix.hint')}
                </p>

                {/* Differentiators */}
                <div className="mt-20 sm:mt-28">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{t('compare.differentiators.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-300">{t('compare.differentiators.subtitle')}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {DIFFERENTIATORS.map(({ id, Icon, chip }) => (
                            <div
                                key={id}
                                className="group rounded-2xl border border-slate-200 bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:shadow-none"
                            >
                                <div className={clsx('inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br border border-slate-200/60 dark:border-slate-700/60 mb-4', chip)}>
                                    <Icon className="w-5 h-5" aria-hidden="true" />
                                </div>
                                <h3 className="font-semibold mb-1.5">{t(`compare.differentiators.${id}.title`)}</h3>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {t(`compare.differentiators.${id}.desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* One-line narrative */}
                <div className="mt-20 sm:mt-28">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{t('compare.narrative.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-300">{t('compare.narrative.subtitle')}</p>
                    </div>
                    <div className="space-y-4">
                        {NARRATIVE_ROWS.map(({ id, Icon }) => (
                            <div
                                key={id}
                                className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 px-6 py-5 dark:border-slate-800 dark:bg-slate-900/70"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300 shrink-0">
                                        <Icon className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="font-semibold text-sm">{t(`compare.narrative.${id}.name`)}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{t(`compare.narrative.${id}.approach`)}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-sky-500/10 to-violet-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                        {t('compare.narrative.vs')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 sm:justify-end">
                                    <div className="text-left sm:text-right">
                                        <p className="font-semibold text-sm text-sky-600 dark:text-sky-400">{t('compare.narrative.browser4Angle')}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{t('compare.narrative.angleDetail')}</p>
                                    </div>
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-sky-500/15 to-violet-500/15 text-sky-600 dark:text-sky-400 shrink-0">
                                        <Bot className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product positioning */}
                <div className="mt-20 sm:mt-28">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{t('compare.products.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-300">{t('compare.products.subtitle')}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {PRODUCTS.map(({ id, href, Icon, chip }) => (
                            <a
                                key={id}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-slate-200 bg-white/70 p-6 transition hover:-translate-y-0.5 hover:border-sky-500/40 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:shadow-none"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className={clsx('inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200/60 dark:border-slate-700/60', chip)}>
                                        <Icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" aria-hidden="true" />
                                </div>
                                <p className="font-semibold">{t(`compare.products.${id}.name`)}</p>
                                <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-2">{t(`compare.products.${id}.tagline`)}</p>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {t(`compare.products.${id}.desc`)}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* How to read + sources */}
                <div className="mt-20 sm:mt-28 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Info className="w-5 h-5 text-amber-500" aria-hidden="true" />
                        <h2 className="text-lg font-semibold">{t('compare.disclaimer.title')}</h2>
                    </div>
                    <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {['item1', 'item2', 'item3'].map((key) => (
                            <li key={key} className="flex gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                                <span>{t(`compare.disclaimer.items.${key}`)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5 pt-5 border-t border-amber-500/20">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                            {t('compare.sources.title')}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{t('compare.sources.note')}</p>
                        <div className="flex flex-wrap gap-2">
                            {PRODUCTS.map(({ id, href }) => (
                                <a
                                    key={id}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 hover:border-sky-500/40 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-sky-400"
                                >
                                    {t(`compare.products.${id}.name`)}
                                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
