"use client"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/sidebar"
import { BackendProvider } from "@/components/admin/backend-provider"

export default function BackendLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    // THE TRICK: Turn "/admin/products" into "Products" automatically
    const segment = pathname.split("/").pop() || "Dashboard"
    const title = segment.charAt(0).toUpperCase() + segment.slice(1)

  return (
    <BackendProvider>
    <SidebarProvider>
      <AppSidebar collapsible="icon"/>
      <main className="w-full">
        {/* The Trigger is the mobile menu button */}
        <div className="flex items-center border-b p-4">
          <SidebarTrigger />
          <h2 className="ml-4 font-semibold text-gray-700">{title}</h2>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
    </BackendProvider>
  )
}