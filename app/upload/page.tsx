'use client'

import { useState } from "react"
import BottomNav from "@/components/bottom-nav"
import { UploadCard } from "@/components/upload-card"
import { useUploadImages } from "@/hooks/use-upload-images"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const { uploadImages, isUploading, error } = useUploadImages()

  const handleSubmit = async () => {
    if (!files.length) return
    await uploadImages(files)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col px-4 pb-28 pt-10">

        {/* Header */}
        <div className="mb-8 space-y-1">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
            Upload images
          </h1>
          <p className="text-sm text-muted">Select one or more images from your device.</p>
        </div>

        <UploadCard onChange={(incoming) => setFiles((prev) => [...prev, ...incoming])} />

        {error && (
          <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">
            {error}
          </p>
        )}

        {files.length > 0 && (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading}
            className="mt-6 w-full rounded-full py-3 text-sm font-semibold"
          >
            {isUploading ? "Uploading…" : `Upload ${files.length} image${files.length > 1 ? "s" : ""}`}
          </Button>
        )}

      </div>

      <BottomNav />
    </div>
  )
}
