// src/components/project/ProjectFilter.tsx

import { useTranslation } from "react-i18next";


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
    <div className="project__filter-wrapper flex flex-wrap justify-center gap-4 mb-8">
      {types.map((type) => (
        <button
          key={type.key}
          onClick={() => onFilter(type.key)}
          className={`px-6 py-2 rounded-lg font-jet cursor-pointer transition-all duration-300 ${activeType === type.key
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]"
            }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
