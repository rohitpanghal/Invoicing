import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideNavbar } from "./SideNavbar"

export default function SideNavbarWrapper({ children }) {
  return (
    <SidebarProvider>
      <SideNavbar />
      <main className="w-full h-full">
        <div className="flex flex-row items-center justify-start gap-2">
        <SidebarTrigger />
        <p className="text-2xl font-semibold">Invoicing</p>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}