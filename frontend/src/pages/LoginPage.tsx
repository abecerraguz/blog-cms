// src/pages/LoginPage.tsx
import { useState, FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import logotipoBlog from '@/assets/img/blog.png'

export function LoginPage() {
  const { login } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const exito = await login(email, password)

    if (!exito) {
      setError('Email o contraseña incorrectos')
    }

    setCargando(false)
    // Semana 6: aquí irá navigate('/admin') con React Router
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-card__header">
          <img src={logotipoBlog} alt="Logo" className="login-card__logo" />
          <h1 className="login-card__title">Panel Admin</h1>
          <p className="login-card__subtitle">Ingresa tus credenciales para continuar</p>
        </div>

        <div className="login-card__body">
          <form onSubmit={handleSubmit}>

            <div className="form-group form-group--icon">
              <label className="form-group__label">Email</label>
              <div className="form-group__wrapper">
                <i className="bi bi-envelope form-group__icon"></i>
                <input
                  type="email"
                  className="form-group__input"
                  placeholder="admin@blog.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group form-group--icon">
              <label className="form-group__label">Contraseña</label>
              <div className="form-group__wrapper">
                <i className="bi bi-lock form-group__icon"></i>
                <input
                  type="password"
                  className="form-group__input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error de credenciales */}
            {error && (
              <div className="mb-3">
                <p style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>
                  <i className="bi bi-exclamation-circle me-1"></i>{error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary login-card__submit"
              disabled={cargando}
            >
              {cargando
                ? <><i className="bi bi-hourglass-split"></i> Ingresando...</>
                : <><i className="bi bi-box-arrow-in-right"></i> Ingresar</>
              }
            </button>

          </form>
        </div>

        <div className="login-card__footer">
          <a href="/" className="login-card__back">
            <i className="bi bi-arrow-left"></i> Volver al Blog
          </a>
        </div>

      </div>
    </div>
  )
}