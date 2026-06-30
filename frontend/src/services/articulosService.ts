// src/services/articulosService.ts

// Importamos solo TIPOS (no valores) — se borran al compilar a JavaScript
// Articulo: la forma de un artículo (id, titulo, categoria...)
// ApiResponse: el sobre que envuelve cualquier respuesta del backend
import type { Articulo, ApiResponse } from '@/types'

// La URL base del backend. Viene de las variables de entorno de Vite.
// Si VITE_API_URL no existe (por ejemplo, olvidaste crear el .env),
// usa un valor por defecto para que el proyecto no se rompa.
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1'

// ── El "mesero genérico" ──────────────────────────────────────
// <T> es un comodín de tipo: tú le dices QUÉ tipo de dato esperas
// y esta función te lo devuelve ya tipado, sin que tengas que repetir
// la lógica de fetch en cada llamada.
async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {

  // Hace la petición real al backend.
  // `${BASE}${url}` arma la URL completa: BASE + /articulos = la ruta final
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' }, // le dice al backend "te mando JSON"
    ...init, // permite pasar opciones extra (method, body) cuando se necesite en el futuro
  })

  // ⚠️ PUNTO CRÍTICO: fetch NO lanza error en 404 o 500.
  // Si no verificas res.ok, podrías tratar una página de error
  // como si fueran datos válidos. Por eso lanzamos el error manualmente.
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  // Convierte la respuesta a JSON y le dice a TypeScript:
  // "confía en mí, esto es del tipo T que pediste"
  return res.json() as Promise<T>
}

// ── El "menú" — todo lo relacionado a artículos vive aquí ─────
// Los componentes solo importan este objeto, nunca usan fetch directamente
export const articulosService = {

  // Trae todos los artículos, con filtros opcionales
  getAll: (params?: { estado?: string; busqueda?: string }) => {

    // Si vienen params (ej: { estado: "publicado" }),
    // los convierte al formato de query string: "estado=publicado"
    const qs = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : ''

    // Llama al mesero genérico, especificando qué tipo de dato espera:
    // un ApiResponse que envuelve un array de Articulo
    // Si hay query string, la agrega con "?"; si no, deja la URL limpia
    return fetchJSON<ApiResponse<Articulo[]>>(`/articulos${qs ? `?${qs}` : ''}`)
  },

  // Trae un solo artículo por su slug
  getBySlug: (slug: string) =>
    fetchJSON<ApiResponse<Articulo>>(`/articulos/${slug}`),
}