"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

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
