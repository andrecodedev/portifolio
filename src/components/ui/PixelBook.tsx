export default function PixelBook({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    // A lighter, more vibrant fuchsia to match 'text-fuchsia-400' (#E879F9)
    const coverColor = glow ? "#E879F9" : "var(--text-terceiro)";
    const darkCoverColor = glow ? "#C026D3" : "var(--text-terceiro)"; // Fuchsia-600 for depth

    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(232,121,249,0.7)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Book Body - Outline */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 1H13V2H14V14H1V13H0V2H1V1Z"
                fill="black"
            />

            {/* Back Cover / Spine Depth */}
            <path d="M1 2H3V13H1V2Z" fill={darkCoverColor} />

            {/* Front Cover */}
            <path d="M3 2H13V13H3V2Z" fill={coverColor} />

            {/* Pages (Side view) */}
            <path d="M13 2H14V14H13V2Z" fill="white" fillOpacity="0.8" />
            <path d="M1 13H13V14H1V13Z" fill="white" fillOpacity="0.6" />

            {/* Bookmark - More delicate */}
            <path d="M5 1H7V7L6 6L5 7V1Z" fill="#FACC15" />

            {/* Cover Decoration - Minimalist lines representing a title or emblem */}
            <path d="M9 4H11V5H9V4ZM9 6H11V7H9V6ZM9 8H10V9H9V8Z" fill="black" fillOpacity="0.2" />

            {/* Shine highlight */}
            <path d="M3 2H4V13H3V2Z" fill="white" fillOpacity="0.2" />
        </svg>
    );
}
