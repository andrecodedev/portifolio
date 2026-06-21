import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ReadingProgress() {
    const [width, setWidth] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            // Evitar divisão por zero em páginas curtas
            if (documentHeight <= windowHeight) {
                setWidth(0);
                return;
            }

            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            setWidth(scrollPercent);
        };

        // Resetar e recalcular imediatamente ao mudar de rota
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
            <div
                className="h-full bg-[var(--text-primary)] shadow-[0_0_10px_var(--text-primary)]"
                style={{ width: `${width}%` }}
            />
        </div>
    );
}
