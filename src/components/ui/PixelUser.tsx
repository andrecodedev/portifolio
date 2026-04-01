export default function PixelUser({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA RETRÔ) */}
            <path d="M14 2H15V15H4V14H14V2Z" fill={primary} fillOpacity="0.08" />

            {/* 2. DISQUETE DE ALTA FIDELIDADE (RETRO-SAVE - PROJETOS PESSOAIS) */}
            {/* Corpo Principal (Shape do Disquete) */}
            <path d="M1 1H14V14H1V1Z" fill={primary} />
            <path d="M2 2H13V13H2V2Z" fill={secondary} />

            {/* Porta de Metal (Shutter Superior) */}
            <path d="M4 1H11V6H4V1Z" fill={primary} />
            <path d="M7 2H8V5H7V2Z" fill={secondary} fillOpacity="0.7" />
            {/* Brilho Metálico no Shutter */}
            <path d="M4 1H11V2H4V1Z" fill="white" fillOpacity="0.15" />

            {/* Área da Etiqueta (Label Inferior) */}
            <path d="M3 8H12V13H3V8Z" fill="#F472B6" fillOpacity="0.4" />
            <path d="M4 9H11V10H4V9ZM4 11H9V12H4V11Z" fill={primary} fillOpacity="0.3" />

            {/* Detalhe de Proteção de Escrita (Aquele furinho no canto) */}
            <path d="M11 11H13V13H11V11Z" fill={primary} />
            <path d="M12 11.5H12.5V12.5H12V11.5Z" fill={secondary} />

            {/* 3. REFINAMENTOS DE LUZ (GLASS / PLASTIC FINISH) */}
            <path d="M1 1H14V2H1V1ZM1 2H2V14H1V2Z" fill="white" fillOpacity="0.1" />
            <path d="M13 2H14V14H13V2Z" fill={primary} fillOpacity="0.2" />
        </svg>
    );
}
