import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fires a cookieless page-view ping on every route change (except the admin
// back office). Fails silently — analytics must never affect the visitor.
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    const body = JSON.stringify({
      path: location.pathname,
      referrer: document.referrer || null,
    });
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname]);
}
