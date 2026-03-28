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
import padua from '../img/projetos/Padua.svg';
import couroECia from '../img/projetos/CouroECia.svg';
import cabaretDeMarie from '../img/projetos/CabaretDeMarie.svg';
import zetona from '../img/projetos/zetona.svg';

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
import antigravityIcon from '../img/skills/antigravity.svg';
import deepSeekIcon from '../img/skills/DeepSeek.svg';
import perplexityIcon from '../img/skills/Perplexity.svg';
import pageSpeedIcon from '../img/skills/PageSpeed.svg';
import linuxIcon from '../img/skills/linux.svg';
import geminiIcon from '../img/skills/gemini.svg';
import AIStudioGoogleIcon from '../img/skills/AIStudioGoogle.svg';

export interface ProjectData {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];   // array de URLs das skills
  repoUrl?: string;    // link do GitHub
  siteUrl?: string;    // link do deploy
  type: 'personal' | 'work'; // tipo do projeto
  label?: string;      // etiqueta do tipo de projeto (ex: E-commerce)
}

// Ordem padronizada de skills para projetos de e-commerce (Linux-first)
const ecommerceSkills = [
  htmlIcon,
  cssIcon,
  sassIcon,
  javascriptIcon,
  twig,
  bootstrapIcon,
  nuvemshopIcon,
  gitIcon,
  FileZillaIcon,
  vscodeIcon,
  antigravityIcon,
  figmaIcon,
  clickupIcon,
  scrumIcon,
  deepSeekIcon,
  perplexityIcon,
  geminiIcon,
  AIStudioGoogleIcon,
  pageSpeedIcon,
  linuxIcon
];

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Seal World",
    imageUrl: sealWorld,
    description: 't:projects.personal.sealWorld',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    label: 't:projects.labels.siteWeb'
  },
  {
    id: 2,
    title: "Alessio's Pizzaria",
    imageUrl: alessiosPizzaria,
    description: 't:projects.personal.alessiosPizzaria',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    label: 't:projects.labels.siteWeb'
  },
  {
    id: 3,
    title: "Jogo do Amigo Secreto",
    imageUrl: amigoSecreto,
    description: 't:projects.personal.jogoAmigoSecreto',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    label: 't:projects.labels.webapp'
  },
  {
    id: 4,
    title: "Primeiro Portfólio AndreCode",
    imageUrl: meuPortfolio,
    description: 't:projects.personal.primeiroPortfolio',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    label: 't:projects.labels.templateWeb'
  },
  {
    id: 5,
    title: "MobiSeg",
    imageUrl: mobiSeg,
    description: 't:projects.personal.mobiSeg',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    label: 't:projects.labels.academico'
  },
  {
    id: 6,
    title: "PetLife",
    imageUrl: petLife,
    description: 't:projects.personal.petLife',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    label: 't:projects.labels.siteWeb'
  },
  {
    id: 101,
    title: "Eora Eyewear",
    imageUrl: eorayewear,
    description: 't:projects.work.eorayewear',
    skills: ecommerceSkills,
    siteUrl: "https://www.eoraeyewear.com/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 102,
    title: "Emoveis",
    imageUrl: emoveis,
    description: 't:projects.work.emoveis',
    skills: ecommerceSkills,
    siteUrl: "https://www.emoveis.com.br/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 103,
    title: "Qcy",
    imageUrl: qcy,
    description: 't:projects.work.qcy',
    skills: ecommerceSkills,
    siteUrl: "https://www.qcybrasil.com/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 104,
    title: "Lojas Comfort",
    imageUrl: lojasComfort,
    description: 't:projects.work.lojasComfort',
    skills: ecommerceSkills,
    siteUrl: "https://lojascomfort.com.br/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 105,
    title: "Sapataria Nova",
    imageUrl: sapatariaNova,
    description: 't:projects.work.sapatariaNova',
    skills: ecommerceSkills,
    siteUrl: "https://www.sapatarianova.com.br/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 106,
    title: "Relevo",
    imageUrl: relevo,
    description: 't:projects.work.relevo',
    skills: ecommerceSkills,
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 107,
    title: "Baixa Pace",
    imageUrl: baixaPace,
    description: 't:projects.work.baixaPace',
    skills: ecommerceSkills,
    siteUrl: "https://www.baixapace.com.br/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 108,
    title: "Sports&Tennis",
    imageUrl: sportsTennis,
    description: 't:projects.work.sportsTennis',
    skills: ecommerceSkills,
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 109,
    title: "Paduá",
    imageUrl: padua,
    description: 't:projects.work.padua',
    skills: ecommerceSkills,
    siteUrl: "https://paduashowroom.com.br/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 110,
    title: "Couro e Cia",
    imageUrl: couroECia,
    description: 't:projects.work.couroECia',
    skills: ecommerceSkills,
    siteUrl: "https://www.couroecia.com.br/",
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 111,
    title: "Cabaret de Marie",
    imageUrl: cabaretDeMarie,
    description: 't:projects.work.cabaretDeMarie',
    skills: ecommerceSkills,
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
  {
    id: 112,
    title: "Zétona",
    imageUrl: zetona,
    description: 't:projects.work.zetona',
    skills: ecommerceSkills,
    type: 'work',
    label: 't:projects.labels.ecommerce'
  },
];
