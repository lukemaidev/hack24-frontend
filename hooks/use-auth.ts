'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore, type User } from "@/store/user-store"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchUserById(_id: string): Promise<User> {
  console.log("Fetching user profile with ID:", _id)
  const res = await fetch(`${API_URL}/api/users/${_id}`, {
  })
  if (!res.ok) throw new Error("Failed to load user profile.")
  return res.json() as Promise<User>
}

// ─── useSignup ────────────────────────────────────────────────────────────────

interface SignupPayload {
  fullName: string
  email: string
  password: string
}

export function useSignup() {
  const router = useRouter()
  const { setUser, setToken } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (payload: SignupPayload) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message ?? "Signup failed. Please try again.")
      }

      const token: string = data.token
      const userId: string | undefined = data.data?.user?._id
      if (!userId) throw new Error("User ID not found in signup response.")
      setToken(token)

      // Fetch full profile by ID and store it
      const user = await fetchUserById(userId)
      setUser(user.data)

      router.push("/onboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}

// ─── useLogin ─────────────────────────────────────────────────────────────────

interface LoginPayload {
  email: string
  password: string
}

export function useLogin() {
  const router = useRouter()
  const { setUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message ?? "Login failed. Please try again.")
      }

      const token: string = data.token
      const userId: string | undefined = data.data?.user?._id
      if (!userId) throw new Error("User ID not found in login response.")

      // Fetch full profile by ID — this is the source of truth for onboardingCompleted
      const user = await fetchUserById(userId)
      setUser(user.data)
      console.log("[useUserStore] user after login:", useUserStore.getState().user)

      // Route based on where the user is in the flow
      router.push(user.onboardingCompleted ? "/portal" : "/onboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

// ─── useCompleteOnboarding ────────────────────────────────────────────────────

export function useCompleteOnboarding() {
  const { user, token, setUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const completeOnboarding = async () => {
    setIsLoading(true)
    setError(null)
      
    try {
      console.log(user)
      const id = user?._id
      if (!id) throw new Error("No user ID found.")

      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ onboardingCompleted: true }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message ?? "Failed to complete onboarding.")
      }

      // Patch the store: spread existing user, override onboardingCompleted
      const { ...currentUser } = user!
      setUser({ ...currentUser, onboardingCompleted: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { completeOnboarding, isLoading, error }
}
