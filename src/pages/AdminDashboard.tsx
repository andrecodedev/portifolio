import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { hapticFeedback } from '../utils/haptics';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
  // Hero Section State
  const [titlePt, setTitlePt] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descPt, setDescPt] = useState('');
  const [descEn, setDescEn] = useState('');

  // Preview Language Switcher
  const [previewLang, setPreviewLang] = useState('pt');

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
        setDescPt(data.description_pt || '');
        setDescEn(data.description_en || '');
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
          description_pt: descPt,
          description_en: descEn,
          updated_at: new Date()
        }).eq('id', existingData.id);
      } else {
        await supabase!.from('hero_section').insert([{
          title_pt: titlePt,
          title_en: titleEn,
          description_pt: descPt,
          description_en: descEn
        }]);
      }
      
      hapticFeedback.success();
      alert('Alterações salvas com sucesso no banco de dados!');
    } catch (err) {
      console.error(err);
      hapticFeedback.warning();
      alert('Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase!.auth.signOut();
  };

  if (loading) return <div className="h-screen bg-[#050505] flex items-center justify-center text-white">Carregando cofre...</div>;

  const currentTitle = previewLang === 'pt' ? titlePt : titleEn;
  const currentDesc = previewLang === 'pt' ? descPt : descEn;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-jet">
      {/* HEADER DO ADMIN */}
      <header className="bg-black border-b border-white/10 p-4 flex justify-between items-center z-50">
        <div>
          <h1 className="text-xl font-bold">Painel de Controle</h1>
          <p className="text-xs text-white/50">Custom CMS Headless</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-white/50 hover:text-white transition-colors">Ver Site</button>
          <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors">Sair</button>
        </div>
      </header>

      {/* WORKSPACE - SPLIT VIEW */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        
        {/* LADO ESQUERDO: FORMULÁRIOS DE EDIÇÃO */}
        <div className="w-full lg:w-1/3 bg-[#0a0a0a] border-r border-white/10 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Editar Hero Section</h2>
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              {saving ? 'Salvando...' : 'Publicar Alterações'}
            </button>
          </div>

          {/* SESSÃO DE PORTUGUÊS */}
          <div className="mb-8 border border-white/10 rounded-xl p-4 bg-black/50">
            <h3 className="text-sm font-bold text-white/50 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" /> PORTUGUÊS (PT-BR)
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase text-white/50 mb-1 block">Título da Intro</label>
                <input 
                  type="text" 
                  value={titlePt} 
                  onChange={(e) => setTitlePt(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded p-2 text-sm focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-white/50 mb-1 block">Sub-Descrição (Nova)</label>
                <textarea 
                  value={descPt} 
                  onChange={(e) => setDescPt(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded p-2 text-sm focus:border-white outline-none h-24 resize-none"
                  placeholder="Texto que aparecerá embaixo do título..."
                />
              </div>
            </div>
          </div>

          {/* SESSÃO DE INGLÊS */}
          <div className="mb-4 border border-white/10 rounded-xl p-4 bg-black/50">
            <h3 className="text-sm font-bold text-white/50 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> INGLÊS (EN)
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase text-white/50 mb-1 block">Intro Title</label>
                <input 
                  type="text" 
                  value={titleEn} 
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded p-2 text-sm focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-white/50 mb-1 block">Sub-Description (New)</label>
                <textarea 
                  value={descEn} 
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded p-2 text-sm focus:border-white outline-none h-24 resize-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* LADO DIREITO: LIVE PREVIEW */}
        <div className="w-full lg:w-2/3 bg-[#050505] relative overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 z-50 flex bg-black/80 rounded-full p-1 border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setPreviewLang('pt')} 
              className={`px-3 py-1 rounded-full text-xs transition-colors ${previewLang === 'pt' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'}`}
            >
              PT
            </button>
            <button 
              onClick={() => setPreviewLang('en')} 
              className={`px-3 py-1 rounded-full text-xs transition-colors ${previewLang === 'en' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <div className="flex-1 relative flex items-center justify-center p-8">
            {/* Simulando o visual exato do IntroSection */}
            <div className="text-center z-30 max-w-4xl">
               <h1 className="lux text-[2.2rem] sm:text-[4.2rem] tracking-tighter px-6 text-[var(--text-primary)] transition-all duration-300">
                  {currentTitle || (previewLang === 'pt' ? 'Bem-vindo ao meu Portfólio' : 'Welcome to my Portfolio')}
               </h1>
               
               {/* NOVO CAMPO DE DESCRIÇÃO NA PREVIEW */}
               {currentDesc && (
                 <p className="mt-4 text-sm sm:text-base text-white/70 font-jet tracking-wide max-w-2xl mx-auto opacity-100 transition-opacity duration-300">
                   {currentDesc}
                 </p>
               )}
            </div>

            {/* Fundo Fake pra dar contexto */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
          
          <div className="p-2 bg-red-500/10 text-red-500/80 text-xs text-center border-t border-red-500/20">
            Preview em Tempo Real (Live State)
          </div>
        </div>

      </div>
    </div>
  );
}
