import Link from "next/link"
import { User, Globe, Users, Radio } from "lucide-react"

const quadrants = [
  {
    key: "quick-wins",
    label: "Quick Wins",
    description: "Local individuals with high influence and strong signal.",
    icon: User,
    href: "/portal/quick-wins",
    dot: "#FF6A00", // High — Accent Orange
  },
  {
    key: "big-names",
    label: "Big Names",
    description: "Global individuals with broad reach and authority.",
    icon: Globe,
    href: "/portal/big-names",
    dot: "#FF6A00",
  },
  {
    key: "local-network",
    label: "Local Network",
    description: "Local communities and networks driving the ecosystem.",
    icon: Users,
    href: "/portal/local-network",
    dot: "#FFC89E", // Medium — Peach Glow
  },
  {
    key: "global-signals",
    label: "Global Signals",
    description: "Global platforms and communities worth watching.",
    icon: Radio,
    href: "/portal/global-signals",
    dot: "#FFC89E",
  },
]

export function InfluenceReachCard() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-card bg-card shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground">
          Influence &amp; Reach
        </p>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF6A00]" /> High
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FFC89E]" /> Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F3E9DD]" /> Local
          </span>
        </div>
      </div>

      {/* 2×2 grid with dividing lines */}
      <div className="grid grid-cols-2 divide-x divide-y divide-border border-t border-border">
        {quadrants.map(({ key, label, description, icon: Icon, href, dot }) => (
          <Link
            key={key}
            href={href}
            className="group flex flex-col gap-3 p-4 transition hover:bg-primary/5 active:bg-primary/10"
          >
            {/* Label pill */}
            <span className="w-fit rounded-full border border-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
              {label}
            </span>

            {/* Icon + count row */}
            <div className="flex items-center justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: dot }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-4xl font-bold text-foreground">4</span>
            </div>

            {/* Description */}
            <p className="text-xs leading-5 text-muted">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
