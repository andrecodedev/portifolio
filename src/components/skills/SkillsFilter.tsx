import { useTranslation } from "react-i18next";

interface SkillsFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

export default function SkillsFilter({ onFilter, activeCategory }: SkillsFilterProps) {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;
  
  const categories = [
    { key: "all", label: t("SkillsFilter.todas") },
    { key: "idioma", label: t("SkillsFilter.idiomas") },
    { key: "linguagens", label: t("SkillsFilter.linguagens") },
    { key: "ferramentas", label: t("SkillsFilter.ferramentas") },
    { key: "ias", label: t("SkillsFilter.ias") },
    { key: "ides", label: t("SkillsFilter.ides") },
    { key: "metodologias", label: t("SkillsFilter.metodologias") },
    { key: "frameworks", label: t("SkillsFilter.frameworks") },
    { key: "banco-dados", label: t("SkillsFilter.bancodados") },
  ];

  return (
    <div className="skills__filter flex justify-center flex-wrap gap-3 mb-10 select-none font-jet">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilter(cat.key)}
          className={`px-4 py-2 bg-[var(--button-bg)] rounded-md text-sm transition-all duration-300 hover:bg-[var(--button-active)] ${
            activeCategory === cat.key ? 'active' : ''
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
