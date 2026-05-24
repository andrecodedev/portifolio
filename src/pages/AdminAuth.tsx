import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { hapticFeedback } from '../utils/haptics';
import LiquidEther from '../components/ui/LiquidEther';

export default function AdminAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    hapticFeedback.light();

    const { error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciais inválidas. Tente novamente.');
      hapticFeedback.warning();
    } else {
      hapticFeedback.success();
      navigate('/admin/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background LiquidEther */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <LiquidEther 
          colors={['var(--text-primary)', 'var(--border-gray)', 'var(--text-terceiro)']}
          mouseForce={30}
          cursorSize={150}
          isViscous={true}
          viscous={20}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      {/* Background Grid e Glow Originais */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10 relative">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Painel Restrito</h1>
          <p className="text-white/50 text-sm">Acesso exclusivo para o administrador</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-white text-black font-semibold rounded-lg py-3 hover:bg-white/90 transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Entrar no Cofre'
            )}
          </button>
        </form>

        <button 
          onClick={() => navigate('/')} 
          className="mt-8 text-white/30 hover:text-white/60 text-sm transition-colors w-full text-center block"
        >
          Voltar ao Portfólio
        </button>
      </div>
    </div>
  );
}
