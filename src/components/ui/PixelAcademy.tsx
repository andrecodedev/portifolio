export default function PixelAcademy({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA DO EQUIPAMENTO) */}
            <path d="M15 5V14H2V13H15V5Z" fill={primary} fillOpacity="0.08" />

            {/* 2. ESTRUTURA DO NOTEBOOK (ESTILO CLÁSSICO PARA RECONHECIMENTO) */}
            {/* TELA (MOLTURA FRONTAL) */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 1H15V11H1V1ZM14 2H2V10H14V2Z"
                fill={primary}
            />
            <path d="M2 2H14V10H2V2Z" fill={secondary} />

            {/* Brilho do Vidro da Tela */}
            <path d="M2.5 2H13.5V3H2.5V2ZM2 2H3V10H2V2Z" fill="white" fillOpacity="0.1" />

            {/* DOBRADIÇA ROBUSTA (O ELON ENTRE TELA E BASE) */}
            <path d="M1 10H15V11H1V10Z" fill={primary} />

            {/* BASE DO NOTEBOOK (ABERTO - MAIS LARGA QUE A TELA) */}
            {/* Esta silhueta é essencial para o reconhecimento visual do laptop */}
            <path d="M0 11H16V14H0V11ZM1 14H15V15H1V14Z" fill={primary} />

            {/* TECLADO COM DETALHES (KEYBOARD DETAILS) */}
            {/* Fileira Superior de Teclas */}
            <path d="M2 11.5H3V12H2V11.5ZM4 11.5H5V12H4V11.5ZM6 11.5H7V12H6V11.5ZM9 11.5H10V12H9V11.5ZM11 11.5H12V12H11V11.5ZM13 11.5H14V12H13V11.5Z" fill={secondary} fillOpacity="0.4" />
            {/* Fileira Inferior com Barra de Espaço */}
            <path d="M2 12.5H3V13H2V12.5ZM4 12.5H5V13H4V12.5ZM6 12.5H10V13.5H6V12.5ZM11 12.5H12V13H11V12.5ZM13 12.5H14V13H13V12.5Z" fill={secondary} fillOpacity="0.6" />

            {/* 3. LOGOTIPO ACADÊMICO NA TELA: CHAPÉU DE GRADUAÇÃO */}
            <g className={glow ? "animate-pulse" : ""}>
                {/* Rhombus (O topo do Cap) - Subtle Professional Indigo */}
                <path d="M5 5L8 4L11 5L8 6L5 5Z" fill="#818CF8" fillOpacity="0.8" />
                {/* Base e Tassel (O Pompom) - Subtle Gold Accent */}
                <path d="M6.5 6H9.5V7H6.5V6Z" fill="#FCD34D" fillOpacity="0.5" />
                <path d="M11 5V8H12V8.5H10V8H11V5Z" fill="#FCD34D" fillOpacity="0.7" />
            </g>

            {/* 4. REFINAMENTO FINAL (ILUMINAÇÃO DE METAL) */}
            <path d="M0 11H16V11.5H0V11Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
