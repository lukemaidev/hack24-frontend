'use client'

import { type ReactNode, useEffect, useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

interface ProvidersProps {
  children: ReactNode
}

/**
 * Single client boundary for the entire app.
 *
 * - Zustand's `persist` middleware reads from localStorage, which only exists
 *   on the client. Rendering children only after mount prevents SSR/hydration
 *   mismatches and guarantees the persisted store is fully hydrated before any
 *   component reads from it.
 *
 * - Add any future global providers (React Query, theme, etc.) here.
 */
export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a shell with the same DOM structure on the server so Next.js is
  // happy, but don't let children read from the store until we're on the client.
  if (!mounted) {
    return <TooltipProvider>{null}</TooltipProvider>
  }

  return <TooltipProvider>{children}</TooltipProvider>
}
