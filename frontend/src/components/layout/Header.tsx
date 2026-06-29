// src/components/layout/Header.tsx
import logotipoBlog from '@/assets/img/blog.png'
import { useTema } from '@/context/TemaContext'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

interface HeaderProps {
  titulo: string
}

export function Header({ titulo }: HeaderProps) {
  const { tema, toggleTema } = useTema()
  const { isAuthenticated, usuario, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <a href="/" className="navbar__brand">
          <img src={logotipoBlog} alt="Logo del blog" />
          <span>{titulo}</span>
        </a>

        <div className="navbar__actions">
          {/* Toggle tema */}
          <button
            onClick={toggleTema}
            className="navbar__theme-toggle"
            title={tema === 'claro' ? 'Modo oscuro' : 'Modo claro'}
          >
            <i className={tema === 'claro' ? 'bi bi-moon' : 'bi bi-brightness-high'}></i>
          </button>

          {/* Si está autenticado → muestra usuario y logout */}
          {isAuthenticated ? (
            <div className="admin-user">
              <i className="bi bi-person-circle"></i>
              <span>{usuario?.nombre}</span>
              <button
                onClick={logout}
                className="btn btn--sm btn--danger"
                style={{ marginLeft: '8px' }}
              >
                <i className="bi bi-box-arrow-right"></i> Salir
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="navbar__registrarse">
              <i className="bi bi-person-circle"></i>
              <span>Registrarse</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}