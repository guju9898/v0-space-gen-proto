"use client"

import { useState } from "react"
import SafeImage from "@/components/SafeImage"
import { ChevronRight } from "lucide-react"

interface ImageOption {
  id: string
  label: string
  imageUrl: string
}

interface ImageSelectorProps {
  options: ImageOption[]
  value: string | null
  onChange: (value: string) => void
  maxVisible?: number
}

export default function ImageSelector({ options, value, onChange, maxVisible = 4 }: ImageSelectorProps) {
  const [showAll, setShowAll] = useState(false)

  const displayedOptions = showAll ? options : options.slice(0, maxVisible)
  const hasMore = options.length > maxVisible

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {displayedOptions.map((option) => {
          const validImageUrl = option.imageUrl && option.imageUrl.trim() !== ""

          return (
            <div
              key={option.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden ${
                value === option.id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => onChange(option.id)}
            >
              <div className="relative aspect-square">
                {validImageUrl && (
                  <SafeImage src={option.imageUrl} alt={option.label} fill className="object-cover" sizes="150px" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center">
                  {option.label}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          )
        })}

        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="aspect-square rounded-lg border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
          >
            +{options.length - maxVisible} more
          </button>
        )}
      </div>
    </div>
  )
}
