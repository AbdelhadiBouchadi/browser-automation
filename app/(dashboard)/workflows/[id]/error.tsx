"use client" // Error boundaries must be Client Components

import { useEffect } from "react"
import { RotateCw, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function WorkflowError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          This workflow could not be loaded. Try again, and if it keeps failing
          pick another workflow from the sidebar.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {/* `unstable_retry` re-fetches and re-renders the segment, unlike
            `reset` which only clears the boundary's error state. */}
        <Button variant="outline" onClick={() => unstable_retry()}>
          <RotateCw />
          Try again
        </Button>
        {error.digest ? (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        ) : null}
      </EmptyContent>
    </Empty>
  )
}
