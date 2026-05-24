import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBack, IoChevronForward, IoLockClosedOutline } from 'react-icons/io5';
import { ThemeToggle } from './ThemeToggle';
import { hapticFeedback } from '../utils/haptics';

// Importe as imagens diretamente
import PortuguesIcon from '../img/skills/portugues.svg';
import EnglishIcon from '../img/skills/eua.svg';
import SpanishIcon from '../img/skills/spanish.svg';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    hapticFeedback.success();
    i18n.changeLanguage(lng);
  };

  const toggleOpen = () => {
    hapticFeedback.light();
    setIsOpen(!isOpen);
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`language-switcher-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="language-toggle"
        onClick={toggleOpen}
        aria-label={t('aria.toggle_language')}
      >
        {isOpen ? <IoChevronForward size={20} /> : <IoChevronBack size={20} />}
      </button>

      <div className="language-switcher">
        {!isAdmin && (
          <div className="flex flex-col gap-3 pb-1" role="group" aria-label={t('aria.select_language')}>
          <button 
            onClick={() => changeLanguage('pt')} 
            disabled={i18n.language.startsWith('pt')} 
            title="Português"
            aria-label="Português"
          >
            <img src={PortuguesIcon} alt="Português" />
          </button>
          <button 
            onClick={() => changeLanguage('en')} 
            disabled={i18n.language.startsWith('en')} 
            title="English"
            aria-label="English"
          >
            <img src={EnglishIcon} alt="English" />
          </button>
          <button 
            onClick={() => changeLanguage('es')} 
            disabled={i18n.language.startsWith('es')} 
            title="Español"
            aria-label="Español"
          >
            <img src={SpanishIcon} alt="Español" />
          </button>
        </div>
        )}

        <div className="theme-switcher-sidebar-wrapper">
          {!isAdmin && <div className="w-[80%] h-[1px] bg-white/20 my-2 rounded-full mx-auto" />}
          <div className="flex justify-center items-center py-2 scale-[0.7] origin-center">
            <ThemeToggle />
          </div>
          {/* Secret Admin Portal */}
          <button 
            onClick={() => {
              hapticFeedback.light();
              navigate('/admin');
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 mt-1 text-[var(--text-terceiro)] hover:text-[var(--text-primary)] transition-all hover:scale-110 shadow-sm"
            style={{ backgroundColor: 'rgba(128, 128, 128, 0.15)' }}
            title="Acesso Restrito"
            aria-label="Admin"
          >
            <IoLockClosedOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
