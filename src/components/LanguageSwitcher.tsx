import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ThemeToggle } from './ThemeToggle';

// Importe as imagens diretamente
import PortuguesIcon from '../img/skills/portugues.svg';
import EnglishIcon from '../img/skills/eua.svg';
import SpanishIcon from '../img/skills/spanish.svg';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`language-switcher-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle language switcher"
      >
        {isOpen ? <IoChevronForward size={20} /> : <IoChevronBack size={20} />}
      </button>

      <div className="language-switcher">
        <div className="flex flex-col gap-3 pb-1">
          <button onClick={() => changeLanguage('pt')} disabled={i18n.language === 'pt'} title="Português">
            <img src={PortuguesIcon} alt="Português" />
          </button>
          <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'} title="English">
            <img src={EnglishIcon} alt="English" />
          </button>
          <button onClick={() => changeLanguage('es')} disabled={i18n.language === 'es'} title="Español">
            <img src={SpanishIcon} alt="Español" />
          </button>
        </div>

        <div className="theme-switcher-sidebar-wrapper">
          <div className="w-[80%] h-[1px] bg-white/20 my-2 rounded-full mx-auto" />
          <div className="flex justify-center items-center py-2 scale-[0.7] origin-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
