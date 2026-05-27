import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './contexts/ContentContext.jsx';
import { usePageTracking } from './hooks/usePageTracking.js';
import SiteRenderer from './components/SiteRenderer.jsx';
import LegalPage from './components/LegalPage.jsx';
import RessourcesPage from './pages/RessourcesPage.jsx';

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

export default function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route
          path="/mentions-legales"
          element={
            <ContentProvider>
              <LegalPage />
            </ContentProvider>
          }
        />
        <Route
          path="/ressources"
          element={
            <ContentProvider>
              <RessourcesPage />
            </ContentProvider>
          }
        />
        <Route
          path="*"
          element={
            <ContentProvider>
              <SiteRenderer />
            </ContentProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function PageTracker() {
  usePageTracking();
  return null;
}

function AdminFallback() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center text-mute">
      Chargement…
    </div>
  );
}
