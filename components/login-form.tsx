'use client'

import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/hooks/use-auth"
import Link from "next/link"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    await login({ email, password })
  }

  return (
    <div className={className} {...props}>
      <Card className="rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
        <div className="space-y-6 px-6 pt-6 pb-4">

          <div className="space-y-3">
            <CardTitle className="text-3xl font-semibold leading-tight font-serif text-foreground">
              Welcome back.
            </CardTitle>
            <p className="text-sm leading-6 text-muted">
              Enter your email address and password to continue.
            </p>
          </div>
        </div>

        <CardContent className="space-y-6 px-6 pb-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Email Address</span>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
                  required
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted">Password</span>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
                  required
                />
              </label>

              {error && (
                <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">
                  {error}
                </p>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full py-3 text-sm font-semibold"
                >
                  {isLoading ? "Signing in…" : "Continue"}
                </Button>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
                  <span className="h-px flex-1 bg-border" />
                  or
                  <span className="h-px flex-1 bg-border" />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full rounded-full py-3 text-sm font-semibold"
                >
                  Continue with Apple
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full rounded-full py-3 text-sm font-semibold"
                >
                  Continue with Google
                </Button>
                <p className="text-center text-sm text-muted">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
