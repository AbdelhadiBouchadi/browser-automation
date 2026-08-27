import { Liveblocks } from "@liveblocks/node"

if (!process.env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error("LIVEBLOCKS_SECRET_KEY is not set")
}

// Server only — the secret key authenticates users and administers rooms, so
// it must never be imported from a client component.
export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
})
