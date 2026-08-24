"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { tasks } from "@trigger.dev/sdk"

import type { helloWorldTask } from "@/trigger/example"
import { createWorkflow } from "@/features/workflows/data"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An active organization is required to create a workflow.")
  }

  const workflow = await createWorkflow(orgId, name)

  // The workflow list lives in the dashboard layout's sidebar, so the whole
  // layout has to be invalidated for the new row to show up.
  revalidatePath("/", "layout")

  redirect(`/workflows/${workflow.id}`)
}

export async function runWorkflowAction(workflowId: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An active organization is required to run a workflow.")
  }

  // Triggered by id with a type-only import: the task instance itself must
  // never end up in the Next.js bundle.
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: `Running workflow ${workflowId}`,
  })

  // The handle's JWT is already scoped to this one run, so the client can
  // subscribe to it without minting a separate public access token.
  return { runId: handle.id, publicAccessToken: handle.publicAccessToken }
}
