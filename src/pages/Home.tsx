import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/lux.css';
import { useTranslation } from 'react-i18next';
import FadeIn from '../components/FadeIn';
import Typewriter from '../components/Typewriter';

function Home() {
  const { t, i18n } = useTranslation();

  document.documentElement.lang = i18n.language;

  return (
    <div className="geral">
      <header>
        <Header />
      </header>
      <main className="flex flex-1 flex-col justify-center items-center text-center p-4">
        <FadeIn duration={1000}>
        <section className="mx-2 sm:mx-1 md:mx-0 p-2 sm:p-0">
          <h1 className="lux font-medium text-[3rem] text-center sm:text-start leading-tight select-none">
            {t('home.welcome')}
          </h1>
          <p className="text-[0.9rem] font-jet text-center sm:text-justify leading-[1.6] text-[var(--text-primary)] select-none max-w-[65ch] mt-4">
            <Typewriter text={t('home.navigate')} resetKey={i18n.language} />
          </p>
        </section>
        </FadeIn>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
