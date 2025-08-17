import { useState, useEffect, useRef } from "react";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];
}

export default function ProjectCard({ title, imageUrl, description, skills }: ProjectCardProps) {
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
          e.stopPropagation(); // evita disparar clique fora imediatamente
          setShowOverlay(true);
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-4 transition-opacity duration-300 ${
            showOverlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>

          <div className="flex gap-2 mb-2">
            {skills?.map((skill, idx) => (
              <img key={idx} src={skill} alt="Skill" className="w-6 h-6"/>
            ))}
          </div>

          <button
            className="px-4 py-2 bg-[var(--button-bg)] text-white cursor-pointer hover:bg-[var(--button-hover)] rounded-lg text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            Ver Mais
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
      />
    </>
  );
}
