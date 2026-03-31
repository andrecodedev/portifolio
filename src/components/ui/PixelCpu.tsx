export default function PixelCpu({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(163,230,53,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Pinos (Pins) em volta do chip */}
            <path
                d="M3 1H5V3H3V1ZM7 1H9V3H7V1ZM11 1H13V3H11V1ZM1 3H3V5H1V3ZM1 7H3V9H1V7ZM1 11H3V13H1V11ZM3 13H5V15H3V13ZM7 13H9V15H7V13ZM11 13H13V15H11V13ZM13 3H15V5H13V3ZM13 7H15V9H13V7ZM13 11H15V13H13V11Z"
                fill={glow ? "#A3E635" : "var(--text-terceiro)"}
                fillOpacity="0.6"
            />

            {/* Corpo do Chip (Pixel Style) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 3H13V13H3V3Z"
                fill="black"
            />
            {/* Núcleo do Chip (Refined) */}
            <path
                d="M4 4H12V12H4V4Z"
                fill={glow ? "#A3E635" : "var(--text-terceiro)"}
                fillOpacity="0.8"
            />
            {/* Detalhe do Circuito Interno */}
            {glow && (
                <path
                    d="M6 6H10V10H6V6ZM7 7H9V9H7V7Z"
                    fill="black"
                    fillOpacity="0.4"
                />
            )}
        </svg>
    );
}
