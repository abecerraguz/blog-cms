// src/middlewares/cacheHeaders.ts
import type { Request, Response, NextFunction } from 'express'

export const cacheForGetRequest = (seconds = 60) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', `public, max-age=${seconds}`)
    } else {
      res.set('Cache-Control', 'no-store')
    }
    next()
  }
}