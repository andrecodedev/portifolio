import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import avatarIcon from '../../img/avatar.svg';

function AboutHero() {
    const { t, i18n } = useTranslation();
    const [activeBtn, setActiveBtn] = useState<string | null>(null);

    document.documentElement.lang = i18n.language;

    const buttonBase =
        "text-[0.9rem] px-6 py-2 rounded-md transition-all duration-300 select-none";
    const buttonStyle =
        "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]";
    const activeStyle = "bg-[var(--button-active)]";

return ( 
    <>  

    <div className="flex flex-1 flex-col justify-center items-center text-center px-4 py-6 sm:px-8 lg:px-16">

        <section className="w-full max-w-6xl flex flex-col-reverse lg:flex-row text-cente items-center justify-between gap-8 text-justify">
            {/* TEXTOS */}
            <div className="w-full lg:w-2/3 p-4">
                <p className="text-[1.6rem] sm:text-[1.8rem] font-jet leading-snug tracking-tight">
                    {t('about.nome')}
                </p>
                <p className="text-[1rem] mb-4 font-jet leading-snug tracking-tight text-[var(--text-terceiro)]">
                    {t('about.cargo')}
                </p>
                <p className="text-[.9rem] mt-4 font-jet leading-snug tracking-tight max-w-[75ch]">
                    {t('about.descricao_1')}
                </p>
                <p className="text-[.9rem] mt-2 font-jet leading-snug tracking-tight max-w-[75ch]">
                    {t('about.descricao_2')}
                </p>

                {/* BOTÕES */}
                <div className="flex flex-wrap gap-4 mt-6 pointer-events-auto">
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

                {/* REDES 
                    <div className="flex gap-3 items-center sm:mt-0">
                        <a href="#" target="_blank" aria-label="LinkedIn"
                            className="bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] p-2 rounded-full transition-colors">
                            <img
                                className="w-[2rem] h-[2rem] sm:w-[1.4rem] sm:h-[1.4rem] cursor-pointer"
                                src="src/img/redes/linkedin.svg"
                                alt="LinkedIn" />
                        </a>
                        <a href="#" target="_blank" aria-label="GitHub"
                            className="bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] p-2 rounded-full transition-colors">
                            <img
                                className="w-[2rem] h-[2rem] sm:w-[1.4rem] sm:h-[1.4rem] cursor-pointer"
                                src="src/img/redes/github.svg"
                                alt="GitHub" />
                        </a>
                        <a href="#" target="_blank" aria-label="Email"
                            className="bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] p-2 rounded-full transition-colors">
                            <img
                                className="w-[2rem] h-[2rem] sm:w-[1.4rem] sm:h-[1.4rem] cursor-pointer"
                                src="src/img/redes/email.svg"
                                alt="Email" />
                        </a>
                    </div>*/}
            </div>

            {/* AVATAR */}
            <div className="w-full flex justify-center lg:w-1/3 select-none">
                <img
                    src={avatarIcon}
                    alt="avatar"
                    className="w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[17rem] lg:h-[17rem] rounded-full object-cover" />
            </div>
        </section>
            </div>
</>
   )
}

export default AboutHero