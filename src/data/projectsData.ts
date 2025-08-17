import amigoSecreto from '../img/projetos/amigoSecreto.svg';
import alessiosPizzaria from '../img/projetos/alessiosPizzaria.svg';
import sealWorld from '../img/projetos/sealWorld.svg';
import meuPortfolio from '../img/projetos/meuPortfolio.svg';
import mobiSeg from '../img/projetos/mobiSeg.svg';
import petLife from '../img/projetos/petLife.svg';

// Importar ícones de skills
import htmlIcon from '../img/skills/html.svg';
import cssIcon from '../img/skills/css.svg';
import gitIcon from '../img/skills/git.svg';
import figmaIcon from '../img/skills/figma.svg';
import trelloIcon from '../img/skills/trello.svg';
import canvaIcon from '../img/skills/canva.svg';
import vscodeIcon from '../img/skills/vscode.svg';
import javascriptIcon from '../img/skills/javascript.svg';

export interface ProjectData {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];   // array de URLs das skills
  repoUrl?: string;    // link do GitHub
  siteUrl?: string;    // link do deploy
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Seal World",
    imageUrl: sealWorld,
    description: "Descrição do Seal World com mais detalhes.",
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    repoUrl: "https://github.com/seu-usuario/seal-world",
    siteUrl: "https://seu-site.com/seal-world",
  },
  {
    id: 2,
    title: "Alessio's Pizzaria",
    imageUrl: alessiosPizzaria,
    description: "Descrição do Alessio's Pizzaria com mais detalhes.",
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    repoUrl: "https://github.com/seu-usuario/alessios-pizzaria",
    siteUrl: "https://seu-site.com/alessios-pizzaria",
  },
  {
    id: 3,
    title: "Jogo do Amigo Secreto",
    imageUrl: amigoSecreto,
    description: "Descrição do Jogo do Amigo Secreto com mais detalhes.",
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    repoUrl: "https://github.com/seu-usuario/amigo-secreto",
    siteUrl: "https://seu-site.com/amigo-secreto",
  },
  {
    id: 4,
    title: "Primeiro Portfólio AndreCode",
    imageUrl: meuPortfolio,
    description: "Descrição do Primeiro Portfólio AndreCode com mais detalhes.",
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    repoUrl: "https://github.com/seu-usuario/primeiro-portfolio",
    siteUrl: "https://seu-site.com/portfolio",
  },
  {
    id: 5,
    title: "MobiSeg",
    imageUrl: mobiSeg,
    description: "Descrição do MobiSeg com mais detalhes.",
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    repoUrl: "https://github.com/seu-usuario/mobiseg",
    siteUrl: "https://seu-site.com/mobiseg",
  },
  {
    id: 6,
    title: "PetLife",
    imageUrl: petLife,
    description: "Descrição do PetLife com mais detalhes.",
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    repoUrl: "https://github.com/seu-usuario/petlife",
    siteUrl: "https://seu-site.com/petlife",
  },
];
