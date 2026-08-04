"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

function ToastButton() {
  return (
    <Button
      className="mt-2"
      onClick={() =>
        toast.success("Toast fired", {
          description: "Sonner is wired up and ready to use.",
        })
      }
    >
      Show toast
    </Button>
  )
}

export { ToastButton }
