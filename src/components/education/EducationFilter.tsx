// src/components/Education/EducationFilter.tsx

import { useTranslation } from "react-i18next";

interface EducationFilterProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

export default function EducationFilter({ onFilter, activeCategory }: EducationFilterProps) {
  const { t } = useTranslation();

  // Defina as categorias para o filtro de educação
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
    <div className="education__filter flex justify-center flex-wrap gap-3 mb-10 select-none font-jet">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilter(cat.key)}
          // Aplica uma classe 'active' se a categoria do botão for a mesma que a categoria ativa
          className={`px-4 py-2 bg-[var(--button-bg)] cursor-pointer rounded-md text-sm transition-all duration-300 hover:bg-[var(--button-active)] ${activeCategory === cat.key ? 'active' : ''
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}