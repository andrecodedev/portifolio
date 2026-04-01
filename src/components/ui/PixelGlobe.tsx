export default function PixelGlobe({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. CIRCUNFERÊNCIA DO GLOBO (WIRE 1PX) */}
            <path d="M5 2H11V3H5V2ZM3 3H5V4H3V3ZM11 3H13V4H11V3ZM2 4H3V6H2V4ZM13 4H14V6H13V4ZM1 6H2V10H1V6ZM14 6H15V10H14V6ZM2 10H3V12H2V10ZM13 10H14V12H13V10ZM3 12H5V13H3V12ZM11 12H13V13H11V12ZM5 13H11V14H5V13Z" fill={primary} />

            {/* 2. CONTINENTES RECONHECÍVEIS (ALTA FIDELIDADE EM 16X16) */}
            {/* Américas (Norte e Sul conectadas) */}
            <path d="M3 5H5V6H4V7H5V8H4V10H3V11H2V10H3V5Z" fill={primary} fillOpacity="0.6" />

            {/* Europa e África (O centro do Mapa) */}
            <path d="M8 4H11V5H10V6H12V7H11V8H9V11H8V12H7V8H8V4Z" fill={primary} fillOpacity="0.7" />

            {/* Ásia e Micronésia (Canto direito) */}
            <path d="M12 4H14V5H13V6H14V9H13V8H12V4Z" fill={primary} fillOpacity="0.5" />

            {/* 3. GRELHA DE COORDENADAS SUTIL */}
            <path d="M8 3V13H9V3H8ZM3 8H13V9H3V8Z" fill={primary} fillOpacity="0.1" />

            {/* 4. BASE E INSTRUMENTO */}
            <path d="M7 14H9V15H7V14ZM5 15H11V16H5V15Z" fill={primary} />

            {/* 5. REFLEXO DE LUZ (ATMOSFERA) */}
            <path d="M4 3H6V4H4V3Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
