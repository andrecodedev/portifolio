export default function PixelMonitor({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA HARDWARE) */}
            <path d="M14 2H15V12H14V2ZM9 12V13H11V15H5V13H7V12H9ZM12 12H14V13H12V12Z" fill={primary} fillOpacity="0.08" />

            {/* 2. ESTRUTURA DO MONITOR (BLOCKY) */}
            {/* Moldura Principal */}
            <path d="M1 1H15V12H1V1Z" fill={primary} />
            <path d="M2 2H14V11H2V2Z" fill={secondary} />

            {/* 3. TERMINAL INTERNO (CONTEÚDO) */}
            {/* Linhas de Prompt (Code) */}
            <path d="M3 4H5V5H3V4ZM6 4H10V5H6V4ZM3 6H8V7H3V6ZM3 8H6V9H3V8Z" fill={primary} fillOpacity="0.3" />
            <path d="M11 9H13V10H11V9Z" fill={primary} fillOpacity="0.8" />

            {/* 4. BASE E SUPORTE */}
            <path d="M7 12H9V14H7V12ZM5 14H11V16H5V14Z" fill={primary} />

            {/* 5. REFINAMENTOS DE LUZ (GLASS) */}
            <path d="M2 2H14V3H2V2Z" fill="white" fillOpacity="0.1" />
            <path d="M13 3H14V11H13V3Z" fill="white" fillOpacity="0.05" />
        </svg>
    );
}
