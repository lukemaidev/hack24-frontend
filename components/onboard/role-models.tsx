'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface RoleModelsProps {
  onNext: () => void
  onBack: () => void
}

const suggested = ["Naval", "Brené Brown", "Seth Godin", "Austin Kleon"]

export function RoleModels({ onNext, onBack }: RoleModelsProps) {
  const [input, setInput] = useState("")
  const [chips, setChips] = useState<string[]>([])

  const addChip = (text: string) => {
    if (!chips.includes(text) && text.trim()) {
      setChips((prev) => [...prev, text.trim()])
      setInput("")
    }
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Anyone you already look up to in this space?
          </CardTitle>
          <div className="space-y-3">
            <Input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a name..."
              className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
            />
            <Button type="button" variant="outline" onClick={() => addChip(input)} disabled={!input.trim()}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full border border-border px-3 py-2 text-sm text-foreground">
                {chip}
              </span>
            ))}
          </div>
          <div className="space-y-2 pt-2">
            <span className="text-xs uppercase tracking-[0.28em] text-muted">Suggested</span>
            <div className="flex flex-wrap gap-2">
              {suggested.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => addChip(item)}
                  className="rounded-full border border-border px-3 py-2 text-sm text-foreground hover:border-primary hover:bg-primary/5"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
