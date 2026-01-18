import { useState, useEffect } from 'react';
import type { AchievementData } from '../../data/achievementsData';

interface AchievementCardProps {
  data: AchievementData;
  isFlipped?: boolean;
  isActive?: boolean;
  onFlip?: (id: number, flipped: boolean) => void;
}

export default function AchievementCard({ data, isFlipped: externalFlipped, isActive, onFlip }: AchievementCardProps) {
  // Animação intermitente do ícone de rotação (só no card central)
  const [showSpin, setShowSpin] = useState(false);
  useEffect(() => {
    if (!isActive) {
      setShowSpin(false);
      return;
    }
    let timeout: ReturnType<typeof setTimeout>;
    const startSpin = () => {
      setShowSpin(true);
      timeout = setTimeout(() => setShowSpin(false), 1000); // gira por 1s
    };
    startSpin();
    const interval = setInterval(startSpin, 3000); // a cada 3s
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isActive]);
  const [internalFlipped, setInternalFlipped] = useState(false);
  
  // Se tem controle externo, usa ele; senão usa o interno
  const isFlipped = externalFlipped !== undefined ? externalFlipped : internalFlipped;

  // Sincroniza estado externo com interno quando muda externamente
  useEffect(() => {
    if (externalFlipped !== undefined) {
      setInternalFlipped(externalFlipped);
    }
  }, [externalFlipped]);

  const handleClick = () => {
    const newFlipped = !isFlipped;
    
    if (onFlip) {
      onFlip(data.id, newFlipped);
    } else {
      setInternalFlipped(newFlipped);
    }
  };

  // Remover mensagem: só ícone permanece
  const handleCardClick = () => {
    handleClick();
  };

  return (
    <div
      className="achievement-card-wrapper perspective-1000 cursor-pointer select-none"
      onClick={handleCardClick}
    >
      <div
        className={`achievement-card relative w-full aspect-[4/5] transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Frente do card (imagem) */}
        <div className="achievement-card-face achievement-card-front absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg bg-[var(--bg-secondary)]">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-contain"
          />
          {/* Ícone sempre visível no card central, mensagem colada do lado esquerdo, borda arredondada só à esquerda */}
          {/* Ícone só aparece no card central, com fundo suave */}
          {isActive && !isFlipped && (
            <div className="absolute top-4 right-4 z-30">
              <div className={`bg-black/50 rounded-full p-2 flex items-center justify-center ${showSpin ? 'spin-once' : ''}`}> 
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          )}
          {/* Não exibir ícone nos cards laterais; somente o bloco acima (isActive) o mostra. */}
        </div>

        {/* Verso do card (texto) */}
        <div className="achievement-card-face achievement-card-back absolute w-full h-full backface-hidden rotate-y-180 bg-[var(--bg-secondary)] rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-jet">
            {data.title}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed font-jet">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
