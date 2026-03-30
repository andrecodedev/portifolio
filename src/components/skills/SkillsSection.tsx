import { useTranslation } from "react-i18next";
import skillsData from "../../data/skillsData";

interface SkillsSectionProps {
  activeCategory: string;
}

export default function SkillsSection({ activeCategory }: SkillsSectionProps) {
  const { t } = useTranslation();
  const skillsToShow = skillsData.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

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
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 aspect-square bg-[var(--bg-secondary-transparent)] rounded-xl border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden"
          >
            {/* Container da Imagem com tamanho controlado */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 mb-2 flex items-center justify-center">
              <img
                src={skill.icon}
                alt={t(skill.name)}
                className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 select-none"
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

            {/* Efeito sutil de brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}