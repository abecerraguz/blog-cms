// src/context/TemaContext.tsx

// createContext  → crea el canal de comunicación entre componentes
// useContext     → permite que un componente se conecte al canal
// useEffect      → ejecuta algo cada vez que el tema cambia
// useState       → guarda el valor actual del tema
import { createContext, useContext, useEffect, useState } from "react"

// Los dos únicos valores posibles — TypeScript no permite otro valor
type Tema = "claro" | "oscuro"

// El contrato del contexto: qué datos y acciones expone a los componentes
interface TemaContextType {
  tema: Tema           // valor actual del tema
  toggleTema: () => void  // función para alternarlo
}

// Canal vacío — undefined es intencional: si alguien usa useTema() fuera
// del Provider, lo detectamos y lanzamos un error claro (ver final del archivo)
const TemaContext = createContext<TemaContextType | undefined>(undefined)

// El Provider es el interruptor central que envuelve la app
// children = todo lo que va adentro (básicamente tu app entera)
export function TemaProvider({ children }: { children: React.ReactNode }) {

  const [tema, setTema] = useState<Tema>(() => {
    // La función dentro de useState se llama solo UNA vez al arrancar
    // Se usa cuando el valor inicial necesita lógica (leer localStorage)

    const guardado = localStorage.getItem("tema") as Tema | null

    // Si el usuario ya visitó antes, usa su preferencia guardada
    if (guardado) return guardado

    // Si es la primera visita, pregunta al sistema operativo
    // true  → el sistema tiene modo oscuro activado → arranca en "oscuro"
    // false → arranca en "claro"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro"
  })

  useEffect(() => {
    // Se ejecuta cada vez que "tema" cambia (el [tema] del final lo controla)

    // 1. Guarda la preferencia para la próxima visita
    localStorage.setItem("tema", tema)

    // 2. Pone data-theme="oscuro" o data-theme="claro" en la etiqueta <html>
    //    Tu CSS lo usa así: [data-theme="oscuro"] { background: #111; color: #fff }
    document.documentElement.setAttribute("data-theme", tema)
  }, [tema]) // ← solo se ejecuta cuando "tema" cambia, no en cada render

  // Si era "claro" → cambia a "oscuro" y viceversa
  // Usa "prev =>" porque el nuevo valor depende del valor anterior
  const toggleTema = () => setTema((prev) => prev === "claro" ? "oscuro" : "claro")

  return (
    // Provider emite { tema, toggleTema } al canal
    // Cualquier componente dentro puede leerlo con useTema()
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}

// Hook consumidor — lo importas en cualquier componente que necesite el tema
// Ejemplo: const { tema, toggleTema } = useTema()
export function useTema(): TemaContextType {
  const ctx = useContext(TemaContext) // se conecta al canal

  // Si ctx es undefined → alguien usó useTema() fuera del TemaProvider
  // Mejor un error claro que un fallo silencioso difícil de debuggear
  if (!ctx) throw new Error("useTema debe usarse dentro de TemaProvider")

  return ctx
}