// src/data/educationData.ts

import facens from '../img/formacoes/facens.svg';
import etec from '../img/formacoes/etec.svg';
import senai from '../img/formacoes/senai.svg';

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
    id: 9,
    categoria: 'superior',
    icon: facens,
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
    id: 6,
    categoria: 'tecnico',
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
    categoria: 'curso',
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