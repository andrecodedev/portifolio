export default function PixelProject({ className = "w-6 h-6", glow = false, color = "#F59E0B" }: { className?: string, glow?: boolean, color?: string }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outline */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2H6V3H7V4H14V5H15V12H14V13H1V12H0V3H1V2ZM14 5H7V12H14V5Z"
                fill="black"
                fillOpacity="0.8"
            />
            {/* Folder Front */}
            <path d="M1 4H6V5H7V12H1V4Z" fill={color} />
            <path d="M7 5H14V12H7V5Z" fill={color} fillOpacity="0.75" />

            {/* Code Symbol (Placeholder) */}
            <path d="M8 7L9 8L8 9M11 7L10 8L11 9" stroke="black" strokeOpacity="0.4" strokeWidth="1" />

            {/* Gloss on Front */}
            <path d="M2 5H5V6H2V5Z" fill="white" fillOpacity="0.2" />
        </svg>
    );
}
