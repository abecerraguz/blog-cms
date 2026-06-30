// src/middlewares/notFound.ts
import type { Request, Response } from 'express'
import { sendError } from '../utils/apiResponse.js'

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError({
    res,
    statusCode: 404,
    message: `La ruta ${req.method} ${req.originalUrl} no existe.`,
  })
}