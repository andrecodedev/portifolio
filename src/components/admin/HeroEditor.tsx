import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronBack, IoSaveOutline } from 'react-icons/io5';

export interface HeroData {
  titlePt: string; titleEn: string; titleEs: string;
  descPt: string; descEn: string; descEs: string;
}

interface HeroEditorProps {
  heroData: HeroData;
  setHeroData: (data: Partial<HeroData>) => void;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  isDirty: boolean;
  onSave: () => void;
  onBack: () => void;
}

export default function HeroEditor({ heroData, setHeroData, saveStatus, isDirty, onSave, onBack }: HeroEditorProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'pt' | 'en' | 'es'>('pt');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* HEADER DO EDITOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[var(--border)] mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded bg-[var(--text-primary)]/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10 transition-all border border-[var(--border)]"
          >
            <IoChevronBack size={14} />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">{t('admin.dashboard.btn_back')}</span>
          </button>
          <h2 className="text-base sm:text-lg font-semibold ml-1">{t('admin.dashboard.edit_hero')}</h2>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO AGRUPADA COM BORDA */}
      <div className="border border-[var(--border)] bg-[var(--bg-primary)]/10 rounded-xl overflow-hidden shadow-sm">
        {/* TABS DE IDIOMA DO EDITOR */}
        <div className="flex flex-wrap gap-2 p-3 sm:p-4 border-b border-[var(--border)] bg-[var(--bg-primary)]/40">
        <button 
          onClick={() => setActiveTab('pt')}
          className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-2 rounded transition-colors flex-1 sm:flex-none text-center ${activeTab === 'pt' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}`}
        >
          {t('admin.dashboard.tab_pt')}
        </button>
        <button 
          onClick={() => setActiveTab('en')}
          className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-2 rounded transition-colors flex-1 sm:flex-none text-center ${activeTab === 'en' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}`}
        >
          {t('admin.dashboard.tab_en')}
        </button>
        <button 
          onClick={() => setActiveTab('es')}
          className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-2 rounded transition-colors flex-1 sm:flex-none text-center ${activeTab === 'es' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}`}
        >
          {t('admin.dashboard.tab_es')}
        </button>
      </div>

      {/* CAMPOS DE EDIÇÃO UNIFICADOS */}
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] mb-2 block">
            {t('admin.dashboard.input_title')} <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
          </label>
          <input 
            type="text" 
            value={activeTab === 'pt' ? heroData.titlePt : activeTab === 'es' ? heroData.titleEs : heroData.titleEn} 
            onChange={(e) => {
              if (activeTab === 'pt') setHeroData({ titlePt: e.target.value });
              else if (activeTab === 'es') setHeroData({ titleEs: e.target.value });
              else setHeroData({ titleEn: e.target.value });
            }}
            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none transition-colors shadow-inner"
          />
        </div>
        
        <div>
          <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] mb-2 block">
            {t('admin.dashboard.input_desc')} <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
          </label>
          <textarea 
            value={activeTab === 'pt' ? heroData.descPt : activeTab === 'es' ? heroData.descEs : heroData.descEn} 
            onChange={(e) => {
              if (activeTab === 'pt') setHeroData({ descPt: e.target.value });
              else if (activeTab === 'es') setHeroData({ descEs: e.target.value });
              else setHeroData({ descEn: e.target.value });
            }}
            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none h-32 resize-none transition-colors shadow-inner"
            placeholder={activeTab === 'pt' ? 'Texto que aparecerá embaixo do título...' : activeTab === 'es' ? 'Texto que aparecerá debajo del título...' : 'Text that will appear below the title...'}
          />
        </div>
      </div>
      </div>

      {/* BOTÃO SALVAR GLOBAL */}
      <div className="mt-6 pt-4 pb-8 border-t border-[var(--border)]">
        <button 
          onClick={onSave} 
          disabled={!isDirty || saveStatus === 'saving' || saveStatus === 'success'}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 disabled:cursor-not-allowed ${
            saveStatus === 'success' 
              ? 'bg-green-500 text-white hover:bg-green-500 opacity-100 disabled:opacity-100'
              : saveStatus === 'error'
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 disabled:opacity-50'
          }`}
        >
          {saveStatus === 'success' ? (
            <span className="flex items-center gap-2">
              <span className="text-lg">✓</span> {t('admin.dashboard.published_success')}
            </span>
          ) : (
            <>
              <IoSaveOutline size={18} />
              {saveStatus === 'saving' ? t('admin.dashboard.publishing') : t('admin.dashboard.publish')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
