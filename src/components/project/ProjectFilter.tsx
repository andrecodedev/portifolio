import { useTranslation } from "react-i18next";

type ProjectFilterProps = {
  activeType: string;
  onFilter: (type: string) => void;
};

export default function ProjectFilter({ activeType, onFilter }: ProjectFilterProps) {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  const types = [
    { key: "personal", label: t("ProjectFilter.pessoais") },
    { key: "work", label: t("ProjectFilter.trabalho") },
  ];

  return (
    <div className="flex justify-center gap-3 mb-8 select-none">
      {types.map((type) => (
        <button
          key={type.key}
          onClick={() => onFilter(type.key)}
          className={`px-4 py-2 rounded-md text-sm transition-all duration-300 cursor-pointer font-jet
            ${activeType === type.key
              ? 'active-premium'
              : 'bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-active)]'}
          `}
        >
          {activeType === type.key && <span className="active-premium-bg" />}
          <span className="relative z-10">{type.label}</span>
        </button>
      ))}
    </div>
  );
}
