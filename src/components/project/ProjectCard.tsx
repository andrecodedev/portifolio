import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ProjectModal from "./ProjectModal";
import { getSkillName } from "../../data/skillsData";

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];
  repoUrl?: string;
  siteUrl?: string;
}

export default function ProjectCard({ title, imageUrl, description, skills, repoUrl, siteUrl }: ProjectCardProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setOpen(true);

  // Detecta toque fora do card
  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowOverlay(false);
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Se a descrição começa com 't:' usa a chave de tradução
  const getDescription = () => {
    if (typeof description === 'string' && description.startsWith('t:')) {
      const key = description.replace('t:', '');
      return t(key);
    }
    return description;
  };

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-85 h-48 rounded-md overflow-hidden shadow-lg cursor-pointer"
        onClick={handleOpen}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onTouchStart={(e) => {
          e.stopPropagation();
          setShowOverlay(true);
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full select-none object-cover transition-transform duration-300 transform hover:scale-105"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-4 transition-opacity duration-300 ${showOverlay ? "opacity-100" : "opacity-0"
            }`}
        >
          <h3 className="text-lg font-bold p-2 text-white">{title}</h3>

          {skills && skills.length > 0 && (
            <h4 className="text-white text-[10px] tracking-widest opacity-80 mb-1 font-semibold">
              {t('ProjectModal.tech_title')}
            </h4>
          )}
          <div className="flex flex-wrap justify-center gap-2 p-2 select-none max-w-[calc(8*2rem+7*0.5rem)]">
            {skills?.map((skill, idx) => {
              const name = getSkillName(skill);
              return (
                <div key={idx} className="tooltip-container group">
                  <img src={skill} alt={name || "Skill"} className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  {name && <span className="tooltip-content !text-[10px] !py-1 !px-2">{t(name)}</span>}
                </div>
              );
            })}
          </div>

          <button
            className="px-4 py-2 m-2 bg-[var(--button-active)] select-none text-[var(--text-primary)] cursor-pointer hover:bg-[var(--button-hover)] rounded-lg text-sm transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            {t('button.see_more')}
          </button>
        </div>
      </div>

      <ProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        imageUrl={imageUrl}
        description={getDescription()}
        skills={skills}
        repoUrl={repoUrl}
        siteUrl={siteUrl}
      />
    </>
  );
}
