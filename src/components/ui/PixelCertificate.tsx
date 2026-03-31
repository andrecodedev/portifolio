export default function PixelCertificate({ className = "w-6 h-6", glow = false, color = "#06B6D4" }: { className?: string, glow?: boolean, color?: string }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outline */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2H14V3H15V12H14V13H1V12H0V3H1V2ZM13 3H2V12H13V3Z"
                fill="black"
                fillOpacity="0.8"
            />
            {/* Scroll/Paper body */}
            <path d="M2 3H13V12H2V3Z" fill="white" fillOpacity="0.9" />

            {/* Lines of text (placeholder) */}
            <path d="M4 5H11V6H4V5ZM4 7H11V8H4V7ZM4 9H8V10H4V9Z" fill="black" fillOpacity="0.2" />

            {/* Seal / Ribbon */}
            <path d="M10 10H14V14L12 13L10 14V10Z" fill={color} />
            <path d="M11 11H13V12H11V11Z" fill="white" fillOpacity="0.3" />
        </svg>
    );
}
