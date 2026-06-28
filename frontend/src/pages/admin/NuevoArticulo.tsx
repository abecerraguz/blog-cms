// src/pages/admin/NuevoArticulo.tsx

import { useFormularioArticulo } from '@/hooks/useFormularioArticulo'
import { useAuth } from '@/context/AuthContext'
import logotipoBlog from '@/assets/img/blog.png'

export function NuevoArticulo() {
  const { campos, setCampo, reset, esValido } = useFormularioArticulo()
  const { logout } = useAuth()

  function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault()
    // Semana 7: aquí irá fetch('/api/articulos', { method: 'POST', body: campos })
    console.log('Datos del formulario:', campos)
    alert(`Artículo "${campos.titulo}" guardado (simulado)`)
    reset()
  }

  return (
    <>
      <nav className="navbar">
        <div className="container navbar__inner">
          <a href="/" className="navbar__brand">
            <img src={logotipoBlog} alt="Logo del blog" />
            <span>Panel CMS</span>
          </a>
          <div className="navbar__actions">
            <button onClick={logout} className="navbar__link">
              <i className="bi bi-box-arrow-right"></i>
              <span>Salir</span>
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content" className="admin-page">
        <div className="container">

          <nav className="breadcrumb">
            <a href="/admin">
              <i className="bi bi-house"></i> Panel
            </a>
            <span>/</span>
            <span>Nueva Publicación</span>
          </nav>

          <form onSubmit={handleSubmit} className="admin-form">
            <h2 className="admin-form__title">
              <i className="bi bi-plus-circle"></i> Nueva Publicación
            </h2>

            {/* Título */}
            <div className="admin-form__group">
              <label htmlFor="titulo" className="admin-form__label">
                <i className="bi bi-card-text"></i> Título
                <span className="admin-form__required"> *</span>
              </label>
              <input
                id="titulo"
                type="text"
                className="form-control"
                placeholder="Escribe un título atractivo"
                value={campos.titulo}
                onChange={(e) => setCampo('titulo', e.target.value)}
                required
              />
            </div>

            {/* Resumen */}
            <div className="admin-form__group">
              <label htmlFor="extracto" className="admin-form__label">
                <i className="bi bi-text-left"></i> Resumen
              </label>
              <textarea
                id="extracto"
                className="form-control"
                rows={3}
                placeholder="Breve resumen de la publicación"
                value={campos.extracto}
                onChange={(e) => setCampo('extracto', e.target.value)}
              />
            </div>

            {/* Contenido */}
            <div className="admin-form__group">
              <label htmlFor="contenido" className="admin-form__label">
                <i className="bi bi-body-text"></i> Contenido
              </label>
              <textarea
                id="contenido"
                className="form-control"
                rows={6}
                placeholder="Contenido completo de la publicación"
                value={campos.contenido}
                onChange={(e) => setCampo('contenido', e.target.value)}
              />
            </div>

            {/* Imagen — ruta manual, Semana 8 subirá el archivo real */}
            <div className="admin-form__group">
              <label htmlFor="imagen" className="admin-form__label">
                <i className="bi bi-image"></i> Imagen
                <span className="admin-form__required"> *</span>
              </label>
              <input
                id="imagen"
                type="text"
                className="form-control"
                placeholder="/uploads/nombre-imagen.jpg"
                value={campos.imagen}
                onChange={(e) => setCampo('imagen', e.target.value)}
              />
              <p className="admin-form__hint">
                Ingresa la ruta de la imagen en /uploads/. Semana 8 habilitará subida de archivos.
              </p>
            </div>

            <div className="admin-form__actions">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={!esValido}
              >
                <i className="bi bi-check-circle"></i> Guardar Publicación
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={reset}
              >
                <i className="bi bi-x-circle"></i> Limpiar
              </button>
            </div>
          </form>

        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__bottom">
            <p>&copy; 2026 Blog CMS — Panel de Administración</p>
          </div>
        </div>
      </footer>
    </>
  )
}