"use client"

import type { ReactNode } from "react"
import { useDesignConfig } from "@/hooks/useDesignConfig"
import RenderButton from "./RenderButton"

interface FormPanelProps {
  children: ReactNode
  onRender?: () => void
  disableRender?: boolean
  renderType?: "interior" | "exterior" | "landscape"
}

export default function FormPanel({
  children,
  onRender,
  disableRender = false,
  renderType = "interior",
}: FormPanelProps) {
  const { config } = useDesignConfig()

  // Determine if render button should be disabled based on config
  const isRenderDisabled = () => {
    if (disableRender) return true

    if (renderType === "interior") {
      return !config.roomType || !config.designStyle
    } else if (renderType === "exterior") {
      return !config.exterior?.exteriorType || !config.exterior?.architecturalStyle
    }

    return false
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6 overflow-y-auto">{children}</div>

      <div className="mt-6">
        <RenderButton disabled={isRenderDisabled()} onRenderComplete={onRender ? () => onRender() : undefined} />
      </div>
    </div>
  )
}
