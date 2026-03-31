export default function PixelHourglass({ className = "w-6 h-6", glow = false, color = "#A78BFA" }: { className?: string, glow?: boolean, color?: string }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(167,139,250,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Wooden/Metal Frame (Top & Bottom Bases) */}
            <path d="M2 1H14V3H2V1Z" fill="black" />
            <path d="M2 13H14V15H2V13Z" fill="black" />

            {/* Glass Container - Sides */}
            <path d="M3 3H4V5H5V6H6V7H10V6H11V5H12V3H13V5H12V6H11V7H10V8H6V7H5V6H4V5H3V3Z" fill="black" />
            <path d="M3 13H4V11H5V10H6V9H10V10H11V11H12V13H13V11H12V10H11V9H10V8H6V9H5V10H4V11H3V13Z" fill="black" />

            {/* Inner Glass Highlights (Transparent effect) */}
            <path d="M4 3H12V4H11V5H10V6H6V5H5V4H4V3Z" fill="white" fillOpacity="0.1" />
            <path d="M4 12H12V11H11V10H10V9H6V10H5V11H4V12Z" fill="white" fillOpacity="0.1" />

            {/* Sand (Top Half - empty space) */}
            <path d="M7 6H9V7H7V6Z" fill={color} fillOpacity="0.4" />

            {/* Sand (Bottom Half - accumulated) */}
            <path d="M4 11H12V13H4V11Z" fill={color} />
            <path d="M5 10H11V11H5V10Z" fill={color} fillOpacity="0.8" />
            <path d="M6 9H10V10H6V9Z" fill={color} fillOpacity="0.6" />

            {/* Flowing Sand (The middle stream) */}
            <rect x="7.5" y="7" width="1" height="2" fill={color} fillOpacity="0.7">
                {glow && <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />}
            </rect>

            {/* Gloss Highlight on the glass */}
            <path d="M4 3H5V5H4V3Z" fill="white" fillOpacity="0.3" />
            <path d="M11 11H12V13H11V11Z" fill="white" fillOpacity="0.2" />
        </svg>
    );
}
