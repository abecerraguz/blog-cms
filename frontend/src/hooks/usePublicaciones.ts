// frontend/src/hooks/usePublicaciones.ts
import { useState, useEffect } from 'react'
import type { Articulo } from '@/types'
import { articulosService } from '@/services/articulosService'

export function usePublicaciones() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [cargando, setCargando]   = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    let activo = true

    articulosService.getAll({ estado: 'publicado' })
      .then((res) => {
        if (activo) setArticulos(res.data)
      })
      .catch(() => {
        if (activo) setError('No se pudieron cargar las publicaciones.')
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => { activo = false }
  }, [])

  return { articulos, cargando, error }
}