# CMS Blog — React + TypeScript Bootcamp

Blog CMS full-stack construido con React, TypeScript, Vite, Express, Prisma y PostgreSQL.
Proyecto desarrollado semana a semana como parte del bootcamp React + TypeScript de 11 semanas.

---

## Stack tecnológico

**Frontend**
- React 19 + TypeScript
- Vite (bundler)
- React Router v6 (navegación)
- Zustand (estado global)
- Context API (tema + auth)
- SASS (estilos)
- Bootstrap Icons

**Backend**
- Node.js + Express 5 + TypeScript
- Prisma ORM 7 (cliente con driver adapter)
- PostgreSQL (base de datos relacional)
- multer (subida de archivos)
- tsx (ejecución de TypeScript con ESModules)
- pnpm (gestor de paquetes del backend)

---

## Estructura del proyecto

```
cms-blog/
├── frontend/                          # App Vite + React
│   ├── public/
│   │   └── uploads/                   # Imágenes de artículos (servidas por Vite y Express)
│   ├── src/
│   │   ├── assets/css/main.scss       # Estilos globales con variables de tema
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx         # Navbar con toggle tema y auth
│   │   │   │   └── Footer.tsx         # Footer con redes sociales
│   │   │   ├── ArticuloCard.tsx           # Tarjeta de artículo (memo)
│   │   │   ├── ArticuloCardSkeleton.tsx   # Skeleton loader
│   │   │   ├── CategoriaBadge.tsx         # Badge de categoría
│   │   │   ├── HeroBanner.tsx             # Hero reutilizable
│   │   │   └── ProtectedRoute.tsx         # Protección de rutas admin
│   │   ├── context/
│   │   │   ├── TemaContext.tsx        # Dark/light mode con localStorage
│   │   │   └── AuthContext.tsx        # Login/logout simulado
│   │   ├── data/
│   │   │   └── mockData.ts            # Datos de prueba (ya no se usa en runtime — Semana 7)
│   │   ├── hooks/
│   │   │   ├── usePublicaciones.ts        # Carga artículos reales vía articulosService
│   │   │   ├── useArticulosFiltrados.ts   # Filtro derivado del store
│   │   │   └── useFormularioArticulo.ts   # useReducer para el formulario
│   │   ├── services/
│   │   │   └── articulosService.ts    # Capa de acceso a la API REST (fetch tipado)
│   │   ├── pages/
│   │   │   ├── HomePage.tsx           # Página pública del blog
│   │   │   ├── DetallePage.tsx        # Detalle del artículo por slug
│   │   │   ├── LoginPage.tsx          # Formulario de login
│   │   │   ├── NotFound.tsx           # Página 404
│   │   │   └── admin/
│   │   │       ├── AdminListado.tsx   # Tabla de artículos con búsqueda
│   │   │       └── NuevoArticulo.tsx  # Formulario nuevo artículo
│   │   ├── store/
│   │   │   └── articulosStore.ts      # Store Zustand del panel admin
│   │   ├── types/
│   │   │   └── index.ts               # Interfaces y tipos del dominio
│   │   ├── App.tsx                    # Configuración de rutas
│   │   └── main.tsx                   # Entry point con Providers
│   ├── .env                           # VITE_API_URL
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                           # Servidor Express + Prisma — arquitectura MVC
│   ├── generated/
│   │   └── prisma/                    # Cliente Prisma generado (no editar, no se sube a git)
│   ├── prisma/
│   │   ├── schema.prisma              # Modelos: Categoria, Articulo, enum EstadoArticulo
│   │   ├── migrations/                # Historial de migraciones SQL
│   │   └── seed.ts                    # Datos de prueba (4 categorías + 4 artículos)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                  # Cliente Prisma con adapter-pg
│   │   ├── controllers/
│   │   │   └── articulosController.ts # Recibe request/response, valida input
│   │   ├── database/
│   │   │   └── articuloQueries.ts     # Consultas Prisma (CRUD completo)
│   │   ├── middlewares/
│   │   │   ├── cacheHeaders.ts        # Cache-Control automático en GET
│   │   │   ├── errorHandler.ts        # Manejo global de errores
│   │   │   ├── notFound.ts            # Rutas no encontradas (404)
│   │   │   ├── requestInfo.ts         # Logger: método + URL + status + ms
│   │   │   └── upload.ts              # Configuración de multer
│   │   ├── models/
│   │   │   └── Server.ts              # Clase que encapsula Express (constructor, middlewares, routes)
│   │   ├── services/
│   │   │   └── articulosService.ts    # Lógica de negocio entre controller y database
│   │   ├── utils/
│   │   │   ├── ApiError.ts            # Clase de errores HTTP tipados
│   │   │   ├── apiResponse.ts         # sendSuccess() + sendError() estandarizados
│   │   │   └── PrismaErrorMapper.ts   # Traduce errores de Prisma (P2002, P2003) a HTTP
│   │   ├── v1/
│   │   │   └── routes/
│   │   │       ├── articulos.routes.ts # GET, POST, PUT, DELETE /api/v1/articulos
│   │   │       └── upload.routes.ts    # POST /api/v1/upload (multipart/form-data)
│   │   └── index.ts                   # Entry point — conecta Prisma y levanta el servidor
│   ├── .env                           # PORT, DATABASE_URL, FRONTEND_URL
│   ├── package.json
│   ├── prisma.config.ts               # Configuración de Prisma 7 (DATABASE_URL vive aquí)
│   └── tsconfig.json
│
├── package.json                       # Raíz: scripts con concurrently
└── .gitignore
```

