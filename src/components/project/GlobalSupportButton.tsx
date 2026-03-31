import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../../data/projectsData';
import { likesService } from '../../services/likesService';
import PixelHeart from '../ui/PixelHeart';

const GLOBAL_SUPPORT_KEY = 'user_global_support_given';

export default function GlobalSupportButton() {
    const { t } = useTranslation();
    const [isSupported, setIsSupported] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showStatusText, setShowStatusText] = useState(false);
    const [isReady, setIsReady] = useState(false); // Apenas para evitar o glitch de render inicial

    useEffect(() => {
        const supportStatus = localStorage.getItem(GLOBAL_SUPPORT_KEY) === 'true';
        setIsSupported(supportStatus);
        setIsReady(true); // Indica que o estado inicial foi carregado
    }, []);

    const handleSupportAll = async () => {
        if (isSupported || isLoading) return;

        setIsLoading(true);
        setIsAnimating(true);

        try {
            const projectsToLike = projectsData.filter(p => !likesService.isLikedByUser(p.id));
            await Promise.all(projectsToLike.map(p => likesService.toggleLike(p.id)));

            localStorage.setItem(GLOBAL_SUPPORT_KEY, 'true');
            setIsSupported(true);

            setShowStatusText(true);
            setShowText(true);

            setTimeout(() => {
                setShowStatusText(false);
                setShowText(false);
            }, 7000);

        } catch (error) {
            console.error('[GlobalSupport] Erro ao apoiar projetos:', error);
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsAnimating(false), 1000);
        }
    };

    // Não renderiza nada até que o estado do localStorage seja lido (evita o glitch inicial)
    if (!isReady) return null;

    return (
        <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-[100] flex flex-col items-end gap-2 md:gap-3 pointer-events-none">
            {/* Mensagem de Gratidão */}
            <div className={`
                bg-[var(--bg-secondary)] border border-[var(--border-gray)] 
                px-3 py-2 md:px-4 md:py-2.5 rounded-lg shadow-xl backdrop-blur-sm
                flex items-center gap-2 md:gap-3 transition-all duration-500 transform
                ${showText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}
            `}>
                <PixelHeart filled className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                <p className="text-[10px] md:text-[12px] font-bold font-jet text-red-500 whitespace-nowrap">
                    {t('support.thanks', 'Obrigado pelo carinho!')}
                </p>
            </div>

            {/* Botão Principal - Sem transição de entrada, carrega instantâneo após leitura do estado */}
            <button
                onClick={handleSupportAll}
                disabled={isSupported || isLoading}
                className={`
                    pointer-events-auto
                    flex items-center justify-center p-3 md:p-3.5 rounded-xl
                    bg-[var(--bg-secondary)] border border-[var(--border-gray)]
                    transition-all duration-500 shadow-lg
                    ${!isSupported && 'hover:scale-105 hover:border-red-500/50 hover:bg-[var(--bg-primary)] group gap-2 md:gap-3 px-3 md:px-5'}
                    ${isSupported && showStatusText && 'gap-2 md:gap-3 px-3 md:px-5'}
                    ${isSupported && !showStatusText && 'w-[44px] h-[44px] md:w-[54px] md:h-[54px] px-0'}
                    ${isLoading ? 'opacity-70' : 'opacity-100'}
                `}
                aria-label={isSupported ? t('support.already_done', 'Você já amou!') : t('support.action', 'Amei todos!')}
            >
                <div className={`flex items-center justify-center transition-transform duration-500 ${isAnimating ? 'scale-125' : ''}`}>
                    <PixelHeart
                        filled={isSupported}
                        className={`w-5 h-5 md:w-6 md:h-6 ${!isSupported && 'group-hover:scale-110'}`}
                    />
                </div>

                <div className={`overflow-hidden transition-all duration-700 ${(!isSupported || showStatusText) ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
                    <span className="text-[8.5px] md:text-[11px] font-bold font-jet whitespace-nowrap uppercase tracking-tighter md:tracking-wider block ml-2">
                        {!isSupported
                            ? t('support.action', 'Amei todos!')
                            : t('support.already_done', 'Você já amou!')
                        }
                    </span>
                </div>

                {isLoading && (
                    <div className="ml-2 w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
            </button>
        </div>
    );
}
