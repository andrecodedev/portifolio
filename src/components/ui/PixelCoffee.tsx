export default function PixelCoffee({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Elegant Rising Steam - Multi-toned for 'Hot' effect */}
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M6 0H7V2H6V0ZM10 1H11V3H10V1ZM8 2H9V4H8V2Z" fill="white" fillOpacity="0.4" />
                <path d="M5 1H6V2H5V1ZM9 0H10V2H9V0ZM11 2H12V3H11V2Z" fill="white" fillOpacity="0.2" />
            </g>

            {/* Mug Structure - Strong and Curvy */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 5H12V6H13V12H12V13H2V12H1V6H2V5Z"
                fill="black"
            />
            {/* Liquid Surface Level */}
            <path d="M2 6H12V7H2V6Z" fill="black" fillOpacity="0.3" />

            {/* Main Mug Body with Gradient-like Depth */}
            <path d="M2 7H12V12H2V7Z" fill={glow ? "#F97316" : "currentColor"} />
            <path d="M2 11H12V12H2V11Z" fill="black" fillOpacity="0.1" />

            {/* Premium Arched Handle */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7H15V11H12V12H16V6H12V7ZM13 7.5H14.5V10.5H13V7.5Z"
                fill="black"
            />
            <path d="M13 8H14V10H13V8Z" fill={glow ? "#FB923C" : "currentColor"} fillOpacity="0.7" />

            {/* Glass/Ceramic Highlights (High-End Reflection) */}
            <path d="M3 6H5V7H3V6Z" fill="white" fillOpacity="0.4" />
            <path d="M3 7H4V11H3V7Z" fill="white" fillOpacity="0.2" />
            <path d="M11 7H12V11H11V7Z" fill="black" fillOpacity="0.1" />

            {/* Detailed Coffee Heart Decoration (Optional/Subtle) */}
            {glow && (
                <rect x="5" y="8" width="4" height="2" fill="white" fillOpacity="0.1" />
            )}
        </svg>
    );
}
