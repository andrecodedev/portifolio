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
  label?: string;
}

export default function ProjectCard({ title, imageUrl, description, skills, repoUrl, siteUrl, label }: ProjectCardProps) {
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
          className={`absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-4 transition-opacity duration-300 ${showOverlay ? "opacity-100" : "opacity-0"
            }`}
        >
          {label && (
            <>
              <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold rounded-md border border-white/20 bg-white/10 text-white/90 uppercase tracking-widest backdrop-blur-md z-10">
                {label.startsWith('t:') ? t(label.replace('t:', '')) : label}
              </span>
              {/* Espaçador para empurrar o conteúdo para baixo apenas o suficiente para não bater na tag */}
              <div className="h-6 w-full" />
            </>
          )}
          <h3 className="text-base font-bold text-white mb-2 max-w-[90%] truncate text-center" title={title}>
            {title}
          </h3>

          {skills && skills.length > 0 && (
            <h4 className="text-white text-[10px] tracking-widest opacity-70 mb-2 font-semibold uppercase">
              {t('ProjectModal.tech_title')}
            </h4>
          )}
          <div className="flex flex-wrap justify-center gap-2 p-2 select-none max-w-full">
            {skills?.slice(0, 8).map((skill, idx) => {
              const name = getSkillName(skill);
              return (
                <div key={idx} className="tooltip-container group">
                  <img src={skill} alt={name || "Skill"} className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  {name && <span className="tooltip-content !text-[10px] !py-1 !px-2">{t(name)}</span>}
                </div>
              );
            })}
            {skills && skills.length > 8 && (
              <div className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-[10px] text-white font-bold border border-white/20 backdrop-blur-sm">
                +{skills.length - 8}
              </div>
            )}
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
        description={description}
        skills={skills}
        repoUrl={repoUrl}
        siteUrl={siteUrl}
        label={label}
      />
    </>
  );
}
