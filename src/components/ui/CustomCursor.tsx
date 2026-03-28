import { useEffect, useRef, useState } from "react";

/**
 * CustomGridInteraction: A tech-themed square trailer and ripple effect.
 * Dynamically uses CSS variables for theme compatibility.
 */
export default function CustomGridInteraction() {
    const trailerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    // Mouse positions
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const trailerX = useRef(0);
    const trailerY = useRef(0);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const onClick = (e: MouseEvent) => {
            const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
            setRipples((prev) => [...prev, newRipple]);
            setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 800);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("click", onClick);
        document.addEventListener("mouseleave", () => setIsVisible(false));
        document.addEventListener("mouseenter", () => setIsVisible(true));

        let animationId: number;
        const render = () => {
            const lerpFactor = 0.5;
            trailerX.current += (mouseX.current - trailerX.current) * lerpFactor;
            trailerY.current += (mouseY.current - trailerY.current) * lerpFactor;

            if (trailerRef.current) {
                trailerRef.current.style.transform = `translate3d(${trailerX.current}px, ${trailerY.current}px, 0)`;
            }
            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("click", onClick);
            cancelAnimationFrame(animationId);
        };
    }, [isVisible]);

    if (typeof window === "undefined") return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
            <style>{`
        @keyframes tech-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes ripple-square {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        .tech-pixel {
          width: 8px;
          height: 8px;
          background-color: var(--bg-primary);
          border: 1.5px solid var(--text-primary);
          animation: tech-pulse 2s infinite ease-in-out;
          box-shadow: 0 0 8px color-mix(in srgb, var(--text-primary) 30%, transparent);
        }
        .ripple-box {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1px solid var(--text-primary);
          animation: ripple-square 0.5s ease-out forwards;
        }
      `}</style>

            {/* Trailer (Theme-aware Pixel) */}
            <div
                ref={trailerRef}
                className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} hidden md:block`}
            >
                <div className="tech-pixel" />
            </div>

            {/* Ripple Clicks */}
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="ripple-box"
                    style={{ left: ripple.x, top: ripple.y }}
                />
            ))}
        </div>
    );
}
