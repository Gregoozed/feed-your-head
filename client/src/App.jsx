import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './contexts/ContentContext.jsx';
import SiteRenderer from './components/SiteRenderer.jsx';

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

export default function App() {
  return (
    <BrowserRouter>
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

function AdminFallback() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center text-mute">
      Chargement…
    </div>
  );
}
