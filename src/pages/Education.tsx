// src/pages/Education.tsx

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Componentes de Layout
import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import FadeIn from '../components/FadeIn';

// Componentes da Seção de Educação
import EducationFilter from '../components/education/EducationFilter';
import EducationSection from '../components/education/EducationSection';

// CORREÇÃO 1: Importar o array `educationData` diretamente, não a função getEducationData.
import { educationData } from '../data/educationData';


export default function Education() {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState('all');

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
  };

  // CORREÇÃO 2: A linha `const educationData = getEducationData(t);` foi removida.
  // Os dados agora são importados diretamente e não precisam ser processados aqui.

  return (
    <div className="geral">
      <header>
        <Header />
      </header>

      <main>
        <FadeIn duration={1000}>
          {/* Título da página - Note que removi o texto de fallback,
              pois a chave deve existir no seu JSON. */}
          <Title title_3={t(" ")} />

          {/* Componente do Filtro (permanece igual) */}
          <EducationFilter
            onFilter={handleFilterChange}
            activeCategory={activeCategory}
          />

          {/* Seção de cards, recebendo o array de chaves de tradução */}
          <EducationSection
            educationData={educationData}
            activeCategory={activeCategory}
          />
        </FadeIn>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}