// src/components/about/ExperienceFilter.tsx

import { useTranslation } from "react-i18next";


interface ExperienceFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

export default function ExperienceFilter({ onFilter, activeCategory }: ExperienceFilterProps) {
  const { t } = useTranslation();

  const categories = [
    { key: "achievements", label: t("ExperienceFilter.achievements", "Conquistas Profissionais") },
    { key: "professional", label: t("ExperienceFilter.professional", "Experiências Profissionais") },
  ];

  return (
    <div className="experience__filter-wrapper mt-16 flex flex-wrap justify-center gap-4">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilter(cat.key)}
          className={`px-6 py-2 rounded-lg font-jet cursor-pointer transition-all duration-300 ${activeCategory === cat.key
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
