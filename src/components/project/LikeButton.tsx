import React, { useState, useEffect } from 'react';
import PixelHeart from '../ui/PixelHeart';
import { likesService } from '../../services/likesService';
import { formatLikes } from '../../utils/formatters';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface LikeButtonProps {
    projectId: number;
    className?: string;
}

export default function LikeButton({ projectId, className = "" }: LikeButtonProps) {
    const { t } = useTranslation();
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchLikes = async () => {
            try {
                const currentLikes = await likesService.getLikes(projectId);
                if (isMounted) {
                    setLikes(currentLikes);
                    setLiked(likesService.isLikedByUser(projectId));
                }
            } catch (err) {
                console.error("[LikeButton] Erro ao carregar curtidas iniciais:", err);
            }
        };
        fetchLikes();
        return () => { isMounted = false; };
    }, [projectId]);

    const handleLike = async (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);

        // Feedback visual flutuante (apenas se for curtir)
        if (!liked) {
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 1000);
        }

        try {
            const result = await likesService.toggleLike(projectId);
            setLikes(result.count);
            setLiked(result.liked);
            // Notificar outros componentes do mudança
            window.dispatchEvent(new CustomEvent('project-like-changed', { detail: { projectId, liked: result.liked } }));
        } catch (err) {
            console.error("[LikeButton] Erro ao processar curtida:", err);
        }
    };


    return (
        <div
            className={`
                relative flex items-center gap-1.5 cursor-pointer select-none px-2 py-0.5 rounded-md transition-all duration-300 hover:scale-105 active:scale-95
                bg-[var(--bg-elements)] border border-[var(--border-gray)] 
                ${className}
            `}
            onClick={handleLike}
            title={liked ? t('ProjectModal.unlike_tooltip') : t('ProjectModal.like_tooltip')}
        >
            {/* Feedback flutuante */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.span
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -25 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold text-red-500 whitespace-nowrap pointer-events-none drop-shadow-sm"
                    >
                        {t('ProjectModal.like_feedback')}
                    </motion.span>
                )}
            </AnimatePresence>

            <div className={`relative transition-transform duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                <PixelHeart
                    filled={liked}
                    className="w-4 h-4 md:w-5 md:h-5"
                />
            </div>

            <span className={`
                text-[10px] md:text-xs font-bold font-jet transition-colors duration-300
                ${liked ? 'text-red-500' : 'text-[var(--text-primary)]'}
            `}>
                {formatLikes(likes)}
            </span>
        </div>
    );
}
