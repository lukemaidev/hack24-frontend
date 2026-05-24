'use client'

import { SignupForm } from "@/components/signup-form"
import { useAuthGuard } from "@/hooks/use-auth-guard"

export default function Page() {
  useAuthGuard()

  return (
    <div className="min-h-screen bg-background px-1 py-1">
      <div className="mx-auto flex h-full min-h-screen w-full max-w-sm items-center justify-center px-1">
        <div className="h-full w-full">
          <SignupForm className="h-full" />
        </div>
      </div>
    </div>
  )
}
