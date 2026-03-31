export default function PixelHeart({ className = "w-6 h-6", filled = false }: { className?: string, filled?: boolean }) {
    return (
        <svg
            className={`${className} transition-all duration-300 ${filled ? 'scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]' : 'hover:scale-105'}`}
            viewBox="0 0 13 13"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. CONTORNO EXTERNO (PRETO) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 1H5V2H8V1H10V2H11V3H12V6H11V7H10V8H9V9H8V10H7V11H6V10H5V9H4V8H3V7H2V6H1V3H2V2H3V1Z"
                fill="black"
            />

            {/* 2. PREENCHIMENTO (VERMELHO OU CINZA ADAPTÁVEL) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 2H5V3H8V2H10V3H11V6H10V7H9V8H8V9H7V10H6V9H5V8H4V7H3V6H2V3H3V2Z"
                /* Usando sua variável nativa --text-terceiro para o estado inativo */
                fill={filled ? "#FF0040" : "var(--text-terceiro)"}
            />

            {/* 3. BRILHO SUPERIOR QUANDO ATIVO */}
            {filled && (
                <path
                    d="M3 3H5V4H3V3ZM10 3H11V4H10V3Z"
                    fill="white"
                    fillOpacity="0.4"
                />
            )}
        </svg>
    );
}
