import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];
}

export default function ProjectModal({ isOpen, onClose, title, imageUrl, description, skills }: ProjectModalProps) {
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
        className="bg-[var(--bg-secondary)] rounded-2xl shadow-xl p-6 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem do projeto */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full md:w-1/2 max-h-[70vh] object-contain rounded-lg"
        />

        {/* Informações do projeto */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[var(--text-primary)] text-3xl font-bold mb-4">{title}</h2>
          <p className="text-[var(--text-primary)] text-sm mb-4">{description}</p>

          {/* Skills */}
          {skills && (
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, idx) => (
                <img key={idx} src={skill} alt="Skill" className="w-8 h-8"/>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="px-6 py-3 bg-[var(--button-bg)] cursor-pointer text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-hover)] mt-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
