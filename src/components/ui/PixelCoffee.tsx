export default function PixelCoffee({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const mugColor = "var(--bg-secondary)";
    const outlineColor = "var(--text-primary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. STEAM - Centered and Suspended */}
            <g className={glow ? "animate-pulse" : ""}>
                {/* Left Wisp (Centered at x=5,6) */}
                <path d="M5 0H6V1H5V0ZM6 1H7V3H6V1ZM5 3H6V5H5V3Z" fill={outlineColor} fillOpacity="0.4" />
                {/* Right Wisp (Centered at x=8,9) */}
                <path d="M8 1H9V2H8V1ZM9 2H10V4H9V2ZM8 4H9V5H8V4Z" fill={outlineColor} fillOpacity="0.2" />
            </g>

            {/* 2. MUG DEPTH (Interior & Rim) */}
            {/* Inner Coffee Shadow (The "redondinha" part) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6H11V7H12V8H11V9H10L9 10H5L4 9H3V8H2V7H3V6Z"
                fill={outlineColor}
                fillOpacity="0.15"
            />
            {/* Deep Interior (Center) */}
            <path d="M4 7H10V8H9L8 9H6L5 8H4V7Z" fill={outlineColor} fillOpacity="0.25" />

            {/* 3. MUG EXTERIOR STRUCTURE */}
            {/* Outline with Curved Base */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 6H12V9L11 10L10 11L9 12H5L4 11L3 10L2 9V6ZM3 7V9L4 10L5 11H9L10 10L11 9V7H3Z"
                fill={outlineColor}
            />

            {/* Main Ceramic Body (Front) */}
            <path
                d="M3 8H11V9L10 10H4L3 9V8Z"
                fill={mugColor}
            />

            {/* Ceramic Highlights / Roundness */}
            <path d="M3 7H4V9L3 8V7Z" fill="white" fillOpacity="0.2" />
            <path d="M10 7H11V9L10 8V7Z" fill="black" fillOpacity="0.1" />

            {/* 4. HANDLE - More Rounded */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7H14V8H15V10H14V11H12V10H14V8H12V7Z"
                fill={outlineColor}
            />
            <path d="M13 8.5H14V9.5H13V8.5Z" fill={mugColor} fillOpacity="0.4" />

            {/* 5. SAUCER (The Base) */}
            <path d="M2 13H12V14H2V13Z" fill={outlineColor} />
            <path d="M4 14H10V15H4V14Z" fill={outlineColor} fillOpacity="0.6" />
        </svg>
    );
}
