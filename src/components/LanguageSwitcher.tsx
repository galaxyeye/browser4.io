import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('zh') ? 'en' : 'zh';
        i18n.changeLanguage(newLang);
    };

    const currentLang = i18n.language.startsWith('zh') ? '中' : 'EN';

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            className="w-11 h-11 rounded-xl border flex items-center justify-center transition border-slate-700/70 text-slate-200 hover:text-white dark:border-slate-700/70 dark:text-slate-200 dark:hover:text-white"
            aria-label="Toggle language"
            title="Toggle language"
        >
            <div className="flex items-center gap-1">
                <Languages className="w-4 h-4" />
                <span className="text-xs font-semibold">{currentLang}</span>
            </div>
        </button>
    );
}
