"use client"

import { useState } from "react"

interface ColorPalette {
  id: string
  label: string
  colors: string[]
}

interface ColorPaletteSelectorProps {
  options: ColorPalette[]
  value: string | null
  onChange: (value: string) => void
  disabled?: boolean
}

export default function ColorPaletteSelector({
  options,
  value,
  onChange,
  disabled = false,
}: ColorPaletteSelectorProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {options.map((palette) => (
        <div
          key={palette.id}
          className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-transform hover:scale-105 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${value === palette.id ? "border-purple-500" : "border-transparent"}`}
          onClick={() => !disabled && onChange(palette.id)}
          onMouseEnter={() => setShowTooltip(palette.id)}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <div className="h-16 w-full flex">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 h-full"
                style={{ backgroundColor: color }}
                aria-label={`${palette.label} color ${index + 1}`}
              />
            ))}
          </div>

          {showTooltip === palette.id && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
              {palette.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
