export default function PixelHourglass({ className = "w-6 h-6", glow = false, color = "var(--text-primary)" }: { className?: string, glow?: boolean, color?: string }) {
    const detailColor = "var(--text-primary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. ESTRUTURA EXTERNA (MOLDURA PREMIUM) */}
            {/* Sombras de Profundidade */}
            <path d="M14 2H15V15H14V2Z" fill={detailColor} fillOpacity="0.08" />

            {/* Base e Topo */}
            <path d="M1 1H15V2H1V1ZM2 2H14V3H2V2ZM2 13H14V14H2V13ZM1 14H15V15H1V14Z" fill={detailColor} />
            <path d="M3 2H13V3H3V2Z" fill="white" fillOpacity="0.15" /> {/* Brilho superior */}

            {/* Colunas Laterais (Suporte) */}
            <path d="M2 3H3V13H2V3ZM13 3H14V13H13V3Z" fill={detailColor} />
            <path d="M3 3H4V13H3V3Z" fill="white" fillOpacity="0.05" />

            {/* 2. RECIPIENTE DE VIDRO (CURVAS PIXELADAS) */}
            {/* Vidro Externo */}
            <path d="M4 3H5V5H6V6H7V7H9V6H10V5H11V3H12V5H11V6H10V7H9V8H7V7H6V6H5V5H4V3Z" fill={detailColor} fillOpacity="0.6" />
            <path d="M4 13H5V11H6V10H7V9H9V10H10V11H11V13H12V11H11V10H10V9H9V8H7V9H6V10H5V11H4V13Z" fill={detailColor} fillOpacity="0.6" />

            {/* 3. AREIA (SISTEMA DINÂMICO) */}
            {/* Areia Superior (Diminuindo) */}
            <path d="M5 4H11V5H10V6H6V5H5V4Z" fill={color} />
            <path d="M7 6H9V7H7V6Z" fill={color} fillOpacity="0.6" />

            {/* Areia Inferior (Acumulando) */}
            <path d="M5 12H11V13H5V12ZM6 11H10V12H6V11ZM7 10H9V11H7V10Z" fill={color} />

            {/* Fluxo de Areia (Caindo) */}
            <rect className={glow ? "animate-pulse" : ""} x="7.5" y="7" width="1" height="3" fill={color} fillOpacity="0.8" />

            {/* 4. REFLEXOS DE CRISTAL (FINISHING) */}
            <path d="M4 4H5V6H4V4ZM11 11H12V13H11V11Z" fill="white" fillOpacity="0.2" />
            <path d="M5 3H6V4H5V3Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
