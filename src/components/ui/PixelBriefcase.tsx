export default function PixelBriefcase({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA ARQUITETÔNICA) */}
            <path d="M12 2H13V15H4V14H12V2Z" fill={primary} fillOpacity="0.08" />

            {/* 2. EDIFÍCIO CORPORATIVO (BUSINESS / WORK PROJECTS) */}
            {/* Corpo do Prédio */}
            <path d="M4 2H12V14H4V2Z" fill={primary} />
            <path d="M5 3H11V13H5V3Z" fill={secondary} />

            {/* Detalhes de Janelas (Grid de Escritório) */}
            <path d="M6 4H7V5H6V4ZM9 4H10V5H9V4ZM6 6H7V7H6V6ZM9 6H10V7H9V6ZM6 8H7V9H6V8ZM9 8H10V9H9V8Z" fill={primary} fillOpacity="0.3" />

            {/* Janelas "Acesas" (Trabalho Ativo) */}
            <path d="M6 10H7V11H6V10ZM9 12H10V13H9V12Z" fill="white" fillOpacity="0.2" />

            {/* Entrada / Lobby */}
            <path d="M7 11H9V13H7V11Z" fill={primary} fillOpacity="0.6" />

            {/* 3. REFINAMENTOS DE LUZ (PREMIUM GLASS) */}
            <path d="M4 2H12V3H4V2Z" fill="white" fillOpacity="0.1" />
            <path d="M11 3H12V13H11V3Z" fill="white" fillOpacity="0.05" />
            <path d="M5 4H6V5H5V4Z" fill="white" fillOpacity="0.2" />
        </svg>
    );
}
