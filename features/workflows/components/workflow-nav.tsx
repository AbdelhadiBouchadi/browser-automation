"use client"

import * as React from "react"
import { Plus, Workflow } from "lucide-react"

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

const WORKFLOWS = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

export function WorkflowNav() {
  const { state, isMobile } = useSidebar()
  const [activeWorkflow, setActiveWorkflow] = React.useState(WORKFLOWS[0])

  const workflowList = (
    <SidebarMenu className="gap-y-0.5">
      {WORKFLOWS.map((workflow) => (
        <SidebarMenuItem key={workflow}>
          <SidebarMenuButton
            isActive={workflow === activeWorkflow}
            onClick={() => setActiveWorkflow(workflow)}
          >
            <span>{workflow}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )

  // On mobile the sidebar is a full-width sheet, so `collapsed` there would
  // hide the list behind a popover for no reason.
  if (state === "expanded" || isMobile) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Workflows</SidebarGroupLabel>
        <SidebarGroupAction title="New workflow">
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
                <Workflow />
                <span>Workflows</span>
              </SidebarMenuButton>
            </PopoverTrigger>
            {/* Portaled out of the rail, so the menu buttons inside are no
                longer subject to the collapsed `size-8` icon sizing. */}
            <PopoverContent side="right" align="start">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
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
