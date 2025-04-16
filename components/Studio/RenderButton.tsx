"use client"

import { useState } from "react"
import { useDesignConfig } from "@/hooks/useDesignConfig"

interface RenderButtonProps {
  disabled?: boolean
  onRenderComplete?: (imageUrl: string) => void
  onRenderError?: (error: string) => void
}

export default function RenderButton({ disabled = false, onRenderComplete, onRenderError }: RenderButtonProps) {
  const { config } = useDesignConfig()
  const [isRendering, setIsRendering] = useState(false)

  const handleRenderDesign = async () => {
    if (disabled || isRendering) return

    setIsRendering(true)
    console.log("Rendering design with configuration:", config)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock successful render
      const mockImageUrl = "/studio/generated-design.jpg"

      if (onRenderComplete) {
        onRenderComplete(mockImageUrl)
      }
    } catch (error) {
      console.error("Error rendering design:", error)

      if (onRenderError) {
        onRenderError("Failed to generate design. Please try again.")
      }
    } finally {
      setIsRendering(false)
    }
  }

  return (
    <button
      onClick={handleRenderDesign}
      disabled={disabled || isRendering}
      className={`w-full py-3 rounded-md flex items-center justify-center gap-2 transition-colors ${
        disabled || isRendering
          ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
          : "bg-gradient-to-r from-[#F97066] to-[#AD74FF] hover:opacity-90 text-white"
      }`}
    >
      {isRendering ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Rendering...
        </>
      ) : (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M21 7.5V6.75C21 5.50736 19.9926 4.5 18.75 4.5H5.25C4.00736 4.5 3 5.50736 3 6.75V17.25C3 18.4926 4.00736 19.5 5.25 19.5H18.75C19.9926 19.5 21 18.4926 21 17.25V16.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 12C18 12.5523 17.5523 13 17 13C16.4477 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M14.5 7.5H9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Render design
        </>
      )}
    </button>
  )
}
