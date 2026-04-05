import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import FadeIn from '../components/FadeIn';

import EducationFilter from '../components/education/EducationFilter';
import EducationSection from '../components/education/EducationSection';
import EducationStats from '../components/education/EducationStats';
import EducationAdvancedFilters from '../components/education/EducationAdvancedFilters';

import { educationData } from '../data/educationData';

export default function Education() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [advFilters, setAdvFilters] = useState({
    search: "",
    status: [] as string[],
    modality: [] as string[],
    schools: [] as string[],
    sortBy: "newest" as "newest" | "oldest" | "hours"
  });

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
    setHasInteracted(true);
  };

  const handleClear = () => {
    setAdvFilters({ search: "", status: [], modality: [], schools: [], sortBy: "newest" });
    setActiveCategory("all");
    setHasInteracted(true);
  };

  const parseDate = (d: string) => {
    if (!d || d === 'Atual' || d === 'Present') return new Date();
    const [month, year] = d.split('/').map(Number);
    if (!year) return new Date();
    return new Date(year, month - 1);
  };

  const parseHours = (h: string, lang: string) => {
    if (!h) return 0;
    // Remove "h" and spaces
    let cleaned = h.toLowerCase().replace(/h/g, '').trim();
    // Normaliza conforme o idioma para lidar com separadores de milhar e decimal
    if (lang === 'pt' || lang === 'es') {
      // PT/ES: . é milhar, , é decimal
      cleaned = cleaned.replace(/\./g, '').replace(/,/g, '.');
    } else {
      // EN: , é milhar, . é decimal
      cleaned = cleaned.replace(/,/g, '');
    }
    return parseFloat(cleaned) || 0;
  };

  const filteredEducation = useMemo(() => {
    let list = educationData.filter(item => {
      // 1. Categoria Principal
      if (activeCategory !== 'all' && item.categoria !== activeCategory) return false;

      // 2. Busca (Curso, Escola, Tipo, Status)
      const searchTerm = advFilters.search.toLowerCase();
      if (searchTerm) {
        const normalize = (str: string) =>
          str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ").trim(); // Normal search uses single spaces

        const ns = normalize(searchTerm);
        const match =
          normalize(t(item.curso)).includes(ns) ||
          normalize(t(item.escola)).includes(ns) ||
          normalize(t(item.tipo)).includes(ns) ||
          normalize(t(item.status)).includes(ns);
        if (!match) return false;
      }

      // 3. Status
      if (advFilters.status.length > 0 && !advFilters.status.includes(t(item.status))) return false;

      // 4. Modalidade
      if (advFilters.modality.length > 0 && !advFilters.modality.includes(t(item.modalidade || ''))) return false;

      // 5. Instituições (Baseado no nome traduzido ou categoria)
      if (advFilters.schools.length > 0) {
        // Função de normalização para ignorar acentos e espaços
        const normalize = (str: string) =>
          str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "");

        const isMatch = advFilters.schools.some(s => {
          const ns = normalize(t(item.escola));
          const nf = normalize(s);

          // Tratamento especial para ETEC/FATEC (Centro Paula Souza)
          if (nf === 'etec' && ns.includes('fatec')) return true;

          return ns.includes(nf) || item.categoria === s;
        });

        if (!isMatch) return false;
      }

      return true;
    });

    // Ordenação
    const currentLang = i18n.language;
    list.sort((a, b) => {
      if (advFilters.sortBy === 'hours') {
        const hoursA = parseHours(t(a.cargaHoraria || '0'), currentLang);
        const hoursB = parseHours(t(b.cargaHoraria || '0'), currentLang);
        return hoursB - hoursA;
      }
      const dateA = parseDate(t(a.inicio));
      const dateB = parseDate(t(b.inicio));
      return advFilters.sortBy === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return list;
  }, [activeCategory, advFilters, t, i18n.language]);

  return (
    <div className="geral">
      <Header />

      <main className="flex flex-1 flex-col justify-center items-center p-4">
        {/* Título */}
        <FadeIn delay={0.10}>
          <Title title_3={t(" ")} />
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.25}>
          <EducationStats educationData={educationData} />
        </FadeIn>

        {/* Filtro Principal */}
        <FadeIn delay={0.40}>
          <EducationFilter
            onFilter={handleFilterChange}
            activeCategory={activeCategory}
            isAdvancedOpen={isAdvancedOpen}
            onToggleAdvanced={() => {
              setIsAdvancedOpen(!isAdvancedOpen);
              setHasInteracted(true);
            }}
          />
        </FadeIn>

        {/* Filtros Personalizados */}
        <EducationAdvancedFilters
          isOpen={isAdvancedOpen}
          filters={advFilters}
          setFilters={setAdvFilters}
          activeCategory={activeCategory}
          onFilterCategory={(cat) => {
            setActiveCategory(cat);
            setHasInteracted(true);
          }}
          onClear={handleClear}
        />

        {/* Cards */}
        <div className="w-full max-w-screen-xl mx-auto">
          {filteredEducation.length > 0 ? (
            <EducationSection
              educationData={filteredEducation}
              baseDelay={hasInteracted ? 0 : 0.40}
            />
          ) : (
            <FadeIn>
              <div className="py-20 text-center space-y-4">
                <div className="text-4xl opacity-20">🔍</div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] opacity-60">
                  {t("projects.no_results", "Nenhuma formação encontrada")}
                </h3>
                <p className="text-[var(--text-terceiro)] text-sm">
                  {t("projects.try_clearing", "Tente ajustar seus filtros ou pesquisar por outro termo.")}
                </p>
                <button
                  onClick={handleClear}
                  className="mt-4 px-6 py-2 bg-[var(--text-primary)]/10 text-[var(--text-primary)] rounded-full hover:bg-[var(--text-primary)]/20 transition-all font-bold text-xs uppercase tracking-widest"
                >
                  {t("AdvancedFilters.reset", "Resetar")}
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}