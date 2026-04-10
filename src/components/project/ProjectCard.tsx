import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ProjectModal from "./ProjectModal";
import { getSkillName } from "../../data/skillsData";
import LikeButton from "./LikeButton";
import { hapticFeedback } from "../../utils/haptics";

interface ProjectCardProps {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];
  repoUrl?: string;
  siteUrl?: string;
  labels?: string[];
  institution?: {
    name: string;
    logo: string;
    url: string;
  };
  challenge?: string;
  solution?: string;
  result?: string;
  date?: string;
}

export default function ProjectCard({ id, title, imageUrl, description, skills, repoUrl, siteUrl, labels, institution, challenge, solution, result, date }: ProjectCardProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    hapticFeedback.medium();
    setOpen(true);
  };

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
        className="group relative w-full h-48 rounded-md overflow-hidden shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-black"
        style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
        onClick={handleOpen}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onTouchStart={(e) => {
          e.stopPropagation();
          setShowOverlay(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
        aria-label={`${t('button.see_more')} ${title}`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full select-none object-cover rounded-[inherit]"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-[-2px] bg-black/85 flex flex-col justify-center items-center p-4 backdrop-blur-[2px] transition-opacity duration-300 rounded-[inherit] z-20 ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          {/* Internal Content (Smooth fade) */}
          <div className={`flex flex-col justify-center items-center w-full h-full pt-8 gap-1.5 transition-all duration-700 ${showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"}`}>
            {/* Header do Card (Label e Like) - Já é absolute top-0 */}
            <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-20">
              <div className="flex flex-wrap gap-1 max-w-[75%]">
                {date && (
                  <span className="px-2 py-0.5 text-[8.5px] font-bold rounded-md border border-white/40 bg-white/20 text-white uppercase tracking-wider backdrop-blur-md">
                    {date.split('-')[0]}
                  </span>
                )}
                {labels?.slice(0, 1).map((lbl, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[8.5px] font-bold rounded-md border border-white/20 bg-white/10 text-white/90 uppercase tracking-wider backdrop-blur-md whitespace-nowrap">
                    {lbl.startsWith('t:') ? t(lbl.replace('t:', '')) : lbl}
                  </span>
                ))}
                {labels && labels.length > 1 && (
                  <span className="px-1.5 py-0.5 text-[8.5px] font-bold rounded-md border border-white/20 bg-white/10 text-white/90 backdrop-blur-md">
                    +{labels.length - 1}
                  </span>
                )}
              </div>

              <LikeButton
                projectId={id}
              />
            </div>

            <h3 className="text-[14px] md:text-base font-bold text-white max-w-[90%] truncate text-center font-jet uppercase tracking-tight" title={title}>
              {title}
            </h3>

            {skills && skills.length > 0 && (
              <h4 className="text-white text-[9px] tracking-widest opacity-60 font-semibold uppercase">
                {t('ProjectModal.tech_title')}
              </h4>
            )}
            <div className="flex flex-wrap justify-center gap-1.5 p-1 select-none max-w-[95%]">
              {skills?.slice(0, 8).map((skill, idx) => {
                const name = getSkillName(skill);
                return (
                  <div key={idx} className="tooltip-container group">
                    <img src={skill} alt={name || "Skill"} className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" />
                    {name && <span className="tooltip-content !text-[10px] !py-1 !px-2">{t(name)}</span>}
                  </div>
                );
              })}
              {skills && skills.length > 8 && (
                <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-white/10 rounded-full text-[9px] text-white font-bold border border-white/20 backdrop-blur-sm">
                  +{skills.length - 8}
                </div>
              )}
            </div>

            <button
              className="px-4 py-0.5 bg-white/10 border border-white/20 select-none text-white cursor-pointer hover:bg-white/20 rounded-lg text-[10px] font-semibold transition-all duration-300 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              {t('button.see_more')}
            </button>
          </div>

        </div>
      </div>

      <ProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        id={id}
        title={title}
        imageUrl={imageUrl}
        description={description}
        skills={skills}
        repoUrl={repoUrl}
        siteUrl={siteUrl}
        labels={labels}
        institution={institution}
        challenge={challenge}
        solution={solution}
        result={result}
        date={date}
      />
    </>
  );
}
