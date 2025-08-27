"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: "👶",
  },
  {
    title: "Staff",
    href: "/admin/staff",
    icon: "👩‍🏫",
  },
  {
    title: "Programs",
    href: "/admin/programs",
    icon: "📚",
  },
  {
    title: "Activities",
    href: "/admin/activities",
    icon: "🎨",
  },
  {
    title: "Contact Inquiries",
    href: "/admin/contact",
    icon: "📧",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
