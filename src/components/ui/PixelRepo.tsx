export default function PixelRepo({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA 3D) */}
            <path d="M14 6H15V14H14V6ZM4 14H15V15H4V14Z" fill={primary} fillOpacity="0.08" />

            {/* 2. ESTRUTURA DA PASTA (ESTILO POWER USER) */}
            {/* Aba Tab com detalhes em cinza (refinamento extra) */}
            <path d="M1 3H6V5H1V3Z" fill={primary} />
            {/* Cinza interno na aba (o detalhe pedido) */}
            <path d="M2 4H6V5H2V4Z" fill={primary} fillOpacity="0.3" />
            {/* Brilho residual na ponta da aba */}
            <path d="M2 4H3V5H2V4Z" fill="white" fillOpacity="0.3" />

            {/* Corpo da Pasta */}
            <path d="M1 5H15V14H1V5Z" fill={primary} />
            <path d="M2 6H14V13H2V6Z" fill={secondary} />

            {/* 3. LOGOTIPO "> GH" (CENTRALIZADO COM RESPIRO) */}
            {/* Símbolo do Prompt '>' */}
            <path d="M2 8H3V9H2V8ZM3 9H4V10H3V9ZM2 10H3V11H2V10Z" fill={primary} fillOpacity="0.4" />

            {/* Letra G */}
            <path d="M5 8H8V9H5V8ZM5 9H6V11H5V9ZM5 11H8V12H5V11ZM7 10H8V12H7V10Z" fill={primary} />

            {/* Letra H */}
            <path d="M9 8H10V12H9V8ZM12 8H13V12H12V8ZM10 10H12V11H10V10Z" fill={primary} />

            {/* 4. CONTEÚDO: STATUS/COMMIT PROGRESS */}
            <path d="M3 12H13V13H3V12Z" fill={primary} fillOpacity="0.1" />
            <path d="M3 12H5V13H3V12ZM9 12H10V13H9V12Z" fill={primary} fillOpacity="0.3" />

            {/* 5. REFINAMENTO DE LUZ FINAL */}
            <path d="M1 5H15V6H1V5Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
