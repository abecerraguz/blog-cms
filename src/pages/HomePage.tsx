// src/pages/HomePage.tsx
import { usePublicaciones } from "@/hooks/usePublicaciones"
import { ArticuloCard } from "@/components/ArticuloCard"
import { HeroBanner } from "@/components/HeroBanner"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ArticuloCardSkeleton } from "@/components/ArticuloCardSkeleton"

export function HomePage() {
  const { articulos, cargando, error } = usePublicaciones()

  return (
    <>
      <Header titulo="Publicaciones" />
      <main id="main-content">
        <HeroBanner
          titulo="Bienvenido al Blog"
          subtitulo="Descubre las últimas noticias sobre tecnología, gaming y cultura pop"
        />
        <section className="posts-section">
          <div className="container">
            <div className="row g-4">

       {/* Momento 1 — cargando: muestra 4 siluetas */}
              {cargando && (
                <>
                  <ArticuloCardSkeleton />
                  <ArticuloCardSkeleton />
                  <ArticuloCardSkeleton />
                  <ArticuloCardSkeleton />
                </>
              )}

              {/* Momento 2 — error */}
              {error && (
                <div className="col-12 text-center py-5">
                  <p className="text-danger">{error}</p>
                </div>
              )}

              {/* Momento 3 — datos listos */}
              {!cargando && !error && articulos.map((articulo) => (
                <ArticuloCard key={articulo.id} articulo={articulo} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}