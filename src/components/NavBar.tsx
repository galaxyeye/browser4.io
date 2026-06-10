import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export const navLinks = [
    { label: 'nav.home', href: '#hero' },
    { label: 'nav.features', href: '#features' },
    { label: 'nav.capabilities', href: '#capabilities' },
    { label: 'nav.code', href: '#code-examples' },
    { label: 'nav.useCases', href: '#use-cases' },
    { label: 'nav.vision', href: '#vision' }
];

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const toggle = () => setOpen((prev) => !prev);
    const handleNavClick = () => setOpen(false);

    return (
        <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
            isDark ? 'border-white/5 bg-slate-950/80 text-white' : 'border-slate-200 bg-white/80 text-slate-900'
        }`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#hero" className="font-semibold text-xl tracking-tight">
                    Browser4
                </a>
                <nav className={`hidden md:flex items-center gap-8 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="transition hover:text-current">
                            {t(link.label)}
                        </a>
                    ))}
                </nav>
                <div className="hidden md:flex items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
                            isDark
                                ? 'border-slate-700/70 text-slate-200 hover:text-white'
                                : 'border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                        aria-label="Toggle color theme"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <a
                        href="https://github.com/platonai/browser4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-semibold text-slate-300 border border-slate-700/70 rounded-xl hover:text-white hover:border-slate-500/70"
                    >
                        {t('nav.github')}
                    </a>
                    <a
                        href="#code-examples"
                        className="px-5 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-400 hover:to-violet-400"
                    >
                        {t('nav.getStarted')}
                    </a>
                </div>
                <button
                    type="button"
                    onClick={toggle}
                    className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-700/70 text-white"
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>
            {open && (
                <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 text-sm ${
                    isDark ? 'border-white/5 bg-slate-950/95 text-slate-300' : 'border-slate-200 bg-white text-slate-600'
                }`}>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={handleNavClick} className="py-1">
                            {t(link.label)}
                        </a>
                    ))}
                    <a
                        href="#code-examples"
                        onClick={handleNavClick}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 text-white text-center font-semibold"
                    >
                        {t('nav.getStarted')}
                    </a>
                </div>
            )}
        </header>
    );
}
