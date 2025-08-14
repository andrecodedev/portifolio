import { useTranslation } from 'react-i18next';

// Importe as imagens diretamente
import PortuguesIcon from '../img/skills/portugues.svg';
import EnglishIcon from '../img/skills/eua.svg';
import SpanishIcon from '../img/skills/spanish.svg';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('pt')} disabled={i18n.language === 'pt'}>
        <img src={PortuguesIcon} alt="Português" />
      </button>
      <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>
        <img src={EnglishIcon} alt="English" />
      </button>
      <button onClick={() => changeLanguage('es')} disabled={i18n.language === 'es'}>
        <img src={SpanishIcon} alt="Español" />
      </button>
    </div>
  );
}

export default LanguageSwitcher;
