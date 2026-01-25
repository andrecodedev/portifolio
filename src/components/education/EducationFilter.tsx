import { useTranslation } from "react-i18next";
import FilterCarousel from "../ui/FilterCarousel";

interface EducationFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

export default function EducationFilter({ onFilter, activeCategory }: EducationFilterProps) {
  const { t } = useTranslation();

  const categories = [
    { key: "all", label: t("EducationFilter.all", "Todas") },
    { key: "superior", label: t("EducationFilter.superior", "Superior") },
    { key: "profissionalizante", label: t("EducationFilter.profissionalizante", "Profissionalizante") },
    { key: "idioma", label: t("EducationFilter.idioma", "Idioma") },
    { key: "dio.io", label: t("EducationFilter.dio.io", "DIO.IO") },
    { key: "alura", label: t("EducationFilter.alura", "Alura") },
    { key: "onebitcode", label: t("EducationFilter.onebitcode", "OneBitCode") },
    { key: "certificacao", label: t("EducationFilter.certificacao", "Certificações") },
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