// src/types/index.ts

// ── Categoria ──────────────────────────────────────────────
export type CategoriaSlug =
  | "tecnologia"
  | "diseno"
  | "programacion"
  | "herramientas";

export interface Categoria {
  id: number;
  nombre: string;
  slug: CategoriaSlug;
  color: string; // color hex para el badge en el listado
}

// ── Tag ────────────────────────────────────────────────────
export interface Tag {
  id: number;
  nombre: string;
  slug: string;
}

// ── Articulo ───────────────────────────────────────────────
export type EstadoArticulo = "borrador" | "publicado" | "archivado";

export interface Articulo {
  id: number;
  titulo: string;
  slug: string;
  extracto: string;        // texto corto para la tarjeta en el listado
  contenido: string;       // HTML o Markdown del cuerpo completo
  imagen: string;          // URL de la imagen de portada
  categoria: Categoria;
  tags: Tag[];
  autor: string;
  tiempoLectura: number;   // minutos estimados
  estado: EstadoArticulo;
  fechaPublicacion: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
}

// ── Formularios (Utility Types aplicados) ──────────────────
// Al crear un artículo, el id/createdAt/updatedAt los genera el servidor
export type NuevoArticulo = Omit<Articulo, "id" | "createdAt" | "updatedAt">;

// Al editar, todos los campos son opcionales excepto el id
export type ActualizarArticulo = Partial<NuevoArticulo> & { id: number };

// Para el listado del admin solo necesitamos un subconjunto
export type ArticuloListado = Pick<
  Articulo,
  "id" | "titulo" | "slug" | "categoria" | "estado" | "fechaPublicacion"
>;

// ── API ────────────────────────────────────────────────────
// Wrapper genérico para todas las respuestas del backend
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ── Usuario / Auth ─────────────────────────────────────────
export type RolUsuario = "admin" | "editor";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  avatar?: string;
}

export interface SesionAuth {
  usuario: Usuario;
  token: string;
  expiresAt: string;
}