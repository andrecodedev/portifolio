export default function PixelSchool({ className = "w-6 h-6" }: { className?: string }) {
    const primary = "var(--text-primary)";
    const secondary = "var(--bg-secondary)";

    return (
        <svg
            className={`${className}`}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. TELHADO (TRAÇO FINO) */}
            <path d="M8 1L1 5V6H15V5L8 1Z" fill={primary} />
            <path d="M8 2.2L3 5H13L8 2.2Z" fill={secondary} />

            {/* 2. ARQUITRAVE (LINHA DIGITAL) */}
            <path d="M2 6H14V7H2V6Z" fill={primary} />

            {/* 3. COLUNAS (FIO DE CABELO - 1PX) */}
            {/* 4 Colunas finas para manter a elegância */}
            <path d="M3 7H4V13H3V7ZM6 7H7V13H6V7ZM9 7H10V13H9V7ZM12 7H13V13H12V7Z" fill={primary} />

            {/* 4. BASE (CONTORNO MINIMALISTA) */}
            <path d="M1 13H15V14H1V13Z" fill={primary} />
            <path d="M0 14H16V15H0V14Z" fill={primary} />

            {/* Sombras e brilhos em 1px real */}
            <path d="M8 1H9V2H8V1Z" fill="white" fillOpacity="0.3" />
            <path d="M1 14H15V14.5H1V14Z" fill="white" fillOpacity="0.1" />
        </svg>
    );
}
