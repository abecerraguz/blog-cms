// src/middlewares/requestInfo.ts
import type { Request, Response, NextFunction } from 'express'

export const requestInfo = (req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - startedAt
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`)
  })

  next()
}