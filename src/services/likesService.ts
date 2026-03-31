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
            console.warn(`[LikesService] Supabase não inicializado. Usando fallback local para o projeto ${projectId}.`);
            const local = localStorage.getItem(`${FALLBACK_LIKES_PREFIX}${projectId}`);
            return local ? parseInt(local, 10) : 0;
        }

        try {
            const { data, error } = await supabase
                .from('project_likes')
                .select('count')
                .eq('id', projectId);

            if (error) {
                console.error(`[LikesService] Erro ao buscar likes para o projeto ${projectId}:`, error);
                return 0;
            }

            return data && data.length > 0 ? data[0].count : 0;
        } catch (e) {
            console.error(`[LikesService] Erro crítico ao buscar likes:`, e);
            return 0;
        }
    },

    /**
     * Increments or decrements the like count.
     */
    async toggleLike(projectId: number): Promise<{ count: number, liked: boolean }> {
        const userLikedKey = `${USER_LIKED_PREFIX}${projectId}`;
        const currentlyLiked = localStorage.getItem(userLikedKey) === 'true';

        // Determina o novo status antes de tudo
        const newLikedStatus = !currentlyLiked;

        if (!supabase) {
            const currentLikes = await this.getLikes(projectId);
            const finalCount = newLikedStatus ? currentLikes + 1 : Math.max(0, currentLikes - 1);
            localStorage.setItem(`${FALLBACK_LIKES_PREFIX}${projectId}`, finalCount.toString());
            localStorage.setItem(userLikedKey, newLikedStatus.toString());
            return { count: finalCount, liked: newLikedStatus };
        }

        try {
            // Buscamos o valor mais recente do banco para evitar sobrescrever com dados desatualizados
            const { data: currentData, error: fetchError } = await supabase
                .from('project_likes')
                .select('count')
                .eq('id', projectId)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 é "no rows returned"
                throw fetchError;
            }

            const currentCount = currentData ? currentData.count : 0;
            const finalCount = newLikedStatus ? currentCount + 1 : Math.max(0, currentCount - 1);

            // Sincroniza com o banco
            const { error: upsertError } = await supabase
                .from('project_likes')
                .upsert({
                    id: projectId,
                    count: finalCount,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (upsertError) throw upsertError;

            // Só atualizamos o localStorage se o banco confirmou
            localStorage.setItem(userLikedKey, newLikedStatus.toString());

            return {
                count: finalCount,
                liked: newLikedStatus
            };
        } catch (error) {
            console.error('[LikesService] Erro na sincronização:', error);
            // Em caso de erro, retornamos o que temos localmente mas avisamos
            const currentLikes = await this.getLikes(projectId);
            return { count: currentLikes, liked: currentlyLiked };
        }
    },

    /**
     * Checks if the current user has already liked the project.
     */
    isLikedByUser(projectId: number): boolean {
        return localStorage.getItem(`${USER_LIKED_PREFIX}${projectId}`) === 'true';
    }
};

