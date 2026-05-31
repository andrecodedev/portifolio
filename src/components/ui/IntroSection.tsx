import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from './Typewriter';
import { supabase } from '../../lib/supabaseClient';
import { Skeleton } from './Skeleton';

interface IntroSectionProps {
    onTriggerExit: () => void;
    onExitFinished: () => void;
}

const TECH_CHARS = [
    '0', '1', '{', '}', '/', '/>', '(', ')', ';', '[', ']', '<', '>', '&&', '||', '!=', '==',
    'const', 'let', 'return', 'if', 'else', 'async', 'await', 'import', 'map', 'void', 'HTML', 'JSON', 'API'
];

const IntroSection = ({ onTriggerExit, onExitFinished }: IntroSectionProps) => {
    const { t, i18n } = useTranslation();
    const [isExiting, setIsExiting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTypingFinished, setIsTypingFinished] = useState(false);
    const [heroData, setHeroData] = useState<{title_pt: string, title_en: string, title_es?: string, description_pt: string, description_en: string, description_es?: string} | null>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const { data, error } = await supabase!.from('hero_section').select('*').limit(1).single();
                if (data) {
                    setHeroData(data);
                } else {
                    setHeroData({ title_pt: '', title_en: '', title_es: '', description_pt: '', description_en: '', description_es: '' });
                }
            } catch (e) {
                console.error(e);
                setHeroData({ title_pt: '', title_en: '', title_es: '', description_pt: '', description_en: '', description_es: '' });
            }
        };
        fetchHero();
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleTrigger = () => {
            if (!isExiting) {
                setIsExiting(true);
                onTriggerExit();
                setTimeout(onExitFinished, 1300);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 5) handleTrigger();
        };

        const handleTouch = () => handleTrigger();

        window.addEventListener('wheel', handleWheel);
        window.addEventListener('touchmove', handleTouch);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchmove', handleTouch);
        };
    }, [isExiting, onTriggerExit, onExitFinished]);

    // Reset typing status on language change
    useEffect(() => {
        setIsTypingFinished(false);
    }, [i18n.language]);

    const burstRain = useMemo(() => Array.from({ length: isMobile ? 35 : 55 }).map((_, i) => ({
        id: `burst-${i}`,
        left: `${Math.random() * 100}%`,
        duration: 0.6 + Math.random() * 1.4,
        char: TECH_CHARS[Math.floor(Math.random() * TECH_CHARS.length)],
        fontSize: isMobile ? 12 : 16
    })), [isMobile]);

    const dataBlocks = useMemo(() => Array.from({ length: isMobile ? 9 : 12 }).map((_, i) => {
        const sideX = Math.random() > 0.5 ? 1 : -1;
        const sideY = Math.random() > 0.5 ? 1 : -1;

        let yOffset;
        if (isMobile) {
            yOffset = (22 + Math.random() * 60) * sideY;
        } else {
            yOffset = sideY * (15 + Math.random() * 75);
        }

        return {
            id: i,
            size: isMobile ? (100 + Math.random() * 140) : (150 + Math.random() * 250),
            x: sideX * (15 + Math.random() * 70),
            y: yOffset,
            rotate: Math.random() * 360,
        };
    }), [isMobile]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 0.8, ease: "easeOut" }
                    }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1.2, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[1001] flex flex-col justify-center items-center bg-transparent overflow-hidden"
                    style={{ willChange: 'opacity' }}
                >
                    <AnimatePresence>
                        {isExiting && (
                            <div className="absolute inset-0 overflow-hidden z-20">
                                {burstRain.map((bit) => (
                                    <motion.span
                                        key={bit.id}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: [0, 1, 0], y: window.innerHeight + 100 }}
                                        transition={{ duration: bit.duration, ease: "linear" }}
                                        className="absolute font-jet font-bold"
                                        style={{
                                            left: bit.left,
                                            fontSize: `${bit.fontSize}px`,
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        {bit.char}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Blocos de Dados */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {dataBlocks.map((block) => (
                            <motion.div
                                key={block.id}
                                exit={{
                                    scale: [1, 5],
                                    opacity: [0, 0.3, 0],
                                    rotate: block.rotate + 45,
                                }}
                                transition={{ duration: 1.8, ease: "easeOut" }}
                                className="absolute border-[0.5px]"
                                style={{
                                    width: block.size,
                                    height: block.size,
                                    left: `calc(50% + ${block.x}%)`,
                                    top: `calc(50% + ${block.y}%)`,
                                    transform: `rotate(${block.rotate}deg)`,
                                    borderColor: 'color-mix(in srgb, var(--text-primary), transparent 82%)',
                                    backgroundColor: 'color-mix(in srgb, var(--text-primary), transparent 94%)',
                                }}
                            />
                        ))}
                    </div>

                    {/* TITULO NO CENTRO ABSOLUTO */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
                        }}
                        exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.2, ease: "easeInOut" } }}
                        className="relative z-30 text-center flex flex-col items-center"
                    >
                        {heroData ? (
                            <>
                                <h1
                                    className="lux text-[2.2rem] sm:text-[4.2rem] tracking-tighter px-6"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {i18n.language.startsWith('pt') ? heroData.title_pt : i18n.language.startsWith('es') ? (heroData.title_es || heroData.title_en) : heroData.title_en}
                                </h1>
                                
                                {(heroData.description_pt || heroData.description_en || heroData.description_es) && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-jet tracking-wide max-w-2xl px-6 opacity-80"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {i18n.language.startsWith('pt') ? heroData.description_pt : i18n.language.startsWith('es') ? (heroData.description_es || heroData.description_en) : heroData.description_en}
                                    </motion.p>
                                )}
                            </>
                        ) : null}
                    </motion.div>

                    {/* GUIA DE SCROLL NA BASE */}
                    <div
                        className="absolute bottom-12 sm:bottom-16 left-0 right-0 flex flex-col items-center z-50 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isExiting) {
                                setIsExiting(true);
                                onTriggerExit();
                                setTimeout(onExitFinished, 1300);
                            }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.2, ease: "easeInOut" } }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            <motion.span
                                animate={{ y: isTypingFinished ? -10 : 0 }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                className="font-jet text-[9px] sm:text-[11px] uppercase tracking-[0.5em] mb-2"
                                style={{ color: 'var(--text-primary)', opacity: 0.6 }}
                            >
                                <Typewriter
                                    text={t('common.scroll_to_explore') || "Scroll para explorar"}
                                    speed={60}
                                    delay={0}
                                    onComplete={() => setIsTypingFinished(true)}
                                    resetTrigger={i18n.language}
                                />
                            </motion.span>

                            <AnimatePresence>
                                {isTypingFinished && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: 0.9,
                                            height: 'auto',
                                            transition: {
                                                height: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                                                opacity: { duration: 1, delay: 0.5 }
                                            }
                                        }}
                                        className="flex flex-col items-center overflow-visible pb-10"
                                    >
                                        {!isMobile ? (
                                            /* MOUSE DESKTOP */
                                            <div className="relative transform scale-75 origin-top mt-2">
                                                <div className="absolute inset-x-0 top-1 bottom-1 bg-[var(--text-primary)] opacity-5 blur-md rounded-full" />
                                                <svg width="30" height="46" viewBox="0 0 30 46" fill="none" className="opacity-60 relative z-10">
                                                    <rect x="0.75" y="0.75" width="28.5" height="44.5" rx="14.25" stroke="currentColor" strokeWidth="1.5" />
                                                    <line x1="15" y1="1" x2="15" y2="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                                                    <line x1="1" y1="18" x2="29" y2="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                                                    <rect x="13" y="7" width="4" height="9" rx="2" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
                                                    <path d="M11 37H19M10 40H20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
                                                </svg>
                                                <motion.div
                                                    animate={{ y: [0, 5, 0], opacity: [1, 0.4, 1] }}
                                                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-[1.5px] h-2.5 bg-[var(--text-primary)] rounded-full absolute top-[9px] left-1/2 -translate-x-1/2"
                                                    style={{ boxShadow: '0 0 10px var(--text-primary)' }}
                                                />
                                            </div>
                                        ) : (
                                            /* MÃO MOBILE */
                                            <div className="relative transform scale-75 origin-top mt-2">
                                                <motion.div
                                                    animate={{ y: [5, -5, 5], opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 2.5, repeat: Infinity }}
                                                    className="text-[var(--text-primary)]"
                                                >
                                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                                        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        )}
                                        <motion.div
                                            animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
                                            transition={{ duration: 2.5, repeat: Infinity }}
                                            className="mt-2 text-[var(--text-primary)]"
                                        >
                                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                                                <path d="M11 1L6 6L1 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>

                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.4 }}
                                            transition={{ delay: 1, duration: 1 }}
                                            className="font-jet text-[7px] sm:text-[9px] uppercase tracking-[0.2em] mt-4"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {t('common.click_to_explore')}
                                        </motion.span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroSection;
