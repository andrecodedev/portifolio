// src/data/educationData.ts

import facens from '../img/formacoes/facens.svg';
import etec from '../img/formacoes/etec.svg';
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
    id: 11,
    categoria: 'tecnico',
    icon: etec,
    curso: 'Education.curso_11',
    tipo: 'Education.tipo_11',
    escola: 'Education.escola_11',
    status: 'Education.status_11',
    inicio: 'Education.inicio_11',
    fim: 'Education.fim_11',
    cargaHoraria: 'Education.cargaHoraria_11',
    modalidade: 'Education.modalidade_11',
    certificadoUrl: "https://example.com/certificado-etec"
  },
  // Adicione outros itens de educação aqui...
];