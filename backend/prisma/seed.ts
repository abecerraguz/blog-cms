// prisma/seed.ts
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? ""
})
const prisma = new PrismaClient({ adapter })

async function main() {
  // Categorías
  const tecnologia = await prisma.categoria.upsert({
    where:  { slug: 'tecnologia' },
    update: {},
    create: { nombre: 'Tecnología', slug: 'tecnologia', color: '#3b82f6' }
  })

  const cosplay = await prisma.categoria.upsert({
    where:  { slug: 'cosplay' },
    update: {},
    create: { nombre: 'Cosplay', slug: 'cosplay', color: '#ec4899' }
  })

  const series = await prisma.categoria.upsert({
    where:  { slug: 'series' },
    update: {},
    create: { nombre: 'Series', slug: 'series', color: '#f59e0b' }
  })

  const videojuegos = await prisma.categoria.upsert({
    where:  { slug: 'videojuegos' },
    update: {},
    create: { nombre: 'Videojuegos', slug: 'videojuegos', color: '#10b981' }
  })

  // Artículos
  await prisma.articulo.upsert({
    where:  { slug: 'angewomon-digimon-ia' },
    update: {},
    create: {
      titulo:           'Angewomon de Digimon cobra vida gracias a la IA',
      slug:             'angewomon-digimon-ia',
      extracto:         'Modelos de inteligencia artificial generan imágenes hiperrealistas del personaje.',
      contenido:        '<p>La inteligencia artificial ha dado un paso más en la recreación de personajes icónicos del anime...</p>',
      imagen:           '/uploads/xgames-atd-013020-2-1024x768.jpg',
      categoriaId:      tecnologia.id,
      tiempoLectura:    5,
      estado:           'publicado',
      fechaPublicacion: new Date('2026-01-05')
    }
  })

  await prisma.articulo.upsert({
    where:  { slug: 'cosplay-androide-20-dragon-ball' },
    update: {},
    create: {
      titulo:           'Este cosplay del Androide 20 de Dragon Ball Z es increíble',
      slug:             'cosplay-androide-20-dragon-ball',
      extracto:         'Un artista recrea con asombroso detalle al villano cibérnetico de Dragon Ball Z.',
      contenido:        '<p>Un cosplayer logró recrear con un detalle increíble al Androide 20...</p>',
      imagen:           '/uploads/1062526.jpeg',
      categoriaId:      cosplay.id,
      tiempoLectura:    4,
      estado:           'publicado',
      fechaPublicacion: new Date('2025-12-21')
    }
  })

  await prisma.articulo.upsert({
    where:  { slug: 'mini-serie-suspenso-zona-confort' },
    update: {},
    create: {
      titulo:           'La mini serie de suspenso que te sacará de tu zona de confort',
      slug:             'mini-serie-suspenso-zona-confort',
      extracto:         'Una producción que combina thriller psicológico con drama familiar.',
      contenido:        '<p>Esta mini serie de apenas 6 episodios ha conquistado a la crítica...</p>',
      imagen:           '/uploads/809d820d82096339f4615fc856e7a0f411ed69cd-2200x1414.webp',
      categoriaId:      series.id,
      tiempoLectura:    3,
      estado:           'publicado',
      fechaPublicacion: new Date('2025-12-21')
    }
  })

  await prisma.articulo.upsert({
    where:  { slug: 'lego-videojuegos-sets-2025' },
    update: {},
    create: {
      titulo:           'Construye tu videojuego favorito con los sets de LEGO',
      slug:             'lego-videojuegos-sets-2025',
      extracto:         'Vivir la experiencia de construir tu videojuego favorito es posible con LEGO.',
      contenido:        '<p>Los sets de LEGO inspirados en videojuegos están revolucionando el mundo del juego...</p>',
      imagen:           '/uploads/izx076h3empnhoygqqcl.jpeg',
      categoriaId:      videojuegos.id,
      tiempoLectura:    6,
      estado:           'publicado',
      fechaPublicacion: new Date('2025-12-27')
    }
  })

  console.log('✅ Seed completado — 4 categorías y 4 artículos insertados')
}

main()
  .catch((e) => { console.error('❌ Error en seed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())