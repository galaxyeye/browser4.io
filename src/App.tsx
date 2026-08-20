import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Capabilities from './components/Capabilities';
import UseCases from './components/UseCases';
import CodeExamples from './components/CodeExamples';
import Vision from './components/Vision';
import Compare from './components/Compare';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useTheme } from './theme/ThemeProvider';

function useHashRoute() {
    const [hash, setHash] = useState(() => window.location.hash);

    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return hash;
}

function App() {
    const { theme } = useTheme();
    const hash = useHashRoute();
    const isCompare = hash.startsWith('#/compare');

    useEffect(() => {
        if (isCompare) {
            window.scrollTo({ top: 0 });
            return;
        }
        if (hash && hash.length > 1) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash, isCompare]);

    return (
        <div className={theme === 'dark' ? 'min-h-screen bg-slate-950 text-white' : 'min-h-screen bg-slate-50 text-slate-900'}>
            <NavBar />
            {isCompare ? (
                <Compare />
            ) : (
                <>
                    <Hero />
                    <Features />
                    <Capabilities />
                    <CodeExamples />
                    <UseCases />
                    <Vision />
                </>
            )}
            <Footer />
        </div>
    );
}

export default App;
