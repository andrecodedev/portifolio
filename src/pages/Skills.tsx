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

  document.documentElement.lang = i18n.language;

  // A função agora apenas atualiza o estado.
  const handleFilter = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="geral">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center text-center p-4">
        <FadeIn duration={1000}>
          <Title title_4={t(" ")} />

          <SkillsStats skillsData={skillsData} />

          {/* Passamos o estado e a função para o componente de filtro */}
          <SkillsFilter
            onFilter={handleFilter}
            activeCategory={activeCategory}
          />
          <SkillsSection activeCategory={activeCategory} />
        </FadeIn>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}