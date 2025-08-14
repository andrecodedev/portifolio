import { useTranslation } from "react-i18next";

export default function ContactInfo() {
    const { t, i18n } = useTranslation();
    document.documentElement.lang = i18n.language;
    
  return (
    <div className="font-jet flex flex-col justify-center items-center gap-4 p-8 md:p-20 bg-[var(--bg-secondary-transparent)] rounded-lg shadow">
      <h3 className="text-[var(--text-primary)] text-lg font-semibold select-none">{t('Contact.titulo_1')}</h3>

      <div className="text-[var(--text-terceiro)] text-base flex items-center gap-2">
        <i className="fas fa-map-marker-alt"></i>
        <span>{t('Contact.local')}</span>
      </div>

      <div className="text-[var(--text-terceiro)] text-base flex items-center gap-2">
        <i className="fas fa-envelope"></i>
        <span>{t('Contact.email_1')}</span>
      </div>

      <div className="text-[var(--text-terceiro)] text-base flex items-center gap-2">
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
          <img src="src/img/redes/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
        </a>

        <a
          href="https://github.com/andrecodedev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src="src/img/redes/github.svg" alt="GitHub" className="w-5 h-5" />
        </a>

        <a
          href="mailto:contato.andrecodedev@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary transition"
        >
          <img src="src/img/redes/email.svg" alt="E-mail" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
