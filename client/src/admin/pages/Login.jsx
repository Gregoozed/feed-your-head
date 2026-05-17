import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.status === 429) setError('Trop de tentatives. Réessayez dans quelques minutes.');
      else if (err.status === 401) setError('Identifiants incorrects.');
      else setError('Connexion impossible. Vérifiez votre connexion.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white border border-cream-dark rounded-3xl p-8">
        <h1 className="font-display text-3xl text-forest">
          Admin<span className="text-ochre">.</span>
        </h1>
        <p className="mt-2 text-sm text-mute">Connexion au back-office.</p>

        <div className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-mute font-medium">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-cream-dark bg-cream/50 px-4 py-3 text-ink focus:bg-white focus:border-ochre/60 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-widest text-mute font-medium">Mot de passe</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-cream-dark bg-cream/50 px-4 py-3 text-ink focus:bg-white focus:border-ochre/60 transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-ochre bg-ochre/10 border border-ochre/30 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-forest text-cream px-6 py-3 text-sm font-medium hover:bg-forest-light disabled:opacity-60 transition-colors"
        >
          {busy ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
