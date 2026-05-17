import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon, Copy } from 'lucide-react';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

export default function Media() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const res = await api.listUploads();
    setItems(res.items);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleFiles = async (files) => {
    setError(null);
    setUploading(true);
    try {
      for (const file of files) {
        await api.uploadFile(file);
      }
      await reload();
    } catch (err) {
      setError(err.message || 'Erreur d’upload');
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) handleFiles(files);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) handleFiles(files);
  };

  const removeItem = async (id) => {
    if (!window.confirm('Supprimer définitivement cette image ?')) return;
    await api.deleteUpload(id);
    await reload();
  };

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="border-b border-cream-dark bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-ochre">
              <ArrowLeft size={14} /> Tableau de bord
            </Link>
            <span className="text-cream-dark">|</span>
            <span className="font-display text-lg text-forest">Médias</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-mute hidden md:inline">{user?.name}</span>
            <button onClick={logout} className="text-xs text-mute hover:text-ochre">Déconnexion</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <label
          className="block mb-6 border-2 border-dashed border-cream-dark hover:border-ochre/60 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <Upload size={24} className="mx-auto text-ochre" />
          <p className="mt-3 text-sm text-ink">
            {uploading ? 'Upload en cours…' : 'Déposez des images ici, ou cliquez pour choisir'}
          </p>
          <p className="text-xs text-mute mt-1">
            JPEG, PNG, WebP, GIF, SVG · max 10 Mo · raster auto-converti en WebP, max 2000 px
          </p>
          <input type="file" accept="image/*" multiple hidden onChange={onInputChange} disabled={uploading} />
        </label>

        {error && (
          <p className="mb-4 text-sm text-ochre bg-ochre/10 border border-ochre/30 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-mute text-sm">Chargement…</p>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon size={36} className="mx-auto text-mute/40" />
            <p className="mt-3 text-sm text-mute">Aucune image pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white border border-cream-dark rounded-2xl overflow-hidden">
                <div className="aspect-square bg-cream-dark/30">
                  <img src={item.url} alt={item.alt || item.filename} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 text-xs">
                  <div className="text-ink truncate">{item.alt || item.filename}</div>
                  <div className="text-mute mt-0.5">{Math.round(item.size / 1024)} Ko · {item.mime.split('/')[1]}</div>
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="mt-2 inline-flex items-center gap-1 text-mute hover:text-ochre"
                  >
                    <Copy size={11} />
                    {copied === item.url ? 'URL copiée' : 'Copier l’URL'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Supprimer"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-ochre hover:text-white text-mute rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
