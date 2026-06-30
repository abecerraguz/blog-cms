# CMS Blog — Backend API

Servidor Express + TypeScript con arquitectura MVC, Prisma ORM y PostgreSQL.

---

## Stack tecnológico

- **Node.js** + **TypeScript**
- **Express 5** — servidor HTTP
- **Prisma ORM 7** — acceso a base de datos con tipos
- **PostgreSQL** — base de datos relacional
- **tsx** — ejecución de TypeScript en desarrollo (ESModules)
- **pnpm** — gestor de paquetes

---

## Estructura del proyecto

```
backend/
├── generated/
│   └── prisma/                    # Cliente Prisma generado (no editar)
│       ├── client.ts
│       ├── client.js
│       └── ...
├── prisma/
│   ├── schema.prisma              # Modelos de la base de datos
│   ├── migrations/                # Historial de migraciones
│   └── seed.ts                    # Datos de prueba
├── src/
│   ├── config/
│   │   └── db.ts                  # Cliente Prisma con adapter pg
│   ├── controllers/
│   │   └── articulosController.ts # Maneja request/response
│   ├── database/
│   │   └── articuloQueries.ts     # Consultas a la base de datos
│   ├── middlewares/
│   │   ├── cacheHeaders.ts        # Cache-Control automático en GET
│   │   ├── errorHandler.ts        # Manejo global de errores
│   │   ├── notFound.ts            # Rutas no encontradas (404)
│   │   └── requestInfo.ts         # Logger: método + URL + status + ms
│   ├── models/
│   │   └── Server.ts              # Clase que encapsula Express
│   ├── services/
│   │   └── articulosService.ts    # Lógica de negocio
│   ├── utils/
│   │   ├── ApiError.ts            # Clase de errores HTTP tipados
│   │   └── apiResponse.ts         # sendSuccess() + sendError()
│   └── v1/
│       └── routes/
│           └── articulos.routes.ts # Rutas versionadas /api/v1
├── .env                           # Variables de entorno (no subir a git)
├── .env.example                   # Plantilla de variables de entorno
├── package.json
├── prisma.config.ts               # Configuración de Prisma 7
└── tsconfig.json
```

---

## Instalación

```bash
cd backend
pnpm install
```

---

## Variables de entorno

Crea un archivo `.env` en `backend/` con estas variables:

```bash
# Servidor
PORT=3001
API_VERSION=v1
API_CACHE_MAX_AGE=60
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Base de datos
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/cms_blog_dev"
```

> ⚠️ El archivo `.env` nunca se sube a Git. Está en `.gitignore`.

---

## Base de datos

### Requisitos
- PostgreSQL instalado y corriendo en `localhost:5432`

### Crear la base de datos

```bash
psql -U postgres -c "CREATE DATABASE cms_blog_dev;"
```

### Ejecutar la migración

```bash
npx prisma migrate dev --name init
```

Esto crea las tablas `categorias` y `articulos` en PostgreSQL.

### Generar el cliente Prisma

```bash
npx prisma generate
```

Genera el cliente TypeScript en `generated/prisma/`. **Este paso es obligatorio** antes de levantar el servidor por primera vez o después de cambiar el schema.

### Insertar datos de prueba

```bash
pnpm seed
```

Inserta 4 categorías y 4 artículos de prueba en la base de datos.

### Ver la base de datos en el navegador

```bash
npx prisma studio
```

Abre `http://localhost:5555` con una interfaz visual para explorar los datos.

---

## Desarrollo

```bash
# Desde backend/
pnpm dev

# O desde la raíz del monorepo (arranca frontend + backend juntos)
npm run dev
```

> ⚠️ **Importante:** el servidor debe levantarse siempre desde `backend/` o usando `--prefix backend`.
> Si se levanta desde la raíz sin `--prefix`, `dotenv` no encuentra el `.env` y Prisma no conecta.
> El script `concurrently` en la raíz usa `npm run dev --prefix backend` para evitar este problema.

---

## Endpoints disponibles

