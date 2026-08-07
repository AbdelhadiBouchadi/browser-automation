"use client"

import { useTransition } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Workflow as WorkflowIcon } from "lucide-react"

import type { Workflow } from "@/lib/db/schema"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

export function WorkflowNav({
  workflows,
  onCreateWorkflow,
}: {
  workflows: Workflow[]
  // `createWorkflowAction` is a server action, so it reaches this client
  // component as a prop from the server-rendered sidebar.
  onCreateWorkflow: (name: string) => Promise<void>
}) {
  const { state, isMobile } = useSidebar()
  const [isCreating, startCreating] = useTransition()
  const pathname = usePathname()

  const createWorkflow = () => {
    startCreating(() => onCreateWorkflow(generateSlug()))
  }

  // Rendered in both the expanded group and the collapsed popover, so the
  // active highlight only has to be wired up once.
  const workflowList = (
    <SidebarMenu className="gap-y-0.5">
      {workflows.map((workflow) => {
        const href = `/workflows/${workflow.id}` as const

        return (
          <SidebarMenuItem key={workflow.id}>
            <SidebarMenuButton asChild isActive={pathname === href}>
              <Link href={href}>
                <span>{workflow.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )

  // On mobile the sidebar is a full-width sheet, so `collapsed` there would
  // hide the list behind a popover for no reason.
  if (state === "expanded" || isMobile) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Workflows</SidebarGroupLabel>
        <SidebarGroupAction
          title="New workflow"
          onClick={createWorkflow}
          disabled={isCreating}
        >
          <Plus />
          <span className="sr-only">New workflow</span>
        </SidebarGroupAction>
        <SidebarGroupContent>{workflowList}</SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton>
                <WorkflowIcon />
                <span>Workflows</span>
              </SidebarMenuButton>
            </PopoverTrigger>
            {/* Portaled out of the rail, so the menu buttons inside are no
                longer subject to the collapsed `size-8` icon sizing. */}
            <PopoverContent side="right" align="start">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={createWorkflow}
                    disabled={isCreating}
                  >
                    <Plus />
                    <span>New workflow</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarSeparator className="mx-0" />
              {workflowList}
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
