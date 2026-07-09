import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';
import { hapticFeedback } from '../utils/haptics';
import { navigateBackToPortfolio } from '../utils/returnNavigation';

export default function AdminAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  useEffect(() => {
    supabase!.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin/dashboard', { state: location.state, replace: true });
      }
    });
  }, [navigate, location.state]);

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
      setError(t('admin.auth.error'));
      hapticFeedback.warning();
    } else {
      hapticFeedback.success();
      navigate('/admin/dashboard', { state: location.state, replace: true });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background dots */}
      <div
        className="absolute inset-0 z-0 pointer-events-none admin-auth-dots"
      />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--text-primary)] opacity-5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10 relative">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-[var(--text-primary)]">{t('admin.auth.title')}</h1>
          <p className="text-[var(--text-terceiro)] text-sm">{t('admin.auth.subtitle')}</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6 transition-colors duration-300">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[var(--text-terceiro)] font-medium">{t('admin.auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-terceiro)] transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[var(--text-terceiro)] font-medium">{t('admin.auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-terceiro)] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold rounded-lg py-3 hover:opacity-80 transition-opacity disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[var(--bg-primary)]/20 border-t-[var(--bg-primary)] rounded-full animate-spin" />
            ) : (
              t('admin.auth.submit')
            )}
          </button>
        </form>

        <button 
          onClick={() => navigateBackToPortfolio(navigate, location.state)} 
          className="mt-8 text-[var(--text-terceiro)] hover:text-[var(--text-primary)] text-sm transition-colors w-full text-center block"
        >
          {t('admin.auth.back')}
        </button>
      </div>
    </div>
  );
}
