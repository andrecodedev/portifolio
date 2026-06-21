import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { Skeleton } from '../ui/Skeleton';
import type { AboutHeroData } from '../admin/AboutHeroEditor';
import andreAvatar from '../../img/andre_antigo.png';

function AboutHero() {
  const { t, i18n } = useTranslation();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<AboutHeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarIdx, setAvatarIdx] = useState(0);

  document.documentElement.lang = i18n.language;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await supabase!.from('about_page').select('hero').limit(1).single();
        if (data?.hero?.titlePt) setCmsData(data.hero as AboutHeroData);
      } catch { /* fallback para i18n */ } finally {
        setLoading(false);
      }
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
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.section
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8"
          >
            {/* SKELETON TEXTO */}
            <div className="w-full lg:w-2/3 p-4 flex flex-col gap-3">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <div className="flex flex-col gap-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="flex gap-3 mt-4">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-36" />
              </div>
            </div>
            {/* SKELETON AVATAR */}
            <div className="w-full flex justify-center lg:w-1/3">
              <Skeleton className="w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[17rem] lg:h-[17rem] rounded-[50%]" />
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 text-justify"
          >
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
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AboutHero;
