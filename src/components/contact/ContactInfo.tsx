import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCopy, FaCheck } from "react-icons/fa";

import LinkedinIcon from '../../img/redes/linkedin.svg';
import GithubIcon from '../../img/redes/github.svg';
import EmailIcon from '../../img/redes/email.svg';

export default function ContactInfo() {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  document.documentElement.lang = i18n.language;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contato.andrecodedev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-jet flex flex-col justify-center items-center gap-4 p-8 md:p-20 bg-[var(--bg-secondary-transparent)] rounded-lg shadow border border-[var(--border)]">
      <h3 className="text-[var(--text-primary)] text-base font-semibold select-none">{t('Contact.titulo_1')}</h3>

      <div className="text-[var(--text-terceiro)] text-sm flex items-center gap-2">
        <i className="fas fa-map-marker-alt"></i>
        <span>{t('Contact.local')}</span>
      </div>

      <div
        className="text-[var(--text-terceiro)] text-sm flex items-center gap-2 cursor-pointer hover:text-[var(--text-primary)] transition-colors group relative"
        onClick={handleCopyEmail}
      >
        <i className="fas fa-envelope"></i>
        <span>{t('Contact.email_1')}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
          {copied ? <FaCheck className="text-green-500 scale-110" /> : <FaCopy className="text-xs" />}
        </div>
        {/* Tooltip */}
        <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-xs rounded transition-all duration-300 pointer-events-none ${copied ? 'opacity-100 -top-12' : 'opacity-0'}`}>
          {t('Contact.copiado') || 'Copiado!'}
        </span>
      </div>

      <div className="text-[var(--text-terceiro)] text-sm flex items-center gap-2">
        <i className="fas fa-clock"></i>
        <span>{t('Contact.dias')}</span>
      </div>

      <div className="flex gap-3 mt-2 select-none">
        <a
          href="https://linkedin.com/in/andrecodedev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
        </a>

        <a
          href="https://github.com/andrecodedev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src={GithubIcon} alt="GitHub" className="w-5 h-5" />
        </a>

        <a
          href="mailto:contato.andrecodedev@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src={EmailIcon} alt="E-mail" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
