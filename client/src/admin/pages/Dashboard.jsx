import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-cream-dark bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin" className="font-display text-xl text-forest">
            Admin<span className="text-ochre">.</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-mute">
            <span>{user?.name} — {user?.email}</span>
            <button
              onClick={logout}
              className="rounded-full border border-cream-dark px-4 py-1.5 hover:border-ochre hover:text-ochre transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-display text-4xl text-forest">Tableau de bord</h1>
        <p className="mt-3 text-mute">Bienvenue {user?.name}. Choisissez ce que vous souhaitez modifier.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            to="/admin/content"
            title="Contenu"
            description="Éditer les sections du site, le menu, les réglages globaux."
            note="Disponible"
          />
          <Card
            to="/admin/media"
            title="Médias"
            description="Photos, logos, image d'ouverture (Open Graph)."
            note="Disponible"
          />
          <Card
            to="/admin/users"
            title="Utilisateurs"
            description="Ajouter ou retirer des comptes administrateurs."
            note="Disponible"
          />
          <Card
            to="/admin/revisions"
            title="Révisions"
            description="Historique des modifications, restauration."
            note="Disponible"
          />
        </div>

        <div className="mt-10 text-xs text-mute">
          <Link to="/" className="hover:text-ochre transition-colors">← Retour au site public</Link>
        </div>
      </main>
    </div>
  );
}

function Card({ to, title, description, note, disabled }) {
  const inner = (
    <>
      <h2 className="font-display text-2xl text-forest">{title}</h2>
      <p className="mt-2 text-sm text-mute">{description}</p>
      {note && <p className="mt-4 text-xs uppercase tracking-widest text-ochre">{note}</p>}
    </>
  );
  const className = `block bg-white border border-cream-dark rounded-3xl p-6 ${disabled ? 'opacity-60' : 'hover:border-ochre/40 hover:-translate-y-0.5 transition-all'}`;
  if (disabled || !to) {
    return <div className={className}>{inner}</div>;
  }
  return <Link to={to} className={className}>{inner}</Link>;
}
