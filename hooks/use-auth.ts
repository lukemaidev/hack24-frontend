'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthError {
  message: string
}

interface SignupPayload {
  name: string
  email: string
  password: string
}

interface LoginPayload {
  email: string
  password: string
}

interface AuthResponse {
  token?: string
  user?: Record<string, unknown>
  [key: string]: unknown
}

// ─── useSignup ────────────────────────────────────────────────────────────────

export function useSignup() {
  const router = useRouter()
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

      const data: AuthResponse | AuthError = await res.json()

      if (!res.ok) {
        throw new Error((data as AuthError).message ?? "Signup failed. Please try again.")
      }

      // Persist token if returned
      const token = (data as AuthResponse).token
      if (token) localStorage.setItem("auth_token", token)

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

export function useLogin() {
  const router = useRouter()
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

      const data: AuthResponse | AuthError = await res.json()

      if (!res.ok) {
        throw new Error((data as AuthError).message ?? "Login failed. Please try again.")
      }

      // Persist token if returned
      const token = (data as AuthResponse).token
      if (token) localStorage.setItem("auth_token", token)

      router.push("/portal")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