---

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/abecerraguz/blog-cms.git
cd cms-blog
```

### 2. Instalar dependencias

```bash
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && pnpm install && cd ..

# Raíz (concurrently)
npm install
```

### 3. Base de datos (PostgreSQL)

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE cms_blog_dev;"

cd backend

# Ejecutar la migración (crea las tablas)
npx prisma migrate dev --name init

# Generar el cliente Prisma
npx prisma generate

# Insertar datos de prueba
pnpm seed

cd ..
```

### 4. Variables de entorno

**frontend/.env**
```bash
VITE_API_URL=http://localhost:3001/api/v1
```

**backend/.env**
```bash
PORT=3001
API_VERSION=v1
API_CACHE_MAX_AGE=60
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/cms_blog_dev"
```

### 5. Arrancar el proyecto

```bash
# Desde la raíz — levanta frontend y backend en paralelo
npm run dev
```

**Frontend:** `http://localhost:5173`
**Backend:** `http://localhost:3001`
**Prisma Studio** (explorar la DB visualmente): `npx prisma studio` desde `backend/`

### Credenciales de prueba

```
Email:    admin@blog.com
Password: admin123
```

> ⚠️ El servidor backend siempre debe levantarse desde `backend/` (o con `--prefix backend`).
> Si se levanta desde la raíz sin `--prefix`, `dotenv` no encuentra el `.env` y Prisma no conecta.

---

## Rutas del CMS

### Frontend (React Router)

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | HomePage | Público |
| `/articulo/:slug` | DetallePage | Público |
| `/admin/login` | LoginPage | Público |
| `/admin` | AdminListado | Protegida |
| `/admin/nuevo` | NuevoArticulo | Protegida |
| `*` | NotFound | Público |

### Backend (Express + Prisma) — API REST versionada

Base URL: `http://localhost:3001`

| Método | Ruta | Descripción | Status |
|---|---|---|---|
| GET | `/health` | Estado del servidor | 200 |
| GET | `/api/v1` | Documentación de endpoints | 200 |
| GET | `/api/v1/articulos` | Lista artículos (filtros: `estado`, `busqueda`) | 200 |
| GET | `/api/v1/articulos/:slug` | Obtiene un artículo por slug | 200 / 404 |
| POST | `/api/v1/articulos` | Crea un artículo (genera slug automático) | 201 / 400 / 409 |
| PUT | `/api/v1/articulos/:slug` | Actualiza campos parciales | 200 / 404 |
| DELETE | `/api/v1/articulos/:id` | Elimina un artículo | 204 / 404 |
| POST | `/api/v1/upload` | Sube una imagen (`multipart/form-data`, campo `imagen`) | 200 / 400 |
| GET | `/uploads/:archivo` | Sirve imágenes subidas como archivos estáticos | 200 |

**Formato de respuesta estandarizado:**

```json
{
  "status": "success",
  "code": 200,
  "message": "Listado de artículos obtenido correctamente.",
  "data": [...],
  "meta": { "total": 4 }
}
```

```json
{
  "status": "error",
  "code": 404,
  "message": "No existe un artículo con el slug 'inexistente'"
}
```

---

## Arquitectura del backend (MVC)

