// frontend/src/store/articulosStore.ts
import { create } from 'zustand'
import type { ArticuloListado, EstadoArticulo } from '@/types'
import { ARTICULOS_MOCK } from '@/data/mockData'

// El contrato del store — qué datos y qué acciones tiene
interface ArticulosState {
  // ── Datos ──────────────────────────────────────────
  articulos: ArticuloListado[]
  busqueda: string
  filtroEstado: EstadoArticulo | 'todos'
  cargando: boolean

  // ── Acciones ───────────────────────────────────────
  setBusqueda: (texto: string) => void
  setFiltroEstado: (estado: EstadoArticulo | 'todos') => void
  eliminarArticulo: (id: number) => void
  toggleEstado: (id: number) => void
}

export const useArticulosStore = create<ArticulosState>((set) => ({
  // Estado inicial — datos del mock, Semana 7 vendrán de la API
  articulos: ARTICULOS_MOCK.map(({ id, titulo, slug, categoria, estado, fechaPublicacion }) => ({
    id, titulo, slug, categoria, estado, fechaPublicacion
  })),
  busqueda: '',
  filtroEstado: 'todos',
  cargando: false,

  // Acciones — cada una modifica solo lo que necesita
  setBusqueda: (busqueda) => set({ busqueda }),

  setFiltroEstado: (filtroEstado) => set({ filtroEstado }),

  eliminarArticulo: (id) =>
    set((state) => ({
      articulos: state.articulos.filter((a) => a.id !== id)
  })),

  toggleEstado: (id) =>
    set((state) => ({
      articulos: state.articulos.map((a) =>
        a.id === id
          ? { ...a, estado: a.estado === 'publicado' ? 'borrador' : 'publicado' }
          : a
      )
  }))
}))