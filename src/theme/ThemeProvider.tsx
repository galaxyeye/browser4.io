import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'browser4-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getPreferredTheme(): Theme {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
    const [hasManualPreference, setHasManualPreference] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }
        return Boolean(window.localStorage.getItem(THEME_STORAGE_KEY));
    });

    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }

        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            if (!hasManualPreference) {
                setTheme(event.matches ? 'dark' : 'light');
            }
        };

        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
    }, [hasManualPreference]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
        setHasManualPreference(true);
    };

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            isDark: theme === 'dark',
            toggleTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

