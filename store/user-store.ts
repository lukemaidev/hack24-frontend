import { create } from "zustand"
import { persist } from "zustand/middleware"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  _id: string
  email: string
  fullName: string
  subscriptionTier: "free" | "pro"
  onboardingCompleted: boolean
}

interface UserState {
  user: User | null

  // Actions
  setUser: (user: User) => void
  updateUser: (patch: Partial<User>) => void
  clearUser: () => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : null,
        })),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "ah-user", // persisted to localStorage under this key
      partialize: (state) => ({ user: state.user }),
    }
  )
)
