interface HeroBannerProps {
  titulo: string;
  subtitulo?: string;
}

export function HeroBanner({ titulo, subtitulo }: HeroBannerProps) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">{titulo}</h1>
          {subtitulo && <p className="hero__subtitle">{subtitulo}</p>}
        </div>
      </div>
    </section>
  );
}