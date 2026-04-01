export default function PixelProject({ className = "w-6 h-6", glow = false, color = "var(--bg-secondary)" }: { className?: string, glow?: boolean, color?: string }) {
    const primary = "var(--text-primary)";
    const secondary = color;

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA EMPILHADA) */}
            <path d="M14 4H15V15H4V14H14V4ZM13 14H14V15H13V14Z" fill={primary} fillOpacity="0.08" />

            {/* 2. ESTRUTURA DO PROJETO (ESTILO FOLDER / STACK) */}
            {/* Aba Superior (Tab) */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M1 2H6V4H1V2Z" fill="#D946EF" />
            </g>
            <path d="M7 3H14V5H7V3Z" fill={primary} fillOpacity="0.2" />

            {/* Corpo da Pasta Principal */}
            <path d="M1 4H14V14H1V4Z" fill={primary} />
            <path d="M2 5H13V13H2V5Z" fill={secondary} />

            {/* Símbolo de Conteúdo Interno (Estrutura de Arquivos) */}
            <path d="M4 7H8V8H4V7ZM4 9H6V10H4V9ZM10 7H11V10H10V7Z" fill={primary} fillOpacity="0.3" />

            {/* 3. REFINAMENTOS DE LUZ (PREMIUM GLOSS) */}
            <path d="M1 4H14V5H1V4Z" fill="white" fillOpacity="0.15" />
            <path d="M13 5H14V13H13V5Z" fill="white" fillOpacity="0.05" />
        </svg>
    );
}
