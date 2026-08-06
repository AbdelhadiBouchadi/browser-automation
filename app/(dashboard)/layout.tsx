import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // `SidebarProvider` writes the open/closed state to this cookie but never
  // reads it back, so the server has to seed `defaultOpen` for it to persist.
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <TooltipProvider>
      <SidebarProvider className="h-svh" defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset className="min-h-0 overflow-hidden border shadow-none!">
          {/* The sidebar's own trigger is offcanvas on mobile, so surface one here. */}
          <header className="flex h-12 shrink-0 items-center px-2 md:hidden">
            <SidebarTrigger />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
