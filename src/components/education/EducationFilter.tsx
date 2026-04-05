import { useTranslation } from "react-i18next";
import FilterCarousel from "../ui/FilterCarousel";
import { HiAdjustments } from "react-icons/hi";

interface EducationFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
  isAdvancedOpen: boolean;
  onToggleAdvanced: () => void;
}

export default function EducationFilter({ onFilter, activeCategory, isAdvancedOpen, onToggleAdvanced }: EducationFilterProps) {
  const { t } = useTranslation();

  const categories = [
    { key: "all", label: t("EducationFilter.all", "Todas") },
    { key: "superior", label: t("EducationFilter.superior", "Superior") },
    { key: "tecnologia", label: t("EducationFilter.tecnologia", "Tecnologia") },
    { key: "profissionalizante", label: t("EducationFilter.profissionalizante", "Profissionalizante") },
    { key: "idioma", label: t("EducationFilter.idioma", "Idioma") },
    { key: "certificacao", label: t("EducationFilter.certificacao", "Certificações") },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full max-w-5xl mx-auto">
      <FilterCarousel
        className="flex-1"
        onNext={() => {
          const currentIndex = categories.findIndex(c => c.key === activeCategory);
          if (currentIndex < categories.length - 1) {
            onFilter(categories[currentIndex + 1].key);
          }
        }}
        onPrev={() => {
          const currentIndex = categories.findIndex(c => c.key === activeCategory);
          if (currentIndex > 0) {
            onFilter(categories[currentIndex - 1].key);
          }
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onFilter(cat.key)}
              className={`px-3 py-1.5 rounded-lg font-jet text-sm cursor-pointer transition-all duration-300 whitespace-nowrap border ${isActive
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                : "bg-[var(--button-bg)] text-[var(--text-primary)] border-transparent hover:bg-[var(--button-hover)]"
                }`}
            >
              {cat.label}
            </button>
          );
        })}
      </FilterCarousel>

      <button
        onClick={onToggleAdvanced}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-jet text-sm cursor-pointer transition-all duration-300 whitespace-nowrap border ${isAdvancedOpen
          ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
          : "bg-[var(--button-bg)] text-[var(--text-primary)] border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] hover:bg-[var(--button-hover)]"
          }`}
      >
        {t("EducationFilter.avancado", "Personalizados")}
        <HiAdjustments className={`transition-transform duration-300 ${isAdvancedOpen ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
}