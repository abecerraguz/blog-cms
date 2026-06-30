// src/v1/routes/upload.routes.ts
import { Router } from 'express'
import multer from 'multer'
import { upload } from '../../middlewares/upload.js'
import { sendSuccess, sendError } from '../../utils/apiResponse.js'
import type { Request, Response, NextFunction } from 'express'

const router = Router()

// upload.single("imagen") espera un campo del form-data llamado "imagen"
router.post('/', upload.single('imagen'), (req: Request, res: Response) => {
  if (!req.file) {
    return sendError({
      res,
      statusCode: 400,
      message: 'No se recibió ningún archivo'
    })
  }

  // Solo devuelve el nombre del archivo — el frontend arma la URL completa
  return sendSuccess({
    res,
    message: 'Archivo subido correctamente.',
    data: { filename: req.file.filename }
  })
})

// Captura errores específicos de multer (tamaño excedido, tipo inválido)
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    return sendError({
      res,
      statusCode: 400,
      message: `Error de upload: ${err.message}`
    })
  }
  return sendError({
    res,
    statusCode: 400,
    message: err.message
  })
})

export default router