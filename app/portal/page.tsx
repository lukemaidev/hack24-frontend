import BottomNav from "@/components/bottom-nav"
import { InfluenceReachCard } from "@/components/influence-reach-card"

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-background px-1 py-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-muted">Morning, Sanjana</p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">
                Your portal is ready.
              </h1>
            </div>
            <div className="rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
              31 <span className="text-xs text-muted">+2</span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-muted">
            This is where you come every morning. Three of your mentors have posted in the last 24 hours.
          </p>
        </div>

        <div className="flex-1 overflow-hidden rounded-[32px] border border-card bg-card p-4 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Today&apos;s Voices</p>
              <div className="mt-3 grid gap-3">
                <div className="rounded-3xl border border-border bg-white p-4 text-sm text-foreground">Your curated mentor feed appears here.</div>
                <div className="rounded-3xl border border-border bg-white p-4 text-sm text-foreground">Track what to read, watch, or follow next.</div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Crash Courses In Progress</p>
              <div className="mt-3 space-y-3">
                <div className="rounded-3xl border border-border bg-white p-4 text-sm text-foreground">Crash Course: 5 essentials from Priestley</div>
              </div>
            </div>
          </div>
        </div>

        <InfluenceReachCard />

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
