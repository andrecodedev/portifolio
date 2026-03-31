export default function PixelSkills({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${glow ? 'scale-110' : 'hover:scale-105'}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outline */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 1H15V15H1V1ZM2 2H14V14H2V2Z"
                fill="black"
                fillOpacity="0.8"
            />
            {/* Grid of Pixels (3x3 grid) */}
            <g>
                {/* 1st Row */}
                <rect x="3" y="3" width="3" height="3" fill="currentColor" fillOpacity="0.4" />
                <rect x="7" y="3" width="3" height="3" fill="currentColor" fillOpacity="0.6" />
                <rect x="11" y="3" width="3" height="3" fill="currentColor" fillOpacity="0.4" />
                {/* 2nd Row */}
                <rect x="3" y="7" width="3" height="3" fill="currentColor" fillOpacity="0.6" />
                <rect x="7" y="7" width="3" height="3" fill="currentColor" />
                <rect x="11" y="7" width="3" height="3" fill="currentColor" fillOpacity="0.6" />
                {/* 3rd Row */}
                <rect x="3" y="11" width="3" height="3" fill="currentColor" fillOpacity="0.4" />
                <rect x="7" y="11" width="3" height="3" fill="currentColor" fillOpacity="0.6" />
                <rect x="11" y="11" width="3" height="3" fill="currentColor" fillOpacity="0.4" />
            </g>
        </svg>
    );
}
