import React, { useEffect, useState } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToPrevTitle = () => {
    // Pega todos os títulos na página
    const titles = Array.from(document.querySelectorAll<HTMLElement>('.section-title'));
    if (titles.length === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Pega a posição do scroll atual
    const scrollY = window.scrollY;
    // Filtra só os títulos que estão acima do scroll atual (com margem de 10px)
    const prevTitles = titles.filter(
      (el) => el.offsetTop < scrollY - 10
    );

    if (prevTitles.length === 0) {
      // Se não tem nenhum acima, vai pro topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Pega o último título acima do scroll (mais próximo)
    const target = prevTitles[prevTitles.length - 1];
    // Offset de respiro (em px)
    const offset = 180; // ajuste aqui se quiser mais/menos espaço
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToPrevTitle}
      aria-label="Voltar ao título anterior"
      className={`fixed left-4 bottom-4 z-50 p-2 rounded-full bg-[var(--bg-secondary)] shadow-lg transition-opacity duration-300 hover:bg-[var(--bg-primary)] hover:scale-110 text-[var(--text-primary)] ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ outline: 'none' }}
    >
      {/* SVG seta para cima */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
