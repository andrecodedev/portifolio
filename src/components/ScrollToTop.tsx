
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../styles/scrollToTop.css';



interface ScrollToTopProps {
  sectionIds?: string[];
}

export const ScrollToTop = ({ sectionIds }: ScrollToTopProps) => {
  const [show, setShow] = useState(false);
  const [nextTarget, setNextTarget] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let found = null;
      if (sectionIds && sectionIds.length > 0) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.offsetTop < scrollY - 10) {
            found = sectionIds[i];
            break;
          }
        }
      }
      setNextTarget(found);
      // Só mostra se tem título acima OU se está mais de 300px do topo (pra garantir UX)
      setShow((found !== null) || (scrollY > 300 && (!sectionIds || sectionIds.length === 0)));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // já roda ao montar
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  const handleClick = () => {
    if (nextTarget) {
      const el = document.getElementById(nextTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Se não tem mais título acima, vai pro topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button className="scroll-to-top-bounce" onClick={handleClick} aria-label="Voltar ao topo">
      <FaArrowUp size={28} />
    </button>
  );
};