```
Request HTTP
    ↓
v1/routes/        → define qué verbo HTTP llama a qué controller
    ↓
controllers/       → recibe req/res, valida input, decide el código HTTP
    ↓
services/           → lógica de negocio (capa de orquestación)
    ↓
database/            → consultas Prisma tipadas (antes era SQL preparado con pg)
    ↓
PostgreSQL
```

`models/Server.ts` encapsula toda la configuración de Express en una clase:
constructor → `middlewares()` → `routes()` → `errorMiddlewares()` → `listen()`.

---

## Lo aprendido semana a semana

### Semana 1 — Fundamentos de TypeScript

Bases de TypeScript aplicadas al dominio del CMS.

- Tipos primitivos, interfaces y type aliases
- `type` vs `interface` — cuándo usar cada uno
- Utility Types: `Omit`, `Partial`, `Pick`
- Tipos del dominio: `Articulo`, `Categoria`, `Tag`, `Usuario`

```typescript
export interface Articulo {
  id: number
  titulo: string
  slug: string
  categoria: Categoria    // objeto completo, no string
  estado: EstadoArticulo  // "publicado" | "borrador" | "archivado"
  tags: Tag[]
}

export type NuevoArticulo      = Omit<Articulo, "id" | "createdAt" | "updatedAt">
export type ActualizarArticulo = Partial<NuevoArticulo> & { id: number }
export type ArticuloListado    = Pick<Articulo, "id" | "titulo" | "slug" | "categoria" | "estado" | "fechaPublicacion">
```

**Aprendizaje clave:** `categoria` en `Articulo` es un objeto `Categoria`, no un string.
Al renderizarlo en JSX se accede con `articulo.categoria.nombre`, no `articulo.categoria`.

---

### Semana 2 — React + TypeScript: Primeros pasos

Construcción de los componentes base del CMS.

- Componentes funcionales tipados con interfaces de props
- Props opcionales con `?` y valores por defecto
- Cuándo extraer un componente: 1 lugar → inline, 2+ lugares → componente
- Dónde viven los archivos: `layout/`, `components/`, `pages/`

```
src/components/layout/  → Header, Footer (se repiten en todas las páginas)
src/components/         → ArticuloCard, HeroBanner, CategoriaBadge (2+ páginas)
src/pages/               → HomePage, DetallePage (vistas completas)
public/uploads/          → imágenes referenciadas con rutas directas
```

**Aprendizaje clave:** `React.memo` en componentes de lista — candidato perfecto cuando
el componente está en una lista, recibe props y no tiene estado propio.

```tsx
export const ArticuloCard = memo(function ArticuloCard({ articulo }: ArticuloCardProps) {
  return ( ... )
})
```

---

### Semana 3 — Hooks con TypeScript

Los componentes pasan de estáticos a dinámicos.

- `useState`, `useEffect`, `useMemo`
- Custom hooks — extraer lógica a su propio archivo

**La regla central:** los componentes siguen siendo "tontos".
El hook tiene toda la lógica, el componente solo pinta lo que el hook le da.

```typescript
export function usePublicaciones() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [cargando, setCargando]   = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    articulosService.getAll({ estado: 'publicado' })
      .then((res) => setArticulos(res.data))
      .catch(() => setError('No se pudieron cargar las publicaciones.'))
      .finally(() => setCargando(false))
  }, [])

  return { articulos, cargando, error }
}
```

**Aprendizaje clave:** Skeleton loader en vez de pantalla en blanco.
El Header, HeroBanner y Footer siempre se ven; solo el área de tarjetas
muestra las siluetas mientras carga.

---

### Semana 4 — Componentes avanzados y Context API

Estado global sin pasar props por todos lados.

- **Props drilling** — el problema que resuelve Context API
- `TemaContext` — dark/light mode con persistencia en localStorage
- `AuthContext` — login/logout simulado (Semana 6 protege rutas; backend real pendiente JWT)
- `useReducer` — para estados con múltiples campos relacionados

**SASS vs CSS custom properties:**
```scss
$variable-sass   // estática, se compila una vez → nunca cambia en runtime
--variable-css   // dinámica, el navegador la lee → puede cambiar con JS
```

El tema oscuro funciona porque `TemaContext` pone `data-theme="oscuro"` en `<html>`
y el SASS reacciona con `[data-theme="oscuro"] { --bg-color: #0f172a }`.

