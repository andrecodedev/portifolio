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
          <div className="flex flex-1 flex-col justify-center items-center text-center px-4 py-6 sm:px-8 lg:px-16">
            <h2 className="text-[3rem] mb-1 mt-1 font-medium text-start font-extrabold bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
              {t('ExperienceFilter.achievements', 'Conquistas Pessoais')}
            </h2>
          </div>
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
