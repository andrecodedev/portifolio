import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import FadeIn from '../components/FadeIn';
import ProjectCard from '../components/project/ProjectCard';
import ProjectFilter from '../components/project/ProjectFilter';
import ProjectsStats from '../components/project/ProjectsStats';
import { useTranslation } from 'react-i18next';

// Importar dados dos projetos
import { projectsData } from '../data/projectsData';

import { useState } from 'react';

// Removido: projetos de trabalho agora estão em projectsData.ts

function Projetos() {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;
  const [activeType, setActiveType] = useState('personal');

  // Filtra projetos conforme tipo
  const filteredProjects = projectsData.filter((proj) => proj.type === activeType);

  return (
    <div className="geral ">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center text-center p-6">
        <FadeIn duration={1000}>
          <Title title_5={t("page_titles.projects")} />

          <ProjectsStats projectsData={projectsData} />

          <ProjectFilter activeType={activeType} onFilter={setActiveType} />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                title={proj.title}
                imageUrl={proj.imageUrl}
                description={proj.description}
                skills={proj.skills}
                repoUrl={proj.repoUrl}
                siteUrl={proj.siteUrl}
              />
            ))}
          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

export default Projetos;
