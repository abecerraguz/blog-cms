// src/middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { sendError } from '../utils/apiResponse.js'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[ERROR]', err)

  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const isServerError = statusCode >= 500

  return sendError({
    res,
    statusCode,
    message: err.message || 'Ocurrió un error en el servidor',
    details: isServerError
      ? process.env.NODE_ENV === 'development' ? err.message : undefined
      : err instanceof ApiError ? err.details : undefined,
  })
}