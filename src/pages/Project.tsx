import Header from '../components/Header'
import Footer from '../components/Footer'
import Title from '../components/Title';

import { useTranslation } from 'react-i18next';

function Project() {
    const { t, i18n } = useTranslation();
  
    document.documentElement.lang = i18n.language;

  return (
    <div className="geral">

      <header>
        <Header />
      </header>

      <main className="flex flex-1 flex-col justify-center items-center text-center p-4">
        <Title title_5={t(" ")} />
      </main>
      
      <footer>
        <Footer />
      </footer>
      
    </div>
  )
}

export default Project