```typescript
type AccionFormulario =
  | { type: 'SET_CAMPO'; campo: keyof CamposFormulario; valor: string }
  | { type: 'RESET' }

function reducirFormulario(state: CamposFormulario, accion: AccionFormulario) {
  switch (accion.type) {
    case 'SET_CAMPO': return { ...state, [accion.campo]: accion.valor }
    case 'RESET':     return estadoInicial
  }
}
```

**Aprendizaje clave:** Zustand es Context sin el dolor. Context necesita 5 pasos
para compartir un dato; Zustand necesita 1 archivo. La Semana 5 lo confirma.

---

### Semana 5 — Gestión de estado global con Zustand

El almacén central de la app — cualquier componente lee y escribe sin pasar props.

```typescript
export const useArticulosStore = create<ArticulosState>((set) => ({
  articulos: [...],
  busqueda: '',
  filtroEstado: 'todos',

  setBusqueda:      (busqueda)  => set({ busqueda }),
  eliminarArticulo: (id)        => set((s) => ({
    articulos: s.articulos.filter((a) => a.id !== id)
  })),
}))
```

**Arquitectura monorepo:** un solo repositorio con `frontend/` y `backend/`,
un solo comando arranca todo.

```json
{
  "scripts": {
    "dev": "concurrently -n frontend,backend -c cyan,yellow \"npm run dev --prefix frontend\" \"npm run dev --prefix backend\""
  }
}
```

> **Lección aprendida:** correr el backend con `npx tsx watch backend/src/index.ts` desde la
> raíz rompe `dotenv` y Prisma — el `cwd` queda en la raíz y no encuentra `backend/.env`.
> La solución es `--prefix backend`, que ejecuta el comando como si estuvieras parado
> dentro de esa carpeta.

**Cuándo usar qué herramienta de estado:**
```
useState        → estado local simple (toggle, input)
useReducer      → estado local complejo (formularios)
Context API     → estado global simple (tema, auth)
Zustand         → estado global compartido entre múltiples componentes
```

---

### Semana 6 — React Router con TypeScript

URLs reales y navegación sin recarga.

- `<Link>` en vez de `<a>` para navegación interna
- `useParams` para leer segmentos dinámicos de la URL
- `useNavigate` para navegar después de una acción
- `ProtectedRoute` con `Outlet` para proteger rutas del admin
- Lazy loading con `React.lazy` y `Suspense`

```tsx
<BrowserRouter>
  <Suspense fallback={<div>Cargando...</div>}>
    <Routes>
      <Route path="/"               element={<HomePage />} />
      <Route path="/articulo/:slug" element={<DetallePage />} />
      <Route path="/admin/login"    element={<LoginPage />} />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route index        element={<AdminListado />} />
        <Route path="nuevo" element={<NuevoArticulo />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
</BrowserRouter>
```

```tsx
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
```

**La regla `<Link>` vs `<a>`:**
```
<a href="/ruta">    → recarga la página completa ❌
<Link to="/ruta">   → React Router, sin recarga  ✅
<a href="https://"> → links externos, siempre <a> ✅
```

**Aprendizaje clave (bug común):** en componentes que cargan datos async, siempre
verificar `cargando` ANTES de verificar si el dato existe — si no, se muestra un 404
falso mientras la petición sigue en curso.

```tsx
// ✅ Orden correcto
if (cargando) return <p>Cargando...</p>
if (!articulo) return <NotFound />
```

---

### Semana 7 — Consumo de APIs y datos asíncronos

El frontend deja de depender del mock — ahora consume el backend real con `fetch` tipado.

- Capa de servicios (`articulosService.ts`) — los componentes nunca llaman a `fetch` directamente
- Verificación de `response.ok` — `fetch` no lanza error en 404/500 por sí solo
- Genéricos `<T>` para reutilizar la misma función de fetch con cualquier tipo de dato

```typescript
// services/articulosService.ts
async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

export const articulosService = {
  getAll:    (params) => fetchJSON<ApiResponse<Articulo[]>>(`/articulos${...}`),
  getBySlug: (slug)   => fetchJSON<ApiResponse<Articulo>>(`/articulos/${slug}`),
}
```

**Aprendizaje clave — inversión de dependencia:** mientras el contrato del servicio
(`Promise<ApiResponse<Articulo[]>>`) se mantenga igual, el origen de los datos puede
cambiar (mock → API real → otro backend) sin tocar ningún componente, hook o página.

**Backend — migración de `pg` puro a Prisma ORM:**

