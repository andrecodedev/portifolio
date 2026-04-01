export default function PixelSkills({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const mainColor = "var(--text-primary)";
    const secondaryColor = "var(--text-terceiro)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Grid de Pixels (3x3 grid) - Layout Harmonizado */}
            <g>
                {/* 1st Row */}
                <rect x="3" y="3" width="3" height="3" fill={secondaryColor} fillOpacity="0.4" />
                <rect x="7" y="3" width="3" height="3" fill={mainColor} fillOpacity="0.6" />
                <rect x="11" y="3" width="3" height="3" fill={secondaryColor} fillOpacity="0.4" />

                {/* 2nd Row */}
                <rect x="3" y="7" width="3" height="3" fill={mainColor} fillOpacity="0.6" />
                <rect x="7" y="7" width="3" height="3" fill={mainColor} /> {/* Foco Central Sólido */}
                <rect x="11" y="7" width="3" height="3" fill={mainColor} fillOpacity="0.6" />

                {/* 3rd Row */}
                <rect x="3" y="11" width="3" height="3" fill={secondaryColor} fillOpacity="0.4" />
                <rect x="7" y="11" width="3" height="3" fill={mainColor} fillOpacity="0.6" />
                <rect x="11" y="11" width="3" height="3" fill={secondaryColor} fillOpacity="0.4" />
            </g>
        </svg>
    );
}
