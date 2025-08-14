// src/data/educationData.ts

import facens from '../img/formacoes/facens.svg';
import etec from '../img/formacoes/etec.svg';
import alura from '../img/formacoes/alura.svg';
import ccbeu from '../img/formacoes/ccbeu.svg';
import dio from '../img/formacoes/dio.svg';
import interativa from '../img/formacoes/interativa.svg';
import udemy from '../img/formacoes/udemy.svg';
import senai from '../img/formacoes/senai.svg';
import onebitcode from '../img/formacoes/onebitcode.svg';
import onealura from '../img/formacoes/onealura.svg';

// Importe outros ícones conforme necessário

// A interface foi mantida para garantir a consistência dos dados.
// Corrigimos certificadoUrl para aceitar null.
export interface EducationData {
  id: number;
  categoria: 'superior' | 'tecnico' | 'bootcamp' | 'curso' | 'formacao' | 'trilha' | 'certificacao';
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
    id: 1,
    categoria: 'superior',
    icon: facens,
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
  {
    id: 2,
    categoria: 'tecnico',
    icon: etec,
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
    id: 3,
    categoria: 'curso',
    icon: senai,
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
    id: 4,
    categoria: 'curso',
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

];