import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];
  repoUrl?: string;
  siteUrl?: string;
}

export default function ProjectModal({ isOpen, onClose, title, imageUrl, description, skills, repoUrl, siteUrl }: ProjectModalProps) {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4 overflow-auto"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-secondary)] rounded-2xl shadow-xl p-6 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 align-items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem do projeto */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full md:w-1/2 max-h-[70vh] object-contain rounded-lg select-none"
        />

        {/* Informações do projeto */}
        <div className="flex-1 flex flex-col min-h-[300px]">
          <h2 className="text-[var(--text-primary)] text-3xl font-bold mb-4">{title}</h2>
          <p className="text-[var(--text-primary)] text-sm mb-4">{description}</p>

          {/* Skills */}
          {skills && (
            <div className="flex flex-wrap gap-2 mb-4 select-none">
              {skills.map((skill, idx) => (
                <img key={idx} src={skill} alt="Skill" className="w-6 h-6"/>
              ))}
            </div>
          )}

          {/* Links do projeto */}
          <div className="flex gap-4 mb-4">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-[var(--button-hover)] cursor-pointer select-none text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-active)] mt-auto transition-all duration-300"
              >
                GitHub
              </a>
            )}
            {siteUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-[var(--button-hover)] cursor-pointer select-none text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-active)] mt-auto transition-all duration-300"
              >
                {t('button.site')}
              </a>
            )}
          </div>

          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[var(--button-hover)] cursor-pointer select-none text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-active)] w-full transition-all duration-300"
            style={{ marginTop: 'auto' }}
          >
            {t('button.close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
