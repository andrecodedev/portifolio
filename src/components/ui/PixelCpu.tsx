export default function PixelCpu({ className = "w-6 h-6", glow = false }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA CHIP) */}
            <path d="M14 4H15V15H4V14H14V4Z" fill={primary} fillOpacity="0.1" />

            {/* 2. PINOS (DETAILS) */}
            <path d="M3 1H5V3H3V1ZM7 1H9V3H7V1ZM11 1H13V3H11V1ZM1 3H3V5H1V3ZM1 7H3V9H1V7ZM1 11H3V13H1V11ZM3 13H5V15H3V13ZM7 13H9V15H7V13ZM11 13H13V15H11V13ZM13 3H15V5H13V3ZM13 7H15V9H13V7ZM13 11H15V13H13V11Z" fill={primary} fillOpacity="0.2" />

            {/* 3. CORPO DO PROCESSADOR */}
            <path d="M3 3H13V13H3V3Z" fill={primary} />
            <path d="M4 4H12V12H4V4Z" fill={secondary} />

            {/* 4. NÚCLEO (CORE) - REFINAMENTO DE TEXTURA */}
            <path d="M6 6H10V10H6V6Z" fill={primary} fillOpacity="0.4" />
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M7 7H9V9H7V7Z" fill="#A3E635" fillOpacity="0.8" />
            </g>
            <path d="M7 7H8V8H7V7Z" fill="white" fillOpacity="0.2" />

            {/* 5. DETALHES DE LUZ (METAL) */}
            <path d="M4 4H12V5H4V4ZM4 5H5V12H4V5Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
