"use client"

import { Info, X } from "lucide-react"
import { useDesignConfig } from "@/hooks/useDesignConfig"

// Helper function to get display name for a config value
const getDisplayName = (key: string, value: any): string => {
  // Handle null, undefined, or empty strings
  if (value === null || value === undefined || value === "") {
    return ""
  }

  // If value is an object (including arrays), convert to string representation
  if (typeof value === "object") {
    return "Selected"
  }

  // For string values, capitalize first letter
  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  // For other types (number, boolean), convert to string
  return String(value)
}

interface RequestSummaryProps {
  onOpenInfo?: () => void
}

export default function RequestSummary({ onOpenInfo }: RequestSummaryProps) {
  const { config, updateConfig, resetConfig } = useDesignConfig()

  // Filter out null/undefined/empty values and arrays
  const activeSelections = Object.entries(config).filter(
    ([key, value]) =>
      value !== null && value !== undefined && value !== "" && !Array.isArray(value) && key !== "realism",
  )

  const handleRemoveTag = (key: string) => {
    updateConfig(key as keyof typeof config, null)
  }

  const handleClearAll = () => {
    resetConfig()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Request</h2>
        {onOpenInfo && (
          <button onClick={onOpenInfo} className="text-zinc-400 hover:text-white">
            <Info className="w-5 h-5" />
          </button>
        )}
      </div>

      {activeSelections.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <button onClick={handleClearAll} className="text-sm text-zinc-400 hover:text-white">
              Clear all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeSelections.map(([key, value]) => (
              <div key={key} className="flex items-center bg-zinc-800 px-3 py-1 rounded-full text-sm group">
                <span className="text-white">{getDisplayName(key, value as string)}</span>
                <button
                  onClick={() => handleRemoveTag(key)}
                  className="ml-2 text-zinc-400 group-hover:text-white"
                  aria-label={`Remove ${key}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">You don't have any request yet</p>
      )}
    </div>
  )
}
