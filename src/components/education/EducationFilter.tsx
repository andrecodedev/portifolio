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
    { key: "tecnico", label: t("EducationFilter.tecnico", "Técnico") },
    { key: "bootcamp", label: t("EducationFilter.bootcamp", "Bootcamps") },
    { key: "curso", label: t("EducationFilter.curso", "Cursos") },
    { key: "formacao", label: t("EducationFilter.formacao", "Formações") },
    { key: "trilha", label: t("EducationFilter.trilha", "Trilhas") },
    { key: "certificacao", label: t("EducationFilter.certificacao", "Certificações") },
  ];

  return (
    <div className="education__filter flex justify-center flex-wrap gap-3 mb-10 select-none font-jet">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilter(cat.key)}
          // Aplica uma classe 'active' se a categoria do botão for a mesma que a categoria ativa
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