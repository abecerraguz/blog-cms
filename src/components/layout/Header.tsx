// src/components/layout/Header.tsx
import logotipoBlog from '@/assets/img/blog.png'
import { useTema } from '@/context/TemaContext'
import { useAuth } from "@/context/AuthContext"

interface HeaderProps {
  titulo: string
}

export function Header({ titulo }: HeaderProps) {
  const { tema, toggleTema } = useTema()
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <a href="/" className="navbar__brand">
          <img src={logotipoBlog} alt="Logo del blog" />
          <span>{titulo}</span>
        </a>

        <div className="navbar__actions">
          <button
            onClick={toggleTema}
            className="navbar__theme-toggle"
            title={tema === 'claro' ? 'Modo oscuro' : 'Modo claro'}
          >
            <i className={tema === 'claro' ? 'bi bi-moon' : 'bi bi-brightness-high'}></i>
          </button>

          {/* <a href="/admin/index.html" className="navbar__registrarse">
            <i className="bi bi-person-circle"></i>
            <span>Registrarse</span>
          </a> */}
          {isAuthenticated
            ? <button onClick={logout} className="navbar__registrarse">
                <i className="bi bi-box-arrow-right"></i> Salir
              </button>
            : <a href="/login" className="navbar__registrarse">
                <i className="bi bi-person-circle"></i> Registrarse
              </a>
          }
        </div>
      </div>
    </nav>
  )
}