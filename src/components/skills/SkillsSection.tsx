import skillsData from "../../data/skillsData";

interface SkillsSectionProps {
  activeCategory: string;
}

export default function SkillsSection({ activeCategory }: SkillsSectionProps) {
  const skillsToShow = skillsData.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  if (skillsToShow.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-secondary)] font-jet">
        <p>Nenhum item encontrado para esta categoria.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 max-w-[1200px] mx-auto pt-4">
      {skillsToShow.map((skill, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-[120px] h-[120px] bg-[var(--bg-secondary-transparent)] rounded-lg shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <img src={skill.icon} alt={skill.name} className="w-[45px] h-[45px] mb-2 select-none" />
          <h1 className="text-xs font-jet">{skill.name}</h1>
        </div>
      ))}
    </div>
  );
}