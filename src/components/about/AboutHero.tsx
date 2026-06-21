import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import type { AboutHeroData } from '../admin/AboutHeroEditor';
import andreAvatar from '../../img/andre_antigo.png';

function AboutHero() {
  const { t, i18n } = useTranslation();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<AboutHeroData | null>(null);
  const [avatarIdx, setAvatarIdx] = useState(0);

  document.documentElement.lang = i18n.language;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await supabase!.from('about_page').select('hero').limit(1).single();
        if (data?.hero?.titlePt) setCmsData(data.hero as AboutHeroData);
      } catch { /* fallback para i18n */ }
    };
    fetchAbout();
  }, []);

  useEffect(() => {
    const gallery = cmsData?.avatarGallery;
    if (!gallery || gallery.length <= 1) return;
    const interval = setInterval(() => {
      setAvatarIdx(prev => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cmsData?.avatarGallery]);

  const lang = i18n.language;
  const title = cmsData
    ? (lang.startsWith('pt') ? cmsData.titlePt : lang.startsWith('es') ? cmsData.titleEs : cmsData.titleEn)
    : t('about.nome');
  const subtitle = cmsData
    ? (lang.startsWith('pt') ? cmsData.subtitlePt : lang.startsWith('es') ? cmsData.subtitleEs : cmsData.subtitleEn)
    : t('about.cargo');
  const desc = cmsData
    ? (lang.startsWith('pt') ? cmsData.descPt : lang.startsWith('es') ? cmsData.descEs : cmsData.descEn)
    : null;
  const gallery = cmsData?.avatarGallery ?? [];
  const avatarSrc = gallery.length > 0 ? gallery[avatarIdx] : andreAvatar;
  const hasButtons = (cmsData?.buttons?.length ?? 0) > 0;

  const buttonBase = "text-sm px-6 py-2 rounded-md transition-all duration-300 select-none";
  const buttonStyle = "bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]";
  const activeStyle = "bg-[var(--button-active)]";

  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center text-center px-4 py-2 sm:px-8 lg:px-16">
      <section className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 text-justify">
        {/* TEXTOS */}
        <div className="w-full lg:w-2/3 p-4">
          <p className="text-xl sm:text-2xl font-jet leading-snug tracking-tight">
            {title}
          </p>
          <p className="text-base mb-4 font-jet leading-snug tracking-tight text-[var(--text-terceiro)]">
            {subtitle}
          </p>

          {desc ? (
            <div
              className="text-sm mt-4 font-jet leading-snug tracking-tight"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          ) : (
            <>
              <p
                className="text-sm mt-4 font-jet leading-snug tracking-tight"
                dangerouslySetInnerHTML={{ __html: t('about.descricao_1') }}
              />
              <p className="text-sm mt-2 font-jet leading-snug tracking-tight">
                {t('about.descricao_2')}
              </p>
            </>
          )}

          {/* BOTÕES */}
          <div className="flex flex-wrap gap-4 mt-6 pointer-events-auto font-jet">
            {hasButtons ? (
              cmsData!.buttons.map(btn => (
                <a
                  key={btn.id}
                  href={btn.link}
                  className={`${buttonBase} ${buttonStyle} ${activeBtn === btn.id ? activeStyle : ''}`}
                  onClick={() => setActiveBtn(btn.id)}
                >
                  {lang.startsWith('pt') ? btn.textPt : lang.startsWith('es') ? btn.textEs : btn.textEn}
                </a>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* FOTO */}
        <div className="w-full flex justify-center lg:w-1/3 select-none">
          <div className="relative w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[17rem] lg:h-[17rem]">
            <AnimatePresence mode="wait">
              <motion.img
                key={avatarSrc}
                src={avatarSrc}
                alt="André Vitor"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover rounded-[50%]"
              />
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutHero;
