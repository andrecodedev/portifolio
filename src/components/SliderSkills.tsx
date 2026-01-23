import { useRef, useEffect } from 'react';
import { allSkills } from '../data/skillsData';

const skills = allSkills;

const SkillsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll('.skill-item');
    const clones = Array.from(items).map(item => item.cloneNode(true));
    clones.forEach(clone => slider.appendChild(clone));

    // Duração total do ciclo (ajustado para ser mais lento)
    const duration = 400 * 1000;
    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      // Pegamos a largura real do item na tela atual para que a velocidade seja consistente
      const itemWidth = (items[0] as HTMLElement).offsetWidth || 250;

      if (progress >= 1) {
        startTime = timestamp;
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        requestAnimationFrame(() => {
          slider.style.transition = 'transform 0.1s linear';
        });
      } else {
        // Multiplica o progresso pela largura total real da lista original
        const translateX = -progress * (items.length * itemWidth);
        slider.style.transform = `translateX(${translateX}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="bg-transparent overflow-hidden select-none pointer-events-none">
      <div className="w-full overflow-hidden relative">
        <div
          ref={sliderRef}
          className="flex w-max will-change-transform py-4"
        >
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`
                skill-item flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110
                w-[120px] px-4           /* MOBILE: Tamanho ideal e espaçamento equilibrado */
                sm:w-[220px] sm:px-6    /* DESKTOP (Inalterado) */
                md:w-[150px] md:px-3    /* TABLET (Inalterado) */
                lg:w-[190px] lg:px-4    /* DESKTOP LG (Inalterado) */
              `}
              style={{ minWidth: 'auto' }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                loading="lazy"
                className={`
                  h-[55px] w-[55px] p-0    /* MOBILE: Ícones maiores e visíveis */
                  sm:h-[80px] sm:w-[80px] sm:p-1  /* DESKTOP (Inalterado) */
                  md:h-[60px] md:w-[60px] md:p-0.5 /* TABLET (Inalterado) */
                  lg:h-[70px] lg:w-[70px] lg:p-1   /* DESKTOP LG (Inalterado) */
                  max-w-full aspect-square object-contain drop-shadow-md transition-all duration-300
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSlider;