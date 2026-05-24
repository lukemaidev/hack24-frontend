'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ActivityIcon, BookmarkIcon, GridIcon, UserIcon } from "lucide-react"

const navItems = [
  { label: "Portal", href: "/portal", icon: GridIcon },
  { label: "Score", href: "/score", icon: ActivityIcon },
  { label: "Library", href: "/library", icon: BookmarkIcon },
  { label: "Profile", href: "/profile", icon: UserIcon },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="rounded-t-[32px] border border-border bg-card px-3 py-3 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-3xl border px-2 py-2 text-xs font-medium transition ${
                active
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted hover:border-primary hover:bg-primary/5"
              }`}
            >
              <Icon className="mb-1 h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
