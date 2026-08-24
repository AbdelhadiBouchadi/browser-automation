"use client"

import { useState, useTransition } from "react"
import { PlayIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { runWorkflowAction } from "@/features/workflows/actions"
import { RunStatus } from "@/features/workflows/components/run-status"

type RunHandle = { runId: string; publicAccessToken: string }

export function RightSidebar({ workflowId }: { workflowId: string }) {
  const [isTriggering, startTriggering] = useTransition()
  const [handle, setHandle] = useState<RunHandle | null>(null)
  // Tracked separately from the handle so the button stays disabled for the
  // whole run, not just while the trigger request is in flight.
  const [isRunning, setIsRunning] = useState(false)

  const runWorkflow = () => {
    startTriggering(async () => {
      try {
        setIsRunning(true)
        setHandle(await runWorkflowAction(workflowId))
      } catch (error) {
        setIsRunning(false)
        toast.error("Could not start the workflow run", {
          description: error instanceof Error ? error.message : undefined,
        })
      }
    })
  }

  const isBusy = isTriggering || isRunning

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="w-full" onClick={runWorkflow} disabled={isBusy}>
        {isBusy ? <Spinner /> : <PlayIcon />}
        RUN
      </Button>
      {/* Mounted only once a handle exists, so the subscription never starts
          without a run to subscribe to. */}
      {handle ? (
        <RunStatus
          key={handle.runId}
          runId={handle.runId}
          accessToken={handle.publicAccessToken}
          onFinished={() => setIsRunning(false)}
        />
      ) : null}
    </div>
  )
}
