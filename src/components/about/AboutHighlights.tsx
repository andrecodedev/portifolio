import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiUsers, FiTarget, FiCpu, FiRepeat, FiMessageSquare, FiCheckCircle, FiEye } from 'react-icons/fi';
import Title from '../Title';
import FilterCarousel from '../ui/FilterCarousel';

export default function AboutHighlights() {
    const { t } = useTranslation();
    const [activeItem, setActiveItem] = useState('learning');

    const items = [
        { id: 'learning', icon: <FiBookOpen size={24} /> },
        { id: 'teamwork', icon: <FiUsers size={24} /> },
        { id: 'resilience', icon: <FiTarget size={24} /> },
        { id: 'tech', icon: <FiCpu size={24} /> },
        { id: 'versatility', icon: <FiRepeat size={24} /> },
        { id: 'mentoring', icon: <FiMessageSquare size={24} /> },
        { id: 'clean_code', icon: <FiCheckCircle size={24} /> },
        { id: 'ux_vision', icon: <FiEye size={24} /> },
    ];

    const renderButtons = (isMobile: boolean) => items.map((item) => (
        <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] border transition-all duration-300 text-left cursor-pointer whitespace-nowrap overflow-hidden ${activeItem === item.id
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_8px_rgba(255,255,255,0.1)]'
                : 'bg-[var(--button-bg)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--border-gray)] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:bg-[var(--button-hover)]'
                } ${isMobile ? '' : 'w-full'}`}
        >
            <span className="shrink-0">
                {item.icon}
            </span>
            <span className="font-jet font-bold tracking-tight text-[12px] sm:text-sm">
                {t(`AboutHighlights.items.${item.id}.title`)}
            </span>
        </button>
    ));

    return (
        <section className="w-full max-w-5xl mx-auto mb-4 px-4 sm:px-6">
            <Title title_8=" " />
            <p className="text-center text-[var(--text-terceiro)] font-jet mb-8 mt-2 max-w-2xl mx-auto text-[11px] sm:text-xs opacity-80 leading-relaxed">
                {t('AboutHighlights.subtitle')}
            </p>

            {/* Versão MOBILE: Carrossel Horizontal com Setas */}
            <div className="block md:hidden mb-6">
                <FilterCarousel
                    onNext={() => {
                        const currentIndex = items.findIndex(i => i.id === activeItem);
                        if (currentIndex < items.length - 1) {
                            setActiveItem(items[currentIndex + 1].id);
                        }
                    }}
                    onPrev={() => {
                        const currentIndex = items.findIndex(i => i.id === activeItem);
                        if (currentIndex > 0) {
                            setActiveItem(items[currentIndex - 1].id);
                        }
                    }}
                >
                    {renderButtons(true)}
                </FilterCarousel>
            </div>

            <div className="flex flex-col md:flex-row gap-5 items-stretch min-h-[300px]">
                {/* Versão DESKTOP: Lista Vertical */}
                <div className="hidden md:flex md:flex-col gap-2 md:w-1/3 max-h-[420px] overflow-y-auto no-scrollbar pr-2">
                    {renderButtons(false)}
                </div>

                {/* Lado Direito: Conteúdo (Baseado no Item Ativo) */}
                <div className="flex-1 bg-[var(--bg-secondary-transparent)] border border-[var(--border)] rounded-[12px] p-6 md:p-8 relative overflow-hidden group flex items-start">
                    {/* Decoração sutil de fundo */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[var(--text-primary)] to-transparent opacity-[0.02] rounded-full -mr-24 -mt-24 transition-transform duration-1000 group-hover:scale-125" />

                    <div key={activeItem} className="fade-in relative z-10 w-full">
                        <h3 className="text-lg md:text-xl font-jet font-bold mb-4 text-[var(--text-primary)] tracking-tight">
                            {t(`AboutHighlights.items.${activeItem}.title`)}
                        </h3>
                        <div className="space-y-4">
                            {t(`AboutHighlights.items.${activeItem}.description`).split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="text-[13px] md:text-sm font-jet text-[var(--text-secondary)] leading-relaxed max-w-[70ch] text-justify md:text-left opacity-90">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
