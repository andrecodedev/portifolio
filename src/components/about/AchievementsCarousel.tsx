import { useState } from 'react';
import AchievementCard from './AchievementCard';
import { useTranslation } from 'react-i18next';
import { achievementsData } from '../../data/achievementsData';
import '../../styles/achievementCard.css';

export default function AchievementsCarousel() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [mouseEndX, setMouseEndX] = useState<number | null>(null);
  const achievements = achievementsData(t);

  // Distância mínima para considerar um swipe
  const minSwipeDistance = 50;
  // Mouse drag handlers (desktop)
  const onMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    setMouseStartX(e.clientX);
    setMouseEndX(null);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return;
    setMouseEndX(e.clientX);
  };

  const onMouseUp = () => {
    if (!mouseDown || mouseStartX === null || mouseEndX === null) {
      setMouseDown(false);
      return;
    }
    const distance = mouseStartX - mouseEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    setMouseDown(false);
    setMouseStartX(null);
    setMouseEndX(null);
  };

  const resetFlips = () => {
    setFlippedCards(new Set());
  };

  const goToPrevious = () => {
    resetFlips();
    setCurrentIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  const goToNext = () => {
    resetFlips();
    setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className="carousel-container relative w-full max-w-6xl mx-auto px-4 mb-6 pb-6">
      {/* Botão anterior */}
      <button
        onClick={goToPrevious}
        className="carousel-btn carousel-btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--bg-secondary)] hover:bg-[var(--button-hover)] text-[var(--text-primary)] rounded-full p-3 shadow-lg transition-all duration-300"
        aria-label="Card anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Container do carrossel */}
      <div 
        className="carousel-wrapper relative overflow-hidden h-[500px] flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: mouseDown ? 'grabbing' : 'grab' }}
      >
        <div className="carousel-track flex items-center justify-center gap-4 relative w-full">
          {achievements.map((achievement, index) => {
            // Calcula a posição relativa ao card atual
            let position = index - currentIndex;
            
            // Ajusta para carrossel infinito
            if (position < -Math.floor(achievements.length / 2)) {
              position += achievements.length;
            } else if (position > Math.floor(achievements.length / 2)) {
              position -= achievements.length;
            }

            // Define classes baseadas na posição
            let className = 'carousel-card absolute transition-all duration-500 ease-in-out';
            let zIndex = 0;
            let scale = 0.7;
            let opacity = 0.4;
            let translateX = 0;
            let blur = 'blur-sm';
            let pointerEvents = 'none'; // Desabilita clique por padrão

            if (position === 0) {
              // Card central (ativo)
              className += ' carousel-card-active';
              zIndex = 10;
              scale = 1;
              opacity = 1;
              translateX = 0;
              blur = '';
              pointerEvents = 'all'; // Apenas o card central pode ser clicado
            } else if (position === -1) {
              // Card à esquerda
              className += ' carousel-card-left';
              zIndex = 5;
              scale = 0.8;
              opacity = 0.6;
              translateX = -65; // 35% visível (100 - 35 = 65)
              blur = '';
            } else if (position === 1) {
              // Card à direita
              className += ' carousel-card-right';
              zIndex = 5;
              scale = 0.8;
              opacity = 0.6;
              translateX = 65;
              blur = '';
            } else {
              // Cards ocultos
              opacity = 0;
              translateX = position > 0 ? 100 : -100;
            }

            return (
              <div
                key={achievement.id}
                className={className}
                style={{
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  width: '350px',
                  filter: blur,
                  pointerEvents: pointerEvents as React.CSSProperties['pointerEvents'],
                }}
              >
                <AchievementCard 
                  data={achievement} 
                  isFlipped={flippedCards.has(achievement.id)}
                  isActive={position === 0}
                  onFlip={(id, flipped) => {
                    const newFlipped = new Set(flippedCards);
                    if (flipped) {
                      newFlipped.add(id);
                    } else {
                      newFlipped.delete(id);
                    }
                    setFlippedCards(newFlipped);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Botão próximo */}
      <button
        onClick={goToNext}
        className="carousel-btn carousel-btn-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--bg-secondary)] hover:bg-[var(--button-hover)] text-[var(--text-primary)] rounded-full p-3 shadow-lg transition-all duration-300"
        aria-label="Próximo card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores (dots) */}
      <div className="flex justify-center gap-2 mt-4 mb-6">
        {achievements.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[var(--text-primary)] w-8'
                : 'bg-[var(--text-terceiro)] hover:bg-[var(--text-secondary)]'
            }`}
            aria-label={`Ir para card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
