import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '../components/ui/Skeleton';
import { supabase } from '../lib/supabaseClient';
import { hapticFeedback } from '../utils/haptics';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes refatorados
import SidebarMenu from '../components/admin/SidebarMenu';
import HeroEditor from '../components/admin/HeroEditor';
import type { HeroData } from '../components/admin/HeroEditor';
import LivePreview from '../components/admin/LivePreview';
import AboutEditor from '../components/admin/AboutEditor';

const initialEmptyHero: HeroData = {
  titlePt: '', titleEn: '', titleEs: '', descPt: '', descEn: '', descEs: ''
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // States Unificados
  const [heroData, setHeroData] = useState<HeroData>(initialEmptyHero);
  const [initialHeroData, setInitialHeroData] = useState<HeroData>(initialEmptyHero);

  // Preview Language Switcher
  const [previewLang, setPreviewLang] = useState('pt');
  
  // Navigation State
  const [currentView, setCurrentView] = useState<'menu' | 'hero' | 'about'>('menu');
  
  // Toast & Modals
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // UX: Prevenção de perda de dados (Unsaved Changes)
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const isDirty = JSON.stringify(heroData) !== JSON.stringify(initialHeroData);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    supabase!.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin');
      } else {
        fetchHeroData();
      }
    });

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase!
        .from('hero_section')
        .select('*')
        .limit(1)
        .single();
      
      if (data) {
        const fetchedData: HeroData = {
          titlePt: data.title_pt || '',
          titleEn: data.title_en || '',
          titleEs: data.title_es || '',
          descPt: data.description_pt || '',
          descEn: data.description_en || '',
          descEs: data.description_es || ''
        };
        setHeroData(fetchedData);
        setInitialHeroData(fetchedData);
      }
      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar dados:', error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    hapticFeedback.light();
    
    try {
      const { data: existingData } = await supabase!.from('hero_section').select('id').limit(1).single();
      
      if (existingData) {
        await supabase!.from('hero_section').update({
          title_pt: heroData.titlePt,
          title_en: heroData.titleEn,
          title_es: heroData.titleEs,
          description_pt: heroData.descPt,
          description_en: heroData.descEn,
          description_es: heroData.descEs,
          updated_at: new Date()
        }).eq('id', existingData.id);
      } else {
        await supabase!.from('hero_section').insert([{
          title_pt: heroData.titlePt,
          title_en: heroData.titleEn,
          title_es: heroData.titleEs,
          description_pt: heroData.descPt,
          description_en: heroData.descEn,
          description_es: heroData.descEs
        }]);
      }
      
      setInitialHeroData(heroData); // Reseta o estado de "sujo"
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
      hapticFeedback.success();
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      hapticFeedback.warning();
    }
  };

  const handleLogout = async () => {
    await supabase!.auth.signOut();
  };

  // Função central para interceptar ações destrutivas se o usuário tiver alterações não salvas
  const handleProtectedAction = (action: () => void) => {
    if (isDirty) {
      hapticFeedback.warning();
      setPendingAction(() => action);
      setShowUnsavedConfirm(true);
    } else {
      action();
    }
  };

  const confirmUnsavedAction = () => {
    setShowUnsavedConfirm(false);
    // Descarta alterações locais revertendo para o banco
    setHeroData(initialHeroData);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-jet transition-colors duration-300">
        <header className="bg-[var(--bg-secondary)] border-b border-[var(--border)] p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center z-50">
          <div>
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-32 h-4" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-start sm:justify-end w-full sm:w-auto">
            <Skeleton className="w-20 sm:w-24 h-8" />
            <Skeleton className="w-20 sm:w-24 h-8" />
          </div>
        </header>

        <div className="flex flex-1 overflow-y-auto lg:overflow-hidden flex-col lg:flex-row relative">
          <div className="w-full lg:w-1/3 bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border)] p-4 sm:p-6 shrink-0">
            <Skeleton className="w-32 h-6 mb-6" />
            <div className="space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          </div>
          <div className="flex-1 bg-[var(--bg-primary)] p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl space-y-6">
              <Skeleton className="w-full h-[30vh] sm:h-64 rounded-xl" />
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-1/2 h-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-jet transition-colors duration-300">
      {/* HEADER DO ADMIN */}
      <header className="bg-[var(--bg-secondary)] border-b border-[var(--border)] p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center z-50 transition-colors duration-300">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <div>
            <h1 className="text-xl font-bold">{t('admin.dashboard.title')}</h1>
            <p className="text-xs text-[var(--text-terceiro)]">{t('admin.dashboard.subtitle')}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-start sm:justify-end w-full sm:w-auto">
          <button 
            onClick={() => handleProtectedAction(() => {
              hapticFeedback.light();
              navigate('/');
            })}
            className="text-xs px-3 py-1.5 rounded bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 font-bold"
            title="Acessar o site sem fechar a sessão"
          >
            {t('admin.auth.back')}
          </button>

          <button 
            onClick={() => handleProtectedAction(() => {
              hapticFeedback.light();
              setShowLogoutConfirm(true);
            })} 
            className="text-xs px-3 py-1.5 rounded bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20 hover:bg-[var(--error)] hover:text-white transition-all duration-300 font-bold"
          >
            {t('admin.dashboard.logout')}
          </button>
        </div>
      </header>

      {/* WORKSPACE - SPLIT VIEW */}
      <div className="flex flex-1 overflow-y-auto lg:overflow-hidden flex-col lg:flex-row relative">
        
        {/* LADO ESQUERDO: MENU OU FORMULÁRIO */}
        <div className="w-full lg:w-1/3 bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border)] p-4 sm:p-6 lg:overflow-y-auto transition-colors duration-300 shrink-0">
          {currentView === 'menu' ? (
            <SidebarMenu setCurrentView={(view) => handleProtectedAction(() => setCurrentView(view))} />
          ) : currentView === 'hero' ? (
            <HeroEditor 
              heroData={heroData}
              setHeroData={(data) => setHeroData({ ...heroData, ...data })}
              saveStatus={saveStatus}
              isDirty={isDirty}
              onSave={handleSave}
              onBack={() => handleProtectedAction(() => setCurrentView('menu'))}
            />
          ) : (
            <AboutEditor 
              onBack={() => handleProtectedAction(() => setCurrentView('menu'))}
            />
          )}
        </div>

        {/* LADO DIREITO: LIVE PREVIEW */}
        <LivePreview 
          currentView={currentView}
          previewLang={previewLang}
          setPreviewLang={setPreviewLang}
          heroData={heroData}
        />
      </div>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl font-bold text-sm z-[100] border-2 backdrop-blur-xl flex items-center gap-3 transition-all ${
              toast.type === 'success' 
                ? 'bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]' 
                : 'bg-[var(--error)]/20 text-[var(--error)] border-[var(--error)]/50 shadow-[0_0_30px_rgba(255,50,50,0.2)]'
            }`}
          >
            <span className="text-xl drop-shadow-md">{toast.type === 'success' ? '✓' : '✕'}</span>
            <span className="drop-shadow-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UNSAVED CHANGES MODAL */}
      <AnimatePresence>
        {showUnsavedConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Alterações Não Salvas</h2>
                <p className="text-sm text-[var(--text-terceiro)]">Você tem modificações que não foram publicadas. Se você sair agora, perderá essas alterações.</p>
              </div>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowUnsavedConfirm(false)}
                  className="flex-1 py-2 rounded-lg font-bold text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                >
                  Continuar Editando
                </button>
                <button 
                  onClick={confirmUnsavedAction}
                  className="flex-1 py-2 rounded-lg font-bold text-sm bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20 hover:bg-[var(--error)] hover:text-white transition-colors"
                >
                  Descartar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{t('admin.dashboard.logout_title')}</h2>
                <p className="text-sm text-[var(--text-terceiro)]">{t('admin.dashboard.logout_desc')}</p>
              </div>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 rounded-lg font-bold text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                >
                  {t('admin.dashboard.cancel')}
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-2 rounded-lg font-bold text-sm bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20 hover:bg-[var(--error)] hover:text-white transition-colors"
                >
                  {t('admin.dashboard.confirm_logout')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
