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
  token: string | null

  // Actions
  setUser: (user: User) => void
  setToken: (token: string) => void
  updateUser: (patch: Partial<User>) => void
  clearUser: () => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => set({ user }),

      setToken: (token) => set({ token }),

      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : null,
        })),

      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: "ah-user", // persisted to localStorage under this key
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)
