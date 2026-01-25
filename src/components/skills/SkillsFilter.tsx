import { useTranslation } from "react-i18next";
import FilterCarousel from "../ui/FilterCarousel";


interface SkillsFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

export default function SkillsFilter({ onFilter, activeCategory }: SkillsFilterProps) {
  const { t } = useTranslation();

  const categories = [
    { key: "all", label: t("SkillsFilter.todas", "Todas") },
    { key: "idioma", label: t("SkillsFilter.idiomas", "Idiomas") },
    { key: "linguagens", label: t("SkillsFilter.linguagens", "Tecnologias") },
    { key: "ferramentas", label: t("SkillsFilter.ferramentas", "Ferramentas") },
    { key: "ias", label: t("SkillsFilter.ias", "IAs") },
    { key: "ides", label: t("SkillsFilter.ides", "IDEs") },
    { key: "metodologias", label: t("SkillsFilter.metodologias", "Metodologias") },
    { key: "frameworks", label: t("SkillsFilter.frameworks", "Frameworks") },
    { key: "banco-dados", label: t("SkillsFilter.bancodados", "Banco de Dados") },
  ];

  return (
    <FilterCarousel className="mb-6">
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
