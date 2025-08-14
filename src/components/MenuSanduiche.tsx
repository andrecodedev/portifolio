import React, { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';

interface MenuSanduicheProps {
  navigate: (path: string) => void;
  location: { pathname: string };
}

export const MenuSanduiche: React.FC<MenuSanduicheProps> = ({ navigate, location }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const toggleMenu = () => setOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const getButtonClass = (path: string) => {
    const isActive = location.pathname === path;

    return `
      px-6 py-3 text-sm cursor-pointer select-none rounded-[5px]
      transition-all duration-300 ease-in-out
      ${isActive 
        ? 'bg-[var(--button-active)] text-[var(--text-active)]' 
        : 'bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]'
      }
    `;
  };

  return (
    <div className="menu-sanduiche font-jet" ref={menuRef}>
      <div
        className={`hamburger ${open ? 'open' : ''}`}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label="Toggle menu"
      >
        <div />
        <div />
        <div />
      </div>

      {/* Força o Tailwind a incluir as classes dinâmicas no build */}
      <div className="hidden">
        bg-[var(--button-active)] text-[var(--text-active)]
        bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)]
      </div>

      <nav className={`nav-group mobile-only ${open ? 'open' : ''}`}>
        <button onClick={() => { navigate('/about'); setOpen(false); }} className={getButtonClass('/about')}>
          {t('nav.about')}
        </button>
        <button onClick={() => { navigate('/education'); setOpen(false); }} className={getButtonClass('/education')}>
          {t('nav.education')}
        </button>
        <button onClick={() => { navigate('/skills'); setOpen(false); }} className={getButtonClass('/skills')}>
          {t('nav.skills')}
        </button>
        <button onClick={() => { navigate('/project'); setOpen(false); }} className={getButtonClass('/project')}>
          {t('nav.projects')}
        </button>
        <button onClick={() => { navigate('/contact'); setOpen(false); }} className={getButtonClass('/contact')}>
          {t('nav.contact')}
        </button>
        <ThemeToggle />
      </nav>
    </div>
  );
};
