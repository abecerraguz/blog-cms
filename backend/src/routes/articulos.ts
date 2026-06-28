// cms-blog/backend/src/routes/articulos.ts
import { Router } from 'express'
import { ARTICULOS_MOCK } from '../data/mockData.js'

const router = Router()

// GET /api/articulos — devuelve todos con filtros opcionales
router.get('/', (req, res) => {
  const { estado, busqueda } = req.query

  let resultados = [...ARTICULOS_MOCK]

  if (estado && estado !== 'todos')
    resultados = resultados.filter((a) => a.estado === estado)

  if (busqueda && typeof busqueda === 'string')
    resultados = resultados.filter((a) =>
      a.titulo.toLowerCase().includes(busqueda.toLowerCase())
    )

  res.json({ data: resultados, status: 200 })
})

// GET /api/articulos/:slug — devuelve uno por slug
router.get('/:slug', (req, res) => {
  const articulo = ARTICULOS_MOCK.find((a) => a.slug === req.params.slug)

  if (!articulo)
    return res.status(404).json({ error: 'Artículo no encontrado', status: 404 })

  res.json({ data: articulo, status: 200 })
})

export default router