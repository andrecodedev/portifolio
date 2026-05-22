import { useState } from 'react';
import ExperienceItem from './ExperienceItem';
import ExperienceFilter from './ExperienceFilter';
import AchievementsCarousel from './AchievementsCarousel';
import AboutHighlights from './AboutHighlights';
import Title from '../Title';
import { useTranslation } from 'react-i18next';
import { experienceData } from '../../data/experienceData';
import '../../styles/achievementCard.css';

function ExperienceSection() {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  const [activeCategory, setActiveCategory] = useState('achievements');

  const handleFilter = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-16 md:pb-24">
      {/* Filtro */}
      <ExperienceFilter onFilter={handleFilter} activeCategory={activeCategory} />

      {/* Conteúdo baseado no filtro */}
      <div className="mt-8 md:mt-16">
        {activeCategory === 'achievements' ? (
          // Conquistas Pessoais (Carrossel)
          <>
            <Title title_7=" " />
            <AchievementsCarousel />
          </>
        ) : activeCategory === 'professional' ? (
          // Experiências Profissionais
          <>
            <Title title_2=" " />
            <div className="max-w-4xl mx-auto px-4 md:px-0">
              {experienceData(t).map((item) => (
                <ExperienceItem
                  key={item.id}
                  data={item}
                />
              ))}
            </div>
          </>
        ) : (
          // Mergulhando nos Detalhes
          <AboutHighlights />
        )}
      </div>
    </div>
  );
}

export default ExperienceSection;
