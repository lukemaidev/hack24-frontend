import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className="rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]"
    >
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
            Let us begin.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Create your account to start reshaping your feed and matching what you want to become.
          </p>
        </div>
      </div>

      <CardContent className="space-y-6 px-6 pb-6">
        <form>
          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Full Name
              </span>
              <Input
                id="name"
                type="text"
                placeholder="E.g. Sanjana Chandramohan"
                className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
                required
              />
            </label>

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
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Password
              </span>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
                required
              />
            </label>

            <p className="text-xs text-muted">
              By continuing you agree to our terms and privacy.
            </p>

            <div className="space-y-3">
              <Button type="submit" className="w-full rounded-full py-3 text-sm font-semibold">
                Continue
              </Button>
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
  )
}
