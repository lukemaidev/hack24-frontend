import BottomNav from "@/components/bottom-nav"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background px-1 py-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Profile</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">Your account and settings</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Update your details, manage your preferences, and view your profile progress.
          </p>
        </div>

        <div className="flex-1 overflow-hidden rounded-[32px] border border-card bg-card p-4 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <div className="grid gap-3">
            <div className="rounded-3xl border border-border bg-white p-4 text-sm text-foreground">Account details and settings go here.</div>
            <div className="rounded-3xl border border-border bg-white p-4 text-sm text-foreground">Manage your notifications and connected services.</div>
          </div>
        </div>

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
