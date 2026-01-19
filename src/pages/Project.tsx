import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import FadeIn from '../components/FadeIn';
import ProjectCard from '../components/project/ProjectCard';
import { useTranslation } from 'react-i18next';

// Importar dados dos projetos
import { projectsData } from '../data/projectsData';

function Projetos() {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  return (
    <div className="geral ">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center text-center p-6">
        <FadeIn duration={1000}>
          <Title title_5={t(" ")} />
          <p>🚧🏗️📢EM CONSTRUÇÃO📢🏗️🚧</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {projectsData.map((proj) => (
              <ProjectCard
                key={proj.id}
                title={proj.title}
                imageUrl={proj.imageUrl}
                description={proj.description}
                skills={proj.skills}
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
