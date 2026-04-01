export default function PixelCloud({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Contorno da Nuvem (Pixel Style) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4H11V5H13V6H14V11H13V12H2V11H1V7H2V6H3V5H5V4Z"
                fill="black"
            />
            {/* Preenchimento Colorido */}
            <path
                d="M5 5H11V6H13V11H2V7H3V6H5V5Z"
                fill={glow ? "#22D3EE" : "var(--text-terceiro)"}
            />
            {/* Detalhe de Volume (Luz) */}
            {glow && (
                <path
                    d="M4 6H10V7H4V6ZM11 7H12V10H11V7Z"
                    fill="white"
                    fillOpacity="0.4"
                />
            )}
        </svg>
    );
}
