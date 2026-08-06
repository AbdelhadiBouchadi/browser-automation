import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run `npx neon env pull` to populate .env.local."
  )
}

// Pooled connection over HTTP: one round trip per query, no socket to keep
// alive, so it survives serverless cold starts and the edge runtime.
// Note: `db.transaction()` is not available on this driver — use `db.batch()`
// for multi-statement atomicity, or switch to `drizzle-orm/neon-serverless`.
export const db = drizzle({
  client: neon(process.env.DATABASE_URL),
  schema,
  casing: "snake_case",
})

export { schema }
