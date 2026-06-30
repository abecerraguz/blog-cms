// src/utils/apiResponse.ts
import type { Response } from 'express'

interface SendSuccessParams {
  res: Response
  statusCode?: number
  message?: string
  data?: unknown
  meta?: unknown
  location?: string
}

interface SendErrorParams {
  res: Response
  statusCode?: number
  message?: string
  details?: unknown
}

export const sendSuccess = ({
  res,
  statusCode = 200,
  message = 'Operación exitosa',
  data = null,
  meta = undefined,
  location = undefined,
}: SendSuccessParams) => {
  if (location) res.location(location)

  const payload: Record<string, unknown> = {
    status: 'success',
    code: statusCode,
    message,
  }

  if (data !== undefined)  payload.data = data
  if (meta !== undefined)  payload.meta = meta

  return res.status(statusCode).json(payload)
}

export const sendError = ({
  res,
  statusCode = 500,
  message = 'Ocurrió un error en el servidor',
  details = undefined,
}: SendErrorParams) => {
  const payload: Record<string, unknown> = {
    status: 'error',
    code: statusCode,
    message,
  }

  if (details !== undefined && details !== null) {
    payload.details = details
  }

  return res.status(statusCode).json(payload)
}