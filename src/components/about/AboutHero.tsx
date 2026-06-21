import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import andreAvatar from '../../img/andre_antigo.png';

function AboutHero() {
  const { t, i18n } = useTranslation();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  document.documentElement.lang = i18n.language;

  const buttonBase = "text-sm px-6 py-2 rounded-md transition-all duration-300 select-none";
  const buttonStyle = "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]";
  const activeStyle = "bg-[var(--button-active)]";

  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center text-center px-4 py-2 sm:px-8 lg:px-16">
      <section className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 text-justify">
        {/* TEXTOS */}
        <div className="w-full lg:w-2/3 p-4">
          <p className="text-xl sm:text-2xl font-jet leading-snug tracking-tight">
            {t('about.nome')}
          </p>
          <p className="text-base mb-4 font-jet leading-snug tracking-tight text-[var(--text-terceiro)]">
            {t('about.cargo')}
          </p>
          <p
            className="text-sm mt-4 font-jet leading-snug tracking-tight"
            dangerouslySetInnerHTML={{ __html: t('about.descricao_1') }}
          />
          <p className="text-sm mt-2 font-jet leading-snug tracking-tight">
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
              href="/cv/curriculoAndreVitor.pdf"
              download
              className={`${buttonBase} ${buttonStyle} ${activeBtn === 'cv' ? activeStyle : ''}`}
              onClick={() => setActiveBtn('cv')}
            >
              {t('button.download')}
            </a>
          </div>
        </div>

        {/* FOTO */}
        <div className="w-full flex justify-center lg:w-1/3 select-none">
          <img
            src={andreAvatar}
            alt="André Vitor"
            className="w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[17rem] lg:h-[17rem] object-cover rounded-[50%]"
          />
        </div>
      </section>
    </div>
  );
}

export default AboutHero;
