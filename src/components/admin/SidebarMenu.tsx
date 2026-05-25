import { useTranslation } from 'react-i18next';
import { IoChevronForward } from 'react-icons/io5';

interface SidebarMenuProps {
  setCurrentView: (view: 'menu' | 'hero') => void;
}

export default function SidebarMenu({ setCurrentView }: SidebarMenuProps) {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
      <h2 className="text-lg font-semibold mb-6">{t('admin.dashboard.modules')}</h2>
      
      <div className="flex flex-col gap-3">
        <button 
          onClick={() => setCurrentView('hero')}
          className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-primary)] transition-all flex justify-between items-center group shadow-sm"
        >
          <div>
            <h3 className="font-bold text-sm">{t('admin.dashboard.hero_title')}</h3>
            <p className="text-[10px] text-[var(--text-terceiro)] mt-1">{t('admin.dashboard.hero_desc')}</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center text-[var(--text-terceiro)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all">
            <IoChevronForward size={14} />
          </div>
        </button>

        <button disabled className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg opacity-40 cursor-not-allowed flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">{t('admin.dashboard.about_title')} <span className="text-[8px] bg-[var(--text-primary)] text-[var(--bg-primary)] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{t('admin.dashboard.soon')}</span></h3>
            <p className="text-[10px] text-[var(--text-terceiro)] mt-1">{t('admin.dashboard.about_desc')}</p>
          </div>
        </button>

        <button disabled className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg opacity-40 cursor-not-allowed flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">{t('admin.dashboard.skills_title')} <span className="text-[8px] bg-[var(--text-primary)] text-[var(--bg-primary)] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{t('admin.dashboard.soon')}</span></h3>
            <p className="text-[10px] text-[var(--text-terceiro)] mt-1">{t('admin.dashboard.skills_desc')}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
