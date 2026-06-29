// frontend/src/hooks/useArticulosFiltrados.ts
import { useMemo } from 'react'
import { useArticulosStore } from '@/store/articulosStore'

export function useArticulosFiltrados() {
    
  const articulos    = useArticulosStore((state) => state.articulos)
  const busqueda     = useArticulosStore((state) => state.busqueda)
  const filtroEstado = useArticulosStore((state) => state.filtroEstado)

  return useMemo(() => {
    return articulos.filter((a) => {
      const coincideBusqueda = a.titulo
        .toLowerCase()
        .includes(busqueda.toLowerCase())

      const coincideEstado =
        filtroEstado === 'todos' || a.estado === filtroEstado

      return coincideBusqueda && coincideEstado
    })
  }, [articulos, busqueda, filtroEstado])
}