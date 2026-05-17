import { useCallback, useEffect, useState } from 'react';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { api } from '../api.js';

/**
 * Modal media picker.
 * onSelect(url) — called with chosen upload URL.
 * onClose() — dismiss without selecting.
 */
export function MediaPickerModal({ onSelect, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-cream rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-cream-dark">
          <h2 className="font-display text-2xl text-forest">Bibliothèque média</h2>
          <button onClick={onClose} aria-label="Fermer" className="text-mute hover:text-ochre p-1">
            <X size={18} />
          </button>
        </header>

        <div
          className="flex-1 overflow-y-auto p-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <label className="block mb-6 border-2 border-dashed border-cream-dark hover:border-ochre/60 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white">
            <Upload size={20} className="mx-auto text-ochre" />
            <p className="mt-2 text-sm text-ink">
              {uploading ? 'Upload en cours…' : 'Déposez une image ici, ou cliquez pour choisir'}
            </p>
            <p className="text-xs text-mute mt-1">JPEG, PNG, WebP, GIF, SVG — max 10 Mo. Les images raster sont converties en WebP automatiquement.</p>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onInputChange}
              disabled={uploading}
            />
          </label>

          {error && (
            <p className="mb-4 text-sm text-ochre bg-ochre/10 border border-ochre/30 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-mute text-sm">Chargement…</p>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon size={32} className="mx-auto text-mute/40" />
              <p className="mt-3 text-sm text-mute">Aucune image pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onPick={() => onSelect(item.url)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MediaCard({ item, onPick, onRemove }) {
  return (
    <div className="group relative bg-white border border-cream-dark rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={onPick}
        className="block w-full aspect-square bg-cream-dark/30 focus:outline-none focus:ring-2 focus:ring-ochre"
      >
        <img
          src={item.url}
          alt={item.alt || item.filename}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </button>
      <div className="p-2 text-[10px] text-mute leading-tight">
        <div className="truncate">{item.alt || item.filename}</div>
        <div>{Math.round(item.size / 1024)} Ko</div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Supprimer"
        className="absolute top-1.5 right-1.5 bg-white/90 hover:bg-ochre hover:text-white text-mute rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

/**
 * Inline picker : preview thumbnail + button to open modal.
 */
export function ImagePicker({ value, onChange, label = "Image" }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-mute font-medium mb-1.5">{label}</label>
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 rounded-xl border border-cream-dark bg-cream/40 overflow-hidden flex-shrink-0">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-mute/40">
              <ImageIcon size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value || undefined)}
            placeholder="/uploads/… ou /portrait.jpg"
            className="w-full rounded-xl border border-cream-dark bg-cream/40 px-3 py-2 text-sm text-ink focus:bg-white focus:border-ochre/60"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-xs inline-flex items-center gap-1.5 rounded-full bg-forest text-cream px-3 py-1.5 hover:bg-forest-light"
            >
              <ImageIcon size={12} /> Choisir / uploader
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange(undefined)}
                className="text-xs text-mute hover:text-ochre"
              >
                Retirer
              </button>
            )}
          </div>
        </div>
      </div>
      {open && (
        <MediaPickerModal
          onSelect={(url) => {
            onChange(url);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
