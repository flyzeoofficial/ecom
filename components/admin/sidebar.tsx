"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react" // Import auth hooks
import { 
  Home, 
  Layers, 
  Package, 
  ShoppingBag, 
  ShoppingCart, 
  UserCircle, 
  Users, 
  Settings, 
  LogOut, 
  User, 
  ChevronsUpDown 
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { title: "Dashboard", url: "/backend/dashboard", icon: Home }, // Changed /admin to /backend
  { title: "Categories", url: "/backend/categories", icon: Layers },
  { title: "Products", url: "/backend/products", icon: Package },
  { title: "Orders", url: "/backend/orders", icon: ShoppingBag },
  { title: "Carts", url: "/backend/carts", icon: ShoppingCart },
  { title: "Customers", url: "/backend/customers", icon: UserCircle },
  { title: "Users", url: "/backend/users", icon: Users },
  { title: "Settings", url: "/backend/settings", icon: Settings },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()
  
  // 1. Fetch the current session
  const { data: session } = useSession()
  const user = session?.user

  // 2. Logout Handler
  const handleLogout = async () => {
    // We remove basePath from the object to satisfy TypeScript.
    // NextAuth usually detects the base path from your <SessionProvider> 
    // or the NEXTAUTH_URL environment variable.
    await signOut({ 
      callbackUrl: "/backend/login", 
      redirect: true 
    })
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      {/* 1. HEADER */}
      <SidebarHeader className="border-b h-16 flex justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <img src="/favicon.ico" alt="Logo" className="size-5 invert" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold uppercase tracking-wider">Ecom Store</span>
                <span className="truncate text-xs text-muted-foreground">Backend Panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* 2. CONTENT */}
      <SidebarContent className="py-4">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  isActive={isActive}
                  className={`transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Link href={item.url}>
                    <item.icon className={`size-5 ${isActive ? "text-blue-600" : ""}`} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* 3. FOOTER: Real User Data & Logout */}
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* Fallback to user email initial */}
                    <AvatarFallback className="rounded-lg bg-blue-600 text-white">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.role ? user.role.toUpperCase() : "User"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={state === "collapsed" ? "right" : "bottom"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="bg-blue-600 text-white">
                         {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.role === 'admin' ? 'Administrator' : 'Staff Member'}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {/* Fixed Logout Button */}
                <DropdownMenuItem 
                  className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}