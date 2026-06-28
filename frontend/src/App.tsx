// src/App.tsx
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { useAuth } from '@/context/AuthContext'

function App() {
  const { isAuthenticated } = useAuth()

  // Semana 6: esto se reemplaza por <Routes> con React Router
  return isAuthenticated ? <HomePage /> : <LoginPage />
}

export default App