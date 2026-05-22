import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
    useKFormatter?: boolean;
}

export default function CountUp({
    end,
    duration = 3000,
    decimals = 0,
    suffix = '',
    prefix = '',
    useKFormatter = false
}: CountUpProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        startTimeRef.current = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / duration, 1);

            // Easing function: outExpo
            const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            const currentCount = easing * end;
            setCount(currentCount);

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setIsFinished(true);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, isVisible]);

    let formattedCount = '';
    if (useKFormatter && isFinished && count >= 1000) {
        formattedCount = (count / 1000).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }) + 'K';
    } else {
        formattedCount = count.toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    }

    return (
        <span ref={elementRef}>
            {prefix}{formattedCount}{suffix}
        </span>
    );
}
