import { loadEnvConfig } from "@next/env"
import { defineConfig } from "drizzle-kit"

// drizzle-kit runs outside the Next.js runtime, so `.env.local` is not loaded
// for us. `loadEnvConfig` applies the same file precedence Next.js uses.
loadEnvConfig(process.cwd())

// Migrations need a direct (non-pooled) connection — PgBouncer can't hold the
// session state that DDL and advisory locks rely on.
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL

if (!url) {
  throw new Error(
    "DATABASE_URL_UNPOOLED is not set. Run `npx neon env pull` to populate .env.local."
  )
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  casing: "snake_case",
  verbose: true,
  strict: true,
})
