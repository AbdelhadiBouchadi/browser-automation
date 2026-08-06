"use client"

import * as React from "react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeWorkflow, setActiveWorkflow] = React.useState(WORKFLOWS[0])

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          hidePersonal
          appearance={{
            elements: {
              rootBox: "min-w-0 group-data-[collapsible=icon]:!hidden",
              organizationSwitcherTrigger: "w-full justify-between",
            },
          }}
        />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workflows</SidebarGroupLabel>
          <SidebarGroupAction title="New workflow">
            <Plus />
            <span className="sr-only">New workflow</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-0.5">
              {WORKFLOWS.map((workflow) => (
                <SidebarMenuItem key={workflow}>
                  <SidebarMenuButton
                    isActive={workflow === activeWorkflow}
                    onClick={() => setActiveWorkflow(workflow)}
                    tooltip={workflow}
                  >
                    {/* Collapsed to the icon rail there is no room for the name,
                        so fall back to a monogram — the tooltip carries the rest. */}
                    <span className="hidden size-4 shrink-0 items-center justify-center text-xs font-medium uppercase group-data-[collapsible=icon]:flex">
                      {workflow.charAt(0)}
                    </span>
                    <span className="group-data-[collapsible=icon]:hidden">
                      {workflow}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:items-center">
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "w-full justify-start group-data-[collapsible=icon]:justify-center",
              userButtonOuterIdentifier: "group-data-[collapsible=icon]:hidden",
            },
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
