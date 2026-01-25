import { useTranslation } from "react-i18next";
import FilterCarousel from "../ui/FilterCarousel";


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
    <FilterCarousel className="mt-8">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilter(cat.key)}
          className={`px-3 py-1.5 rounded-lg font-jet text-sm cursor-pointer transition-all duration-300 whitespace-nowrap ${activeCategory === cat.key
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </FilterCarousel>
  );
}
