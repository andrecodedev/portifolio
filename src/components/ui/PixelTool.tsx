export default function PixelTool({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA 3D) */}
            <path d="M14 4H15V15H4V14H14V4Z" fill={primary} fillOpacity="0.08" />

            {/* 2. JANELA DE IDE (ESTILO VS CODE / DASHBOARD) */}
            {/* Moldura Principal */}
            <path d="M2 3H14V13H2V3Z" fill={primary} />
            <path d="M3 4H13V12H3V4Z" fill={secondary} />

            {/* Sidebar (Painel Lateral Esquerdo) */}
            <path d="M3 4H6V12H3V4Z" fill={primary} fillOpacity="0.15" />
            {/* Detalhes de Arquivos na Sidebar */}
            <path d="M4 6H5V7H4V6ZM4 8H5V9H4V8ZM4 10H5V11H4V10Z" fill={primary} fillOpacity="0.3" />

            {/* Área do Editor (Main Editor) */}
            {/* Tab do Editor Superior */}
            <path d="M6 4H10V5H6V4Z" fill={primary} fillOpacity="0.2" />
            <path d="M6 5H13V6H6V5Z" fill={primary} fillOpacity="0.1" />

            {/* Linhas de Código (Refinement) */}
            <path d="M7 7H11V8H7V7Z" fill={primary} fillOpacity="0.5" />
            <path d="M7 9H9V10H7V9Z" fill={primary} fillOpacity="0.4" />

            {/* Lupa / Mini-detalhe (Opcional, para indicar Ferramenta de Busca) */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M11 10H12V11H11V10Z" fill="#34D399" fillOpacity="0.8" />
            </g>

            {/* 3. REFINAMENTOS DE LUZ (METAL/GLASS) */}
            <path d="M3 4H13V5H3V4Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
