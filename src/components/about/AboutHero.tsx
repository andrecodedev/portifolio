import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import andreAntigo from '../../img/andre_antigo.png';
import andreAvatar from '../../img/andre_avatar.png';

function AboutHero() {
  const { t, i18n } = useTranslation();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState(0);

  const avatars = [andreAvatar, andreAntigo];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatar((prev) => (prev + 1) % avatars.length);
    }, 5500); // Troca a foto a cada 5.5 segundos
    return () => clearInterval(interval);
  }, [avatars.length]);

  // Atualiza o idioma do documento HTML  
  document.documentElement.lang = i18n.language;

  const buttonBase = "text-sm px-6 py-2 rounded-md transition-all duration-300 select-none"; // mantém text-sm nos botões
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

        {/* AVATAR MORPH */}
        <div className="w-full flex justify-center lg:w-1/3 select-none relative h-[15rem] sm:h-[18rem] lg:h-[17rem]">
          <div className="relative w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[17rem] lg:h-[17rem] rounded-full overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={currentAvatar}
                className="absolute inset-0 grid grid-cols-5 grid-rows-5"
                initial={{ zIndex: 10 }}
                animate={{ zIndex: 10 }}
                exit={{ zIndex: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                {Array.from({ length: 25 }).map((_, i) => {
                  const col = i % 5;
                  const row = Math.floor(i / 5);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (col + row) * 0.05, 
                        ease: "easeOut" 
                      }}
                      style={{
                        backgroundImage: `url(${avatars[currentAvatar]})`,
                        backgroundSize: '500% 500%',
                        backgroundPosition: `${col * 25}% ${row * 25}%`,
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutHero;
