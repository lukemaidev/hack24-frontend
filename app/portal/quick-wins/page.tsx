import Link from "next/link"
import { ArrowLeftIcon, User } from "lucide-react"
import BottomNav from "@/components/bottom-nav"

const influencers = [
  "Sarah Chen",
  "Marcus Obi",
  "Priya Nair",
  "Jake Fontaine",
]

export default function QuickWinsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col px-4 pb-28 pt-10">
        <Link
          href="/portal"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back to Portal
        </Link>

        <div className="mb-6 space-y-1">
          <span className="rounded-full border border-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            Quick Wins
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold text-foreground">
            Local &amp; High Influence
          </h1>
          <p className="text-sm text-muted">
            Local individuals with high influence and strong signal.
          </p>
        </div>

        <div className="space-y-3">
          {influencers.map((name) => (
            <div
              key={name}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
