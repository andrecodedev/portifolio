import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import FadeIn from '../components/FadeIn';
import ProjectCard from '../components/project/ProjectCard';
import ProjectFilter from '../components/project/ProjectFilter';
import ProjectsStats from '../components/project/ProjectsStats';
import GlobalSupportButton from '../components/project/GlobalSupportButton';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../data/projectsData';
import { getSkillName } from '../data/skillsData';
import ProjectAdvancedFilters from '../components/project/ProjectAdvancedFilters';
import { useState, useMemo, useEffect } from 'react';

function Projetos() {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;
  const [activeType, setActiveType] = useState('all');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState({
    search: "",
    techs: [] as string[],
    years: [] as string[],
    sortBy: "newest", // 'newest', 'oldest', 'most-loved'
  });
  // Listener para likes no localStorage para filtrar em tempo real
  const [likedIds, setLikedIds] = useState<number[]>([]);
  useEffect(() => {
    const updateLikedIds = () => {
      const ids: number[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user_liked_')) {
          if (localStorage.getItem(key) === 'true') {
            ids.push(Number(key.replace('user_liked_', '')));
          }
        }
      }
      setLikedIds(ids);
    };
    updateLikedIds();
    window.addEventListener('storage', updateLikedIds);
    window.addEventListener('project-like-changed', updateLikedIds);
    return () => {
      window.removeEventListener('storage', updateLikedIds);
      window.removeEventListener('project-like-changed', updateLikedIds);
    };
  }, []);

  const handleFilter = (type: string) => {
    setActiveType(type);
    setHasInteracted(true);
  };

  const clearAllFilters = () => {
    setAdvFilters({
      search: "",
      techs: [],
      years: [],
      sortBy: "newest",
    });
  };

  const filteredProjects = useMemo(() => {
    const normalize = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return projectsData
      .filter((proj) => {
        // 1. Filtro de Tipo (Mestre)
        const matchesType = activeType === 'all' || proj.type === activeType;
        if (!matchesType) return false;

        // 2. Busca por Texto (Título ou Nome da Tech) - Inteligente (Normalizado)
        if (advFilters.search) {
          const s = normalize(advFilters.search);
          const titleMatch = normalize(proj.title).includes(s);
          const techMatch = proj.skills?.some(skill =>
            normalize(t(getSkillName(skill) || "")).includes(s)
          );
          if (!titleMatch && !techMatch) return false;
        }

        // 3. Tecnologias selecionadas (OR para melhor descoberta)
        if (advFilters.techs.length > 0) {
          const hasAnyTech = advFilters.techs.some(tUrl => proj.skills?.includes(tUrl));
          if (!hasAnyTech) return false;
        }

        // 4. Filtro de Ano (Multi-seleção)
        if (advFilters.years.length > 0) {
          const yearMatch = advFilters.years.some(y => proj.date?.startsWith(y));
          if (!yearMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (advFilters.sortBy === 'most-loved') {
          return (b.likes || 0) - (a.likes || 0);
        }
        if (advFilters.sortBy === 'least-loved') {
          return (a.likes || 0) - (b.likes || 0);
        }
        if (advFilters.sortBy === 'oldest') {
          const dateA = a.date || '9999-99';
          const dateB = b.date || '9999-99';
          return dateA.localeCompare(dateB);
        }
        // Default: Newest
        const dateA = a.date || '0000-00';
        const dateB = b.date || '0000-00';
        return dateB.localeCompare(dateA);
      });
  }, [activeType, advFilters, likedIds, t]);

  return (
    <div className="geral">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center text-center p-6">
        {/* Título: aparece primeiro */}
        <FadeIn delay={0.10}>
          <Title title_5={t("page_titles.projects")} />
        </FadeIn>

        {/* Stats: aparece depois do título */}
        <FadeIn delay={0.25}>
          <ProjectsStats projectsData={projectsData} />
        </FadeIn>

        {/* Filtro: aparece depois dos stats */}
        <FadeIn delay={0.40}>
          <ProjectFilter
            activeType={activeType}
            onFilter={handleFilter}
            isAdvancedOpen={isAdvancedOpen}
            onToggleAdvanced={() => setIsAdvancedOpen(!isAdvancedOpen)}
          />
        </FadeIn>

        {/* Painel Avançado */}
        <ProjectAdvancedFilters
          isVisible={isAdvancedOpen}
          activeType={activeType}
          onFilterCategory={handleFilter}
          filters={advFilters}
          setFilters={setAdvFilters}
          onClear={clearAllFilters}
        />



        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((proj, index) => (
              <FadeIn key={`${activeType}-${proj.id}`} delay={(hasInteracted ? 0 : 0.55) + Math.floor(index / 3) * 0.08} duration={650}>
                <ProjectCard
                  {...proj}
                />
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full">
              <FadeIn>
                <div className="py-20 text-center space-y-4">
                  <div className="text-4xl opacity-20">🔍</div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] opacity-60">
                    {t("projects.no_results", "Nenhum projeto encontrado")}
                  </h3>
                  <p className="text-[var(--text-terceiro)] text-sm">
                    {t("projects.try_clearing", "Tente ajustar seus filtros ou pesquisar por outro termo.")}
                  </p>
                  <button
                    onClick={() => setAdvFilters({ search: "", techs: [], years: [], sortBy: "newest" })}
                    className="mt-4 px-6 py-2 bg-[var(--text-primary)]/10 text-[var(--text-primary)] rounded-full hover:bg-[var(--text-primary)]/20 transition-all font-bold text-xs uppercase tracking-widest"
                  >
                    {t("AdvancedFilters.reset", "Resetar")}
                  </button>
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </main>
      <GlobalSupportButton />
      <Footer />
    </div>
  );
}

export default Projetos;
