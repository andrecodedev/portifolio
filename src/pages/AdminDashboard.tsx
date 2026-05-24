import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { hapticFeedback } from '../utils/haptics';
import { IoChevronBack, IoChevronForward, IoLayersOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
  // Hero Section State
  const [titlePt, setTitlePt] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descPt, setDescPt] = useState('');
  const [descEn, setDescEn] = useState('');
  const [titleEs, setTitleEs] = useState('');
  const [descEs, setDescEs] = useState('');

  // Preview Language Switcher
  const [previewLang, setPreviewLang] = useState('pt');
  // Navigation State
  const [currentView, setCurrentView] = useState<'menu' | 'hero'>('menu');
  
  // Toast State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Logout Modal State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Editor Language Tab
  const [activeTab, setActiveTab] = useState<'pt' | 'en' | 'es'>('pt');

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
        setTitlePt(data.title_pt || '');
        setTitleEn(data.title_en || '');
        setTitleEs(data.title_es || '');
        setDescPt(data.description_pt || '');
        setDescEn(data.description_en || '');
        setDescEs(data.description_es || '');
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
    setSaving(true);
    hapticFeedback.light();
    
    try {
      // Verifica se existe registro para dar update, senão insert
      const { data: existingData } = await supabase!.from('hero_section').select('id').limit(1).single();
      
      if (existingData) {
        await supabase!.from('hero_section').update({
          title_pt: titlePt,
          title_en: titleEn,
          title_es: titleEs,
          description_pt: descPt,
          description_en: descEn,
          description_es: descEs,
          updated_at: new Date()
        }).eq('id', existingData.id);
      } else {
        await supabase!.from('hero_section').insert([{
          title_pt: titlePt,
          title_en: titleEn,
          title_es: titleEs,
          description_pt: descPt,
          description_en: descEn,
          description_es: descEs
        }]);
      }
      
      hapticFeedback.success();
      showToast('Hero Section publicada com sucesso!', 'success');
    } catch (err) {
      console.error(err);
      hapticFeedback.warning();
      showToast('Erro ao publicar alterações.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase!.auth.signOut();
  };

  if (loading) return <div className="h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] transition-colors duration-300">Carregando cofre...</div>;

  const currentTitle = previewLang === 'pt' ? titlePt : previewLang === 'es' ? titleEs : titleEn;
  const currentDesc = previewLang === 'pt' ? descPt : previewLang === 'es' ? descEs : descEn;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-jet transition-colors duration-300">
      {/* HEADER DO ADMIN */}
      <header className="bg-[var(--bg-secondary)] border-b border-[var(--border)] p-4 flex justify-between items-center z-50 transition-colors duration-300">
        <div>
          <h1 className="text-xl font-bold">Painel de Controle</h1>
          <p className="text-xs text-[var(--text-terceiro)]">Custom CMS Headless</p>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Seletor Global de Idioma do Preview */}
          <div className="flex bg-[var(--bg-primary)] rounded-full p-1 border border-[var(--border)] transition-colors duration-300">
            <button 
              onClick={() => setPreviewLang('pt')} 
              className={`px-3 py-1 rounded-full text-xs transition-colors ${previewLang === 'pt' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)]'}`}
            >
              PT
            </button>
            <button 
              onClick={() => setPreviewLang('en')} 
              className={`px-3 py-1 rounded-full text-xs transition-colors ${previewLang === 'en' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)]'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setPreviewLang('es')} 
              className={`px-3 py-1 rounded-full text-xs transition-colors ${previewLang === 'es' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)]'}`}
            >
              ES
            </button>
          </div>

          <div className="hidden sm:block w-[1px] h-6 bg-[var(--border)] mx-1"></div>

          <button 
            onClick={() => {
              hapticFeedback.light();
              setShowLogoutConfirm(true);
            }} 
            className="text-xs px-3 py-1.5 rounded bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20 hover:bg-[var(--error)] hover:text-white transition-all duration-300 font-bold"
          >
            Sair do Painel
          </button>
        </div>
      </header>

      {/* WORKSPACE - SPLIT VIEW */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        
        {/* LADO ESQUERDO: MENU OU FORMULÁRIO */}
        <div className="w-full lg:w-1/3 bg-[var(--bg-secondary)] border-r border-[var(--border)] p-6 overflow-y-auto transition-colors duration-300">
          
          {currentView === 'menu' ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <h2 className="text-lg font-semibold mb-6">Módulos do Site</h2>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setCurrentView('hero')}
                  className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-primary)] transition-all flex justify-between items-center group shadow-sm"
                >
                  <div>
                    <h3 className="font-bold text-sm">Hero Section</h3>
                    <p className="text-[10px] text-[var(--text-terceiro)] mt-1">Título e subtítulo da página inicial</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center text-[var(--text-terceiro)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all">
                    <IoChevronForward size={14} />
                  </div>
                </button>

                <button disabled className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg opacity-40 cursor-not-allowed flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">About <span className="text-[8px] bg-[var(--text-primary)] text-[var(--bg-primary)] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Em Breve</span></h3>
                    <p className="text-[10px] text-[var(--text-terceiro)] mt-1">Biografia e foto de perfil</p>
                  </div>
                </button>

                <button disabled className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg opacity-40 cursor-not-allowed flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">Skills <span className="text-[8px] bg-[var(--text-primary)] text-[var(--bg-primary)] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Em Breve</span></h3>
                    <p className="text-[10px] text-[var(--text-terceiro)] mt-1">Linguagens e ferramentas</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentView('menu')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--text-primary)]/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10 transition-all border border-[var(--border)]"
                    title="Voltar para Módulos"
                  >
                    <IoChevronBack size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">Voltar</span>
                  </button>
                  <h2 className="text-lg font-semibold ml-2">Editar Hero</h2>
                </div>
                <button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition-opacity"
                >
                  {saving ? 'Salvando...' : 'Publicar'}
                </button>
              </div>

          {/* TABS DE IDIOMA DO EDITOR */}
          <div className="flex gap-2 mb-6 border-b border-[var(--border)] pb-2">
            <button 
              onClick={() => setActiveTab('pt')}
              className={`text-xs font-bold px-3 py-2 rounded transition-colors ${activeTab === 'pt' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}`}
            >
              PORTUGUÊS (PT-BR)
            </button>
            <button 
              onClick={() => setActiveTab('en')}
              className={`text-xs font-bold px-3 py-2 rounded transition-colors ${activeTab === 'en' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}`}
            >
              INGLÊS (EN)
            </button>
            <button 
              onClick={() => setActiveTab('es')}
              className={`text-xs font-bold px-3 py-2 rounded transition-colors ${activeTab === 'es' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'}`}
            >
              ESPANHOL (ES)
            </button>
          </div>

          {/* CAMPOS DE EDIÇÃO UNIFICADOS */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] mb-2 block">
                Título da Intro <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
              </label>
              <input 
                type="text" 
                value={activeTab === 'pt' ? titlePt : activeTab === 'es' ? titleEs : titleEn} 
                onChange={(e) => {
                  if (activeTab === 'pt') setTitlePt(e.target.value);
                  else if (activeTab === 'es') setTitleEs(e.target.value);
                  else setTitleEn(e.target.value);
                }}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none transition-colors shadow-inner"
              />
            </div>
            
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] mb-2 block">
                Sub-Descrição <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
              </label>
              <textarea 
                value={activeTab === 'pt' ? descPt : activeTab === 'es' ? descEs : descEn} 
                onChange={(e) => {
                  if (activeTab === 'pt') setDescPt(e.target.value);
                  else if (activeTab === 'es') setDescEs(e.target.value);
                  else setDescEn(e.target.value);
                }}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none h-32 resize-none transition-colors shadow-inner"
                placeholder={activeTab === 'pt' ? 'Texto que aparecerá embaixo do título...' : activeTab === 'es' ? 'Texto que aparecerá debajo del título...' : 'Text that will appear below the title...'}
              />
            </div>
          </div>
        </div>
      )}
    </div>

        {/* LADO DIREITO: LIVE PREVIEW */}
        <div className="w-full lg:w-2/3 bg-[var(--bg-primary)] relative overflow-hidden flex flex-col transition-colors duration-300">
          
          {/* BARRA DE STATUS NO TOPO */}
          <div className={`p-2 text-[10px] font-bold tracking-widest uppercase text-center border-b transition-colors duration-500 ${currentView === 'hero' ? 'bg-green-500/10 text-green-500/90 border-green-500/20' : 'bg-[var(--bg-secondary)] text-[var(--text-terceiro)] border-[var(--border)]'}`}>
            {currentView === 'hero' ? 'Preview em Tempo Real (Live State)' : 'Aguardando Seleção...'}
          </div>

          {currentView === 'hero' ? (
            <>
              <div className="flex-1 relative flex items-center justify-center p-8">
                {/* Simulando o visual exato do IntroSection */}
                <div className="text-center z-30 max-w-4xl">
                   <h1 className="lux text-[2.2rem] sm:text-[4.2rem] tracking-tighter px-6 text-[var(--text-primary)] transition-all duration-300">
                      {currentTitle || (previewLang === 'pt' ? 'Bem-vindo ao meu Portfólio' : 'Welcome to my Portfolio')}
                   </h1>
                   
                   {/* NOVO CAMPO DE DESCRIÇÃO NA PREVIEW */}
                   {currentDesc && (
                     <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[var(--text-secondary)] font-jet tracking-wide max-w-2xl mx-auto opacity-100 transition-colors duration-300">
                       {currentDesc}
                     </p>
                   )}
                </div>

                {/* Fundo Fake pra dar contexto */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--grid-line) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              </div>
            </>
          ) : (
            <div className="flex-1 relative flex items-center justify-center p-8 animate-in fade-in duration-500">
              <div className="text-center z-30 max-w-sm text-[var(--text-terceiro)] flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-6 shadow-inner">
                   <IoLayersOutline size={28} className="text-[var(--text-terceiro)]" />
                 </div>
                 <h1 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Selecione um Módulo</h1>
                 <p className="text-sm opacity-80 leading-relaxed">Escolha uma seção no menu lateral esquerdo para visualizar e editar o conteúdo em tempo real.</p>
              </div>
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
          )}
        </div>
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
                <h2 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Sair do Painel</h2>
                <p className="text-sm text-[var(--text-terceiro)]">Tem certeza que deseja deslogar e voltar para a tela de acesso restrito?</p>
              </div>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 rounded-lg font-bold text-sm bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-2 rounded-lg font-bold text-sm bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20 hover:bg-[var(--error)] hover:text-white transition-colors"
                >
                  Sim, Deslogar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
