import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { hapticFeedback } from '../utils/haptics';
import LiquidEther from './ui/LiquidEther';

interface MenuSanduicheProps {
  navigate: (path: string) => void;
  location: { pathname: string };
}

export const MenuSanduiche: React.FC<MenuSanduicheProps> = ({ navigate, location }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const openMenu = () => {
    hapticFeedback.medium();
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hapticFeedback.light();
    setOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const menuItems = [
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.education'), path: '/education' },
    { name: t('nav.skills'), path: '/skills' },
    { name: t('nav.projects'), path: '/project' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const handleNavigate = (path: string) => {
    hapticFeedback.success();
    closeMenu();
    setTimeout(() => {
      navigate(path);
    }, 700);
  };

  return (
    <div className="menu-sanduiche font-jet">
      {/* Botão Hambúrguer */}
      <motion.button
        onClick={openMenu}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: open ? 'none' : 'auto' }}
        className="group w-9 h-9 md:w-10 md:h-10 flex items-center justify-center
          rounded-md border border-[var(--border)] bg-[var(--bg-secondary)]
          hover:bg-[var(--button-hover)] transition-colors duration-300 shadow-lg shadow-black/10"
        aria-label={t('aria.open_menu')}
      >
        <div className="flex flex-col items-start gap-[5px]">
          <span className="w-5 md:w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
          <span className="w-5 md:w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
          <span className="w-3 md:w-4 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-300 group-hover:w-5 md:group-hover:w-6" />
        </div>
      </motion.button>

      {/* Overlay Full-Screen — clicar na área escura fecha o menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0 0%)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            onClick={closeMenu}
            className="fixed inset-0 z-[10000] bg-[var(--bg-primary)] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          >
            {/* Cantoneiras HUD - todas iguais */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-[var(--text-primary)] opacity-20 pointer-events-none" />
            {/* Cantoneira top-right removida — o botão CLOSE ocupa esse espaço */}
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-[var(--text-primary)] opacity-20 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-[var(--text-primary)] opacity-20 pointer-events-none" />
            {/* Botão fechar — HUD close button */}
            <button
              onClick={closeMenu}
              aria-label={t('aria.close_menu')}
              className="absolute top-8 right-8 z-20 flex items-center gap-2
                text-[var(--text-terceiro)] hover:text-[var(--text-primary)]
                transition-all duration-300 hover:-translate-y-0.5 group"
              style={{ pointerEvents: 'auto' }}
            >
              <span className="text-[10px] tracking-[0.35em] uppercase
                group-hover:tracking-[0.5em] transition-all duration-500">
                {t('button.close')}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 14 14"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                className="group-hover:rotate-90 transition-transform duration-500"
              >
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>

            {/* Elementos decorativos */}
            <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-2 items-center opacity-20 select-none pointer-events-none">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.4em] font-jet whitespace-nowrap uppercase">
                Developer Interface v2.0
              </span>
              <div className="w-[1px] h-16 lg:h-32 bg-[var(--text-primary)]" />
            </div>

            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2 items-center opacity-20 select-none pointer-events-none">
              <div className="w-[1px] h-16 lg:h-32 bg-[var(--text-primary)]" />
              <span className="[writing-mode:vertical-rl] text-[10px] tracking-[0.4em] font-jet whitespace-nowrap uppercase">
                System Status: Active
              </span>
            </div>

            {/* Background LiquidEther */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.25]">
              <LiquidEther 
                colors={['var(--text-primary)', 'var(--border-gray)', 'var(--text-terceiro)']}
                mouseForce={30}
                cursorSize={150}
                isViscous={true}
                viscous={20}
                iterationsViscous={16}
                iterationsPoisson={16}
                resolution={0.4}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
              />
            </div>

            {/* Background Grid - Agora usando a mesma classe e opacidade do site principal */}
            <div 
              className="absolute inset-0 pointer-events-none loading-grid-overlay"
              style={{ opacity: 'var(--grid-opacity)' }}
            />

            {/* Conteúdo principal — Refinado para equilíbrio visual e proporções profissionais */}
            <div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 cursor-default"
            >
              <div className="flex flex-col items-center gap-[clamp(0.5rem,3vh,2.5rem)] w-full max-w-4xl">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path || (item.path === '/about' && location.pathname === '/');
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      onClick={() => handleNavigate(item.path)}
                      className="group relative w-full flex items-center justify-center py-[clamp(0.25rem,1.5vh,1.25rem)] cursor-pointer"
                    >
                      <span className={`font-bold tracking-tighter transition-all duration-700 ease-in-out whitespace-nowrap text-[clamp(1.5rem,8vw,5rem)] md:text-[clamp(1.75rem,7vh,5rem)]
                        ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-terceiro)] group-hover:text-[var(--text-primary)] group-hover:tracking-wider'}
                      `}>
                        {item.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="active-underline"
                          className="absolute bottom-1 md:bottom-2 w-10 md:w-16 h-1 bg-[var(--text-primary)] shadow-[0_0_15px_var(--text-primary)]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer - Copyright apenas, conforme solicitado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="absolute bottom-6 md:bottom-12 flex flex-col items-center w-full px-4 cursor-default"
            >
              <div className="text-[var(--text-terceiro)] text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50">
                © {new Date().getFullYear()} AndreCodeDev
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
