export default function PixelRocket({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Contorno do Foguete (Pixel Style) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 1H9V3H10V7H11V11H12V13H10V12H9V14H7V12H6V13H4V11H5V7H6V3H7V1Z"
                fill="black"
            />
            {/* Corpo do Foguete */}
            <path d="M7 3H9V7H10V11H6V7H7V3Z" fill={glow ? "#3B82F6" : "var(--text-terceiro)"} />
            {/* Ponta (Tip) */}
            <path d="M7 2H9V3H7V2Z" fill={glow ? "#EF4444" : "var(--text-terceiro)"} />
            {/* Janela (Window) */}
            <path d="M7.5 5H8.5V6H7.5V5Z" fill="white" fillOpacity="0.8" />
            {/* Barbatanas (Fins) */}
            <path d="M5 10H6V11H5V10ZM10 10H11V11H10V10Z" fill={glow ? "#1E40AF" : "var(--text-terceiro)"} />
            {/* Fogo (Fire) animado */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M7 13H9V15H7V13Z" fill={glow ? "#F59E0B" : "var(--text-terceiro)"} />
                <path d="M7.5 15H8.5V16H7.5V15Z" fill={glow ? "#EF4444" : "var(--text-terceiro)"} />
            </g>
        </svg>
    );
}
