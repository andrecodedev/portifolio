import { useState } from 'react';
import ExperienceItem from './ExperienceItem';
import ExperienceFilter from './ExperienceFilter';
import AchievementsCarousel from './AchievementsCarousel';
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
    <div className="max-w-6xl mx-auto">
      {/* Filtro */}
      <ExperienceFilter onFilter={handleFilter} activeCategory={activeCategory} />

      {/* Conteúdo baseado no filtro */}
      {activeCategory === 'achievements' ? (
        // Conquistas Pessoais (Carrossel)
        <>
          <Title title_7=" " />
          <AchievementsCarousel />
        </>
      ) : (
        // Experiências Profissionais
        <>
          <Title title_2=" " />
          <div className="max-w-4xl mx-auto">
            {experienceData(t).map((item) => (
              <ExperienceItem key={item.id} data={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ExperienceSection;
