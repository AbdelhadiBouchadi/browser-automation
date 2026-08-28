import { liveblocks } from "@/lib/liveblocks"
import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { getWorkflow } from "@/features/workflows/data"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

// `PageProps` is generated from the route tree, so the literal below is what
// types `params`. Route groups aren't part of the URL, hence no `(dashboard)`.
export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()

  if (!orgId) notFound()

  const workflow = await getWorkflow(orgId, id)
  if (!workflow) notFound()

  // ID token auth means the room itself carries the permissions: private by
  // default, writable by everyone in the workflow's organization. Doing this on
  // page load rather than at creation also covers workflows made before rooms
  // existed — but note it only applies to rooms it creates, so a room that is
  // already there keeps whatever accesses it was created with.
  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: { [orgId]: ["room:write"] },
    metadata: { title: workflow.name, workflowId: id },
  })

  return (
    <Room roomId={id}>
      <WorkflowShell workflowId={id} />
    </Room>
  )
}
