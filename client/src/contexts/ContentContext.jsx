import { createContext, useContext, useEffect, useState } from 'react';

const ContentContext = createContext(null);
const CACHE_KEY = 'fyh-content-cache-v1';

export function ContentProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return { content: JSON.parse(cached), loading: false, error: null };
    } catch {}
    return { content: null, loading: true, error: null };
  });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/content', { credentials: 'same-origin' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((content) => {
        if (cancelled) return;
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(content));
        } catch {}
        setState({ content, loading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState((prev) => ({
          content: prev.content,
          loading: false,
          error: err,
        }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}

export function useSettings() {
  const { content } = useContent();
  return content?.settings ?? null;
}

export function useSections() {
  const { content } = useContent();
  return content?.sections ?? [];
}
