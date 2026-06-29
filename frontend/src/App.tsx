// frontend/src/App.tsx
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { AdminListado } from '@/pages/admin/AdminListado'
import { NuevoArticulo } from '@/pages/admin/NuevoArticulo'

type Pagina = 'home' | 'admin' | 'nuevo-articulo'

function App() {
  const { isAuthenticated } = useAuth()
  const [pagina, setPagina] = useState<Pagina>('admin')

  if (!isAuthenticated) return <LoginPage />

  if (pagina === 'nuevo-articulo') return <NuevoArticulo />
  if (pagina === 'admin') return <AdminListado />

  return <HomePage />
}

export default App