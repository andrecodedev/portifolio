import React, { useState, useEffect } from 'react';
import PixelHeart from '../ui/PixelHeart';
import { likesService } from '../../services/likesService';
import { formatLikes } from '../../utils/formatters';

interface LikeButtonProps {
    projectId: number;
    className?: string;
}

export default function LikeButton({ projectId, className = "" }: LikeButtonProps) {
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState(false);

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

        try {
            const result = await likesService.toggleLike(projectId);
            setLikes(result.count);
            setLiked(result.liked);
        } catch (err) {
            console.error("[LikeButton] Erro ao processar curtida:", err);
        }
    };


    return (
        <div
            className={`
                flex items-center gap-1.5 cursor-pointer select-none px-2 py-0.5 rounded-md transition-all duration-300 hover:scale-105 active:scale-95
                bg-[var(--bg-elements)] border border-[var(--border-gray)] 
                ${className}
            `}
            onClick={handleLike}
            title={liked ? "Descurtir" : "Curtir"}
        >
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
