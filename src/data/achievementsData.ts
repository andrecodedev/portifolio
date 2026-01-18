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

// Tipo para as conquistas pessoais
export interface AchievementData {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const achievementsData = (t: TFunction): AchievementData[] => [
  {
    id: 1,
    image: prouni,
    title: t('Achievements.title_1', 'Bolsa ProUni Integral'),
    description: t('Achievements.description_1', 'Conquista da bolsa integral ProUni para cursar Análise e Desenvolvimento de Sistemas na FACENS.'),
  },
  {
    id: 2,
    image: etec,
    title: t('Achievements.title_2', 'Formação Técnica - ETEC'),
    description: t('Achievements.description_2', 'Conclusão do curso técnico em Análise e Desenvolvimento de Sistemas pela ETEC São Roque.'),
  },
  {
    id: 3,
    image: mentoria,
    title: t('Achievements.title_3', 'Mentoria Acadêmica'),
    description: t('Achievements.description_3', 'Atuação como mentor acadêmico na FACENS, auxiliando alunos em algoritmos e programação.'),
  },
  {
    id: 4,
    image: one,
    title: t('Achievements.title_4', 'Oracle Next Education'),
    description: t('Achievements.description_4', 'Participação e conclusão de formações do programa Oracle Next Education (ONE).'),
  },
  {
    id: 5,
    image: onebitcode,
    title: t('Achievements.title_5', 'OneBitCode'),
    description: t('Achievements.description_5', 'Conclusão de cursos e bootcamps na plataforma OneBitCode focados em desenvolvimento web.'),
  },
  {
    id: 6,
    image: senai,
    title: t('Achievements.title_6', 'SENAI'),
    description: t('Achievements.description_6', 'Participação em cursos profissionalizantes oferecidos pelo SENAI.'),
  },
  {
    id: 7,
    image: ccbeu,
    title: t('Achievements.title_7', 'CCBEU - Inglês'),
    description: t('Achievements.description_7', 'Estudos de inglês no Centro Cultural Brasil-Estados Unidos (CCBEU).'),
  },
  {
    id: 8,
    image: tec4u,
    title: t('Achievements.title_8', 'TEC4U Digital'),
    description: t('Achievements.description_8', 'Fui chamado para entrevista de estágio na TEC4U Digital e acabei sendo contratado diretamente como desenvolvedor júnior, atuando em projetos web reais.'),
  },
];
