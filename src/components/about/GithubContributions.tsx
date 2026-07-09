import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Year = 'last' | 2026 | 2025 | 2024;

const GithubContributions: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedYear, setSelectedYear] = useState<Year>('last');
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark-theme'));
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const years: Year[] = ['last', 2026, 2025, 2024];
  
  // Custom theme para se integrar perfeitamente com o portfólio
  const explicitTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['var(--button-bg)', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'pt-BR', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getYearLabel = (y: Year) => {
    if (y === 'last') return i18n.language === 'en' ? 'Last Year' : 'Último Ano';
    return y.toString();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 mb-8 font-jet">
      <div className="w-full max-w-6xl py-8 px-4 sm:px-8 bg-[var(--bg-secondary-transparent)] border border-[var(--border)] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        
        <button 
          onClick={() => window.innerWidth < 1024 && setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between lg:justify-center gap-3 lg:mb-6 group focus:outline-none ${window.innerWidth < 1024 ? 'cursor-pointer' : 'cursor-default'}`}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-2 md:gap-3 text-lg md:text-2xl font-title text-[var(--text-primary)] uppercase tracking-widest">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 flex-shrink-0 w-5 h-5 md:w-6 md:h-6">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span className="text-left text-[14px] sm:text-lg md:text-2xl">{i18n.language === 'en' ? 'GitHub Activity' : 'Atividade no GitHub'}</span>
          </div>
          
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden text-[var(--text-primary)] p-1.5 md:p-2 rounded-full bg-[var(--button-bg)] flex-shrink-0 border border-[var(--border)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </button>
        
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden w-full"
            >
              <div className="pt-4 lg:pt-0">
                {/* Layout Flex: Menu de anos no mobile (topo) e desktop (direita) */}
                <div className="flex flex-col lg:flex-row gap-6 w-full items-start justify-center">
          
          {/* Menu de Anos (Mobile/Tablet) */}
          <div className="flex lg:hidden flex-wrap justify-center gap-2 w-full mb-2">
            {years.map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all duration-300 ${
                  selectedYear === y 
                    ? 'bg-[#26a641] text-white font-bold' 
                    : 'bg-[var(--button-bg)] text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--button-hover)]'
                }`}
              >
                {getYearLabel(y)}
              </button>
            ))}
          </div>

          {/* Container do Gráfico */}
          {/* A correção do overflow-x-auto com w-max mx-auto resolve o bug do lado esquerdo cortado */}
          <div className="w-full overflow-x-auto pb-4 custom-scrollbar-thin">
            <div className="w-max mx-auto px-2">
              <GitHubCalendar 
                username="andrecodedev" 
                year={selectedYear}
                colorScheme={isDarkMode ? "dark" : "light"}
                theme={explicitTheme}
                blockRadius={2}
                blockMargin={4}
                blockSize={13}
                labels={{
                  totalCount: i18n.language === 'en' 
                    ? `{{count}} contributions in ${selectedYear === 'last' ? 'the last year' : selectedYear}` 
                    : `{{count}} contribuições ${selectedYear === 'last' ? 'no último ano' : `em ${selectedYear}`}`,
                }}
                renderBlock={(block: React.ReactElement, activity: any) => (
                  <React.Fragment key={activity.date}>
                    {React.cloneElement(block, {
                      'data-tooltip-id': 'github-tooltip',
                      'data-tooltip-content': `${activity.count} ${i18n.language === 'en' ? 'contributions on' : 'contribuições em'} ${getDayName(activity.date)}`,
                    } as any)}
                  </React.Fragment>
                )}
              />
              <Tooltip 
                id="github-tooltip" 
                className="z-[15000] font-jet text-xs" 
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-gray)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  maxWidth: '220px',
                  whiteSpace: 'normal',
                  textAlign: 'center'
                }}
              />
            </div>
          </div>

          {/* Menu de Anos (Desktop) */}
          <div className="hidden lg:flex flex-col gap-2 min-w-[120px]">
            {years.map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-2 rounded-md text-xs whitespace-nowrap text-left transition-all duration-300 ${
                  selectedYear === y 
                    ? 'bg-[#26a641] text-white font-bold pl-5 border-l-4 border-[#39d353]' 
                    : 'bg-transparent text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--button-hover)] border-l-4 border-transparent'
                }`}
              >
                {getYearLabel(y)}
              </button>
            ))}
          </div>

        </div>

        {/* GitHub Readme Stats & Top Languages */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-12 justify-center items-center mt-10 w-full pt-8 border-t border-[var(--border)]">
          <img 
            src={`https://github-readme-stats-eight-theta.vercel.app/api?username=andrecodedev&show_icons=true&include_all_commits=true&count_private=true&hide_border=true&custom_title=${i18n.language === 'en' ? 'My%20GitHub%20Statistics' : 'Estatísticas%20do%20GitHub'}&locale=${i18n.language === 'en' ? 'en' : 'pt-br'}&${isDarkMode ? 'title_color=ffffff&text_color=a3a3a3&icon_color=26a641&theme=dark' : 'title_color=1f2937&text_color=4b5563&icon_color=216e39&theme=light'}&bg_color=00000000`}
            alt="GitHub Stats" 
            className="w-full max-w-[420px] transition-transform duration-300 hover:scale-[1.02] border-2 border-[var(--border)] rounded-xl"
          />
          <img 
            src={`https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=andrecodedev&layout=compact&langs_count=12&hide_border=true&custom_title=${i18n.language === 'en' ? 'Top%20Languages' : 'Linguagens%20Mais%20Usadas'}&locale=${i18n.language === 'en' ? 'en' : 'pt-br'}&${isDarkMode ? 'title_color=ffffff&text_color=a3a3a3&theme=dark' : 'title_color=1f2937&text_color=4b5563&theme=light'}&bg_color=00000000`}
            alt="Top Languages" 
            className="w-full max-w-[350px] transition-transform duration-300 hover:scale-[1.02] border-2 border-[var(--border)] rounded-xl"
          />
        </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default GithubContributions;
