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
        ? 'active-premium'
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
          {location.pathname === '/about' && <span className="active-premium-bg" />}
          <span className="relative z-10">{t('nav.about')}</span>
        </button>
        <button onClick={() => { navigate('/education'); setOpen(false); }} className={getButtonClass('/education')}>
          {location.pathname === '/education' && <span className="active-premium-bg" />}
          <span className="relative z-10">{t('nav.education')}</span>
        </button>
        <button onClick={() => { navigate('/skills'); setOpen(false); }} className={getButtonClass('/skills')}>
          {location.pathname === '/skills' && <span className="active-premium-bg" />}
          <span className="relative z-10">{t('nav.skills')}</span>
        </button>
        <button onClick={() => { navigate('/project'); setOpen(false); }} className={getButtonClass('/project')}>
          {location.pathname === '/project' && <span className="active-premium-bg" />}
          <span className="relative z-10">{t('nav.projects')}</span>
        </button>
        <button onClick={() => { navigate('/contact'); setOpen(false); }} className={getButtonClass('/contact')}>
          {location.pathname === '/contact' && <span className="active-premium-bg" />}
          <span className="relative z-10">{t('nav.contact')}</span>
        </button>
        <ThemeToggle />
      </nav>
    </div>
  );
};
