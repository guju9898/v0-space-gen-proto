"use client"

import { useEffect, useState } from "react"

interface RenderingOverlayProps {
  isRendering: boolean
  renderType?: "interior" | "exterior" | "landscape"
}

export default function RenderingOverlay({ isRendering, renderType = "interior" }: RenderingOverlayProps) {
  const [dots, setDots] = useState(".")

  // Animation for the loading dots
  useEffect(() => {
    if (!isRendering) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "."
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isRendering])

  if (!isRendering) return null

  const renderMessage = `Rendering ${renderType} design${dots}`

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-xl max-w-md text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-xl font-medium text-white mb-2">{renderMessage}</h3>
        <p className="text-zinc-400 text-sm">
          This may take a few moments. We're applying your design preferences to create a stunning visualization.
        </p>
      </div>
    </div>
  )
}
