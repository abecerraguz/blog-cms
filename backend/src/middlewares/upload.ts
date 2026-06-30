// src/middlewares/upload.ts
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import type { Request } from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

// Las imágenes van directo a public/uploads del frontend
// para que estén disponibles tanto desde el backend como ya servidas por Vite
export const UPLOADS_DIR =
  process.env.UPLOADS_DIR ??
  path.join(__dirname, '../../../frontend/public/uploads')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    // Nombre único: timestamp + bytes aleatorios + extensión original
    // Evita que dos imágenes con el mismo nombre se sobrescriban
    const ext = path.extname(file.originalname).toLowerCase()
    const nombre = `${Date.now()}-${crypto.randomBytes(10).toString('hex')}${ext}`
    cb(null, nombre)
  },
})

function fileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const permitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
  if (permitidos.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`))
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5 MB
  fileFilter,
})