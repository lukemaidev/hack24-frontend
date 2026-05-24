'use client'

import { useRef, useState } from "react"
import { ImageIcon, UploadCloud, X } from "lucide-react"

interface Preview {
  url: string
  name: string
}

interface UploadCardProps {
  onChange?: (files: File[]) => void
}

export function UploadCard({ onChange }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<Preview[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? [])
    if (!incoming.length) return

    const newPreviews = incoming.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    setPreviews((prev) => [...prev, ...newPreviews])
    onChange?.(incoming)

    // Reset input so the same file can be re-selected if removed
    e.target.value = ""
  }

  const remove = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url)
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="w-full space-y-4">
  

      {/* Upload zone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-border bg-card px-6 py-16 text-center transition hover:border-primary hover:bg-primary/5"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
          <UploadCloud className="h-6 w-6 text-muted" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {previews.length > 0 ? "Add more images" : "Tap to select images"}
          </p>
          <p className="text-xs text-muted">PNG, JPG, WEBP — multiple allowed</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground">
          <ImageIcon className="h-3.5 w-3.5" />
          Choose files
        </div>
      </button>

          {/* Preview grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {previews.map((p, i) => (
            <div key={p.url} className="group relative overflow-hidden rounded-2xl border border-border bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.name}
                className="h-32 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="truncate px-2 py-1.5 text-xs text-muted">{p.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
