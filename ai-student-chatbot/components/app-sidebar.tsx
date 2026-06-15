"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  MessageSquare,
  Bell,
  HelpCircle,
  UserRound,
  GraduationCap,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DEPARTMENT_NAME, INSTITUTE_NAME } from "@/lib/mock-data"

const navItems = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Chat Assistant", href: "/dashboard/chat", icon: MessageSquare },
  { title: "Notices", href: "/dashboard/notices", icon: Bell },
  { title: "FAQs", href: "/dashboard/faqs", icon: HelpCircle },
  { title: "Profile", href: "/dashboard/profile", icon: UserRound },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { student, logout } = useAuth()

  const initials = student
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "ST"

  function handleLogout() {
    logout()
    router.replace("/")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">{INSTITUTE_NAME}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">{DEPARTMENT_NAME}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.title}
                      render={
                        <Link href={item.href}>
                          <item.icon aria-hidden="true" />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <Avatar className="size-9">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {student?.name ?? "Student"}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/60">{student?.registerNumber}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Log out"
            className="size-8 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
