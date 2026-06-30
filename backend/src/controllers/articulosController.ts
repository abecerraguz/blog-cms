// src/controllers/articulosController.ts
import type { Request, Response, NextFunction } from 'express'
import { articulosService } from '../services/articulosService.js'
import { sendSuccess , sendError  } from '../utils/apiResponse.js'

export const articulosController = {

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { estado, busqueda } = req.query

      const articulos = await articulosService.getAll({
        estado:   typeof estado   === 'string' ? estado   : undefined,
        busqueda: typeof busqueda === 'string' ? busqueda : undefined,
      })

      return sendSuccess({
        res,
        message: 'Listado de artículos obtenido correctamente.',
        data: articulos,
        meta: { total: articulos.length },
      })
    } catch (error) {
      return next(error)
    }
  },

  getBySlug: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articulo = await articulosService.getBySlug(String(req.params.slug))

      return sendSuccess({
        res,
        message: 'Artículo obtenido correctamente.',
        data: articulo,
      })
    } catch (error) {
      return next(error)
    }
  },

   crear: async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      const { titulo, extracto, contenido, imagen, categoriaId, estado, autor } = req.body

      // Validación en la frontera del sistema — antes de tocar la base de datos
      if (!titulo || !categoriaId) {
        return sendError({
          res,
          statusCode: 400,
          message: 'titulo y categoriaId son obligatorios'
        })
      }

      const articulo = await articulosService.crear({
        titulo,
        extracto,
        contenido,
        imagen,
        categoriaId: Number(categoriaId), // el body llega como JSON, pero por seguridad fuerza el tipo
        estado,
        autor,
      })

      return sendSuccess({
        res,
        statusCode: 201, // 201 Created — estándar REST al crear un recurso
        message: 'Artículo creado correctamente.',
        data: articulo,
      })
    } catch (error) {
      return next(error) // el errorHandler global decide qué código HTTP usar
    }
  },

  actualizar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articulo = await articulosService.actualizar(
        String(req.params.slug),
        req.body
      )

      return sendSuccess({
        res,
        message: 'Artículo actualizado correctamente.',
        data: articulo,
      })
    } catch (error) {
      return next(error)
    }
  },

  eliminar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)

      if (Number.isNaN(id)) {
        return sendError({
          res,
          statusCode: 400,
          message: 'ID inválido'
        })
      }

      await articulosService.eliminar(id)

      // 204 No Content — estándar REST al eliminar, sin body en la respuesta
      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  },
}