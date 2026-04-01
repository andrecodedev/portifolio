export default function PixelBook({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    // Body is dark, outline is light but subtle
    const coverColor = "var(--bg-primary)"; // Same as background
    const darkCoverColor = "var(--bg-elements)";
    const outlineColor = "var(--text-primary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Main Outline - Visible and Techy */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 1H13V2H14V14H1V13H0V2H1V1Z"
                fill={outlineColor}
                fillOpacity="0.8"
            />

            {/* Back Cover / Spine Depth (Dark Grayish) */}
            <path d="M1 2H3V13H1V2Z" fill={darkCoverColor} />

            {/* Front Cover (Deep Black like the background) */}
            <path d="M3 2H13V13H3V2Z" fill={coverColor} />

            {/* Pages (Subtle indicator) */}
            <path d="M13 2H14V14H13V2Z" fill={outlineColor} fillOpacity="0.2" />
            <path d="M1 13H13V14H1V13Z" fill={outlineColor} fillOpacity="0.1" />

            {/* Bookmark - Using a subtle red accent as requested */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M4.5 1H6.5V7L5.5 6L4.5 7V1Z" fill="#F87171" fillOpacity="0.8" />
            </g>

            {/* Minimal Detail Lines */}
            <path d="M8 4.5H11V5.5H8V4.5ZM8 6.5H11V7.5H8V6.5Z" fill={outlineColor} fillOpacity="0.3" />

            {/* Shine highlight */}
            <path d="M3.5 2H4.5V13H3.5V2Z" fill="white" fillOpacity="0.05" />
        </svg>
    );
}
