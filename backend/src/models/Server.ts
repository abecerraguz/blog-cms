// src/models/Server.ts
import express, { type Application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import articulosRouter from '../v1/routes/articulos.routes.js'
import uploadRouter from '../v1/routes/upload.routes.js'
import { requestInfo } from '../middlewares/requestInfo.js'
import { cacheForGetRequest } from '../middlewares/cacheHeaders.js'
import { notFoundHandler } from '../middlewares/notFound.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { sendSuccess } from '../utils/apiResponse.js'
import { prisma } from '../config/db.js'

import { UPLOADS_DIR } from '../middlewares/upload.js'

class Server {
    private app: Application
    private port: string | number
    private apiVersion: string
    private paths: { api: string }

    constructor() {
        this.app = express()
        this.port = process.env.PORT ?? 3001
        this.apiVersion = process.env.API_VERSION ?? 'v1'
        this.paths = { api: `/api/${this.apiVersion}` }

        this.middlewares()
        this.routes()
        this.errorMiddlewares()
    }

    private middlewares() {
        // Oculta que usamos Express
        this.app.disable('x-powered-by')
        this.app.use(cors({origin: process.env.FRONTEND_URL ?? 'http://localhost:5173'}))
        this.app.use(express.json())
        this.app.use(express.json())        // ← ANTES de las rutas
        this.app.use(requestInfo)
        this.app.use(cacheForGetRequest(Number(process.env.API_CACHE_MAX_AGE ?? 60)))
        // Sirve las imágenes subidas como archivos estáticos
        // http://localhost:3001/uploads/nombre.jpg
        this.app.use('/uploads', express.static(UPLOADS_DIR))
    }

    private routes() {
        // Health check
        this.app.get('/health', (req, res) => {
            return sendSuccess({
                res,
                message: 'Servidor CMS operativo',
                data: {
                    uptimeSeconds: Math.floor(process.uptime()),
                    timestamp: new Date().toISOString(),
                    version: this.apiVersion,
                },
            })
        })

        // Rutas versionadas
        this.app.use(`${this.paths.api}/articulos`, articulosRouter)

        // Documentación del API
        this.app.get(this.paths.api, (req, res) => {
            return sendSuccess({
                res,
                message: 'API CMS Blog',
                data: {
                    version: this.apiVersion,
                    endpoints: {
                        articulos: {
                            list: { method: 'GET', url: `${this.paths.api}/articulos`, params: ['estado', 'busqueda'] },
                            detail: { method: 'GET', url: `${this.paths.api}/articulos/:slug` },
                        }
                    }
                }
            })
        })

        this.app.use(`${this.paths.api}/upload`, uploadRouter)
    }

    private errorMiddlewares() {
        // Rutas no encontradas — antes del errorHandler
        this.app.use(notFoundHandler)

        // Manejo global de errores — siempre al final
        this.app.use(errorHandler)
    }

    listen() {
        prisma.$connect()
            .then(() => {
                this.app.listen(this.port, () => {
                    console.log(`✅ Servidor CMS en http://localhost:${this.port}`)
                    console.log(`📡 API: http://localhost:${this.port}${this.paths.api}`)
                })
            })
            .catch((e) => {
                console.error('❌ No se pudo conectar a PostgreSQL:', e)
                process.exit(1)
            })
    }
}

export default Server