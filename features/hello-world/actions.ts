"use server"

import { tasks } from "@trigger.dev/sdk"
import { auth } from "@clerk/nextjs/server"

// Type-only import: this pulls in the task's types for payload/return checking
// without bundling the task code (and its server-only deps) into the app.
import type { helloWorldTask } from "@/trigger/example"

export async function triggerHelloWorldAction(message: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An active organization is required to trigger a task.")
  }

  // Returns as soon as the run is enqueued — it does not wait for the run to
  // finish, so this is safe to call from a request handler.
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message,
  })

  return { runId: handle.id }
}
