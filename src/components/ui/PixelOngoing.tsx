export default function PixelOngoing({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. JANELA DE FUDO (PILHA FANTASMA) */}
            <path d="M3 2H14V3H3V2ZM14 2H15V12H14V2ZM3 11H14V12H3V11ZM3 2H4V12H3V2Z" fill={primary} fillOpacity="0.15" />

            {/* 2. JANELA PRINCIPAL - OCLUSÃO (Tampando o fundo) */}
            <path d="M1 4H13V14H1V4Z" fill={secondary} />

            {/* 3. JANELA PRINCIPAL - CONTORNO (DETALHE FINAL) */}
            <path d="M1 4H12V5H1V4ZM12 4H13V14H12V4ZM1 14H13V15H1V14ZM1 4H2V14H1V4Z" fill={primary} />

            {/* 4. HEADER DA JANELA (STUDY INTERFACE) */}
            <path d="M2 5H12V7H2V5Z" fill={primary} fillOpacity="0.1" />
            <path d="M3 5.5H4V6.5H3V5.5ZM5 5.5H6V6.5H5V5.5Z" fill={primary} fillOpacity="0.3" />

            {/* 5. CONTEÚDO: BARRA DE PROGRESSO (EM ANDAMENTO) */}
            <path d="M3 11H11V12H3V11Z" fill={primary} fillOpacity="0.1" />
            <g className={glow ? "animate-pulse" : ""}>
                <path d="M3 11H8V12H3V11Z" fill="#FCD34D" fillOpacity="0.8" />
            </g>

            {/* 6. LINHAS DE TEXTO / SINTAXE INTERNAS */}
            <path d="M3 8H10V9H3V8ZM3 9.5H7V10.5H3V9.5Z" fill={primary} fillOpacity="0.2" />

            {/* 7. ACABAMENTO DE LUZ */}
            <path d="M11 12H12V13H11V12Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
