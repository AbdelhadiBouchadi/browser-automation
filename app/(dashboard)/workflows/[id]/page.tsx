// `PageProps` is generated from the route tree, so the literal below is what
// types `params`. Route groups aren't part of the URL, hence no `(dashboard)`.
export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // throw new Error("Error showcase example")

  return (
    <div className="flex flex-1 flex-col gap-2 p-6">
      <h1 className="font-heading text-lg font-medium tracking-tight">
        Workflow
      </h1>
      <p className="text-sm/relaxed text-muted-foreground">{id}</p>
    </div>
  )
}
