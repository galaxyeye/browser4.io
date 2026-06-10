import { useTranslation } from 'react-i18next';
import type { HarvestRow, HarvestSummary } from '../lib/harvestData';

interface HarvestTableProps {
    summary: HarvestSummary;
    rows: HarvestRow[];
    title?: string;
}

export function HarvestTable({ rows }: HarvestTableProps) {
    const { t } = useTranslation();

    return (
        <section id="harvest" className="py-1">
            <div className="table w-full text-[12px]">
                <table className="table-auto w-full text-slate-700 dark:text-slate-200 whitespace-nowrap">
                     <thead>
                        <tr className="text-left border-b border-slate-200 dark:border-slate-800">
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.number')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.url')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.title')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.brand')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.stars')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.ratings')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.qa')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.fees')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.otherSellers')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.price')}</th>
                            <th className="py-1 pr-3">{t('capabilities.harvestTable.notes')}</th>
                         </tr>
                     </thead>
                     <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800/70 hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                                <td className="py-1.5 px-3 font-semibold text-slate-800 dark:text-slate-100">{row.id}</td>
                                <td className="py-1.5 px-3">
                                    <a
                                        href={row.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sky-600 dark:text-sky-300 hover:underline"
                                        title={row.urlText}
                                    >
                                        {row.urlText}
                                    </a>
                                </td>
                                <td className="py-1.5 px-3">{row.title}</td>
                                <td className="py-1.5 px-3">{row.brand ?? ''}</td>
                                <td className="py-1.5 px-3">{row.stars ?? ''}</td>
                                <td className="py-1.5 px-3">{row.ratings ?? ''}</td>
                                <td className="py-1.5 px-3">{row.questions ?? ''}</td>
                                <td className="py-1.5 px-3">{row.fees ?? ''}</td>
                                <td className="py-1.5 px-3">{row.otherSellers ?? ''}</td>
                                <td className="py-1.5 px-3">{row.price ?? ''}</td>
                                <td className="py-1.5 px-3">{row.note ?? ''}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </section>
     );
}

export default HarvestTable;
