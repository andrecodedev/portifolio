import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface FilterCarouselProps {
    children: React.ReactNode;
    className?: string;
}

export default function FilterCarousel({ children, className = "" }: FilterCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    }, []);

    useEffect(() => {
        checkScroll();
        const currentRef = scrollRef.current;
        if (currentRef) {
            const resizeObserver = new ResizeObserver(() => checkScroll());
            resizeObserver.observe(currentRef);
            return () => resizeObserver.disconnect();
        }
    }, [children, checkScroll]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.75;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`w-full max-w-full overflow-hidden relative ${className}`}>
            <div className="relative w-full max-w-5xl mx-auto flex items-center">
                {/* Botão Esquerda */}
                <div
                    className={`absolute left-0 top-0 bottom-0 z-20 w-16 flex items-center justify-start transition-opacity duration-300 pointer-events-none ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        onClick={() => scroll('left')}
                        className="ml-2 p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-lg pointer-events-auto hover:scale-110 transition-transform active:scale-95 border border-[var(--border)]"
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto no-scrollbar w-full scroll-smooth"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)'
                    }}
                >
                    <div className="flex flex-nowrap gap-2 px-8 py-4 mx-auto w-fit min-w-max">
                        {children}
                    </div>
                </div>

                {/* Botão Direita */}
                <div
                    className={`absolute right-0 top-0 bottom-0 z-20 w-16 flex items-center justify-end transition-opacity duration-300 pointer-events-none ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        onClick={() => scroll('right')}
                        className="mr-2 p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-lg pointer-events-auto hover:scale-110 transition-transform active:scale-95 border border-[var(--border)]"
                        aria-label="Scroll right"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
