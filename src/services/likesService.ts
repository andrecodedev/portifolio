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
            if (newLikedStatus) {
                const { error: rpcError } = await supabase.rpc('increment_like', { p_id: projectId });
                if (rpcError) throw rpcError;
            } else {
                // Se a lógica permitir remover o like, precisa de outra RPC (ex: decrement_like).
                // Como não criei o decrement_like no banco, e normalmente like de portfólio só sobe
                // vou manter a lógica de "se desmarcar o like", não diminui no banco, só no front (ou precisa criar a RPC de decremento).
                // Por segurança e simplicidade, vamos criar a chamada de decremento, 
                // mas se der erro, significa que a RPC 'decrement_like' não existe no banco e ele cai pro Catch.
                const { error: rpcError } = await supabase.rpc('decrement_like', { p_id: projectId });
                if (rpcError) throw rpcError;
            }

            // Atualiza o local storage
            localStorage.setItem(userLikedKey, newLikedStatus.toString());
            
            // Busca o valor atualizado do banco
            const finalCount = await this.getLikes(projectId);
            
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

