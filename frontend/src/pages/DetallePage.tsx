// frontend/src/pages/DetallePage.tsx
import { useParams, Link, Navigate } from 'react-router-dom'
import { ARTICULOS_MOCK } from '@/data/mockData'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/HeroBanner'

export function DetallePage() {
  // Lee el slug de la URL — /articulo/angewomon-digimon-ia
  const { slug } = useParams<{ slug: string }>()

  // Busca el artículo en el mock
  const articulo = ARTICULOS_MOCK.find((a) => a.slug === slug)

  // Si el slug no existe → redirige al 404
  if (!articulo) {
    return <Navigate to="/404" replace />
  }

  return (
    <>
      <Header titulo="Publicaciones" />

      <main id="main-content">
        {/* Hero con la imagen del artículo */}
        <div className="article-hero">
          <img
            src={articulo.imagen}
            alt={articulo.titulo}
            className="article-hero__img"
          />
          <div className="article-hero__overlay" />
          <div className="article-hero__content">
            <div className="container">
              <span className="article-hero__category">
                {articulo.categoria.nombre}
              </span>
              <h1 className="article-hero__title">{articulo.titulo}</h1>
              <div className="article-hero__meta">
                <span>
                  <i className="bi bi-person"></i> {articulo.autor}
                </span>
                <span>
                  <i className="bi bi-calendar3"></i>{' '}
                  {new Date(articulo.fechaPublicacion).toLocaleDateString('es-CL', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
                <span>
                  <i className="bi bi-clock"></i> {articulo.tiempoLectura} min de lectura
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del artículo */}
        <div className="article-page">
          <div className="container">

            {/* Breadcrumb */}
            <nav className="article-breadcrumb">
              <Link to="/">
                <i className="bi bi-house"></i> Inicio
              </Link>
              <i className="bi bi-chevron-right"></i>
              <span>{articulo.titulo}</span>
            </nav>

            {/* Cuerpo */}
            <div className="article-body">
              <p>{articulo.extracto}</p>
              <div dangerouslySetInnerHTML={{ __html: articulo.contenido }} />
            </div>

            {/* Footer del artículo */}
            <div className="article-footer">
              {/* Tags */}
              <div className="article-tags">
                <span className="article-tags__label">
                  <i className="bi bi-tags"></i> Tags:
                </span>
                {articulo.tags.map((tag) => (
                  <span key={tag.id} className="article-tag">
                    {tag.nombre}
                  </span>
                ))}
              </div>

              {/* Compartir */}
              <div className="article-share">
                <span className="article-share__label">Compartir:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${articulo.titulo}`}
                  className="article-share__btn article-share__btn--tw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
              </div>
            </div>

            {/* Volver */}
            <div className="article-nav">
              <Link to="/" className="article-nav__back">
                <i className="bi bi-arrow-left"></i> Volver al Blog
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}