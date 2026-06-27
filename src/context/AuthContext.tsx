// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react"
import type { Usuario } from "@/types"

interface AuthContextType {
  usuario: Usuario | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  // Semana 7: esto se reemplaza por fetch('/api/login')
  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === "admin@blog.com" && password === "admin123") {
      setUsuario({ id: 1, nombre: "Administrador", email, rol: "admin" })
      return true
    }
    return false
  }

  const logout = () => setUsuario(null)

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return ctx
}