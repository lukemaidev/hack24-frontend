'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ActivityIcon, BookmarkIcon, GridIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Portal", href: "/portal", icon: GridIcon },
  { label: "Score", href: "/score", icon: ActivityIcon },
  { label: "Library", href: "/library", icon: BookmarkIcon },
  { label: "Profile", href: "/profile", icon: UserIcon },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] border border-border bg-card px-3 py-3 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)] md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          return (
            <Button
              key={item.href}
              asChild
              variant={active ? "default" : "ghost"}
              className="flex h-auto flex-col items-center justify-center gap-0 rounded-3xl px-2 py-2 text-xs font-medium"
            >
              <Link href={item.href}>
                <Icon className="mb-1 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
