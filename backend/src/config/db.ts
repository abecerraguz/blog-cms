// src/config/db.ts
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? ""
})

export const prisma = new PrismaClient({ adapter })

// Verifica la conexión al arrancar
prisma.$connect()
  .then(() => console.log("✅ PostgreSQL conectado via Prisma"))
  .catch((e) => console.error("❌ Error Prisma:", e))