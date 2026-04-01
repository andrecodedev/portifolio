export default function PixelCode({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const outlineColor = "var(--text-primary)";
    const screenColor = "var(--bg-primary)";
    const textColor = "var(--text-primary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Contorno Terminal */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2H15V13H1V2ZM14 3H2V12H14V3Z"
                fill={outlineColor}
            />

            {/* Barra de Título */}
            <path d="M2 3H14V5H2V3Z" fill={outlineColor} fillOpacity="0.2" />

            {/* Fundo Terminal */}
            <path
                d="M2 5H14V12H2V5Z"
                fill={screenColor}
            />

            {/* Prompt Símbolo ( > ) */}
            <path
                d="M3 6H4V7H5V8H4V9H3V8H4V7H3V6Z"
                fill="#34D399" fillOpacity="0.6"
            />

            {/* Cursor (_) Animado */}
            <rect
                className={glow ? "animate-pulse" : ""}
                x="6" y="9" width="3" height="1"
                fill="#34D399" fillOpacity={glow ? "1" : "0.8"}
            />
        </svg>
    );
}
