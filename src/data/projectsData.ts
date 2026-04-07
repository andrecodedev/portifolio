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
import portfolioAndrecodedev from '../img/projetos/portfolioAndrecodedev.svg';

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
import reactIcon from '../img/skills/react.svg';
import typescriptIcon from '../img/skills/typescript.svg';
import tailwindIcon from '../img/skills/tailwind.svg';
import viteIcon from '../img/skills/vite.svg';
import nodejsIcon from '../img/skills/nodejs.svg';
import obsidianIcon from '../img/skills/obsidian.svg';
import supabaseIcon from '../img/skills/supabase.svg';

import tec4u from '../img/redes/tec4u.svg';
import LogoIcon from '../img/logo.svg';

export interface ProjectData {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  skills?: string[];   // array de URLs das skills
  repoUrl?: string;    // link do GitHub
  siteUrl?: string;    // link do deploy
  type: 'personal' | 'work'; // tipo do projeto
  labels?: string[];     // etiquetas do tipo de projeto (ex: ['Site Web', 'E-commerce'])
  institution?: {      // Instituição representada (Trabalho ou Próprio)
    name: string;
    logo: string;
    url: string;
  };
  challenge?: string;   // Desafio do projeto (i18n key)
  solution?: string;    // Solução aplicada (i18n key)
  result?: string;      // Resultado obtido (i18n key)
  date?: string;        // Data do projeto (YYYY-MM)
  likes?: number;       // Número de curtidas (mock)
}

// Configurações padrão de instituições
const PERSONAL_INSTITUTION = {
  name: 't:projects.institutions.personal',
  logo: LogoIcon,
  url: 'https://andrecode.dev.br/'
};

