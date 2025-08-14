import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next';
import Title from '../components/Title';
import FadeIn from '../components/FadeIn';

function Projetos() {
    const { t, i18n } = useTranslation();
  
    document.documentElement.lang = i18n.language;

  return (
    <div className="geral">

      <header>
        <Header />
      </header>

      <main className="flex flex-1 flex-col justify-center items-center text-center p-4">
        <FadeIn duration={1000}>
          <Title title_5={t(" ")} />
        </FadeIn>
      </main>
      
      <footer>
        <Footer />
      </footer>
      
    </div>
  )
}

export default Projetos