Se evaluó `pg` con SQL preparado (`$1`, `$2`) vs Prisma. Se optó por **Prisma 7** por
productividad, tipado automático y migraciones declarativas.

```prisma
// prisma/schema.prisma
model Articulo {
  id               Int            @id @default(autoincrement())
  titulo           String         @db.VarChar(255)
  slug             String         @unique @db.VarChar(255)
  categoriaId      Int            @map("categoria_id")
  categoria        Categoria      @relation(fields: [categoriaId], references: [id])
  estado           EstadoArticulo @default(borrador)
  // ...
  @@map("articulos")
}
```

**Decisiones técnicas de Prisma 7 documentadas:**
- `DATABASE_URL` ya no va en `schema.prisma` — vive en `prisma.config.ts`
- Requiere un *driver adapter* explícito: `@prisma/adapter-pg`
- El cliente se genera fuera de `node_modules`, en `generated/prisma/` —
  hay que incluirlo en `tsconfig.json`
- `pnpm approve-builds` es obligatorio para que Prisma compile sus binarios nativos

```typescript
// src/config/db.ts
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/client.js"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })
```

---

### Semana 8 — Backend CRUD completo con Express y multer

API REST completa con arquitectura MVC explícita, inspirada en patrones de un
proyecto previo con JWT (capas `routes → controllers → services → database`,
`ApiError`, `sendSuccess`/`sendError`, middlewares especializados).

```
v1/routes/        → solo define qué verbo HTTP llama a qué controller
controllers/       → recibe req/res, valida input, decide el código HTTP
services/           → lógica de negocio (capa intermedia)
database/            → consultas Prisma tipadas
```

**Escritura con Prisma — mucho más simple que SQL dinámico:**

```typescript
// database/articuloQueries.ts
crear: async (datos: NuevoArticuloInput) => {
  const slug = generarSlug(datos.titulo)
  return await prisma.articulo.create({
    data: { ...datos, slug, estado: datos.estado ?? 'borrador' },
    include: { categoria: true }
  })
},

actualizar: async (slug: string, cambios: ActualizarArticuloInput) => {
  // Prisma actualiza SOLO los campos presentes en "cambios" — sin SQL dinámico manual
  return await prisma.articulo.update({ where: { slug }, data: cambios, include: { categoria: true } })
},
```

**Manejo de errores específicos de Prisma:**

```typescript
// utils/PrismaErrorMapper.ts
if (error.code === 'P2002') return new ApiError(409, 'Ya existe un artículo con ese título')
if (error.code === 'P2003') return new ApiError(400, 'La categoría indicada no existe')
if (error.code === 'P2025') return new ApiError(404, 'El registro no fue encontrado')
```

**multer — subida de imágenes:**

```typescript
// middlewares/upload.ts
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR), // frontend/public/uploads
  filename: (_req, file, cb) => {
    const nombre = `${Date.now()}-${crypto.randomBytes(10).toString('hex')}${path.extname(file.originalname)}`
    cb(null, nombre)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter, // solo jpeg, png, webp, gif, avif
})
```

```typescript
// Server.ts — sirve las imágenes como archivos estáticos
this.app.use('/uploads', express.static(UPLOADS_DIR))
```

**Aprendizaje clave:** el destino de multer (`UPLOADS_DIR`) apunta directamente a
`frontend/public/uploads/`, de modo que las imágenes subidas vía API quedan
disponibles tanto para Vite en desarrollo como para Express en `/uploads/:archivo`.

**Endpoints cerrados esta semana:**
```
POST   /api/v1/articulos        → 201 Created (valida titulo + categoriaId, genera slug)
PUT    /api/v1/articulos/:slug  → 200 OK (actualización parcial)
DELETE /api/v1/articulos/:id    → 204 No Content
POST   /api/v1/upload           → 200 OK (multipart/form-data, campo "imagen")
```

---

## Próximas semanas

| Semana | Tema | Qué cambia en el CMS |
|---|---|---|
| 9 | Panel admin conectado | `NuevoArticulo` hace POST real, `AdminListado` hace DELETE/PUT real contra la API |
| 10 | Testing | Tests unitarios e integración (Jest + Supertest) |
| 11 | Proyecto integrador | CMS completo funcionando de punta a punta |

---

## Autor

**AbecerraGuz** — UX/UI Designer & Full Stack JavaScript Developer
[GitHub](https://github.com/abecerraguz) · [Portfolio](https://abecerraguz.com)
