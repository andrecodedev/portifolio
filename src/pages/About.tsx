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
      <header>      
        <Header />
      </header>
      <main>
        <FadeIn duration={1000}>
        {/* Título superior */}
        <Title title_1=" " />
        <AboutHero />
        <AboutStartsGrid
          number1=""
          description1=""
          number2=""
          description2=""
          number3=""
          description3=""
          number4=""
          description4=""
        />
        <AboutVideo videoId="v2vE1Ac-NxE" />
        <SliderSkills />
        {/* Título inferior */}
        <Title title_2=" " />
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
