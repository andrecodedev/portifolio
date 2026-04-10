import { useTranslation } from "react-i18next";
import FilterCarousel from "../ui/FilterCarousel";
import { HiAdjustments } from "react-icons/hi";


type ProjectFilterProps = {
  activeType: string;
  onFilter: (type: string) => void;
  isAdvancedOpen: boolean;
  onToggleAdvanced: () => void;
  isAnyFilterActive?: boolean;
};

export default function ProjectFilter({ activeType, onFilter, isAdvancedOpen, onToggleAdvanced, isAnyFilterActive }: ProjectFilterProps) {
  const { t } = useTranslation();

  const types = [
    { key: "all", label: t("ProjectFilter.todos", "Todos") },
    { key: "personal", label: t("ProjectFilter.pessoais", "Pessoais") },
    { key: "work", label: t("ProjectFilter.trabalho", "Trabalho") },
    { key: "custom", label: t("ProjectFilter.avancado", "Personalizados") },
  ];

  const categories = types.filter(t => t.key !== 'custom');
  const customTab = types.find(t => t.key === 'custom')!;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full max-w-5xl mx-auto">
      <FilterCarousel
        className="flex-1"
        onNext={() => {
          const currentIndex = categories.findIndex(t => t.key === activeType);
          if (currentIndex < categories.length - 1) {
            onFilter(categories[currentIndex + 1].key);
          }
        }}
        onPrev={() => {
          const currentIndex = categories.findIndex(t => t.key === activeType);
          if (currentIndex > 0) {
            onFilter(categories[currentIndex - 1].key);
          }
        }}
      >
        {categories.map((type) => {
          const isActive = activeType === type.key;

          return (
            <button
              key={type.key}
              onClick={() => onFilter(type.key)}
              aria-primary={isActive}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-jet text-sm cursor-pointer transition-all duration-300 whitespace-nowrap border ${isActive
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                : "bg-[var(--button-bg)] text-[var(--text-primary)] border-transparent hover:bg-[var(--button-hover)]"
                }`}
            >
              {type.label}
            </button>
          );
        })}
      </FilterCarousel>

      <button
        onClick={onToggleAdvanced}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-jet text-sm cursor-pointer transition-all duration-300 whitespace-nowrap border ${isAdvancedOpen || isAnyFilterActive
          ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
          : "bg-[var(--button-bg)] text-[var(--text-primary)] border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] hover:bg-[var(--button-hover)]"
          }`}
      >


        {customTab.label}
        <HiAdjustments className={`transition-transform duration-300 ${isAdvancedOpen ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
}
