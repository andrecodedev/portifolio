import { useState } from 'react';
import { IoArrowBack, IoChevronForward, IoSaveOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import AboutHeroEditor from './AboutHeroEditor';
import type { AboutHeroData } from './AboutHeroEditor';

interface AboutEditorProps {
  onBack: () => void;
  aboutHeroData: AboutHeroData;
  setAboutHeroData: (data: Partial<AboutHeroData>) => void;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  isDirty: boolean;
  onSaveHero: () => void;
}

type AboutView = 'menu' | 'hero' | 'stats' | 'video' | 'carousel' | 'dynamic';

export default function AboutEditor({ onBack, aboutHeroData, setAboutHeroData, saveStatus, isDirty, onSaveHero }: AboutEditorProps) {
  const [currentView, setCurrentView] = useState<AboutView>('menu');

  const modules = [
    { id: 'hero' as AboutView, title: 'Bloco Inicial (Hero)', desc: 'Título, subtítulo, avatares e botões' },
    { id: 'stats' as AboutView, title: 'Estatísticas & GitHub', desc: 'Números e integração com API do GitHub' },
    { id: 'video' as AboutView, title: 'Vídeo Pitch', desc: 'Embed de vídeo do YouTube' },
    { id: 'carousel' as AboutView, title: 'Carrossel (Skills)', desc: 'Galeria infinita de imagens ou habilidades' },
    { id: 'dynamic' as AboutView, title: 'Seções Dinâmicas', desc: 'Construtor de abas de experiências e conquistas' },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-300">
      
      {currentView === 'menu' ? (
        <>
          {/* HEADER DO SUBMENU ABOUT */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-primary)] transition-colors border border-transparent hover:border-[var(--border)] text-[var(--text-secondary)]"
            >
              <IoArrowBack size={18} />
            </button>
            <div>
              <h2 className="text-lg font-bold">Módulos do About</h2>
              <p className="text-[10px] text-[var(--text-terceiro)] mt-1">Selecione o bloco que deseja editar</p>
            </div>
          </div>

          {/* LISTA DE MÓDULOS */}
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setCurrentView(mod.id)}
                className="w-full text-left p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-primary)] transition-all flex justify-between items-center group shadow-sm"
              >
                <div>
                  <h3 className="font-bold text-sm">{mod.title}</h3>
                  <p className="text-[10px] text-[var(--text-terceiro)] mt-1">{mod.desc}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center text-[var(--text-terceiro)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all">
                  <IoChevronForward size={14} />
                </div>
              </button>
            ))}
          </div>

          {/* BOTÃO SALVAR GLOBAL */}
          <div className="mt-6 pt-4 pb-8 border-t border-[var(--border)]">
            <button 
              disabled={true} 
              className="w-full flex items-center justify-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoSaveOutline size={18} />
              Publicar About
            </button>
          </div>
        </>
      ) : currentView === 'hero' ? (
        <AboutHeroEditor 
          heroData={aboutHeroData}
          setHeroData={setAboutHeroData}
          saveStatus={saveStatus}
          isDirty={isDirty}
          onSave={onSaveHero}
          onBack={() => setCurrentView('menu')}
        />
      ) : (
        <>
          {/* EDITOR ESPECÍFICO DO MÓDULO */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setCurrentView('menu')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-primary)] transition-colors border border-transparent hover:border-[var(--border)] text-[var(--text-secondary)]"
            >
              <IoArrowBack size={18} />
            </button>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {modules.find(m => m.id === currentView)?.title}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {currentView === 'stats' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <p className="text-xs text-[var(--text-terceiro)]">Campos numéricos e API do GitHub.</p>
              </motion.div>
            )}

            {currentView === 'video' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <p className="text-xs text-[var(--text-terceiro)]">URL do YouTube.</p>
              </motion.div>
            )}

            {currentView === 'carousel' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <p className="text-xs text-[var(--text-terceiro)]">Carrossel infinito de skills.</p>
              </motion.div>
            )}

            {currentView === 'dynamic' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <p className="text-xs text-[var(--text-terceiro)]">Construtor de seções dinâmicas.</p>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
