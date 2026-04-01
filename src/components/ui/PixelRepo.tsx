export default function PixelRepo({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. SOMBRA 3D */}
            <path d="M14 6H15V14H14V6ZM4 14H15V15H4V14Z" fill={primary} fillOpacity="0.08" />

            {/* 2. ESTRUTURA DA PASTA */}
            <path d="M1 3H6V5H1V3Z" fill={primary} />
            <path d="M2 4H6V5H2V4Z" fill={primary} fillOpacity="0.3" />

            {/* Corpo */}
            <path d="M1 5H15V14H1V5Z" fill={primary} />
            <path d="M2 6H14V13H2V6Z" fill={secondary} />

            {/* 3. LOGOTIPO "> GH" */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M2 8H3V9H2V8ZM3 9H4V10H3V9ZM2 10H3V11H2V10Z" fill={primary} fillOpacity="0.4" />
                <path d="M5 8H8V9H5V8ZM5 9H6V11H5V9ZM5 11H8V12H5V11ZM7 10H8V12H7V10Z" fill="#2DD4BF" fillOpacity="0.8" />
                <path d="M9 8H10V12H9V8ZM12 8H13V12H12V8ZM10 10H12V11H10V10Z" fill="#2DD4BF" fillOpacity="0.8" />
            </g>

            {/* 4. REFINAMENTO */}
            <path d="M1 5H15V6H1V5Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
