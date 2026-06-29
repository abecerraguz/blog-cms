// frontend/src/pages/NotFound.tsx
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '1rem'
    }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--primary)' }}>404</h1>
      <p style={{ color: 'var(--text-medium)' }}>La página que buscas no existe</p>
      <Link to="/" className="btn btn--primary">
        <i className="bi bi-house"></i> Volver al inicio
      </Link>
    </div>
  )
}