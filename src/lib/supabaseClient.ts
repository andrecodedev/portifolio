import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
    try {
        // Agora usando a chave JWT correta, a conexão será automática e segura
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
        console.log('%c🚀 Supabase Conectado com Sucesso!', 'color: #00ff00; font-weight: bold; font-size: 12px;');
    } catch (e) {
        console.error('❌ Erro na conexão Supabase:', e);
    }
}

export const supabase = supabaseInstance;
