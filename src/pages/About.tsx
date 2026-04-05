import Header from '../components/Header';
import Footer from '../components/Footer';

import AboutHero from '../components/about/AboutHero';
import Title from '../components/Title';
import AboutStartsGrid from '../components/about/AboutStartsGrid';
import SliderSkills from '../components/SliderSkills';
import AboutVideo from '../components/about/AboutVideo';
import Experience from '../components/about/ExperienceSection';
import AboutHighlights from '../components/about/AboutHighlights';
import FadeIn from '../components/FadeIn';

function Sobre() {
  return (
    <div className="geral">
      <Header />
      <main className="space-y-8 sm:space-y-16">
        <FadeIn delay={0.15}>
          <Title title_1=" " />
        </FadeIn>

        <FadeIn delay={0.30}>
          <AboutHero />
        </FadeIn>

        <FadeIn delay={0.45}>
          <AboutStartsGrid />
        </FadeIn>

        <FadeIn delay={0.60}>
          <AboutVideo videoId="v2vE1Ac-NxE" />
        </FadeIn>

        <FadeIn delay={0.75}>
          <SliderSkills />
        </FadeIn>

        <FadeIn delay={0.90}>
          <Experience />
        </FadeIn>

        <FadeIn delay={1.05}>
          <AboutHighlights />
        </FadeIn>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Sobre;
