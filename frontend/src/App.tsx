// frontend/src/App.tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Rutas públicas — cargan siempre
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'

// Rutas admin — lazy loading, solo se descargan cuando el usuario navega
const AdminListado  = lazy(() => import('@/pages/admin/AdminListado').then(m => ({ default: m.AdminListado })))
const NuevoArticulo = lazy(() => import('@/pages/admin/NuevoArticulo').then(m => ({ default: m.NuevoArticulo })))
const DetallePage   = lazy(() => import('@/pages/DetallePage').then(m => ({ default: m.DetallePage })))
const NotFound      = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Cargando...</p>
        </div>
      }>
        <Routes>
          {/* ── Rutas públicas ── */}
          <Route path="/"                element={<HomePage />} />
          <Route path="/articulo/:slug"  element={<DetallePage />} />
          <Route path="/admin/login"     element={<LoginPage />} />

          {/* ── Rutas protegidas del admin ── */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index                   element={<AdminListado />} />
            <Route path="nuevo"            element={<NuevoArticulo />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App