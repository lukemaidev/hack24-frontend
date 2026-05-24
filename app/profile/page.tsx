'use client'

import { useRouter } from "next/navigation"
import BottomNav from "@/components/bottom-nav"
import { useUserStore } from "@/store/user-store"
import { Button } from "@/components/ui/button"

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-muted">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const user = useUserStore((s) => s.user)
  const clearUser = useUserStore((s) => s.clearUser)

  function handleLogout() {
    clearUser()
    router.replace("/login")
  }

  return (
    <div className="min-h-screen bg-background px-1 pt-4 pb-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">
        {/* Header */}
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Profile</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">
            {user?.fullName ?? "Your account"}
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Your account details and preferences.
          </p>
        </div>

        {/* User data */}
        <div className="rounded-[32px] border border-card bg-card p-4 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          {user ? (
            <div className="space-y-3">
              <Field label="Full Name" value={user.fullName} />
              <Field label="Email" value={user.email} />
              <Field label="Subscription" value={user.subscriptionTier === "pro" ? "Pro" : "Free"} />
              <Field
                label="Onboarding"
                value={user.onboardingCompleted ? "Completed" : "In progress"}
              />
              <Field label="User ID" value={user._id} />
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-background p-4 text-sm text-muted">
              No user data available.
            </div>
          )}
        </div>

        {/* Logout */}
        <Button variant="destructive" className="w-full rounded-3xl py-4" onClick={handleLogout}>
          Log out
        </Button>

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
