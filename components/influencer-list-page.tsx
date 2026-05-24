'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import { useUserStore } from "@/store/user-store"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Influencer = Record<string, any>

interface InfluencerListPageProps {
  pill: string
  heading: string
  description: string
  from: number   // inclusive, 0-based
  to: number     // exclusive
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted">
      {initials}
    </div>
  )
}

export function InfluencerListPage({ pill, heading, description, from, to }: InfluencerListPageProps) {
  const router = useRouter()
  const userId = useUserStore((s) => s.user?._id)
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!userId) {
      setError("User not found.")
      setLoading(false)
      return
    }

    // Step 1: get the user's top target category
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((userData) => {
        const targetScores: Record<string, number> = userData?.data?.targetCategoryScores ?? {}
        const entries = Object.entries(targetScores)
        if (!entries.length) throw new Error("No target categories found.")

        const topCategory = entries.sort(([, a], [, b]) => b - a)[0][0]

        // Step 2: fetch influencers for that category
        return fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/influencers/category/${topCategory}`
        ).then((res) => {
          if (!res.ok) throw new Error(`Server error: ${res.status}`)
          return res.json()
        })
      })
      .then((data) => {
        const list: Influencer[] = Array.isArray(data)
          ? data
          : (data?.data ?? data?.influencers ?? [])
        setInfluencers(list.slice(from, to))
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load influencers."))
      .finally(() => setLoading(false))
  }, [userId, from, to])

  const getName = (inf: Influencer): string =>
    inf["Account Name"] ?? inf.name ?? "Unknown"

  const getBio = (inf: Influencer): string => {
    const snapshot: string = inf["Snapshot"] ?? inf.bio ?? inf.description ?? ""
    // Strip the trailing "---\n..." section
    return snapshot.split("\n\n---")[0].trim()
  }

  const getYoutubeUrl = (inf: Influencer): string =>
    inf["Account URL"] ?? inf.youtubeUrl ?? inf.url ?? ""

  const getFollowers = (inf: Influencer): string =>
    inf["Subscribers / Followers"] ?? ""

  const handleInfluencerClick = (inf: Influencer) => {
    const url = getYoutubeUrl(inf)
    if (url) window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col px-4 pb-28 pt-10">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/portal")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back to Portal
        </button>

        {/* Heading */}
        <div className="mb-6 space-y-1">
          <span className="rounded-full border border-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            {pill}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold text-foreground">{heading}</h1>
          <p className="text-sm text-muted">{description}</p>
        </div>

        {/* States */}
        {loading && (
          <p className="text-center text-sm text-muted animate-pulse py-8">Loading…</p>
        )}

        {!loading && error && (
          <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</p>
        )}

        {/* List */}
        {!loading && !error && (
          <div className="space-y-3">
            {influencers.length === 0 && (
              <p className="text-center text-sm text-muted py-8">No influencers found.</p>
            )}
            {influencers.map((inf, i) => {
              const name = getName(inf)
              const bio = getBio(inf)
              const youtubeUrl = getYoutubeUrl(inf)
              const followers = getFollowers(inf)
              return (
                <button
                  key={inf._id ?? i}
                  type="button"
                  onClick={() => handleInfluencerClick(inf)}
                  className="flex w-full items-start gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition hover:bg-primary/5 active:bg-primary/10"
                >
                  <Avatar name={name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-foreground">{name}</p>
                      {followers && (
                        <span className="flex-shrink-0 text-xs text-muted">{followers}</span>
                      )}
                    </div>
                    {bio && (
                      <p className="mt-1 text-sm leading-5 text-muted line-clamp-3">{bio}</p>
                    )}
                    {youtubeUrl && (
                      <p className="mt-2 text-xs font-medium text-primary">Open YouTube →</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
