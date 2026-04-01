export default function PixelCalendar({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. SOMBRA EXTERNA */}
            <path d="M14 4H15V15H14V4ZM3 15H15V16H3V15Z" fill={primary} fillOpacity="0.1" />

            {/* 2. ARRAMES SUPERIORES */}
            <path d="M4 0H5V3H4V0ZM11 0H12V3H11V0Z" fill={primary} />
            <path d="M4 0H5V1H4V0ZM11 0H12V1H11V0Z" fill="white" fillOpacity="0.4" />

            {/* 3. CORPO DO CALENDÁRIO */}
            <path d="M2 3H14V15H2V3Z" fill={primary} />
            <path d="M3 4H13V14H3V4Z" fill={secondary} />

            {/* 4. CABEÇALHO (BANNER DE MÊS) */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M3 4H13V7H3V4Z" fill="#F87171" fillOpacity="0.3" />
            </g>

            {/* 5. GRADE E DIA DE DESTAQUE */}
            <path d="M5 9H6V10H5V9ZM8 9H9V10H8V9ZM11 9H12V10H11V9ZM5 11H6V12H5V11ZM8 11H9V12H8V11Z" fill={primary} fillOpacity="0.2" />

            <g className={glow ? "animate-pulse" : ""}>
                <path d="M11 11H12V12H11V11Z" fill="#60A5FA" fillOpacity="0.8" />
                <path d="M11 11H11.5V11.5H11V11Z" fill="white" fillOpacity="0.3" />
            </g>

            {/* 6. DETALHE DA DOBRA */}
            <path d="M13 14H14V15H13V14Z" fill={primary} />
        </svg>
    );
}
