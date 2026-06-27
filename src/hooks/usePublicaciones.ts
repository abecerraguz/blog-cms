import { useState, useEffect } from "react"
import type { Articulo } from "@/types"
import { ARTICULOS_MOCK } from "@/data/mockData"

export function usePublicaciones() {

  const [ articulos, setArticulos ] = useState<Articulo[]>([])
  const [ cargando, setCargando ]   = useState(true)
  const [ error, setError ]         = useState<string | null>(null) 

  useEffect(() => {
    // Simulamos que el servidor tarda 600ms en responder
    const timer = setTimeout(() => {
      try {
        setArticulos(ARTICULOS_MOCK) // llegaron los datos
      } catch {
        setError("No se pudieron cargar las publicaciones.") // ❌ algo falló
      } finally {
        setCargando(false) // en ambos casos, ya no estamos cargando
      }
    }, 600)
    // Instrucción de salida: si el componente desaparece antes
    // de que pasen los 600ms, cancela el timer
    return () => clearTimeout(timer)
  }, []) // [] = solo cuando el componente aparece por primera vez
  return { articulos, cargando, error }
}