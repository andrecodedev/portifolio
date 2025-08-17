import amigoSecreto from '../img/projetos/amigoSecreto.svg';
import code from '../img/projetos/code.svg';
import sealWorld from '../img/projetos/sealWorld.svg';

// Importar ícones de skills
import htmlIcon from '../img/skills/html.svg';
import cssIcon from '../img/skills/css.svg';
import jsIcon from '../img/skills/javascript.svg';
import reactIcon from '../img/skills/react.svg';

export interface ProjectData {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[]; // array de URLs das skills
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Projeto 1",
    imageUrl: sealWorld,
    description: "Descrição do Projeto 1 com mais detalhes.",
    skills: [htmlIcon, cssIcon, jsIcon],
  },
  {
    id: 2,
    title: "Projeto 2",
    imageUrl: code,
    description: "Descrição do Projeto 2 com mais detalhes.",
    skills: [reactIcon, jsIcon],
  },
  {
    id: 3,
    title: "Projeto 3",
    imageUrl: amigoSecreto,
    description: "Descrição do Projeto 3 com mais detalhes.",
    skills: [htmlIcon, cssIcon],
  },
  // Adicione os outros projetos...
];
