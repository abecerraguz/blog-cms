# CMS Blog — React + TypeScript Bootcamp

Blog CMS construido con React, TypeScript, Vite y Express.  
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
- Node.js + Express
- TypeScript con tsx
- dotenv + CORS

---

## Estructura del proyecto

```
cms-blog/
├── frontend/                      # App Vite + React
│   ├── public/
│   │   └── uploads/               # Imágenes de artículos
│   ├── src/
│   │   ├── assets/
│   │   │   └── css/
│   │   │       └── main.scss      # Estilos globales con variables de tema
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx     # Navbar con toggle tema y auth
│   │   │   │   └── Footer.tsx     # Footer con redes sociales
│   │   │   ├── ArticuloCard.tsx       # Tarjeta de artículo (memo)
│   │   │   ├── ArticuloCardSkeleton.tsx # Skeleton loader
│   │   │   ├── CategoriaBadge.tsx     # Badge de categoría
│   │   │   ├── HeroBanner.tsx         # Hero reutilizable
│   │   │   └── ProtectedRoute.tsx     # Protección de rutas admin
│   │   ├── context/
│   │   │   ├── TemaContext.tsx        # Dark/light mode con localStorage
│   │   │   └── AuthContext.tsx        # Login/logout simulado
│   │   ├── data/
│   │   │   └── mockData.ts           # Datos de prueba (reemplazado en S7)
│   │   ├── hooks/
│   │   │   ├── usePublicaciones.ts       # Carga artículos con loading/error
│   │   │   ├── useArticulosFiltrados.ts  # Filtro derivado del store
│   │   │   └── useFormularioArticulo.ts  # useReducer para el formulario
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          # Página pública del blog
│   │   │   ├── DetallePage.tsx       # Detalle del artículo por slug
│   │   │   ├── LoginPage.tsx         # Formulario de login
│   │   │   ├── NotFound.tsx          # Página 404
│   │   │   └── admin/
│   │   │       ├── AdminListado.tsx  # Tabla de artículos con búsqueda
│   │   │       └── NuevoArticulo.tsx # Formulario nuevo artículo
│   │   ├── store/
│   │   │   └── articulosStore.ts     # Store Zustand del panel admin
│   │   ├── types/
│   │   │   └── index.ts              # Interfaces y tipos del dominio
│   │   ├── App.tsx                   # Configuración de rutas
│   │   └── main.tsx                  # Entry point con Providers
│   ├── package.json
│   └── vite.config.ts
├── backend/                       # Servidor Express
│   ├── src/
│   │   ├── data/
│   │   │   ├── mockData.ts       # Datos mock del backend
│   │   │   └── types.ts          # Tipos compartidos
│   │   ├── routes/
│   │   │   └── articulos.ts      # GET /api/articulos, GET /api/articulos/:slug
│   │   └── app.ts                # Entry point del servidor
│   ├── .env                      # PORT, FRONTEND_URL
│   ├── package.json
│   └── tsconfig.json
├── package.json                   # Raíz: scripts con concurrently
└── .gitignore
```

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/abecerraguz/blog-cms.git
cd cms-blog

# Instalar dependencias del frontend
cd frontend && npm install && cd ..

# Instalar dependencias del backend
cd backend && pnpm install && cd ..

# Instalar concurrently en la raíz
npm install

# Arrancar frontend y backend en paralelo
npm run dev
```

**Frontend:** `http://localhost:5173`
**Backend:** `http://localhost:3001`

### Credenciales de prueba

```
Email:    admin@blog.com
Password: admin123
```

---

## Variables de entorno

**frontend/.env**
```
VITE_API_URL=http://localhost:3001
```

**backend/.env**
```
PORT=3001
FRONTEND_URL=http://localhost:5173
```

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

### Backend (Express)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado del servidor |
| GET | `/api/articulos` | Lista todos los artículos |
| GET | `/api/articulos?estado=publicado` | Filtra por estado |
| GET | `/api/articulos?busqueda=texto` | Filtra por búsqueda |
| GET | `/api/articulos/:slug` | Obtiene un artículo por slug |

---

## Lo aprendido semana a semana

### Semana 1 — Fundamentos de TypeScript

Bases de TypeScript aplicadas al dominio del CMS.

- Tipos primitivos, interfaces y type aliases
- `type` vs `interface` — cuándo usar cada uno
- Utility Types: `Omit`, `Partial`, `Pick`
- Tipos del dominio: `Articulo`, `Categoria`, `Tag`, `Usuario`

```typescript
// Tipos del dominio
export interface Articulo {
  id: number
  titulo: string
  slug: string
  categoria: Categoria    // objeto completo, no string
  estado: EstadoArticulo  // "publicado" | "borrador" | "archivado"
  tags: Tag[]
}

// Utility Types aplicados
export type NuevoArticulo    = Omit<Articulo, "id" | "createdAt" | "updatedAt">
export type ActualizarArticulo = Partial<NuevoArticulo> & { id: number }
export type ArticuloListado  = Pick<Articulo, "id" | "titulo" | "slug" | "categoria" | "estado" | "fechaPublicacion">
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
- Imágenes en `public/uploads/` para rutas directas `/uploads/imagen.jpg`

```
src/components/layout/  → Header, Footer (se repiten en todas las páginas)
src/components/         → ArticuloCard, HeroBanner, CategoriaBadge (2+ páginas)
src/pages/              → HomePage, DetallePage (vistas completas)
public/uploads/         → imágenes referenciadas con rutas directas
```

**Aprendizaje clave:** `React.memo` en componentes de lista.
Un componente que está en una lista, recibe props y no tiene estado propio
es el candidato perfecto para `memo`.

```tsx
export const ArticuloCard = memo(function ArticuloCard({ articulo }: ArticuloCardProps) {
  return ( ... )
})
```

---

### Semana 3 — Hooks con TypeScript

Los componentes pasan de estáticos a dinámicos.

- `useState` — el componente recuerda cosas
- `useEffect` — instrucciones al entrar/salir de la pantalla
- `useMemo` — no recalcular si los datos no cambiaron
- Custom hooks — extraer lógica a su propio archivo

**La regla central:** los componentes siguen siendo "tontos".
El hook tiene toda la lógica, el componente solo pinta lo que el hook le da.

```typescript
// El hook prepara todo
export function usePublicaciones() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [cargando, setCargando]   = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setArticulos(ARTICULOS_MOCK)
      setCargando(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return { articulos, cargando, error }
}

