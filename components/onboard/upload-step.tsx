'use client'

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCard } from "@/components/upload-card"
import { useUploadImages } from "@/hooks/use-upload-images"

interface UploadStepProps {
  onNext: () => void
  onBack: () => void
}

export function UploadStep({ onNext, onBack }: UploadStepProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploaded, setUploaded] = useState(false)
  const { uploadImages, isUploading, error } = useUploadImages()

  const handleFiles = (incoming: File[]) => {
    setFiles((prev) => [...prev, ...incoming])
  }

  const handleUpload = async () => {
    if (!files.length) return
    const result = await uploadImages(files)
    if (result) setUploaded(true)
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-4">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Upload your screenshots.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Share screenshots of your feeds so we can analyse your current digital diet.
          </p>

          <UploadCard onChange={handleFiles} />

          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>

          {uploaded ? (
            <Button type="button" onClick={onNext} className="flex-1">
              Next
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
              className="flex-1"
            >
              {isUploading ? "Uploading…" : `Upload${files.length > 0 ? ` (${files.length})` : ""}`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
