import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronBack, IoSaveOutline, IoAdd, IoTrashOutline } from 'react-icons/io5';

export interface AboutButton {
  id: string;
  textPt: string; textEn: string; textEs: string;
  link: string;
}

export interface AboutHeroData {
  titlePt: string; titleEn: string; titleEs: string;
  subtitlePt: string; subtitleEn: string; subtitleEs: string;
  descPt: string; descEn: string; descEs: string;
  buttons: AboutButton[];
  avatarGallery: string[];
}

interface AboutHeroEditorProps {
  heroData: AboutHeroData;
  setHeroData: (data: Partial<AboutHeroData>) => void;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  isDirty: boolean;
  onSave: () => void;
  onBack: () => void;
}

export default function AboutHeroEditor({ heroData, setHeroData, saveStatus, isDirty, onSave, onBack }: AboutHeroEditorProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'pt' | 'en' | 'es'>('pt');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setHeroData({ avatarGallery: [...(heroData.avatarGallery || []), newImageUrl.trim()] });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newGallery = [...(heroData.avatarGallery || [])];
    newGallery.splice(index, 1);
    setHeroData({ avatarGallery: newGallery });
  };

  const handleAddButton = () => {
    const newButton: AboutButton = {
      id: crypto.randomUUID(),
      textPt: 'Novo Botão', textEn: 'New Button', textEs: 'Nuevo Botón',
      link: '#'
    };
    setHeroData({ buttons: [...(heroData.buttons || []), newButton] });
  };

  const handleRemoveButton = (id: string) => {
    setHeroData({ buttons: (heroData.buttons || []).filter(b => b.id !== id) });
  };

  const handleUpdateButton = (id: string, field: keyof AboutButton, value: string) => {
    setHeroData({
      buttons: (heroData.buttons || []).map(b => b.id === id ? { ...b, [field]: value } : b)
    });
  };

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
          <h2 className="text-base sm:text-lg font-semibold ml-1">Editar Bloco Inicial (About)</h2>
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
              Título (Grande) <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
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
              Subtítulo <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
            </label>
            <input 
              type="text" 
              value={activeTab === 'pt' ? heroData.subtitlePt : activeTab === 'es' ? heroData.subtitleEs : heroData.subtitleEn} 
              onChange={(e) => {
                if (activeTab === 'pt') setHeroData({ subtitlePt: e.target.value });
                else if (activeTab === 'es') setHeroData({ subtitleEs: e.target.value });
                else setHeroData({ subtitleEn: e.target.value });
              }}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none transition-colors shadow-inner"
            />
          </div>
          
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] mb-2 block">
              Descrição (Texto longo) <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
            </label>
            <textarea 
              value={activeTab === 'pt' ? heroData.descPt : activeTab === 'es' ? heroData.descEs : heroData.descEn} 
              onChange={(e) => {
                if (activeTab === 'pt') setHeroData({ descPt: e.target.value });
                else if (activeTab === 'es') setHeroData({ descEs: e.target.value });
                else setHeroData({ descEn: e.target.value });
              }}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none h-32 resize-none transition-colors shadow-inner"
            />
          </div>

          {/* GALERIA DE BOTÕES DINÂMICA */}
          <div className="mt-4 border-t border-[var(--border)] pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] block">
                Botões de Ação
              </label>
              <button 
                onClick={handleAddButton}
                className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1 bg-[var(--text-primary)]/10 text-[var(--text-primary)] rounded hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
              >
                <IoAdd size={14} /> ADICIONAR BOTÃO
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {(heroData.buttons || []).length === 0 ? (
                <p className="text-sm text-[var(--text-terceiro)] text-center py-4 border border-dashed border-[var(--border)] rounded-lg">
                  Nenhum botão adicionado.
                </p>
              ) : (
                (heroData.buttons || []).map((btn) => (
                  <div key={btn.id} className="p-4 border border-[var(--border)] bg-[var(--bg-primary)] rounded-lg relative group">
                    <button 
                      onClick={() => handleRemoveButton(btn.id)}
                      className="absolute top-2 right-2 p-1.5 bg-[var(--error)]/10 text-[var(--error)] rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--error)] hover:text-white"
                      title="Remover Botão"
                    >
                      <IoTrashOutline size={16} />
                    </button>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-[9px] uppercase tracking-widest text-[var(--text-terceiro)] mb-1 block">
                          Texto <span className="text-[var(--text-primary)] opacity-50">({activeTab.toUpperCase()})</span>
                        </label>
                        <input 
                          type="text" 
                          value={activeTab === 'pt' ? btn.textPt : activeTab === 'es' ? btn.textEs : btn.textEn} 
                          onChange={(e) => {
                            if (activeTab === 'pt') handleUpdateButton(btn.id, 'textPt', e.target.value);
                            else if (activeTab === 'es') handleUpdateButton(btn.id, 'textEs', e.target.value);
                            else handleUpdateButton(btn.id, 'textEn', e.target.value);
                          }}
                          className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded p-2 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none transition-colors"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[9px] uppercase tracking-widest text-[var(--text-terceiro)] mb-1 block">
                          Link URL <span className="text-[var(--text-primary)] opacity-50">(Global)</span>
                        </label>
                        <input 
                          type="text" 
                          value={btn.link} 
                          onChange={(e) => handleUpdateButton(btn.id, 'link', e.target.value)}
                          className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded p-2 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO AGRUPADA COM BORDA: GALERIA DE AVATARES */}
      <div className="border border-[var(--border)] bg-[var(--bg-primary)]/10 rounded-xl overflow-hidden shadow-sm mt-6">
        <div className="p-4 sm:p-6">
          <label className="text-[10px] uppercase tracking-widest text-[var(--text-terceiro)] mb-4 block">
            Galeria de Avatares (URLs)
          </label>
          
          {/* Upload and Add Image Area */}
          <div className="flex flex-col gap-4 mb-4">
            
            {/* Drag and Drop / File Input Zone */}
            <div className="relative border-2 border-dashed border-[var(--border)] hover:border-[var(--text-primary)] rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer bg-[var(--bg-primary)]/50">
              <input 
                type="file" 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  // TODO: Implement Supabase Storage upload
                  // For now, we will simulate or use base64 if no bucket is ready
                  alert("Upload via arquivo clicado! Precisamos conectar ao bucket do Supabase.");
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title="Clique ou arraste uma imagem aqui"
              />
              <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <IoAdd size={24} className="text-[var(--text-terceiro)] group-hover:text-[var(--text-primary)] transition-colors" />
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">Clique para enviar imagem</p>
              <p className="text-[10px] text-[var(--text-terceiro)] uppercase tracking-widest">Ou arraste e solte (PNG, JPG, WEBP)</p>
            </div>

            <div className="flex items-center gap-2 w-full my-2">
              <div className="h-[1px] flex-1 bg-[var(--border)]"></div>
              <span className="text-[10px] text-[var(--text-terceiro)] uppercase tracking-widest px-2">Ou adicione por URL</span>
              <div className="h-[1px] flex-1 bg-[var(--border)]"></div>
            </div>

            {/* Adicionar por URL */}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://exemplo.com/minha-foto.png"
                className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] outline-none transition-colors shadow-inner"
              />
              <button 
                onClick={handleAddImage}
                disabled={!newImageUrl.trim()}
                className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
              >
                Adicionar
              </button>
            </div>
          </div>

          {/* Lista de imagens */}
          <div className="flex flex-col gap-2">
            {(heroData.avatarGallery || []).length === 0 ? (
              <p className="text-sm text-[var(--text-terceiro)] text-center py-4 border border-dashed border-[var(--border)] rounded-lg">
                Nenhuma imagem adicionada.
              </p>
            ) : (
              (heroData.avatarGallery || []).map((url, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-[var(--border)] shrink-0">
                      <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Erro')} />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] truncate">{url}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveImage(idx)}
                    className="p-2 text-[var(--error)] hover:bg-[var(--error)]/10 rounded-md transition-colors ml-2 shrink-0"
                  >
                    <IoTrashOutline size={18} />
                  </button>
                </div>
              ))
            )}
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
