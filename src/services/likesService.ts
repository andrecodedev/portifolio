import { supabase } from '../lib/supabaseClient';

/**
 * Service to manage likes for projects.
 */

const USER_LIKED_PREFIX = 'user_liked_';
const FALLBACK_LIKES_PREFIX = 'local_fallback_likes_';

export const likesService = {
    /**
     * Fetches current like count with RLS error detection.
     */
    async getLikes(projectId: number): Promise<number> {
        if (!supabase) {
            const local = localStorage.getItem(`${FALLBACK_LIKES_PREFIX}${projectId}`);
            return local ? parseInt(local, 10) : 0;
        }

        try {
            const { data, error } = await supabase
                .from('project_likes')
                .select('count')
                .eq('id', projectId);

            if (error) {
                console.error(`🔴 [Supabase] Erro de Permissão (Pode ser RLS!):`, error.message);
                return 0;
            }

            if (!data || data.length === 0) return 0;
            return data[0].count;
        } catch (e) {
            console.error(`🔴 [Critical] Falha na conexão com banco:`, e);
            return 0;
        }
    },

    /**
     * Toggles like safely fetching latest global count first.
     */
    async toggleLike(projectId: number): Promise<{ count: number, liked: boolean }> {
        const userLikedKey = `${USER_LIKED_PREFIX}${projectId}`;
        const currentlyLiked = localStorage.getItem(userLikedKey) === 'true';
        const newLikedStatus = !currentlyLiked;

        if (!supabase) {
            const currentLikes = await this.getLikes(projectId);
            const finalCount = newLikedStatus ? currentLikes + 1 : Math.max(0, currentLikes - 1);
            localStorage.setItem(`${FALLBACK_LIKES_PREFIX}${projectId}`, finalCount.toString());
            localStorage.setItem(userLikedKey, newLikedStatus.toString());
            return { count: finalCount, liked: newLikedStatus };
        }

        try {
            // Buscamos o valor mais recente do banco SEM .single() para evitar erros
            const latestCount = await this.getLikes(projectId);
            const finalCount = newLikedStatus ? latestCount + 1 : Math.max(0, latestCount - 1);

            const { error: upsertError } = await supabase
                .from('project_likes')
                .upsert({
                    id: projectId,
                    count: finalCount,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (upsertError) {
                console.error(`🔴 [Supabase] Erro ao salvar (Upsert):`, upsertError.message);
                throw upsertError;
            }

            localStorage.setItem(userLikedKey, newLikedStatus.toString());
            return { count: finalCount, liked: newLikedStatus };
        } catch (error) {
            console.error('🔴 [LikesService] Erro na sincronização:', error);
            const currentLikes = await this.getLikes(projectId);
            return { count: currentLikes, liked: currentlyLiked };
        }
    },

    /**
     * Checks if the current user has already liked the project.
     */
    isLikedByUser(projectId: number): boolean {
        return localStorage.getItem(`${USER_LIKED_PREFIX}${projectId}`) === 'true';
    },

    /**
     * Fetches the sum of all likes across all projects.
     */
    async getTotalLikes(): Promise<number> {
        if (!supabase) return 0;

        try {
            const { data, error } = await supabase
                .from('project_likes')
                .select('count');

            if (error) {
                console.error('🔴 [Supabase] Erro ao buscar total de likes:', error.message);
                return 0;
            }

            return data.reduce((sum, row) => sum + (row.count || 0), 0);
        } catch (e) {
            console.error('🔴 [Critical] Falha ao calcular total de likes:', e);
            return 0;
        }
    }
};

