'use client'

import { useEffect, useState } from "react"
import BottomNav from "@/components/bottom-nav"
import { useUserStore } from "@/store/user-store"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Influencer = Record<string, any>

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted">
      {initials}
    </div>
  )
}

export default function LibraryPage() {
  const userId = useUserStore((s) => s.user?._id)
  const [mentors, setMentors] = useState<Influencer[]>([])
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!userId) { setError("User not found."); setLoading(false); return }

    // Step 1: get the second highest target category
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const target: Record<string, number> = data?.data?.targetCategoryScores ?? {}
        const sorted = Object.entries(target).sort(([, a], [, b]) => b - a)
        if (sorted.length < 2) throw new Error("Not enough category data yet.")

        const secondCategory = sorted[1][0]
        setCategory(secondCategory)

        // Step 2: fetch top 5 influencers for that category
        return fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/influencers/category/${secondCategory}`
        ).then((res) => {
          if (!res.ok) throw new Error(`Server error: ${res.status}`)
          return res.json()
        })
      })
      .then((data) => {
        const list: Influencer[] = Array.isArray(data)
          ? data
          : (data?.data ?? data?.influencers ?? [])
        setMentors(list.slice(0, 5))
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load mentors."))
      .finally(() => setLoading(false))
  }, [userId])

  const getName = (inf: Influencer) => inf["Account Name"] ?? inf.name ?? "Unknown"
  const getBio = (inf: Influencer) => {
    const s: string = inf["Snapshot"] ?? inf.bio ?? inf.description ?? ""
    return s.split("\n\n---")[0].trim()
  }
  const getUrl = (inf: Influencer) => inf["Account URL"] ?? inf.youtubeUrl ?? inf.url ?? ""
  const getFollowers = (inf: Influencer) => inf["Subscribers / Followers"] ?? ""

  const formatCategory = (key: string) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())

  return (
    <div className="min-h-screen bg-background px-1 pt-4 pb-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">

        {/* Header */}
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Library</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">
            Your mentors
          </h1>
          {category && (
            <p className="mt-2 text-sm leading-6 text-muted">
              Top voices in{" "}
              <span className="font-medium text-foreground">{formatCategory(category)}</span>
              {" "}— your second highest target category.
            </p>
          )}
        </div>

        {/* Mentor list */}
        <div className="rounded-[32px] border border-card bg-card p-4 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          {loading && (
            <p className="py-8 text-center text-sm text-muted animate-pulse">Loading mentors…</p>
          )}

          {!loading && error && (
            <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</p>
          )}

          {!loading && !error && (
            <div className="space-y-3">
              {mentors.map((inf, i) => {
                const name = getName(inf)
                const bio = getBio(inf)
                const url = getUrl(inf)
                const followers = getFollowers(inf)
                return (
                  <button
                    key={inf._id ?? i}
                    type="button"
                    onClick={() => url && window.open(url, "_blank", "noopener,noreferrer")}
                    className="flex w-full items-start gap-4 rounded-3xl border border-border bg-white p-4 text-left transition hover:bg-primary/5 active:bg-primary/10"
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
                        <p className="mt-1 text-sm leading-5 text-muted line-clamp-2">{bio}</p>
                      )}
                      {url && (
                        <p className="mt-2 text-xs font-medium text-primary">Open YouTube →</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
