import { supabase } from '../lib/supabaseClient';

/**
 * Service to manage likes for projects.
 */

const USER_LIKED_PREFIX = 'user_liked_';
const FALLBACK_LIKES_PREFIX = 'local_fallback_likes_';

export const likesService = {
    /**
     * Fetches the current like count for a project.
     */
    async getLikes(projectId: number): Promise<number> {
        if (!supabase) {
            const local = localStorage.getItem(`${FALLBACK_LIKES_PREFIX}${projectId}`);
            return local ? parseInt(local, 10) : 0;
        }

        try {
            // Ajuste: Usamos .select() sem .single() para evitar o erro 406 de negociação de header
            const { data, error } = await supabase
                .from('project_likes')
                .select('count')
                .eq('id', projectId);

            if (error) return 0;

            // Como o select retorna um array, pegamos o primeiro item
            return data && data.length > 0 ? data[0].count : 0;
        } catch (e) {
            return 0;
        }
    },

    /**
     * Increments or decrements the like count.
     */
    async toggleLike(projectId: number): Promise<{ count: number, liked: boolean }> {
        const userLikedKey = `${USER_LIKED_PREFIX}${projectId}`;
        const currentlyLiked = localStorage.getItem(userLikedKey) === 'true';

        // Pegamos os likes atuais
        const currentLikes = await this.getLikes(projectId);
        const newLikedStatus = !currentlyLiked;
        const finalCount = newLikedStatus ? currentLikes + 1 : Math.max(0, currentLikes - 1);

        if (!supabase) {
            localStorage.setItem(`${FALLBACK_LIKES_PREFIX}${projectId}`, finalCount.toString());
            localStorage.setItem(userLikedKey, newLikedStatus.toString());
            return { count: finalCount, liked: newLikedStatus };
        }

        try {
            // Sincroniza com o banco
            const { error } = await supabase
                .from('project_likes')
                .upsert({
                    id: projectId,
                    count: finalCount,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (error) throw error;

            localStorage.setItem(userLikedKey, newLikedStatus.toString());
            return {
                count: finalCount,
                liked: newLikedStatus
            };
        } catch (error) {
            console.error('Erro na sincronização:', error);
            return { count: finalCount, liked: currentlyLiked };
        }
    },

    /**
     * Checks if the current user has already liked the project.
     */
    isLikedByUser(projectId: number): boolean {
        return localStorage.getItem(`${USER_LIKED_PREFIX}${projectId}`) === 'true';
    }
};
