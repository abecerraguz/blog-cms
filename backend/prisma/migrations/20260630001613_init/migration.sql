-- CreateEnum
CREATE TYPE "EstadoArticulo" AS ENUM ('borrador', 'publicado', 'archivado');

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "color" VARCHAR(7) NOT NULL DEFAULT '#3b82f6',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "extracto" TEXT,
    "contenido" TEXT,
    "imagen" VARCHAR(500),
    "autor" VARCHAR(100) NOT NULL DEFAULT 'Administrador',
    "tiempo_lectura" INTEGER NOT NULL DEFAULT 5,
    "estado" "EstadoArticulo" NOT NULL DEFAULT 'borrador',
    "fecha_publicacion" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articulos_slug_key" ON "articulos"("slug");

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
