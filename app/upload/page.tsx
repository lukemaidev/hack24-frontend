'use client'

import { useRef, useState } from "react"
import { ImageIcon, UploadCloud } from "lucide-react"
import BottomNav from "@/components/bottom-nav"

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col px-4 pb-28 pt-10">

        {/* Header */}
        <div className="mb-8 space-y-1">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
            Upload image
          </h1>
          <p className="text-sm text-muted">Select an image from your device.</p>
        </div>

        {/* Upload zone */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-border bg-card px-6 py-16 text-center transition hover:border-primary hover:bg-primary/5"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
              <UploadCloud className="h-6 w-6 text-muted" />
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {fileName ?? "Tap to select an image"}
            </p>
            <p className="text-xs text-muted">PNG, JPG, WEBP supported</p>
          </div>

          {!preview && (
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground">
              <ImageIcon className="h-3.5 w-3.5" />
              Choose file
            </div>
          )}
        </button>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        {/* Replace button */}
        {preview && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 text-center text-sm text-muted underline-offset-4 hover:underline"
          >
            Choose a different image
          </button>
        )}

      </div>

      <BottomNav />
    </div>
  )
}
