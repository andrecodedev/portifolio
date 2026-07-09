import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const TECH_CHARS = [
    // básicos
    '0', '1', '{', '}', '/', '/>', '(', ')', ';', '[', ']', '<', '>', '&&', '||', '!=', '==',

    // JS core
    'const', 'let', 'var', 'return', 'if', 'else', 'switch', 'case', 'break',
    'async', 'await', 'try', 'catch', 'finally',
    'function', '=>', 'this', 'typeof', 'instanceof', 'new',

    // valores
    'true', 'false', 'null', 'undefined', 'NaN',

    // web / base
    'API', 'JSON', 'HTML', 'CSS', 'JS', 'DOM', 'Web',

    // frontend
    'React', 'Next', 'Vue', 'Vite', 'Tailwind', 'Sass',
    'UI', 'UX', 'SPA', 'SSR', 'CSR', 'Responsive', 'Flex', 'Grid',

    // backend
    'node', 'Express', 'REST', 'GraphQL', 'Server',
    'Auth', 'JWT', 'Middleware',

    // banco
    'SQL', 'NoSQL', 'MongoDB', 'Postgres', 'MySQL', 'Redis',

    // devops / tools
    'npm', 'yarn', 'Git', 'Docker', 'CI/CD',
    'Linux', 'Bash', 'CLI', 'Deploy', 'Vercel', 'Netlify',

    // conceitos
    'Clean Code', 'SOLID', 'DRY', 'KISS',
    'Refactor', 'Performance', 'Testing', 'Debug',

    // estilizados
    '</>', '<div>', '<script>', '404', '200 OK'
];

const GlobalCodeRain: React.FC<{ className?: string }> = ({
    className = 'fixed inset-0 pointer-events-none overflow-hidden z-[-1] select-none code-rain-container',
}) => {
    // Densidade equilibrada: 38 fluxos no desktop, 22 no mobile para manter a tela viva
    const streams = useMemo(() => {
        const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        const count = isMobile ? 22 : 38;

        return Array.from({ length: count }).map((_, i) => {
            // Cada caractere terá seu próprio percurso vertical variado
            const startY = -100 - Math.random() * 100;
            const endY = screenHeight * (0.4 + Math.random() * 0.7);
            const distance = endY - startY;

            const durationBase = 30 + Math.random() * 20;
            const speedFactor = distance / (screenHeight + 200);
            const duration = durationBase * speedFactor;

            return {
                id: i,
                left: `${Math.random() * 100}%`,
                startY,
                endY,
                duration: Math.max(duration, 12),
                char: TECH_CHARS[Math.floor(Math.random() * TECH_CHARS.length)],
                fontSize: isMobile ? 9 + Math.random() * 4 : 10 + Math.random() * 6,
                opacity: isMobile ? 0.10 + Math.random() * 0.15 : 0.15 + Math.random() * 0.25
            };
        });
    }, []);

    return (
        <div className={className} style={{ contain: 'strict' }}>
            {streams.map((stream) => (
                <motion.span
                    key={stream.id}
                    initial={{ y: stream.startY, opacity: 0 }}
                    animate={{
                        y: [stream.startY, stream.endY],
                        opacity: [0, stream.opacity, stream.opacity, 0]
                    }}
                    transition={{
                        duration: stream.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: -Math.random() * 100
                    }}
                    className="absolute font-jet text-[var(--text-terceiro)] font-medium"
                    style={{
                        left: stream.left,
                        fontSize: `${stream.fontSize}px`,
                        willChange: 'transform, opacity',
                    }}
                >
                    {stream.char}
                </motion.span>
            ))}
        </div>
    );
};

export default GlobalCodeRain;
