export default function PixelCertificate({ className = "w-6 h-6", glow = false, color = "#60A5FA" }: { className?: string, glow?: boolean, color?: string }) {
    const outlineColor = "var(--text-primary)";
    const bodyColor = "var(--bg-primary)"; // Black in dark mode

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Main Thick Outline - Bold but themed */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2H14V3H15V12H14V13H1V12H0V3H1V2ZM13 3H2V12H13V3Z"
                fill={outlineColor}
                fillOpacity="0.8"
            />
            {/* Scroll/Paper body - Dark center now */}
            <path d="M2 3H13V12H2V3Z" fill={bodyColor} />

            {/* Lines of text (placeholder) - Subtly light */}
            <path d="M4 5H11V6H4V5ZM4 7H11V8H4V7ZM4 9H8V10H4V9Z" fill={outlineColor} fillOpacity="0.2" />

            {/* Seal / Ribbon - Glowing color accent */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M10 10H14V14L12 13L10 14V10Z" fill={color} />
                <path d="M11 11H13V12H11V11Z" fill="white" fillOpacity="0.3" />
            </g>
        </svg>
    );
}
