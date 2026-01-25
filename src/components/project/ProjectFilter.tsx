import { useTranslation } from "react-i18next";
import FilterCarousel from "../ui/FilterCarousel";


type ProjectFilterProps = {
  activeType: string;
  onFilter: (type: string) => void;
};

export default function ProjectFilter({ activeType, onFilter }: ProjectFilterProps) {
  const { t } = useTranslation();

  const types = [
    { key: "personal", label: t("ProjectFilter.pessoais", "Pessoais") },
    { key: "work", label: t("ProjectFilter.trabalho", "Trabalho") },
  ];

  return (
    <FilterCarousel className="mb-6">
      {types.map((type) => (
        <button
          key={type.key}
          onClick={() => onFilter(type.key)}
          className={`px-3 py-1.5 rounded-lg font-jet text-sm cursor-pointer transition-all duration-300 whitespace-nowrap ${activeType === type.key
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]"
            }`}
        >
          {type.label}
        </button>
      ))}
    </FilterCarousel>
  );
}
