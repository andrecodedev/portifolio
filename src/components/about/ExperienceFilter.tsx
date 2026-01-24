import { useTranslation } from "react-i18next";

interface ExperienceFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

export default function ExperienceFilter({ onFilter, activeCategory }: ExperienceFilterProps) {
  const { t } = useTranslation();

  const categories = [
    { key: "achievements", label: t("ExperienceFilter.achievements", "Conquistas Pessoais") },
    { key: "professional", label: t("ExperienceFilter.professional", "Experiências Profissionais") },
  ];

  return (
    <div className="experience__filter flex justify-center flex-wrap gap-3 mt-16 mb-6 select-none font-jet">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilter(cat.key)}
          className={`px-6 py-3 cursor-pointer rounded-md text-sm transition-all duration-300 ${activeCategory === cat.key ? 'active-premium' : 'bg-[var(--button-bg)] hover:bg-[var(--button-active)]'
            }`}
        >
          {activeCategory === cat.key && <span className="active-premium-bg" />}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
