import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import skillsData from "../../data/skillsData";
import FadeIn from "../FadeIn";

interface SkillsSectionProps {
  activeCategory: string;
  baseDelay?: number;
}

export default function SkillsSection({
  activeCategory,
  baseDelay = 0
}: SkillsSectionProps) {
  const { t } = useTranslation();
  const skillsToShow = skillsData.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const handleSkillClick = (skillNameKey: string) => {
    const translatedName = t(skillNameKey);
    const searchQuery = t('Skills.search_query', { name: translatedName });
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener,noreferrer');
  };

  if (skillsToShow.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-secondary)] font-jet">
        <p>Nenhum item encontrado para esta categoria.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto pt-4 px-2">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 w-full">
        {skillsToShow.map((skill, index) => (
          <FadeIn
            key={`${activeCategory}-${index}`}
            delay={baseDelay + Math.floor(index / 8) * 0.08}
            duration={650}
            y={24}
            scale={0.95}
            blur={4}
          >
            <motion.div
              onClick={() => handleSkillClick(skill.name)}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              role="button"
              aria-label={`${t(skill.name)} - ${t('Skills.click_to_learn')}`}
              className="flex flex-col items-center justify-center p-3 aspect-square bg-[var(--bg-secondary-transparent)] rounded-xl border border-[var(--border)] transition-colors duration-300 group relative overflow-hidden cursor-pointer"
            >
              {/* Container da Imagem com tamanho controlado */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 mb-2 flex items-center justify-center">
                <img
                  src={skill.icon}
                  alt={t(skill.name)}
                  className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500 select-none"
                />
              </div>

              {/* Nome da Skill */}
              <h1 className="text-[10px] sm:text-xs font-jet font-bold text-[var(--text-primary)] text-center leading-tight">
                {t(skill.name)}
              </h1>

              {/* Nível da Skill (se houver) */}
              {skill.level && (
                <p className="text-[8px] sm:text-[10px] opacity-60 font-jet mt-1 text-center whitespace-nowrap">
                  {t(skill.level)}
                </p>
              )}

              {/* Overlay de "Saiba mais" no hover/toque */}
              <div className="absolute inset-0 bg-[var(--bg-secondary)]/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 ease-in-out backdrop-blur-sm pointer-events-none px-2">
                <div className="mb-1 text-[var(--text-primary)] transform group-hover:scale-110 transition-transform duration-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <span className="text-[8px] sm:text-[9px] text-[var(--text-primary)] font-jet text-center uppercase tracking-wider font-bold">
                  {t('Skills.click_to_learn')}
                </span>
              </div>

              {/* Efeito sutil de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}