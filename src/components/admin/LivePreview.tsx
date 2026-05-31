import { useTranslation } from 'react-i18next';
import { IoLayersOutline } from 'react-icons/io5';
import type { HeroData } from './HeroEditor';

interface LivePreviewProps {
  currentView: 'menu' | 'hero';
  previewLang: string;
  setPreviewLang: (lang: string) => void;
  heroData: HeroData;
}

export default function LivePreview({ currentView, previewLang, setPreviewLang, heroData }: LivePreviewProps) {
  const { t } = useTranslation();

  const currentTitle = previewLang === 'pt' ? heroData.titlePt : previewLang === 'es' ? heroData.titleEs : heroData.titleEn;
  const currentDesc = previewLang === 'pt' ? heroData.descPt : previewLang === 'es' ? heroData.descEs : heroData.descEn;

  return (
    <div className="w-full lg:w-2/3 bg-[var(--bg-primary)] relative lg:overflow-hidden flex flex-col transition-colors duration-300 min-h-[500px] lg:min-h-0">
      {/* BARRA DE STATUS NO TOPO */}
      <div className="p-2 sm:px-4 text-[10px] font-bold tracking-widest uppercase border-b border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors duration-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {currentView === 'hero' && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          )}
          <span>{currentView === 'hero' ? t('admin.dashboard.preview_badge') : t('admin.dashboard.waiting')}</span>
        </div>
        
        {/* Seletor de Idioma do Preview */}
        <div className="flex bg-[var(--bg-primary)] rounded-full p-0.5 border border-[var(--border)] transition-colors duration-300">
          <button 
            onClick={() => setPreviewLang('pt')} 
            className={`px-3 py-1 rounded-full text-[10px] transition-colors ${previewLang === 'pt' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)]'}`}
          >
            PT
          </button>
          <button 
            onClick={() => setPreviewLang('en')} 
            className={`px-3 py-1 rounded-full text-[10px] transition-colors ${previewLang === 'en' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)]'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setPreviewLang('es')} 
            className={`px-3 py-1 rounded-full text-[10px] transition-colors ${previewLang === 'es' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)]'}`}
          >
            ES
          </button>
        </div>
      </div>

      {currentView === 'hero' ? (
        <>
          <div className="flex-1 relative flex items-center justify-center p-8">
            <div className="text-center z-30 max-w-4xl">
               <h1 className="lux text-[1.8rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] tracking-tighter px-4 sm:px-6 text-[var(--text-primary)] transition-all duration-300 leading-tight min-h-[3rem]">
                  {currentTitle}
               </h1>
               
               {currentDesc && (
                 <p className="mt-3 sm:mt-6 text-[9px] sm:text-[10px] lg:text-xs text-[var(--text-secondary)] font-jet tracking-wide max-w-2xl mx-auto opacity-100 transition-colors duration-300 px-4">
                   {currentDesc}
                 </p>
               )}
            </div>

            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--grid-line) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </>
      ) : (
        <div className="flex-1 relative flex items-center justify-center p-8 animate-in fade-in duration-500">
          <div className="text-center z-30 max-w-sm text-[var(--text-terceiro)] flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-6 shadow-inner">
               <IoLayersOutline size={28} className="text-[var(--text-terceiro)]" />
             </div>
             <h1 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{t('admin.dashboard.empty_title')}</h1>
             <p className="text-sm opacity-80 leading-relaxed">{t('admin.dashboard.empty_desc')}</p>
          </div>
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      )}
    </div>
  );
}