// El componente solo decide qué pintar
const { articulos, cargando, error } = usePublicaciones()
if (cargando) return <Skeleton />
if (error)    return <Error />
return        <ListaArticulos />
```

**Aprendizaje clave:** Skeleton loader en vez de pantalla en blanco.
El Header, HeroBanner y Footer siempre se ven.
Solo el área de tarjetas muestra las siluetas mientras carga.

---

### Semana 4 — Componentes avanzados y Context API

Estado global sin pasar props por todos lados.

- **Props drilling** — el problema: pasar datos por componentes que no los necesitan
- **Context API** — el canal directo que lo resuelve
- `TemaContext` — dark/light mode con persistencia en localStorage
- `AuthContext` — login/logout simulado (Semana 7: se conecta a la API)
- `useReducer` — para estados con múltiples campos relacionados

**La diferencia entre SASS y CSS custom properties:**
```scss
$variable-sass   // estática, se compila una vez → nunca cambia en runtime
--variable-css   // dinámica, el navegador la lee → puede cambiar con JS
```

El tema oscuro funciona porque `TemaContext` pone `data-theme="oscuro"` en `<html>`
y el SASS reacciona con `[data-theme="oscuro"] { --bg-color: #0f172a }`.

**`useReducer` vs `useState`:**
```
useState   → 1-3 valores simples sin relación
useReducer → 4+ valores relacionados o acciones con nombres claros
```

```typescript
// Un cuaderno con acciones nombradas
type AccionFormulario =
  | { type: 'SET_CAMPO'; campo: keyof CamposFormulario; valor: string }
  | { type: 'RESET' }

// Un reducer — la "secretaria" que sabe qué hacer con cada nota
function reducirFormulario(state: CamposFormulario, accion: AccionFormulario) {
  switch (accion.type) {
    case 'SET_CAMPO': return { ...state, [accion.campo]: accion.valor }
    case 'RESET':     return estadoInicial
  }
}
```

**Aprendizaje clave:** Zustand es Context sin el dolor.
Context necesita 5 pasos para compartir un dato.
Zustand necesita 1 archivo. La Semana 5 lo confirma.

---

### Semana 5 — Gestión de estado global con Zustand

El almacén central de la app — cualquier componente lee y escribe sin pasar props.

- **Store** = almacén central accesible desde cualquier componente
- Sin Provider, sin configuración extra
- Selector granular: cada componente se suscribe solo a lo que usa

```typescript
// Todo en un objeto — estado + acciones
export const useArticulosStore = create<ArticulosState>((set) => ({
  articulos: [...],
  busqueda: '',
  filtroEstado: 'todos',

  setBusqueda:      (busqueda)  => set({ busqueda }),
  eliminarArticulo: (id)        => set((s) => ({
    articulos: s.articulos.filter((a) => a.id !== id)
  })),
  toggleEstado: (id) => set((s) => ({
    articulos: s.articulos.map((a) =>
      a.id === id
        ? { ...a, estado: a.estado === 'publicado' ? 'borrador' : 'publicado' }
        : a
    )
  }))
}))
```

**Arquitectura monorepo:**
Un solo repositorio con frontend y backend. Un solo comando arranca todo.

```json
// package.json raíz
{
  "scripts": {
    "dev": "concurrently -n frontend,backend -c cyan,yellow \"npm run dev --prefix frontend\" \"npx tsx watch backend/src/app.ts\""
  }
}
```

**Nota sobre pnpm 11:** `pnpm init` genera `"type": "module"` y `devEngines`
que conflictúa con `ts-node-dev`. Solución: usar `tsx` con `npx tsx watch`.

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
// App.tsx — configuración de rutas
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
// ProtectedRoute — usa el AuthContext de la Semana 4
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
```

```tsx
// useParams — lee el slug de la URL
const { slug } = useParams<{ slug: string }>()
const articulo = ARTICULOS_MOCK.find((a) => a.slug === slug)
if (!articulo) return <NotFound />
```

**La regla `<Link>` vs `<a>`:**
```
<a href="/ruta">    → recarga la página completa ❌
<Link to="/ruta">   → React Router, sin recarga  ✅
<a href="https://"> → links externos, siempre <a> ✅
```

---

## Próximas semanas

| Semana | Tema | Qué cambia en el CMS |
|---|---|---|
| 7 | Consumo de APIs | `fetch()` real reemplaza el mock. Los datos vienen del servidor Express |
| 8 | Backend CRUD + multer | Rutas POST, PUT, DELETE. Subida de imágenes |
| 9 | Panel admin conectado | CRUD completo conectado a PostgreSQL |
| 10 | Testing | Tests unitarios e integración |
| 11 | Proyecto integrador | CMS completo funcionando de punta a punta |

---

## Autor

**AbecerraGuz** — UX/UI Designer & Full Stack JavaScript Developer
[GitHub](https://github.com/abecerraguz) · [Portfolio](https://abecerraguz.com)
