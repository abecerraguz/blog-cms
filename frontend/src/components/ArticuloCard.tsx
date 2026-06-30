import { memo } from 'react';
import type { Articulo } from "@/types";
import { CategoriaBadge } from '@/components/CategoriaBadge';
import { Link } from 'react-router-dom'  // ← nuevo

interface ArticuloCardProps {
  articulo: Articulo;
}

export const ArticuloCard = memo( function ArticuloCard({ articulo }: ArticuloCardProps ) {

  return (

                 <article className="col-md-6 col-lg-6">
                        <div className="post-card">
                            <div className="post-card__image-wrapper">
                                <img src={articulo.imagen} alt={articulo.titulo} className="post-card__image" loading="lazy"/>
                                <span 
                                    className="post-card__category"
                                    style={{ backgroundColor: articulo.categoria.color }}
                                >
                                    <CategoriaBadge nombre={articulo.categoria.nombre} />
                                </span>
                            </div>
                            <div className="post-card__body">
                                <h3 className="post-card__title">
                                    <Link to={`/articulo/${articulo.slug}`}>{articulo.titulo}</Link>
                                </h3>
                                <div className="post-card__meta">
                                    <span>
                                        <i className="bi bi-calendar3"></i> { new Date(articulo.fechaPublicacion).toLocaleDateString('es-CL', {
                                          day: 'numeric', month: 'long', year: 'numeric'
                                        })}
                                    </span>
                                    <span><i className="bi bi-clock"></i> {articulo.tiempoLectura} min</span>
                                </div>
                                <p className="post-card__excerpt">{articulo.extracto}</p>
                                <div className="post-card__footer">
                                    <Link to={`/articulo/${articulo.slug}`} className="btn btn--primary btn--sm">Leer más <i className="bi bi-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </article>

  );

});