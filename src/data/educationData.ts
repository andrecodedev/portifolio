// src/data/educationData.ts

import facens from '../img/formacoes/facens.svg';
import etec from '../img/formacoes/etec.svg';
import senai from '../img/formacoes/senai.svg';
import interativa from '../img/formacoes/interativa.svg';
import soulBilingue from '../img/formacoes/soulBilingue.svg';
import ccbeu from '../img/formacoes/ccbeu.svg';
import onebitcode from '../img/formacoes/onebitcode.svg';
import alura from '../img/formacoes/alura.svg';

// Importe outros ícones conforme necessário

// A interface foi mantida para garantir a consistência dos dados.
// Corrigimos certificadoUrl para aceitar null.
export interface EducationData {
  id: number;
  categoria: 'superior' | 'profissionalizante' | 'idioma' | 'dio.io' | 'alura' | 'onebitcode' | 'certificacao';
  icon: string;
  curso: string;
  tipo: string;
  escola: string;
  status: string;
  inicio: string;
  fim: string;
  cargaHoraria?: string;
  modalidade?: string;
  certificadoUrl?: string | null;
}

// Exportamos um array estático com as CHAVES DE TRADUÇÃO.
// A função getEducationData não é mais necessária com esta abordagem.
export const educationData: EducationData[] = [

  {
    id: 36,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_36',
    tipo: 'Education.tipo_36',
    escola: 'Education.escola_36',
    status: 'Education.status_36',
    inicio: 'Education.inicio_36',
    fim: 'Education.fim_36',
    cargaHoraria: 'Education.cargaHoraria_36',
    modalidade: 'Education.modalidade_36',
    certificadoUrl: ""
  },
  {
    id: 35,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_35',
    tipo: 'Education.tipo_35',
    escola: 'Education.escola_35',
    status: 'Education.status_35',
    inicio: 'Education.inicio_35',
    fim: 'Education.fim_35',
    cargaHoraria: 'Education.cargaHoraria_35',
    modalidade: 'Education.modalidade_35',
    certificadoUrl: ""
  },
  {
    id: 34,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_34',
    tipo: 'Education.tipo_34',
    escola: 'Education.escola_34',
    status: 'Education.status_34',
    inicio: 'Education.inicio_34',
    fim: 'Education.fim_34',
    cargaHoraria: 'Education.cargaHoraria_34',
    modalidade: 'Education.modalidade_34',
    certificadoUrl: ""
  },
  {
    id: 33,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_33',
    tipo: 'Education.tipo_33',
    escola: 'Education.escola_33',
    status: 'Education.status_33',
    inicio: 'Education.inicio_33',
    fim: 'Education.fim_33',
    cargaHoraria: 'Education.cargaHoraria_33',
    modalidade: 'Education.modalidade_33',
    certificadoUrl: ""
  },
  {
    id: 32,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_32',
    tipo: 'Education.tipo_32',
    escola: 'Education.escola_32',
    status: 'Education.status_32',
    inicio: 'Education.inicio_32',
    fim: 'Education.fim_32',
    cargaHoraria: 'Education.cargaHoraria_32',
    modalidade: 'Education.modalidade_32',
    certificadoUrl: ""
  },
  {
    id: 31,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_31',
    tipo: 'Education.tipo_31',
    escola: 'Education.escola_31',
    status: 'Education.status_31',
    inicio: 'Education.inicio_31',
    fim: 'Education.fim_31',
    cargaHoraria: 'Education.cargaHoraria_31',
    modalidade: 'Education.modalidade_31',
    certificadoUrl: ""
  },
  {
    id: 30,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_30',
    tipo: 'Education.tipo_30',
    escola: 'Education.escola_30',
    status: 'Education.status_30',
    inicio: 'Education.inicio_30',
    fim: 'Education.fim_30',
    cargaHoraria: 'Education.cargaHoraria_30',
    modalidade: 'Education.modalidade_30',
    certificadoUrl: ""
  },
  {
    id: 28,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_28',
    tipo: 'Education.tipo_28',
    escola: 'Education.escola_28',
    status: 'Education.status_28',
    inicio: 'Education.inicio_28',
    fim: 'Education.fim_28',
    cargaHoraria: 'Education.cargaHoraria_28',
    modalidade: 'Education.modalidade_28',
    certificadoUrl: ""
  },
  {
    id: 27,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_27',
    tipo: 'Education.tipo_27',
    escola: 'Education.escola_27',
    status: 'Education.status_27',
    inicio: 'Education.inicio_27',
    fim: 'Education.fim_27',
    cargaHoraria: 'Education.cargaHoraria_27',
    modalidade: 'Education.modalidade_27',
    certificadoUrl: ""
  },
  {
    id: 26,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_26',
    tipo: 'Education.tipo_26',
    escola: 'Education.escola_26',
    status: 'Education.status_26',
    inicio: 'Education.inicio_26',
    fim: 'Education.fim_26',
    cargaHoraria: 'Education.cargaHoraria_26',
    modalidade: 'Education.modalidade_26',
    certificadoUrl: ""
  },
  {
    id: 25,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_25',
    tipo: 'Education.tipo_25',
    escola: 'Education.escola_25',
    status: 'Education.status_25',
    inicio: 'Education.inicio_25',
    fim: 'Education.fim_25',
    cargaHoraria: 'Education.cargaHoraria_25',
    modalidade: 'Education.modalidade_25',
    certificadoUrl: ""
  },
  {
    id: 24,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_24',
    tipo: 'Education.tipo_24',
    escola: 'Education.escola_24',
    status: 'Education.status_24',
    inicio: 'Education.inicio_24',
    fim: 'Education.fim_24',
    cargaHoraria: 'Education.cargaHoraria_24',
    modalidade: 'Education.modalidade_24',
    certificadoUrl: ""
  },
  {
    id: 23,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_23',
    tipo: 'Education.tipo_23',
    escola: 'Education.escola_23',
    status: 'Education.status_23',
    inicio: 'Education.inicio_23',
    fim: 'Education.fim_23',
    cargaHoraria: 'Education.cargaHoraria_23',
    modalidade: 'Education.modalidade_23',
    certificadoUrl: ""
  },
  {
    id: 22,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_22',
    tipo: 'Education.tipo_22',
    escola: 'Education.escola_22',
    status: 'Education.status_22',
    inicio: 'Education.inicio_22',
    fim: 'Education.fim_22',
    cargaHoraria: 'Education.cargaHoraria_22',
    modalidade: 'Education.modalidade_22',
    certificadoUrl: ""
  },
  {
    id: 21,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_21',
    tipo: 'Education.tipo_21',
    escola: 'Education.escola_21',
    status: 'Education.status_21',
    inicio: 'Education.inicio_21',
    fim: 'Education.fim_21',
    cargaHoraria: 'Education.cargaHoraria_21',
    modalidade: 'Education.modalidade_21',
    certificadoUrl: ""
  },
  {
    id: 20,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_20',
    tipo: 'Education.tipo_20',
    escola: 'Education.escola_20',
    status: 'Education.status_20',
    inicio: 'Education.inicio_20',
    fim: 'Education.fim_20',
    cargaHoraria: 'Education.cargaHoraria_20',
    modalidade: 'Education.modalidade_20',
    certificadoUrl: ""
  },
  {
    id: 19,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_19',
    tipo: 'Education.tipo_19',
    escola: 'Education.escola_19',
    status: 'Education.status_19',
    inicio: 'Education.inicio_19',
    fim: 'Education.fim_19',
    cargaHoraria: 'Education.cargaHoraria_19',
    modalidade: 'Education.modalidade_19',
    certificadoUrl: ""
  },
  {
    id: 18,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_18',
    tipo: 'Education.tipo_18',
    escola: 'Education.escola_18',
    status: 'Education.status_18',
    inicio: 'Education.inicio_18',
    fim: 'Education.fim_18',
    cargaHoraria: 'Education.cargaHoraria_18',
    modalidade: 'Education.modalidade_18',
    certificadoUrl: ""
  },
  {
    id: 17,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_17',
    tipo: 'Education.tipo_17',
    escola: 'Education.escola_17',
    status: 'Education.status_17',
    inicio: 'Education.inicio_17',
    fim: 'Education.fim_17',
    cargaHoraria: 'Education.cargaHoraria_17',
    modalidade: 'Education.modalidade_17',
    certificadoUrl: ""
  },
  {
    id: 16,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_16',
    tipo: 'Education.tipo_16',
    escola: 'Education.escola_16',
    status: 'Education.status_16',
    inicio: 'Education.inicio_16',
    fim: 'Education.fim_16',
    cargaHoraria: 'Education.cargaHoraria_16',
    modalidade: 'Education.modalidade_16',
    certificadoUrl: ""
  },
  {
    id: 15,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_15',
    tipo: 'Education.tipo_15',
    escola: 'Education.escola_15',
    status: 'Education.status_15',
    inicio: 'Education.inicio_15',
    fim: 'Education.fim_15',
    cargaHoraria: 'Education.cargaHoraria_15',
    modalidade: 'Education.modalidade_15',
    certificadoUrl: ""
  },
  {
    id: 14,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_14',
    tipo: 'Education.tipo_14',
    escola: 'Education.escola_14',
    status: 'Education.status_14',
    inicio: 'Education.inicio_14',
    fim: 'Education.fim_14',
    cargaHoraria: 'Education.cargaHoraria_14',
    modalidade: 'Education.modalidade_14',
    certificadoUrl: ""
  },
  {
    id: 13,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_13',
    tipo: 'Education.tipo_13',
    escola: 'Education.escola_13',
    status: 'Education.status_13',
    inicio: 'Education.inicio_13',
    fim: 'Education.fim_13',
    cargaHoraria: 'Education.cargaHoraria_13',
    modalidade: 'Education.modalidade_13',
    certificadoUrl: ""
  },
  {
    id: 12,
    categoria: 'alura',
    icon: alura,
    curso: 'Education.curso_12',
    tipo: 'Education.tipo_12',
    escola: 'Education.escola_12',
    status: 'Education.status_12',
    inicio: 'Education.inicio_12',
    fim: 'Education.fim_12',
    cargaHoraria: 'Education.cargaHoraria_12',
    modalidade: 'Education.modalidade_12',
    certificadoUrl: ""
  },
  {
    id: 11,
    categoria: 'onebitcode',
    icon: onebitcode,
    curso: 'Education.curso_11',
    tipo: 'Education.tipo_11',
    escola: 'Education.escola_11',
    status: 'Education.status_11',
    inicio: 'Education.inicio_11',
    fim: 'Education.fim_11',
    cargaHoraria: 'Education.cargaHoraria_11',
    modalidade: 'Education.modalidade_11',
    certificadoUrl: ""
  },
  {
    id: 10,
    categoria: 'onebitcode',
    icon: onebitcode,
    curso: 'Education.curso_10',
    tipo: 'Education.tipo_10',
    escola: 'Education.escola_10',
    status: 'Education.status_10',
    inicio: 'Education.inicio_10',
    fim: 'Education.fim_10',
    cargaHoraria: 'Education.cargaHoraria_10',
    modalidade: 'Education.modalidade_10',
    certificadoUrl: ""
  },
  {
    id: 9,
    categoria: 'idioma',
    icon: ccbeu,
    curso: 'Education.curso_9',
    tipo: 'Education.tipo_9',
    escola: 'Education.escola_9',
    status: 'Education.status_9',
    inicio: 'Education.inicio_9',
    fim: 'Education.fim_9',
    cargaHoraria: 'Education.cargaHoraria_9',
    modalidade: 'Education.modalidade_9',
    certificadoUrl: ""
  },
  {
    id: 8,
    categoria: 'superior',
    icon: facens,
    curso: 'Education.curso_8',
    tipo: 'Education.tipo_8',
    escola: 'Education.escola_8',
    status: 'Education.status_8',
    inicio: 'Education.inicio_8',
    fim: 'Education.fim_8',
    cargaHoraria: 'Education.cargaHoraria_8',
    modalidade: 'Education.modalidade_8',
    certificadoUrl: ""
  },
  {
    id: 7,
    categoria: 'idioma',
    icon: soulBilingue,
    curso: 'Education.curso_7',
    tipo: 'Education.tipo_7',
    escola: 'Education.escola_7',
    status: 'Education.status_7',
    inicio: 'Education.inicio_7',
    fim: 'Education.fim_7',
    cargaHoraria: 'Education.cargaHoraria_7',
    modalidade: 'Education.modalidade_7',
    certificadoUrl: ""
  },
  {
    id: 6,
    categoria: 'profissionalizante',
    icon: etec,
    curso: 'Education.curso_6',
    tipo: 'Education.tipo_6',
    escola: 'Education.escola_6',
    status: 'Education.status_6',
    inicio: 'Education.inicio_6',
    fim: 'Education.fim_6',
    cargaHoraria: 'Education.cargaHoraria_6',
    modalidade: 'Education.modalidade_6',
    certificadoUrl: ""
  },
  {
    id: 5,
    categoria: 'profissionalizante',
    icon: senai,
    curso: 'Education.curso_5',
    tipo: 'Education.tipo_5',
    escola: 'Education.escola_5',
    status: 'Education.status_5',
    inicio: 'Education.inicio_5',
    fim: 'Education.fim_5',
    cargaHoraria: 'Education.cargaHoraria_5',
    modalidade: 'Education.modalidade_5',
    certificadoUrl: ""
  },
  {
    id: 4,
    categoria: 'profissionalizante',
    icon: etec,
    curso: 'Education.curso_4',
    tipo: 'Education.tipo_4',
    escola: 'Education.escola_4',
    status: 'Education.status_4',
    inicio: 'Education.inicio_4',
    fim: 'Education.fim_4',
    cargaHoraria: 'Education.cargaHoraria_4',
    modalidade: 'Education.modalidade_4',
    certificadoUrl: ""
  },
  {
    id: 3,
    categoria: 'profissionalizante',
    icon: interativa,
    curso: 'Education.curso_3',
    tipo: 'Education.tipo_3',
    escola: 'Education.escola_3',
    status: 'Education.status_3',
    inicio: 'Education.inicio_3',
    fim: 'Education.fim_3',
    cargaHoraria: 'Education.cargaHoraria_3',
    modalidade: 'Education.modalidade_3',
    certificadoUrl: ""
  },
  {
    id: 2,
    categoria: 'profissionalizante',
    icon: interativa,
    curso: 'Education.curso_2',
    tipo: 'Education.tipo_2',
    escola: 'Education.escola_2',
    status: 'Education.status_2',
    inicio: 'Education.inicio_2',
    fim: 'Education.fim_2',
    cargaHoraria: 'Education.cargaHoraria_2',
    modalidade: 'Education.modalidade_2',
    certificadoUrl: ""
  },
  {
    id: 1,
    categoria: 'idioma',
    icon: interativa,
    curso: 'Education.curso_1',
    tipo: 'Education.tipo_1',
    escola: 'Education.escola_1',
    status: 'Education.status_1',
    inicio: 'Education.inicio_1',
    fim: 'Education.fim_1',
    cargaHoraria: 'Education.cargaHoraria_1',
    modalidade: 'Education.modalidade_1',
    certificadoUrl: ""
  },
];