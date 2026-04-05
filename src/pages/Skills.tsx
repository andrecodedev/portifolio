import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import SkillsFilter from "../components/skills/SkillsFilter";
import SkillsSection from "../components/skills/SkillsSection";
import SkillsStats from "../components/skills/SkillsStats";
import skillsData from "../data/skillsData";
import { useTranslation } from "react-i18next";
import FadeIn from "../components/FadeIn";

export default function Skills() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [hasInteracted, setHasInteracted] = useState(false);

  document.documentElement.lang = i18n.language;

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    setHasInteracted(true);
  };

  return (
    <div className="geral">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center text-center p-4">
        {/* Título: aparece primeiro */}
        <FadeIn delay={0.10}>
          <Title title_4={t(" ")} />
        </FadeIn>

        {/* Stats: aparece depois do título */}
        <FadeIn delay={0.25}>
          <SkillsStats skillsData={skillsData} />
        </FadeIn>

        {/* Filtro: aparece depois dos stats */}
        <FadeIn delay={0.40}>
          <SkillsFilter
            onFilter={handleFilter}
            activeCategory={activeCategory}
          />
        </FadeIn>

        {/* Instrução de busca */}
        <FadeIn delay={0.50}>
          <p className="text-center text-[var(--text-terceiro)] font-jet mb-4 max-w-2xl mx-auto text-[11px] sm:text-xs px-4 opacity-80 leading-relaxed">
            {t("Skills.search_instruction")}
          </p>
        </FadeIn>

        {/* Cards */}
        <SkillsSection activeCategory={activeCategory} baseDelay={hasInteracted ? 0 : 0.65} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}