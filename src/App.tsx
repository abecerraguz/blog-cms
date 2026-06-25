import logotipoBlog from './assets/img/blog.png'
import heroImg from './assets/img/xgames-atd-013020-2-1024x768.jpg';
import cosplayImg from './assets/img/1062526.jpeg';
import miniSerieImg from './assets/img/809d820d82096339f4615fc856e7a0f411ed69cd-2200x1414.webp';
import legoImg from './assets/img/izx076h3empnhoygqqcl.jpeg';

function App() {


  return (
    <>
       <nav className="navbar">
        <div className="container navbar__inner">
            <a href="/" className="navbar__brand">
                <img src={logotipoBlog} alt="Logo del blog"/>
                <span>Publicaciones</span>
            </a>
            <a href="admin/index.html" className="navbar__link">
                <i className="bi bi-person-circle"></i>
                <span>Registrarse</span>
            </a>
        </div>
    </nav>

    <main id="main-content">
        <section className="hero">
            <div className="container">
                <div className="hero__content">
                    <h1 className="hero__title">Bienvenido al Blog</h1>
                    <p className="hero__subtitle">Descubre las últimas noticias sobre tecnología, gaming y cultura pop</p>
                </div>
            </div>
        </section>

        <section className="posts-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <i className="bi bi-newspaper"></i>
                        Últimas Publicaciones
                    </h2>
                </div>

                <div className="row g-4">
                    <article className="col-md-6 col-lg-6">
                        <div className="post-card">
                            <div className="post-card__image-wrapper">
                                <img src={heroImg} alt="Angewomon de Digimon" className="post-card__image" loading="lazy"/>
                                <span className="post-card__category">Tecnología</span>
                            </div>
                            <div className="post-card__body">
                                <h3 className="post-card__title">
                                    <a href="detalle.html">Hola Angewomon de Digimon cobra vida como un personaje real en esta brutal versión que hace la inteligencia artificial</a>
                                </h3>
                                <div className="post-card__meta">
                                    <span><i className="bi bi-calendar3"></i> 5 ene 2026</span>
                                    <span><i className="bi bi-clock"></i> 5 min</span>
                                </div>
                                <p className="post-card__excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac dolor pharetra, pretium augue non, facilisis elit.</p>
                                <div className="post-card__footer">
                                    <a href="detalle.html" className="btn btn--primary btn--sm">Leer más <i className="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="col-md-6 col-lg-6">
                        <div className="post-card">
                            <div className="post-card__image-wrapper">
                                <img src={cosplayImg} alt="Cosplay Androide 20" className="post-card__image" loading="lazy"/>
                                <span className="post-card__category">Cosplay</span>
                            </div>
                            <div className="post-card__body">
                                <h3 className="post-card__title">
                                    <a href="#">Este cosplay del Androide 20 de Dragon Ball Z es tan increíble que parece imposible de replicar</a>
                                </h3>
                                <div className="post-card__meta">
                                    <span><i className="bi bi-calendar3"></i> 21 dic 2025</span>
                                    <span><i className="bi bi-clock"></i> 4 min</span>
                                </div>
                                <p className="post-card__excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac dolor pharetra, pretium augue non, facilisis elit.</p>
                                <div className="post-card__footer">
                                    <a href="#" className="btn btn--primary btn--sm">Leer más <i className="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="col-md-6 col-lg-6">
                        <div className="post-card">
                            <div className="post-card__image-wrapper">
                                <img src={miniSerieImg} alt="Mini serie suspenso" className="post-card__image" loading="lazy"/>
                                <span className="post-card__category">Series</span>
                            </div>
                            <div className="post-card__body">
                                <h3 className="post-card__title">
                                    <a href="#">Ésta es la mini serie de suspenso que te sacará de tu zona de confort si estás harta de lo mismo</a>
                                </h3>
                                <div className="post-card__meta">
                                    <span><i className="bi bi-calendar3"></i> 21 dic 2025</span>
                                    <span><i className="bi bi-clock"></i> 3 min</span>
                                </div>
                                <p className="post-card__excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac dolor pharetra, pretium augue non, facilisis elit.</p>
                                <div className="post-card__footer">
                                    <a href="#" className="btn btn--primary btn--sm">Leer más <i className="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="col-md-6 col-lg-6">
                        <div className="post-card">
                            <div className="post-card__image-wrapper">
                                <img src={legoImg} alt="Sets LEGO videojuegos" className="post-card__image" loading="lazy"/>
                                <span className="post-card__category">Videojuegos</span>
                            </div>
                            <div className="post-card__body">
                                <h3 className="post-card__title">
                                    <a href="#">¡Anímate a imaginar!: Este fin de año construye tu videojuego favorito con los sets de LEGO</a>
                                </h3>
                                <div className="post-card__meta">
                                    <span><i className="bi bi-calendar3"></i> 27 dic 2025</span>
                                    <span><i className="bi bi-clock"></i> 6 min</span>
                                </div>
                                <p className="post-card__excerpt">Vivir la experiencia de construir tu videojuego favorito y sus icónicos personajes hoy es posible gracias a los sets de LEGO.</p>
                                <div className="post-card__footer">
                                    <a href="#" className="btn btn--primary btn--sm">Leer más <i className="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </main>

    <footer className="footer">
        <div className="container">
            <div className="footer__grid">
                <div className="footer__section">
                    <h3><i className="bi bi-chat-dots"></i> Contacto</h3>
                    <p>Síguenos para estar actualizado con las últimas noticias del mundo geek y gaming.</p>
                    <div className="footer__contact-item">
                        <i className="bi bi-geo-alt-fill"></i>
                        <span>1234 Calle Falsa, Springfield</span>
                    </div>
                    <div className="footer__contact-item">
                        <i className="bi bi-telephone-fill"></i>
                        <a href="tel:+5612345678">1234-5678</a>
                    </div>
                    <div className="footer__contact-item">
                        <i className="bi bi-envelope-fill"></i>
                        <a href="mailto:contacto@gmail.com">contacto@gmail.com</a>
                    </div>
                </div>
                <div className="footer__section">
                    <h3><i className="bi bi-share"></i> Síguenos</h3>
                    <div className="footer__social">
                        <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                        <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; 2026 Blog CMS. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </>
  )
}

export default App
