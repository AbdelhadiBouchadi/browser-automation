import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

// Every size here is a rem string: the editor's panels have intrinsic minimum
// widths (a canvas, a log strip, an inspector), which percentages can't express
// as the viewport changes.
export function WorkflowShell({ workflowId }: { workflowId: string }) {
  return (
    <ResizablePanelGroup className="size-full">
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel minSize="18rem">
            <div className="p-4 text-sm text-muted-foreground">Canvas</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            <div className="p-4 text-sm text-muted-foreground">Logs</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <div className="p-4 text-sm text-muted-foreground">Inspector</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
