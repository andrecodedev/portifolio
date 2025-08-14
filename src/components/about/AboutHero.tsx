import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import avatarIcon from '../../img/avatar.svg';

function AboutHero() {
  const { t, i18n } = useTranslation();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  // Atualiza o idioma do documento HTML
  document.documentElement.lang = i18n.language;

  const buttonBase = "text-sm px-6 py-2 rounded-md transition-all duration-300 select-none"; // mantém text-sm nos botões
  const buttonStyle = "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]";
  const activeStyle = "bg-[var(--button-active)]";

  return (
    <div className="flex flex-1 flex-col justify-center items-center text-center px-4 py-6 sm:px-8 lg:px-16">
      <section className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 text-justify">
        {/* TEXTOS */}
        <div className="w-full lg:w-2/3 p-4">
          <p className="text-xl sm:text-2xl font-jet leading-snug tracking-tight">
            {t('about.nome')}
          </p>
          <p className="text-base mb-4 font-jet leading-snug tracking-tight text-[var(--text-terceiro)]">
            {t('about.cargo')}
          </p>
          <p className="text-sm mt-4 font-jet leading-snug tracking-tight max-w-[75ch]">
            {t('about.descricao_1')}
          </p>
          <p className="text-sm mt-2 font-jet leading-snug tracking-tight max-w-[75ch]">
            {t('about.descricao_2')}
          </p>

          {/* BOTÕES */}
          <div className="flex flex-wrap gap-4 mt-6 pointer-events-auto font-jet">
            <Link
              to="/project"
              className={`${buttonBase} ${buttonStyle} ${activeBtn === 'project' ? activeStyle : ''}`}
              onClick={() => setActiveBtn('project')}
            >
              {t('button.project')}
            </Link>
            <a
              href="./src/cv/CV_André_Vitor.pdf"
              download
              className={`${buttonBase} ${buttonStyle} ${activeBtn === 'cv' ? activeStyle : ''}`}
              onClick={() => setActiveBtn('cv')}
            >
              {t('button.download')}
            </a>
          </div>
        </div>

        {/* AVATAR */}
        <div className="w-full flex justify-center lg:w-1/3 select-none">
          <img
            src={avatarIcon}
            alt="avatar"
            className="w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[17rem] lg:h-[17rem] rounded-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default AboutHero;