### Base URL: `http://localhost:3001`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Estado del servidor |
| GET | `/api/v1` | Documentación de endpoints |
| GET | `/api/v1/articulos` | Lista todos los artículos |
| GET | `/api/v1/articulos?estado=publicado` | Filtra por estado |
| GET | `/api/v1/articulos?busqueda=texto` | Busca por título |
| GET | `/api/v1/articulos/:slug` | Obtiene un artículo por slug |

### Formato de respuesta exitosa

```json
{
  "status": "success",
  "code": 200,
  "message": "Listado de artículos obtenido correctamente.",
  "data": [...],
  "meta": { "total": 4 }
}
```

### Formato de respuesta de error

```json
{
  "status": "error",
  "code": 404,
  "message": "No existe un artículo con el slug 'slug-inexistente'"
}
```

---

## Arquitectura MVC

```
Request HTTP
    ↓
routes/          → define qué URL llama a qué controller
    ↓
controllers/     → recibe la request, valida params, llama al service
    ↓
services/        → lógica de negocio
    ↓
database/        → consultas a Prisma (antes eran SQL preparadas con pg)
    ↓
PostgreSQL
```

---

## Decisiones técnicas importantes

### Por qué `tsx` en vez de `ts-node-dev`

`ts-node-dev` no es compatible con `"type": "module"` en `package.json`.
`tsx` soporta ESModules nativamente y es más rápido.

```json
// package.json
"dev": "npx tsx watch src/index.ts"
```

> `npx` es necesario porque `tsx` se instala localmente — el comando `tsx` directo
> no está en el PATH cuando se instala con `pnpm`.

### Por qué Prisma 7 necesita `prisma.config.ts`

En Prisma 7 la `DATABASE_URL` se movió fuera de `schema.prisma` a un archivo de configuración dedicado. El `schema.prisma` ahora solo define los modelos:

```prisma
// schema.prisma — sin url
datasource db {
  provider = "postgresql"
}
```

```typescript
// prisma.config.ts — la URL va aquí
import { defineConfig, env } from "prisma/config"
export default defineConfig({
  datasource: { url: env("DATABASE_URL") }
})
```

### Por qué Prisma 7 necesita `@prisma/adapter-pg`

Prisma 7 eliminó el cliente en Rust y lo reconstruyó en TypeScript puro.
Ahora requiere un driver adapter explícito para conectarse a PostgreSQL:

```typescript
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/client.js"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })
```

### Por qué el cliente generado va en `generated/` fuera de `src/`

Prisma 7 genera el cliente en `generated/prisma/` por defecto (fuera de `node_modules`).
Para que TypeScript lo encuentre, `tsconfig.json` debe incluir esa carpeta:

```json
{
  "include": ["src/**/*", "generated/**/*", "prisma.config.ts"]
}
```

### Por qué `pnpm approve-builds` fue necesario

pnpm 11 bloquea los scripts de instalación por seguridad.
Prisma necesita compilar binarios nativos (`@prisma/engines`) al instalarse.
Sin aprobar el build, el cliente Prisma no funciona.

```bash
pnpm approve-builds
# Seleccionar: @prisma/engines
```

### Por qué `pnpm init` generó un `package.json` problemático

pnpm 11 agrega automáticamente `"type": "module"` y el bloque `devEngines`.
Esto conflictúa con algunas herramientas. La solución fue crear el `package.json`
manualmente sin esos campos antes de instalar dependencias.

---

## Scripts disponibles

```bash
pnpm dev    # Levanta el servidor con hot reload
pnpm build  # Compila TypeScript a JavaScript en dist/
pnpm seed   # Inserta datos de prueba en la base de datos
```

---

## Semanas futuras

| Semana | Qué se agrega al backend |
|--------|--------------------------|
| 8 | Rutas POST, PUT, DELETE — CRUD completo |
| 8 | Subida de imágenes con multer |
| 8 | Validación de input con middleware |
| 9 | Panel admin del frontend conectado al CRUD |
| 10 | Tests con Jest + Supertest |
