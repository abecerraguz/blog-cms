// src/services/articulosService.ts
import {
  articuloQueries,
  type FiltrosArticulo,
  type NuevoArticuloInput,
  type ActualizarArticuloInput
} from '../database/articuloQueries.js'

export const articulosService = {
  getAll: async (filtros: FiltrosArticulo) => {
    return await articuloQueries.getAll(filtros)
  },

  getBySlug: async (slug: string) => {
    return await articuloQueries.getBySlug(slug)
  },

  getById: async (id: number) => {
    return await articuloQueries.getById(id)
  },

  // ── Escritura (nuevo) ────────────────────────────────────────
  crear: async (datos: NuevoArticuloInput) => {
    return await articuloQueries.crear(datos)
  },

  actualizar: async (slug: string, cambios: ActualizarArticuloInput) => {
    return await articuloQueries.actualizar(slug, cambios)
  },

  eliminar: async (id: number) => {
    return await articuloQueries.eliminar(id)
  }
}