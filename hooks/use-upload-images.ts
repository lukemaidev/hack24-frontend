'use client'

import { useState } from "react"
import { supabase, STORAGE_BUCKET } from "@/lib/supabase"
import { useUserStore } from "@/store/user-store"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export function useUploadImages() {
  const userId = useUserStore((s) => s.user?._id)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImages = async (files: File[]) => {
    if (!userId) throw new Error("No user ID found in store.")

    setIsUploading(true)
    setError(null)

    try {
      // ── 1. Upload each file to Supabase Storage ──────────────────────────
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const ext = file.name.split(".").pop()
          const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

          const { data, error: uploadError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, file, { upsert: false })

          if (uploadError) throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`)

          const { data: publicData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(data.path)

          return publicData.publicUrl
        })
      )

      // ── 2. Log the returned URLs ─────────────────────────────────────────
      console.log("[Supabase] uploaded image URLs:", uploadedUrls)

      // ── 3. POST once per URL with { userId, url } ────────────────────────
      const backendResults = await Promise.all(
        uploadedUrls.map(async (url) => {
          const res = await fetch(`${API_URL}/api/uploaded-images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, url }),
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data?.message ?? `Failed to save image: ${url}`)
          }

          console.log("[Backend] /api/uploaded-images response:", data)

          return data
        })
      )

      return { urls: uploadedUrls, results: backendResults }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong."
      setError(message)
      console.error("[useUploadImages]", message)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return { uploadImages, isUploading, error }
}
