import { useReducer } from 'react'

interface CamposFormulario {
  titulo: string
  extracto: string
  contenido: string
  imagen: string
}

type AccionFormulario =
  | { type: 'SET_CAMPO'; campo: keyof CamposFormulario; valor: string }
  | { type: 'RESET' }

const estadoInicial: CamposFormulario = {
  titulo: '', extracto: '', contenido: '', imagen: ''
}

function reducirFormulario(state: CamposFormulario, accion: AccionFormulario): CamposFormulario {
  switch (accion.type) {
    case 'SET_CAMPO': return { ...state, [accion.campo]: accion.valor }
    case 'RESET':     return estadoInicial
    default:          return state
  }
}

export function useFormularioArticulo() {
  const [campos, dispatch] = useReducer(reducirFormulario, estadoInicial)

  const setCampo = (campo: keyof CamposFormulario, valor: string) =>
    dispatch({ type: 'SET_CAMPO', campo, valor })

  const reset = () => dispatch({ type: 'RESET' })

  const esValido = campos.titulo.trim().length >= 3

  return { campos, setCampo, reset, esValido }
}