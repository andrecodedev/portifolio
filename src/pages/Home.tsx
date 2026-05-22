import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes estruturais
import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

// Componentes da seção Sobre
import AboutHero from '../components/about/AboutHero';
import Title from '../components/Title';
import AboutStartsGrid from '../components/about/AboutStartsGrid';
import GithubContributions from '../components/about/GithubContributions';
import SliderSkills from '../components/SliderSkills';
import AboutVideo from '../components/about/AboutVideo';
import Experience from '../components/about/ExperienceSection';

// Componente de Intro
import IntroSection from '../components/ui/IntroSection';

import '../styles/lux.css';

interface HomeProps {
  skipIntro?: boolean;
}

function Home({ skipIntro = false }: HomeProps) {
  const { i18n } = useTranslation();

  const [showIntro, setShowIntro] = useState(!skipIntro);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (skipIntro) {
      setShowIntro(false);
      setIsTransitioning(false);
    }
  }, [skipIntro]);

  const handleStartExit = () => {
    setIsTransitioning(true);
  };

  const handleExitComplete = () => {
    setShowIntro(false);
    setIsTransitioning(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={`geral min-h-screen relative overflow-x-hidden ${showIntro ? 'h-screen' : ''}`}>
      <AnimatePresence>
        {showIntro && (
          <div className="fixed inset-0 z-[1000] pointer-events-auto">
            <IntroSection
              key="intro-dev-final"
              onTriggerExit={handleStartExit}
              onExitFinished={handleExitComplete}
            />
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={skipIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        animate={{
          opacity: isTransitioning || !showIntro ? 1 : 0,
          scale: isTransitioning || !showIntro ? 1 : 0.98,
        }}
        transition={{
          duration: 1.2,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.2
        }}
        style={{
          pointerEvents: showIntro && !isTransitioning ? 'none' : 'auto',
          maxHeight: showIntro ? '100vh' : 'none',
          overflow: showIntro ? 'hidden' : 'visible'
        }}
        className="flex flex-col flex-1"
      >
        <Header />

        <main className="flex-1">
          <section id="about" className="pt-4 sm:pt-14 space-y-12 sm:space-y-24">
            <FadeIn delay={0.1}>
              <Title title_1=" " />
            </FadeIn>

            <FadeIn delay={0.15}>
              <AboutHero />
            </FadeIn>

            <FadeIn delay={0.20}>
              <AboutStartsGrid />
            </FadeIn>

            <FadeIn delay={0.1}>
              <GithubContributions />
            </FadeIn>

            <FadeIn delay={0.1}>
              <AboutVideo videoId="v2vE1Ac-NxE" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <SliderSkills />
            </FadeIn>

            <FadeIn delay={0.1}>
              <Experience />
            </FadeIn>
          </section>
        </main>

        <footer>
          <Footer />
        </footer>
      </motion.div>
    </div>
  );
}

export default Home;
