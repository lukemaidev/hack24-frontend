'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { UploadCard } from "@/components/upload-card"
import { useUploadImages } from "@/hooks/use-upload-images"
import { platforms } from "@/components/onboard/platform-connect"
import { useUserStore } from "@/store/user-store"

interface PlatformUploadProps {
  selectedPlatforms: string[]
  onNext: () => void
  onBack: () => void
}

export function PlatformUpload({ selectedPlatforms, onNext, onBack }: PlatformUploadProps) {
  const [files, setFiles] = useState<Record<string, File[]>>({})
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({})
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [analysing, setAnalysing] = useState(false)
  const [analyseError, setAnalyseError] = useState("")
  const { uploadImages } = useUploadImages()
  const userId = useUserStore((s) => s.user?._id)

  const activePlatforms = platforms.filter((p) => selectedPlatforms.includes(p.id))
  const allUploaded = activePlatforms.length > 0 && activePlatforms.every((p) => uploaded[p.id])

  const handleFiles = (platformId: string, incoming: File[]) => {
    setFiles((prev) => ({ ...prev, [platformId]: [...(prev[platformId] ?? []), ...incoming] }))
  }

  const handleUpload = async (platformId: string) => {
    const platformFiles = files[platformId]
    if (!platformFiles?.length) return

    setUploading((prev) => ({ ...prev, [platformId]: true }))
    setErrors((prev) => ({ ...prev, [platformId]: "" }))

    const result = await uploadImages(platformFiles)

    setUploading((prev) => ({ ...prev, [platformId]: false }))
    if (result) {
      setUploaded((prev) => ({ ...prev, [platformId]: true }))
    } else {
      setErrors((prev) => ({ ...prev, [platformId]: "Upload failed. Please try again." }))
    }
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-2">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Upload your screenshots.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            For each platform, upload screenshots of your feed so we can analyse your digital diet.
          </p>
        </div>

        {/* One sub-card per platform */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {activePlatforms.map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              className="rounded-3xl border border-border bg-background p-4 space-y-3"
            >
              {/* Platform header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${uploaded[id] ? "text-primary" : "text-muted"}`} />
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                </div>
                {uploaded[id] && (
                  <span className="text-xs font-medium text-primary">✓ Uploaded</span>
                )}
              </div>

              {/* Upload card */}
              {!uploaded[id] && (
                <>
                  <UploadCard onChange={(incoming) => handleFiles(id, incoming)} />

                  {errors[id] && (
                    <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
                      {errors[id]}
                    </p>
                  )}

                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleUpload(id)}
                    disabled={uploading[id] || !files[id]?.length}
                    className="w-full"
                  >
                    {uploading[id]
                      ? "Uploading…"
                      : files[id]?.length
                      ? `Upload ${label} (${files[id].length})`
                      : `Upload ${label}`}
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>

        {analyseError && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">
            {analyseError}
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            type="button"
            disabled={!allUploaded || analysing}
            className="flex-1"
            onClick={async () => {
              if (!userId) {
                setAnalyseError("User not found. Please log in again.")
                return
              }
              setAnalysing(true)
              setAnalyseError("")
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai-actions/analyse-user-images/${userId}`,
                  { method: "POST" }
                )
                if (!res.ok) throw new Error(`Server error: ${res.status}`)
                onNext()
              } catch (err) {
                setAnalyseError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
              } finally {
                setAnalysing(false)
              }
            }}
          >
            {analysing ? "Analysing…" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
