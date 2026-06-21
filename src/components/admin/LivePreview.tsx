import { useTranslation } from 'react-i18next';
import { IoLayersOutline, IoPersonOutline } from 'react-icons/io5';
import type { HeroData } from './HeroEditor';
import type { AboutHeroData } from './AboutHeroEditor';

interface LivePreviewProps {
  currentView: 'menu' | 'hero' | 'about';
  previewLang: string;
  setPreviewLang: (lang: string) => void;
  heroData: HeroData;
  aboutHeroData: AboutHeroData;
}

export default function LivePreview({ currentView, previewLang, setPreviewLang, heroData, aboutHeroData }: LivePreviewProps) {
  const { t } = useTranslation();

  const currentTitle = previewLang === 'pt' ? heroData.titlePt : previewLang === 'es' ? heroData.titleEs : heroData.titleEn;
  const currentDesc = previewLang === 'pt' ? heroData.descPt : previewLang === 'es' ? heroData.descEs : heroData.descEn;

  const aboutTitle = previewLang === 'pt' ? aboutHeroData.titlePt : previewLang === 'es' ? aboutHeroData.titleEs : aboutHeroData.titleEn;
  const aboutSubtitle = previewLang === 'pt' ? aboutHeroData.subtitlePt : previewLang === 'es' ? aboutHeroData.subtitleEs : aboutHeroData.subtitleEn;
  const aboutDesc = previewLang === 'pt' ? aboutHeroData.descPt : previewLang === 'es' ? aboutHeroData.descEs : aboutHeroData.descEn;
  const aboutAvatar = aboutHeroData.avatarGallery?.[0];

  return (
    <div data-lenis-prevent="true" className="w-full lg:w-2/3 bg-[var(--bg-primary)] relative lg:overflow-y-auto flex flex-col transition-colors duration-300 min-h-[500px] lg:min-h-0">
      {/* BARRA DE STATUS NO TOPO */}
      <div className="p-2 sm:px-4 text-[10px] font-bold tracking-widest uppercase border-b border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors duration-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {currentView !== 'menu' && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          )}
          <span>{currentView !== 'menu' ? t('admin.dashboard.preview_badge') : t('admin.dashboard.waiting')}</span>
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
                 <div 
                   className="mt-3 sm:mt-6 text-[9px] sm:text-[10px] lg:text-xs text-[var(--text-secondary)] font-jet tracking-wide max-w-2xl mx-auto opacity-100 transition-colors duration-300 px-4"
                   dangerouslySetInnerHTML={{ __html: currentDesc }}
                 />
               )}
            </div>

            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--grid-line) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </>
      ) : currentView === 'about' ? (
        <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-500 overflow-hidden">
          <div className="w-full max-w-2xl z-10">
            <div className="flex flex-col-reverse sm:flex-row items-center gap-6">
              {/* TEXTO */}
              <div className="flex-1 min-w-0 text-left">
                <p className="text-lg sm:text-xl font-bold leading-snug text-[var(--text-primary)]">
                  {aboutTitle || <span className="text-[var(--text-terceiro)] italic text-base font-normal">Título vazio…</span>}
                </p>
                <p className="text-sm text-[var(--text-terceiro)] mt-1">
                  {aboutSubtitle || <span className="italic">Subtítulo vazio…</span>}
                </p>
                {aboutDesc && (
                  <div
                    className="text-xs mt-3 text-[var(--text-secondary)] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: aboutDesc }}
                  />
                )}
                {(aboutHeroData.buttons?.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {aboutHeroData.buttons.map(btn => (
                      <span
                        key={btn.id}
                        className="text-xs px-4 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-primary)] bg-[var(--bg-secondary)]"
                      >
                        {previewLang === 'pt' ? btn.textPt : previewLang === 'es' ? btn.textEs : btn.textEn}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* AVATAR */}
              <div className="shrink-0">
                {aboutAvatar ? (
                  <img
                    src={aboutAvatar}
                    alt="Avatar"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-[50%]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[50%] bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center">
                    <IoPersonOutline size={36} className="text-[var(--text-terceiro)]" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
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