const TEC4U_INSTITUTION = {
  name: 't:projects.institutions.tec4u',
  logo: tec4u,
  url: 'https://www.tec4udigital.com/'
};

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
    labels: ['t:projects.labels.siteWeb'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.sealWorld_challenge',
    solution: 't:projects.personal.sealWorld_solution',
    result: 't:projects.personal.sealWorld_result',
    date: "2024-06",
    likes: 12
  },
  {
    id: 2,
    title: "Alessio's Pizzaria",
    imageUrl: alessiosPizzaria,
    description: 't:projects.personal.alessiosPizzaria',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    labels: ['t:projects.labels.siteWeb'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.alessiosPizzaria_challenge',
    solution: 't:projects.personal.alessiosPizzaria_solution',
    result: 't:projects.personal.alessiosPizzaria_result',
    date: "2024-07",
    likes: 8
  },
  {
    id: 3,
    title: "Jogo do Amigo Secreto",
    imageUrl: amigoSecreto,
    description: 't:projects.personal.jogoAmigoSecreto',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    labels: ['t:projects.labels.siteWeb'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.jogoAmigoSecreto_challenge',
    solution: 't:projects.personal.jogoAmigoSecreto_solution',
    result: 't:projects.personal.jogoAmigoSecreto_result',
    date: "2024-09",
    likes: 5
  },
  {
    id: 4,
    title: "Primeiro Portifólio AndreCode",
    imageUrl: meuPortfolio,
    description: 't:projects.personal.primeiroPortfolio',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    labels: ['t:projects.labels.siteWeb', 't:projects.labels.portfolio'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.primeiroPortfolio_challenge',
    solution: 't:projects.personal.primeiroPortfolio_solution',
    result: 't:projects.personal.primeiroPortfolio_result',
    date: "2024-08",
    likes: 45
  },
  {
    id: 5,
    title: "MobiSeg",
    imageUrl: mobiSeg,
    description: 't:projects.personal.mobiSeg',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    labels: ['t:projects.labels.siteWeb', 't:projects.labels.academico'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.mobiSeg_challenge',
    solution: 't:projects.personal.mobiSeg_solution',
    result: 't:projects.personal.mobiSeg_result',
    date: "2024-10",
    likes: 22
  },
  {
    id: 6,
    title: "PetLife",
    imageUrl: petLife,
    description: 't:projects.personal.petLife',
    skills: [htmlIcon, cssIcon, javascriptIcon, gitIcon, vscodeIcon, figmaIcon, trelloIcon, canvaIcon],
    type: 'personal',
    labels: ['t:projects.labels.siteWeb'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.petLife_challenge',
    solution: 't:projects.personal.petLife_solution',
    result: 't:projects.personal.petLife_result',
    date: "2024-11",
    likes: 15
  },
  {
    id: 7,
    title: "Portifólio AndreCodeDev",
    imageUrl: portfolioAndrecodedev,
    description: 't:projects.personal.portfolioAndrecodedev',
    skills: [
      reactIcon,
      typescriptIcon,
      tailwindIcon,
      viteIcon,
      nodejsIcon,
      htmlIcon,
      cssIcon,
      javascriptIcon,
      sassIcon,
      gitIcon,
      vscodeIcon,
      antigravityIcon,
      linuxIcon,
      figmaIcon,
      trelloIcon,
      canvaIcon,
      scrumIcon,
      supabaseIcon,
      geminiIcon,
      deepSeekIcon,
      perplexityIcon,
      AIStudioGoogleIcon,
      pageSpeedIcon,
      obsidianIcon
    ],
    siteUrl: "https://andrecode.dev.br/",
    type: 'personal',
    labels: ['t:projects.labels.siteWeb', 't:projects.labels.portfolio'],
    institution: PERSONAL_INSTITUTION,
    challenge: 't:projects.personal.portfolioAndrecodedev_challenge',
    solution: 't:projects.personal.portfolioAndrecodedev_solution',
    result: 't:projects.personal.portfolioAndrecodedev_result',
    date: "2025-01",
    likes: 120
  },
  {
    id: 101,
    title: "Eora Eyewear",
    imageUrl: eorayewear,
    description: 't:projects.work.eorayewear',
    skills: ecommerceSkills,
    siteUrl: "https://www.eoraeyewear.com/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.eorayewear_challenge',
    solution: 't:projects.work.eorayewear_solution',
    result: 't:projects.work.eorayewear_result',
    date: "2025-10",
    likes: 18
  },
  {
    id: 102,
    title: "Emoveis",
    imageUrl: emoveis,
    description: 't:projects.work.emoveis',
    skills: ecommerceSkills,
    siteUrl: "https://www.emoveis.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.emoveis_challenge',
    solution: 't:projects.work.emoveis_solution',
    result: 't:projects.work.emoveis_result',
    date: "2025-11",
    likes: 24
  },
  {
    id: 103,
    title: "Qcy",
    imageUrl: qcy,
    description: 't:projects.work.qcy',
    skills: ecommerceSkills,
    siteUrl: "https://www.qcybrasil.com/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.qcy_challenge',
    solution: 't:projects.work.qcy_solution',
    result: 't:projects.work.qcy_result',
    date: "2025-11",
    likes: 31
  },
  {
    id: 104,
    title: "Lojas Comfort",
    imageUrl: lojasComfort,
    description: 't:projects.work.lojasComfort',
    skills: ecommerceSkills,
    siteUrl: "https://lojascomfort.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.lojasComfort_challenge',
    solution: 't:projects.work.lojasComfort_solution',
    result: 't:projects.work.lojasComfort_result',
    date: "2025-12",
    likes: 14
  },
  {
    id: 105,
    title: "Sapataria Nova",
    imageUrl: sapatariaNova,
    description: 't:projects.work.sapatariaNova',
    skills: ecommerceSkills,
    siteUrl: "https://www.sapatarianova.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.sapatariaNova_challenge',
    solution: 't:projects.work.sapatariaNova_solution',
    result: 't:projects.work.sapatariaNova_result',
    date: "2025-12",
    likes: 42
  },
  {
    id: 106,
    title: "Relevo",
    imageUrl: relevo,
    description: 't:projects.work.relevo',
    skills: ecommerceSkills,
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.relevo_challenge',
    solution: 't:projects.work.relevo_solution',
    result: 't:projects.work.relevo_result',
    date: "2026-01",
    likes: 9
  },
  {
    id: 107,
    title: "Baixa Pace",
    imageUrl: baixaPace,
    description: 't:projects.work.baixaPace',
    skills: ecommerceSkills,
    siteUrl: "https://www.baixapace.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.baixaPace_challenge',
    solution: 't:projects.work.baixaPace_solution',
    result: 't:projects.work.baixaPace_result',
    date: "2026-01",
    likes: 27
  },
  {
    id: 108,
    title: "Sports&Tennis",
    imageUrl: sportsTennis,
    description: 't:projects.work.sportsTennis',
    skills: ecommerceSkills,
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.sportsTennis_challenge',
    solution: 't:projects.work.sportsTennis_solution',
    result: 't:projects.work.sportsTennis_result',
    date: "2026-02",
    likes: 11
  },
  {
    id: 109,
    title: "Paduá",
    imageUrl: padua,
    description: 't:projects.work.padua',
    skills: ecommerceSkills,
    siteUrl: "https://paduashowroom.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.padua_challenge',
    solution: 't:projects.work.padua_solution',
    result: 't:projects.work.padua_result',
    date: "2026-02",
    likes: 56
  },
  {
    id: 110,
    title: "Couro e Cia",
    imageUrl: couroECia,
    description: 't:projects.work.couroECia',
    skills: ecommerceSkills,
    siteUrl: "https://www.couroecia.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.couroECia_challenge',
    solution: 't:projects.work.couroECia_solution',
    result: 't:projects.work.couroECia_result',
    date: "2026-02",
    likes: 38
  },
  {
    id: 111,
    title: "Cabaret de Marie",
    imageUrl: cabaretDeMarie,
    description: 't:projects.work.cabaretDeMarie',
    skills: ecommerceSkills,
    siteUrl: "https://www.cabaretdemarie.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.cabaretDeMarie_challenge',
    solution: 't:projects.work.cabaretDeMarie_solution',
    result: 't:projects.work.cabaretDeMarie_result',
    date: "2026-03",
    likes: 21
  },
  {
    id: 112,
    title: "Zétona",
    imageUrl: zetona,
    description: 't:projects.work.zetona',
    skills: ecommerceSkills,
    siteUrl: "https://www.zetona.com.br/",
    type: 'work',
    labels: ['t:projects.labels.ecommerce', 't:projects.labels.siteWeb'],
    institution: TEC4U_INSTITUTION,
    challenge: 't:projects.work.zetona_challenge',
    solution: 't:projects.work.zetona_solution',
    result: 't:projects.work.zetona_result',
    date: "2026-03",
    likes: 64
  },
];
