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

    // Calcula posições absolutas de todos os títulos
    const mappedTitles = titles.map(el => ({
      position: el.getBoundingClientRect().top + scrollY,
      element: el
    }));

    // Filtra só os títulos que estão acima do scroll atual (com margem de segurança)
    // Usamos um offset de 20px para ignorar o título que o usuário já está vendo
    const prevTitles = mappedTitles.filter(
      (item) => item.position < scrollY - 20
    ).sort((a, b) => a.position - b.position);

    if (prevTitles.length === 0) {
      // Se não tem nenhum acima, vai pro topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Pega o último título acima do scroll (mais próximo)
    const target = prevTitles[prevTitles.length - 1];
    // Offset de respiro (em px) para centralizar um pouco o título ou deixar espaço no topo
    const offset = 180;
    window.scrollTo({ top: target.position - offset, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToPrevTitle}
      aria-label="Voltar ao título anterior"
      className={`fixed left-4 bottom-4 z-110 p-2 rounded-full bg-[var(--bg-secondary)] shadow-lg transition-opacity duration-300 hover:bg-[var(--bg-primary)] hover:scale-110 text-[var(--text-primary)] ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ outline: 'none' }}
    >
      {/* SVG seta para cima */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
