export default function PixelRocket({ className = "w-6 h-6", glow = false }: { className?: string, glow?: boolean }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. LAYER DE PROFUNDIDADE (SOMBRA AERODINÂMICA) */}
            <path d="M10 2V13H11V2H10ZM11 11V13H12V11H11ZM4 11V13H5V11H4Z" fill={primary} fillOpacity="0.08" />

            {/* 2. FOGUETE REFINADO (ALTA VELOCIDADE) */}
            {/* Coifa (Nose Cone) - Ainda mais afilada */}
            <path d="M8 0L9 2H7L8 0Z" fill={primary} />
            <path d="M7 2H9V4H7V2Z" fill={primary} />
            <path d="M8 0.5L8.5 2H7.5L8 0.5Z" fill="white" fillOpacity="0.3" />

            {/* Estágio 2 (Payload) */}
            <path d="M7 4H9V7H7V4Z" fill={primary} />
            <path d="M7.5 4H8.5V6H7.5V4Z" fill={secondary} />

            {/* Estágio Principal (Core Stage) */}
            <path d="M6 7H10V13H6V7Z" fill={primary} />
            <path d="M7 7H9V12H7V7Z" fill={secondary} />
            {/* Janela Central */}
            <path d="M7.5 8H8.5V9H7.5V8Z" fill={primary} fillOpacity="0.4" />

            {/* Nadadeiras Aerodinâmicas Compactas (Sleek Fins) */}
            {/* LADO ESQUERDO */}
            <path d="M5 10H6V13H4V12L5 10Z" fill={primary} />
            {/* LADO DIREITO */}
            <path d="M10 10H11L12 12V13H10V10Z" fill={primary} />

            {/* 3. SISTEMA DE PROPULSÃO EXPANDIDO (MASSIVE FIRE) */}
            {/* Base da Turbina */}
            <path d="M7 13H9V14H7V13Z" fill={primary} />

            {/* Fogo Principal (Powerful Exhaust) */}
            <path d="M6 14H10V15H6V14ZM7 15H9V16H7V15Z" fill={primary} fillOpacity="0.7" />

            {/* Brilho de Combustão de Alta Temperatura */}
            <path d="M7.5 14H8.5V15.5H7.5V14Z" fill="white" fillOpacity="0.6" />
            <path d="M7 14H7.1V15H7V14ZM8.9 14H9V15H8.9V14Z" fill="white" fillOpacity="0.2" />

            {/* 4. REFINAMENTOS DE LUZ FINAIS */}
            <path d="M6 7H6.5V13H6V7Z" fill="white" fillOpacity="0.15" />
            <path d="M9.5 7H10V13H9.5V7Z" fill={primary} fillOpacity="0.15" />
        </svg>
    );
}
