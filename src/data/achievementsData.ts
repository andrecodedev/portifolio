import type { TFunction } from 'i18next';

// Importando as imagens das conquistas pessoais
import ccbeu from '/src/img/conquistasPessoais/Ccbeu.jpg';
import etec from '/src/img/conquistasPessoais/Etec.jpg';
import mentoria from '/src/img/conquistasPessoais/Mentoria.jpg';
import one from '/src/img/conquistasPessoais/ONE.jpg';
import onebitcode from '/src/img/conquistasPessoais/Pnebitcode.jpg';
import prouni from '/src/img/conquistasPessoais/Prouni.jpg';
import senai from '/src/img/conquistasPessoais/Senai.jpg';
import tec4u from '/src/img/conquistasPessoais/tec4u.jpg';
import dio from '/src/img/conquistasPessoais/dio.jpg';
import origamid from '/src/img/conquistasPessoais/origamid.jpg';
import udemy from '/src/img/conquistasPessoais/udemy.jpg';

// Tipo para as conquistas pessoais
export interface AchievementData {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const achievementsData = (t: TFunction): AchievementData[] => [
  // 1. Primeira (centro): ProUni
  {
    id: 1,
    image: prouni,
    title: t('Achievements.title_1', 'Bolsa ProUni Integral'),
    description: t('Achievements.description_1', 'Conquista da bolsa integral ProUni para cursar Análise e Desenvolvimento de Sistemas na FACENS.'),
  },
  // 2. Segunda: Mentoria
  {
    id: 2,
    image: mentoria,
    title: t('Achievements.title_2', 'Mentoria Acadêmica'),
    description: t('Achievements.description_2', 'Atuação como mentor acadêmico na FACENS, auxiliando alunos em algoritmos e programação.'),
  },
  // 3. Cursos online juntos
  {
    id: 5,
    image: onebitcode,
    title: t('Achievements.title_5', 'OneBitCode'),
    description: t('Achievements.description_5', 'Estudo continuamente na plataforma OneBitCode, onde tenho acesso vitalício. Utilizo para elevar meu conhecimento em desenvolvimento web e novas tecnologias.'),
  },
  {
    id: 9,
    image: dio,
    title: t('Achievements.title_9', 'DIO - Bootcamps & Labs'),
    description: t('Achievements.description_9', 'Estou sempre estudando na DIO, onde tenho acesso vitalício. Uso a plataforma para elevar meu conhecimento em desenvolvimento web, backend e novas tecnologias.'),
  },
  {
    id: 10,
    image: origamid,
    title: t('Achievements.title_10', 'Origamid - Formação Frontend'),
    description: t('Achievements.description_10', 'Sou aluno vitalício da Origamid e sigo estudando para aprimorar minhas habilidades em frontend, UI/UX e novas tecnologias.'),
  },
  {
    id: 11,
    image: udemy,
    title: t('Achievements.title_11', 'Udemy - Cursos Profissionais'),
    description: t('Achievements.description_11', 'Estou sempre fazendo cursos na Udemy para elevar meu conhecimento em React, Node.js, banco de dados, produtividade e muito mais.'),
  },
  // 4. Menos prioridade: CCBEU, Senai, ETEC, Oracle Next
  {
    id: 7,
    image: ccbeu,
    title: t('Achievements.title_7', 'CCBEU - Inglês'),
    description: t('Achievements.description_7', 'Estudos de inglês no Centro Cultural Brasil-Estados Unidos (CCBEU).'),
  },
  {
    id: 6,
    image: senai,
    title: t('Achievements.title_6', 'SENAI'),
    description: t('Achievements.description_6', 'Participação em cursos profissionalizantes oferecidos pelo SENAI.'),
  },
  {
    id: 3,
    image: etec,
    title: t('Achievements.title_3', 'Formação Técnica - ETEC'),
    description: t('Achievements.description_3', 'Conclusão do curso técnico em Análise e Desenvolvimento de Sistemas pela ETEC São Roque.'),
  },
  {
    id: 4,
    image: one,
    title: t('Achievements.title_4', 'Oracle Next Education'),
    description: t('Achievements.description_4', 'Participação e conclusão de formações do programa Oracle Next Education (ONE).'),
  },
  // 5. Última: TEC4U Digital
  {
    id: 8,
    image: tec4u,
    title: t('Achievements.title_8', 'TEC4U Digital'),
    description: t('Achievements.description_8', 'Fui chamado para entrevista de estágio na TEC4U Digital e acabei sendo contratado diretamente como desenvolvedor júnior, atuando em projetos web reais.'),
  },
];
