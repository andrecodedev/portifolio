export default function PixelLayers({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE REFINADA (SEM ARTEFATOS) */}
            <path d="M8 3L14 6L8 9L2 6L8 3Z" fill={primary} fillOpacity="0.1" />
            <path d="M12 9L13.5 10.5V13.5L8 16L2.5 13.5V10.5L12 9Z" fill={primary} fillOpacity="0.05" />

            {/* 2. CAMADAS DE TECNOLOGIA (TECH STACK - LAYERS) */}
            {/* Camada Superior (Top Layer) */}
            <path d="M8 1L14 4L8 7L2 4L8 1Z" fill={primary} />
            <path d="M8 2.5L12.5 4.5L8 6.5L3.5 4.5L8 2.5Z" fill={secondary} />
            {/* Brilho da Face Superior */}
            <path d="M8 2.5L11 4L8 5.5L5 4L8 2.5Z" fill="white" fillOpacity="0.1" />

            {/* Camada Intermediária (Mid Layer) */}
            <path d="M8 5L14 8L8 11L2 8L8 5Z" fill={primary} fillOpacity="0.7" />
            <path d="M8 6.5L12.5 8.5L8 10.5L3.5 8.5L8 6.5Z" fill={secondary} />
            <path d="M8 9L14 12L8 15L2 12L8 9Z" fill={primary} fillOpacity="0.4" />
            <path d="M8 10.5L12.5 12.5L8 14.5L3.5 12.5L8 10.5Z" fill={secondary} />

            {/* 3. DETALHES DE CONEXÃO E LUZ (METAL POLIDO) */}
            {/* Eixo Central Sutil */}
            <path d="M8 4V12" stroke={primary} strokeOpacity="0.1" strokeWidth="1" />

            {/* Reflexos Laterais */}
            <path d="M2 4L8 1L9 1.5L3 4.5L2 4Z" fill="white" fillOpacity="0.15" />
            <path d="M2 8L8 5L9 5.5L3 8.5L2 8Z" fill="white" fillOpacity="0.15" />
            <path d="M2 12L8 9L9 9.5L3 12.5L2 12Z" fill="white" fillOpacity="0.15" />
        </svg>
    );
}
