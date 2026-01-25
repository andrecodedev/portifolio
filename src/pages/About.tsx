import Header from '../components/Header';
import Footer from '../components/Footer';

import AboutHero from '../components/about/AboutHero';
import Title from '../components/Title';
import AboutStartsGrid from '../components/about/AboutStartsGrid';
import SliderSkills from '../components/SliderSkills';
import AboutVideo from '../components/about/AboutVideo';
import Experience from '../components/about/ExperienceSection';
import FadeIn from '../components/FadeIn';

function Sobre() {
  return (
    <div className="geral">
      <Header />
      <main>
        <FadeIn duration={1000}>
          {/* Título superior */}
          <Title title_1=" " />
          <AboutHero />
          <AboutStartsGrid />
          <AboutVideo videoId="v2vE1Ac-NxE" />
          <SliderSkills />
          {/* Experiências com título dinâmico dentro */}
          <Experience />
        </FadeIn>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Sobre;
