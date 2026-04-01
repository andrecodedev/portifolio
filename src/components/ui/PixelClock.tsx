export default function PixelClock({ className = "w-6 h-6", glow = false, color = "var(--text-primary)" }: { className?: string, glow?: boolean, color?: string }) {
    const outlineColor = "var(--text-primary)";
    const faceColor = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Contorno do Relógio (Pixel Style) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 2H11V3H13V5H14V11H13V13H11V14H5V13H3V11H2V5H3V3H5V2ZM5 3H11V4H12V5H13V11H12V12H11V13H5V12H4V11H3V5H4V4H5V3Z"
                fill={outlineColor}
            />
            {/* Mostrador do Relógio (Fundo) */}
            <path
                d="M5 4H11V5H12V6H13V10H12V11H11V12H5V11H4V10H3V6H4V5H5V4Z"
                fill={faceColor}
                fillOpacity="0.8"
            />

            {/* Ponteiros (Hands) */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M7 5H8V8.5H7V5Z" fill="#22D3EE" fillOpacity="0.8" />
                <path d="M8 8.5H11V9.5H8V8.5Z" fill="#22D3EE" fillOpacity="0.8" />
                <path d="M7.5 8H8.5V9H7.5V8Z" fill="#EF4444" fillOpacity="0.8" />
            </g>

            {/* Brilho Externo (Circunferência Colorida) */}
            <path
                d="M5 3H11V4H5V3ZM11 4H12V5H11V4ZM12 5H13V11H12V5ZM11 11H12V12H11V11ZM5 12H11V13H5V12ZM4 11H5V12H4V11ZM3 5H4V11H3V5ZM4 4H5V5H4V4Z"
                fill={glow ? color : "transparent"}
                fillOpacity="0.4"
            />
        </svg>
    );
}
