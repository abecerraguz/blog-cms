import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  // Si no hay sesión → manda al login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // Outlet = renderiza la ruta hija que corresponde
  return <Outlet />
}