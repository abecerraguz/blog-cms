// src/components/layout/Footer.tsx

interface RedSocial {
  nombre: string;
  url: string;
  icono: string; // clase de Bootstrap Icons
  label: string; // aria-label para accesibilidad
}

interface FooterProps {
  nombreBlog?: string;
  anio?: number;
}

const REDES_SOCIALES: RedSocial[] = [
  { nombre: "Facebook",  url: "#", icono: "bi-facebook",  label: "Facebook"  },
  { nombre: "Twitter",   url: "#", icono: "bi-twitter",   label: "Twitter"   },
  { nombre: "Instagram", url: "#", icono: "bi-instagram", label: "Instagram" },
  { nombre: "YouTube",   url: "#", icono: "bi-youtube",   label: "YouTube"   },
];

export function Footer({ nombreBlog = "Blog CMS", anio = 2026 }: FooterProps) {
  return (
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
              {REDES_SOCIALES.map((red) => (
                <a key={red.nombre} href={red.url} aria-label={red.label}>
                  <i className={`bi ${red.icono}`}></i>
                </a>
              ))}
            </div>
          </div>

        </div>
        <div className="footer__bottom">
          <p>&copy; {anio} {nombreBlog}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}