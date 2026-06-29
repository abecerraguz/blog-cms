// frontend/src/pages/admin/AdminListado.tsx
import { useArticulosStore } from '@/store/articulosStore'
import { useArticulosFiltrados } from '@/hooks/useArticulosFiltrados'
import { useAuth } from '@/context/AuthContext'
import logotipoBlog from '@/assets/img/blog.png'

// Función que mapea el slug al modificador CSS
function getBadgeClass(slug: string): string {
  const mapa: Record<string, string> = {
    tecnologia:  'td-badge--tech',
    diseno:      'td-badge--tech',
    cosplay:     'td-badge--cosplay',
    series:      'td-badge--series',
    videojuegos: 'td-badge--gaming',
    programacion:'td-badge--tech',
  }
  return mapa[slug] ?? 'td-badge'
}

export function AdminListado() {
  const { busqueda, filtroEstado, setBusqueda, setFiltroEstado, eliminarArticulo, toggleEstado } = useArticulosStore()
  const { usuario, logout } = useAuth()
  const articulosFiltrados = useArticulosFiltrados()

  return (
    <>
      <nav className="navbar">
        <div className="container navbar__inner">
          <a href="/" className="navbar__brand">
            <img src={logotipoBlog} alt="Logo" />
            <span>Panel CMS</span>
          </a>
          <div className="navbar__actions">
            <div className="admin-user">
              <i className="bi bi-person-circle"></i>
              <span>{usuario?.nombre}</span>
            </div>
            <button onClick={logout} className="navbar__link">
              <i className="bi bi-box-arrow-right"></i>
              <span>Salir</span>
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content" className="admin-page">
        <div className="container">

          {/* Header */}
          <div className="admin-header">
            <div className="admin-header__info">
              <h1><i className="bi bi-grid-1x2"></i> Publicaciones</h1>
              <p>Bienvenido <strong>{usuario?.nombre}</strong>, gestiona el contenido de tu blog.</p>
            </div>
            <button className="btn btn--success">
              <i className="bi bi-plus-circle"></i> Nueva publicación
            </button>
          </div>

          {/* Tabla */}
          <div className="admin-table">
            <div className="admin-table__header">
              <div className="admin-table__title-wrap">
                <h2 className="admin-table__title">
                  <i className="bi bi-list-ul"></i> Lista de Publicaciones
                </h2>
                <span className="admin-table__count">
                  {articulosFiltrados.length} artículos
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {/* Buscador */}
                <div className="admin-table__search">
                  <i className="bi bi-search"></i>
                  <input
                    type="search"
                    placeholder="Buscar publicación..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>

                {/* Filtro estado */}
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value as typeof filtroEstado)}
                  className="form-control"
                  style={{ width: 'auto', padding: '8px 12px' }}
                >
                  <option value="todos">Todos</option>
                  <option value="publicado">Publicados</option>
                  <option value="borrador">Borradores</option>
                </select>
              </div>
            </div>

            <div className="admin-table__wrap">
              <table>
                <thead>
                  <tr>
                    <th><i className="bi bi-card-text"></i> Título</th>
                    <th><i className="bi bi-tag"></i> Categoría</th>
                    <th><i className="bi bi-circle"></i> Estado</th>
                    <th><i className="bi bi-calendar3"></i> Fecha</th>
                    <th><i className="bi bi-gear"></i> Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {articulosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-light)' }}>
                        No se encontraron artículos
                      </td>
                    </tr>
                  ) : (
                    articulosFiltrados.map((articulo) => (
                      <tr key={articulo.id}>
                        <td>
                          <span className="td-title">{articulo.titulo}</span>
                        </td>
                        <td>
                        <span className={`td-badge ${getBadgeClass(articulo.categoria.slug)}`}>
                            {articulo.categoria.nombre}
                        </span>
                        </td>
                        <td>
                          <button
                            onClick={() => toggleEstado(articulo.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            {articulo.estado === 'publicado'
                              ? <span style={{ color: 'var(--success)' }}>● Publicado</span>
                              : <span style={{ color: 'var(--text-light)' }}>○ Borrador</span>
                            }
                          </button>
                        </td>
                        <td className="td-date">
                          {new Date(articulo.fechaPublicacion).toLocaleDateString('es-CL', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </td>
                        <td className="td-actions">
                          <button className="btn-action btn-action--edit" title="Editar">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn-action btn-action--delete"
                            title="Eliminar"
                            onClick={() => eliminarArticulo(articulo.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="admin-table__footer">
              <span>
                Mostrando <strong>{articulosFiltrados.length}</strong> de {' '}
                <strong>{useArticulosStore.getState().articulos.length}</strong> artículos
              </span>
            </div>
          </div>

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