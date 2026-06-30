// src/v1/routes/articulos.routes.ts
import { Router } from 'express'
import { articulosController } from '../../controllers/articulosController.js'

const router = Router()

// Lectura (ya las tenías)
router.get('/',      articulosController.getAll)
router.get('/:slug', articulosController.getBySlug)

// Escritura (nuevo)
router.post('/',       articulosController.crear)
router.put('/:slug',   articulosController.actualizar)
router.delete('/:id',  articulosController.eliminar)

export default router