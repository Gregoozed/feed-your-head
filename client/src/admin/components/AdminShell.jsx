import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';

/**
 * Shared admin page chrome: top bar with back-link + title + user + logout,
 * and an optional right-side slot for page-specific actions (Save button, etc.).
 */
export default function AdminShell({ title, backTo = '/admin', backLabel = 'Tableau de bord', actions, children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="border-b border-cream-dark bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link to={backTo} className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-ochre flex-shrink-0">
              <ArrowLeft size={14} /> {backLabel}
            </Link>
            <span className="text-cream-dark">|</span>
            <span className="font-display text-lg text-forest truncate">{title}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions}
            <span className="text-xs text-mute hidden md:inline">{user?.name}</span>
            <button onClick={logout} className="text-xs text-mute hover:text-ochre">Déconnexion</button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
