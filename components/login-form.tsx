import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={className} {...props}>
      <Card className="rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
        <div className="space-y-6 px-6 pt-6 pb-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>

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
          <form>
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted">
                  Email Address
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@domain.com"
                  className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
                  required
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted">
                    Password
                  </span>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
                  required
                />
              </label>

              <div className="space-y-3">
                <Button type="submit" className="w-full rounded-full py-3 text-sm font-semibold">
                  Continue
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
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
