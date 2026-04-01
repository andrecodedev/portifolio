export default function PixelMind({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SHADOW CIRCULAR) */}
            <path d="M7 4H9V12H7V4ZM4 7H12V9H4V7Z" fill={primary} fillOpacity="0.1" />
            <path d="M5 5H11V11H5V5Z" fill={primary} fillOpacity="0.05" />

            {/* 2. BRILHO DA INTELIGÊNCIA (STAR OF INSIGHT - REFINED PROPORTIONS) */}
            {/* Cruz Central (Dynamic Tapering) */}
            {/* Vertical */}
            <path d="M7 3H9V13H7V3Z" fill={primary} />
            <path d="M8 2H8.1V14H8V2Z" fill={primary} /> {/* Pixel tip top/bottom */}
            <path d="M8 2H9V3H8V2ZM7 2H8V3H7V2ZM8 13H9V14H8V13ZM7 13H8V14H7V13Z" fill={primary} fillOpacity="0.4" />

            {/* Horizontal */}
            <path d="M3 7H13V9H3V7Z" fill={primary} />
            <path d="M2 8H14V8.1H2V8Z" fill={primary} /> {/* Pixel tip left/right */}
            <path d="M2 7H3V9H2V7ZM13 7H14V9H13V7Z" fill={primary} fillOpacity="0.4" />

            {/* Miolo Central (3D Core) */}
            <path d="M6 6H10V10H6V6Z" fill={primary} />
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M7 7H9V9H7V7Z" fill="#A78BFA" fillOpacity="0.6" />
            </g>
            <path d="M7.5 7.5H8.5V8.5H7.5V7.5Z" fill="white" /> {/* Ponto focal máximo */}

            {/* Brilhos Orbitais (Aura de Pensamento) */}
            <path d="M5 5H6V6H5V5ZM10 5H11V6H10V5ZM5 10H6V11H5V10ZM10 10H11V11H10V10Z" fill={primary} fillOpacity="0.8" />
            <path d="M4 4H5V5H4V4ZM11 4H12V5H11V4ZM4 11H5V12H4V11ZM11 11H12V12H11V11Z" fill={primary} fillOpacity="0.2" />

            {/* 3. REFLEXOS DE ALTA FIDELIDADE */}
            <path d="M7 3H8V13H7V3Z" fill="white" fillOpacity="0.15" />
            <path d="M3 7H13V8H3V7Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
