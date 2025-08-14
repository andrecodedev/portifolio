import { useTranslation } from "react-i18next";
import { useEffect, useRef } from 'react';

import { AiOutlineFileDone } from "react-icons/ai";

interface CardEducationData {
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

export default function CardEducation({ data }: { data: CardEducationData }) {
  const { icon, curso, tipo, escola, status, inicio, fim, cargaHoraria, modalidade, certificadoUrl } = data;
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    const cardElement = cardRef.current;
    cardElement?.addEventListener("mousemove", handleMouseMove);
    return () => {
      cardElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-[var(--bg-secondary-transparent)] rounded-xl p-6 w-full h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden font-jet"
    >
      {/* CABEÇALHO */}
      <div className="flex items-start justify-between items-center gap-4 mb-4">
        <div className="p-2">
          <img src={icon} alt={t(escola)} className="w-10 h-10 select-none" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{t(curso)}</h3>
          <p className="text-sm font-medium text-[var(--text-secondary)]">{t(escola)}</p>
        </div>
      </div>

      {/* --- CORPO E BOTÃO COMBINADOS --- */}
      <div className="flex-grow flex flex-row flex-nowrap justify-between gap-4 mt-2">
        {/* Coluna da Esquerda: Detalhes */}
        <div className="flex-1 min-w-0 space-y-2 text-sm text-[var(--text-secondary)]">
          {/* BADGE DE STATUS */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1.5 bg-[var(--text-terceiro)]/10 text-[var(--text-terceiro)] ring-1 ring-inset ring-[var(--text-terceiro)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-terceiro)]"></span>
              {t(status)}
            </span>
          </div>

          {tipo && (<p className="italic text-xs">{t(tipo)}</p>)}
          <p><strong>{t('Education.label_periodo')}:</strong> <strong className="text-[var(--text-terceiro)]"> {t(inicio)} — {t(fim)}</strong></p>
          {modalidade && (<p><strong>{t('Education.label_modalidade')}:</strong><strong className="text-[var(--text-terceiro)]"> {t(modalidade)}</strong></p>)}
          {cargaHoraria && (<p><strong>{t('Education.label_carga_horaria')}:</strong><strong className="text-[var(--text-terceiro)]"> {t(cargaHoraria)}</strong></p>)}
        </div>

        {/* Coluna da Direita: Botão */}
        <div className="flex-shrink-0 flex justify-center items-start items-center">
          <a
            href={certificadoUrl || "#"}
            target={certificadoUrl ? "_blank" : undefined}
            rel={certificadoUrl ? "noopener noreferrer" : undefined}
            className={`w-12 h-12 flex items-center justify-center rounded-lg text-white transition-all duration-300 transform shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${certificadoUrl
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-400 cursor-not-allowed"}`}
            aria-label={t("Education.label_ver_certificado")}
          >
            <AiOutlineFileDone size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}