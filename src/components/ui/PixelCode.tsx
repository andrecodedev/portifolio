export default function PixelCode({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Contorno Terminal (Pixel Style) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2H15V13H1V2ZM14 3H2V12H14V3Z"
                fill="black"
            />

            {/* Barra de Título (Darker) */}
            <path d="M2 3H14V5H2V3Z" fill="black" fillOpacity="0.4" />

            {/* Fundo Terminal (Highlight) */}
            <path
                d="M2 5H14V12H2V5Z"
                fill={glow ? "#065F46" : "var(--bg-secondary)"}
            />

            {/* Prompt Símbolo ( > ) */}
            <path
                d="M3 6H4V7H5V8H4V9H3V8H4V7H3V6Z"
                fill={glow ? "#10B981" : "var(--text-terceiro)"}
            />

            {/* Cursor (_) Animado */}
            <rect
                className={glow ? "animate-pulse" : ""}
                x="6" y="9" width="3" height="1"
                fill={glow ? "#10B981" : "var(--text-terceiro)"}
            />
        </svg>
    );
}
