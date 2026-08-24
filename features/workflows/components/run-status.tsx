"use client"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { CheckIcon, TriangleAlertIcon } from "lucide-react"

import type { helloWorldTask } from "@/trigger/example"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

// Everything the run can end up in, mapped to how it should read in the
// inspector. Anything missing here is still in flight.
const TERMINAL_STATUSES = {
  COMPLETED: { label: "Completed", variant: "default" },
  CANCELED: { label: "Canceled", variant: "secondary" },
  FAILED: { label: "Failed", variant: "destructive" },
  CRASHED: { label: "Crashed", variant: "destructive" },
  SYSTEM_FAILURE: { label: "System failure", variant: "destructive" },
  EXPIRED: { label: "Expired", variant: "destructive" },
  TIMED_OUT: { label: "Timed out", variant: "destructive" },
} as const satisfies Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" }
>

const PENDING_LABELS: Record<string, string> = {
  PENDING_VERSION: "Waiting for deploy",
  DELAYED: "Delayed",
  QUEUED: "Queued",
  DEQUEUED: "Starting",
  EXECUTING: "Running",
  WAITING: "Waiting",
}

export function RunStatus({
  runId,
  accessToken,
  onFinished,
}: {
  runId: string
  accessToken: string
  onFinished?: () => void
}) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken,
    // The payload is just the message the action sent, so there is no reason
    // to pull it back down; the output is rendered below.
    skipColumns: ["payload"],
    onComplete: () => onFinished?.(),
  })

  if (error) {
    return (
      <p className="flex items-center gap-1.5 text-xs text-destructive">
        <TriangleAlertIcon className="size-3.5 shrink-0" />
        {error.message}
      </p>
    )
  }

  if (!run) {
    return (
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Spinner className="size-3.5" />
        Connecting…
      </p>
    )
  }

  const terminal =
    TERMINAL_STATUSES[run.status as keyof typeof TERMINAL_STATUSES]

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {terminal ? (
          <Badge variant={terminal.variant}>
            {run.status === "COMPLETED" && <CheckIcon />}
            {terminal.label}
          </Badge>
        ) : (
          <Badge variant="secondary">
            <Spinner className="size-3" />
            {PENDING_LABELS[run.status] ?? run.status}
          </Badge>
        )}
        <span className="truncate font-mono text-xs text-muted-foreground">
          {run.id}
        </span>
      </div>
      {run.output ? (
        <p className="text-xs text-muted-foreground">{run.output.message}</p>
      ) : null}
      {run.error ? (
        <p className="text-xs text-destructive">{run.error.message}</p>
      ) : null}
    </div>
  )
}
