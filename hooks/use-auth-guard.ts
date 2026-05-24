'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/user-store"

/**
 * Redirects already-authenticated users away from guest-only pages
 * (login, signup). Call at the top of those page components.
 *
 * Keyed on user._id — if it exists the user is logged in:
 * - onboardingCompleted true  → /portal
 * - onboardingCompleted false → /onboard
 */
export function useAuthGuard() {
  const router = useRouter()
  const user = useUserStore((s) => s.user)

  useEffect(() => {
    if (!user?._id) return
    router.replace(user.onboardingCompleted ? "/portal" : "/onboard")
  }, [user?._id, user?.onboardingCompleted, router])
}
