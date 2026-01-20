import eorayewear from '../img/projetos/Eorayewear.svg';
import emoveis from '../img/projetos/Emoveis.svg';
import qcy from '../img/projetos/Qcy.svg';
import lojasComfort from '../img/projetos/LojasComfort.svg';
import sapatariaNova from '../img/projetos/SapatariaNova.svg';
import relevo from '../img/projetos/Relevo.svg';
import baixaPace from '../img/projetos/BaixaPace.svg';
import sportsTennis from '../img/projetos/Sports&Tennis.svg';
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
import nuvemshopIcon from '../img/skills/nuvemshop.svg';
import twig from '../img/skills/Twig.svg';
import FileZillaIcon from '../img/skills/FileZilla.svg';
import sassIcon from '../img/skills/sass.svg';
import scrumIcon from '../img/skills/scrum.svg';
import bootstrapIcon from '../img/skills/bootstrap.svg';
import clickupIcon from '../img/skills/ClickUp.svg';

export interface ProjectData {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];   // array de URLs das skills
  repoUrl?: string;    // link do GitHub
  siteUrl?: string;    // link do deploy
  type: 'personal' | 'work'; // tipo do projeto
}

//teste
export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Seal World",
    imageUrl: sealWorld,
    description: 't:projects.personal.sealWorld',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    // repoUrl: "https://github.com/seu-usuario/seal-world",
    // siteUrl: "https://seu-site.com/seal-world",
    type: 'personal',
  },
  {
    id: 2,
    title: "Alessio's Pizzaria",
    imageUrl: alessiosPizzaria,
    description: 't:projects.personal.alessiosPizzaria',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    // repoUrl: "https://github.com/seu-usuario/alessios-pizzaria",
    // siteUrl: "https://seu-site.com/alessios-pizzaria",
    type: 'personal',
  },
  {
    id: 3,
    title: "Jogo do Amigo Secreto",
    imageUrl: amigoSecreto,
    description: 't:projects.personal.jogoAmigoSecreto',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    // repoUrl: "https://github.com/seu-usuario/amigo-secreto",
    // siteUrl: "https://seu-site.com/amigo-secreto",
    type: 'personal',
  },
  {
    id: 4,
    title: "Primeiro Portfólio AndreCode",
    imageUrl: meuPortfolio,
    description: 't:projects.personal.primeiroPortfolio',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    // repoUrl: "https://github.com/seu-usuario/primeiro-portfolio",
    // siteUrl: "https://seu-site.com/portfolio",
    type: 'personal',
  },
  {
    id: 5,
    title: "MobiSeg",
    imageUrl: mobiSeg,
    description: 't:projects.personal.mobiSeg',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    // repoUrl: "https://github.com/seu-usuario/mobiseg",
    // siteUrl: "https://seu-site.com/mobiseg",
    type: 'personal',
  },
  {
    id: 6,
    title: "PetLife",
    imageUrl: petLife,
    description: 't:projects.personal.petLife',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, figmaIcon, vscodeIcon, trelloIcon, canvaIcon],
    // repoUrl: "https://github.com/seu-usuario/petlife",
    // siteUrl: "https://seu-site.com/petlife",
    type: 'personal',
  },
  // Projetos de trabalho reais
  {
    id: 101,
    title: "Eora Eyewear",
    imageUrl: eorayewear,
    description: 't:projects.work.eorayewear',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    siteUrl: "https://www.eoraeyewear.com/",
    type: 'work',
  },
  {
    id: 102,
    title: "Emoveis",
    imageUrl: emoveis,
    description: 't:projects.work.emoveis',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    siteUrl: "https://www.emoveis.com.br/",
    type: 'work',
  },
  {
    id: 103,
    title: "Qcy",
    imageUrl: qcy,
    description: 't:projects.work.qcy',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    siteUrl: "https://www.qcybrasil.com/",
    type: 'work',
  },
  {
    id: 104,
    title: "Lojas Comfort",
    imageUrl: lojasComfort,
    description: 't:projects.work.lojasComfort',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    type: 'work',
  },
  {
    id: 105,
    title: "Sapataria Nova",
    imageUrl: sapatariaNova,
    description: 't:projects.work.sapatariaNova',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    type: 'work',
  },
  {
    id: 106,
    title: "Relevo",
    imageUrl: relevo,
    description: 't:projects.work.relevo',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    type: 'work',
  },
  {
    id: 107,
    title: "Baixa Pace",
    imageUrl: baixaPace,
    description: 't:projects.work.baixaPace',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    siteUrl: "https://www.baixapace.com.br/",
    type: 'work',
  },
  {
    id: 108,
    title: "Sports&Tennis",
    imageUrl: sportsTennis,
    description: 't:projects.work.sportsTennis',
    skills: [htmlIcon, cssIcon, sassIcon, javascriptIcon, twig, bootstrapIcon, nuvemshopIcon, gitIcon, FileZillaIcon, vscodeIcon, figmaIcon, clickupIcon, scrumIcon],
    type: 'work',
  },
];
