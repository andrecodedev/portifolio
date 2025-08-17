import { useState } from "react";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];
}

export default function ProjectCard({ title, imageUrl, description, skills }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <div
        className="relative w-85 h-48 rounded-md overflow-hidden shadow-lg cursor-pointer group"
        onClick={handleOpen} // Clique em qualquer lugar do card abre o modal
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300 p-4">
          <h3 className="text-lg font-bold mb-2 text-[var(--white)]">{title}</h3>
          {/* Skills no card */}
          <div className="flex gap-2 mb-2">
            {skills?.map((skill, idx) => (
              <img key={idx} src={skill} alt="Skill" className="w-6 h-6"/>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-[var(--button-bg)] text-[var(--white)] cursor-pointer hover:bg-[var(--button-hover)] rounded-lg text-sm"
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
