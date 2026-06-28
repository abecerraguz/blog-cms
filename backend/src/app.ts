// cms-blog/backend/src/app.ts
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import articulosRouter from './routes/articulos.js'

const app = express()
const PORT = process.env.PORT ?? 3001

// Solo acepta peticiones del frontend en desarrollo
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }))
app.use(express.json())

// Rutas
app.use('/api/articulos', articulosRouter)

// Ruta de salud — para verificar que el servidor está vivo
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', mensaje: 'Servidor CMS funcionando' })
})

app.listen(PORT, () =>
  console.log(`✅ Servidor CMS en http://localhost:${PORT}`)
)