"use client"

import { X } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface TagSelectorProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  maxSelections?: number
  disabled?: boolean
}

export default function TagSelector({
  options,
  selectedValues,
  onChange,
  maxSelections = Number.POSITIVE_INFINITY,
  disabled = false,
}: TagSelectorProps) {
  const handleToggleTag = (value: string) => {
    if (disabled) return

    if (selectedValues.includes(value)) {
      // Remove tag
      onChange(selectedValues.filter((v) => v !== value))
    } else if (selectedValues.length < maxSelections) {
      // Add tag
      onChange([...selectedValues, value])
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => {
            const option = options.find((o) => o.value === value)
            if (!option) return null

            return (
              <div
                key={value}
                className="flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
              >
                <span>{option.label}</span>
                <button
                  type="button"
                  onClick={() => handleToggleTag(value)}
                  disabled={disabled}
                  className="ml-1 focus:outline-none"
                  aria-label={`Remove ${option.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )
          })
        ) : (
          <div className="text-zinc-500 text-sm">No materials selected</div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {options
          .filter((option) => !selectedValues.includes(option.value))
          .map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleToggleTag(option.value)}
              disabled={disabled || selectedValues.length >= maxSelections}
              className={`px-3 py-1 rounded-full text-sm border border-zinc-700 hover:border-zinc-500 transition-colors ${
                disabled || selectedValues.length >= maxSelections ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {option.label}
            </button>
          ))}
      </div>

      {maxSelections < Number.POSITIVE_INFINITY && (
        <div className="text-xs text-zinc-500 mt-1">
          {selectedValues.length} of {maxSelections} selected
        </div>
      )}
    </div>
  )
}
