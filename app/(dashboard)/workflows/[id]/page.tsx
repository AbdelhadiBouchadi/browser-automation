import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

// `PageProps` is generated from the route tree, so the literal below is what
// types `params`. Route groups aren't part of the URL, hence no `(dashboard)`.
export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <WorkflowShell workflowId={id} />
}
