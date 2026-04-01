export default function PixelStar({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Contorno da Estrela (Pixel Style) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 1H9V3H11V5H13V7H15V9H13V11H11V13H9V15H7V13H5V11H3V9H1V7H3V5H5V3H7V1ZM7 3V5H5V7H3V9H5V11H7V13H9V11H11V9H13V7H11V5H9V3H7Z"
                fill="black"
            />
            {/* Preenchimento Colorido */}
            <path
                d="M7 3H9V5H11V7H13V9H11V11H9V13H7V11H5V9H3V7H5V5H7V3Z"
                fill={glow ? "#FACC15" : "#FDE68A"}
            />
            {/* Brilho Central */}
            {glow && (
                <path
                    d="M7 6H9V10H7V6ZM6 7H10V9H6V7Z"
                    fill="white"
                    fillOpacity="0.4"
                />
            )}
        </svg>
    );
}
