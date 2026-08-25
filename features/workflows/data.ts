import { and, desc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { workflows, type Workflow } from "@/lib/db/schema"

export function listWorkflows(orgId: string) {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.createdAt))
}

// Scoped by orgId as well as id so a workflow from another organization reads
// as missing rather than forbidden. Returns undefined when there is no match:
// `noUncheckedIndexedAccess` is off, so the destructure alone won't say so.
export async function getWorkflow(
  orgId: string,
  id: string
): Promise<Workflow | undefined> {
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(and(eq(workflows.orgId, orgId), eq(workflows.id, id)))
    .limit(1)

  return workflow
}

export async function createWorkflow(orgId: string, name: string) {
  const [workflow] = await db
    .insert(workflows)
    .values({ orgId, name })
    .returning()

  return workflow
}
