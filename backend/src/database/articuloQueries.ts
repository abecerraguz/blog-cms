// src/database/articuloQueries.ts
import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'
import type { EstadoArticulo } from '../generated/prisma/client.js'

export interface FiltrosArticulo {
  estado?:   string
  busqueda?: string
}

// ── Tipos nuevos para escritura ─────────────────────────────
export interface NuevoArticuloInput {
  titulo:      string
  extracto?:   string
  contenido?:  string
  imagen?:     string
  categoriaId: number
  estado?:     EstadoArticulo
  autor?:      string
}

export type ActualizarArticuloInput = Partial<NuevoArticuloInput>

// ── Función ayudante ─────────────────────────────────────────
function generarSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const articuloQueries = {

  // ── Lectura (ya la tenías) ──────────────────────────────────
  getAll: async (filtros: FiltrosArticulo) => {
    const where: Record<string, unknown> = {}
    if (filtros.estado && filtros.estado !== 'todos') {
      where.estado = filtros.estado as EstadoArticulo
    }
    if (filtros.busqueda) {
      where.titulo = { contains: filtros.busqueda, mode: 'insensitive' }
    }
    return await prisma.articulo.findMany({
      where, include: { categoria: true }, orderBy: { createdAt: 'desc' }
    })
  },

  getBySlug: async (slug: string) => {
    const articulo = await prisma.articulo.findUnique({
      where: { slug }, include: { categoria: true }
    })
    if (!articulo) throw new ApiError(404, `No existe un artículo con el slug '${slug}'`)
    return articulo
  },

  getById: async (id: number) => {
    const articulo = await prisma.articulo.findUnique({
      where: { id }, include: { categoria: true }
    })
    if (!articulo) throw new ApiError(404, `No existe un artículo con el id '${id}'`)
    return articulo
  },

  // ── Escritura (nuevo) ────────────────────────────────────────
  crear: async (datos: NuevoArticuloInput) => {
    const slug = generarSlug(datos.titulo)
    return await prisma.articulo.create({
      data: {
        titulo:      datos.titulo,
        slug,
        extracto:    datos.extracto,
        contenido:   datos.contenido,
        imagen:      datos.imagen,
        categoriaId: datos.categoriaId,
        estado:      datos.estado ?? 'borrador',
        autor:       datos.autor ?? 'Administrador',
        fechaPublicacion: datos.estado === 'publicado' ? new Date() : null,
      },
      include: { categoria: true }
    })
  },

  actualizar: async (slug: string, cambios: ActualizarArticuloInput) => {
    const existe = await prisma.articulo.findUnique({ where: { slug } })
    if (!existe) throw new ApiError(404, `No existe un artículo con el slug '${slug}'`)
    return await prisma.articulo.update({
      where: { slug }, 
      data: cambios, 
      include: { categoria: true }
    })
  },

  eliminar: async (id: number) => {
    const existe = await prisma.articulo.findUnique({ where: { id } })
    if (!existe) throw new ApiError(404, `No existe un artículo con el id '${id}'`)
    await prisma.articulo.delete({ where: { id } })
  },
}