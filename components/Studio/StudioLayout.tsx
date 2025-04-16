"use client"

import type { ReactNode } from "react"
import { Info } from "lucide-react"

interface StudioLayoutProps {
  children?: ReactNode
  sidebarContent: ReactNode
  formContent: ReactNode
  previewContent: ReactNode
  requestContent: ReactNode
  onOpenTips?: () => void
  activeTab?: "interior" | "exterior" | "landscape"
  onTabChange?: (tab: "interior" | "exterior" | "landscape") => void
}

export default function StudioLayout({
  children,
  sidebarContent,
  formContent,
  previewContent,
  requestContent,
  onOpenTips,
  activeTab = "interior",
  onTabChange = () => {},
}: StudioLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row h-full bg-black text-white">
      {/* Left Sidebar */}
      <div className="w-full md:w-64 p-4 md:border-r border-zinc-800">
        <div className="flex md:flex-col">
          {/* Tabs */}
          <div className="flex md:mb-6 w-full overflow-x-auto md:overflow-visible">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium mr-2 md:mr-0 md:mb-2 ${
                activeTab === "interior" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => onTabChange("interior")}
            >
              Interior
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium mr-2 md:mr-0 md:mb-2 ${
                activeTab === "exterior" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => onTabChange("exterior")}
            >
              Exterior
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "landscape" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => onTabChange("landscape")}
            >
              Landscape
            </button>
          </div>

          {/* Current Selection */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium">Your current {activeTab}</h2>
              {onOpenTips && (
                <button onClick={onOpenTips} className="text-zinc-400 hover:text-white">
                  <div className="flex items-center">
                    <span className="mr-1 text-xs">Tips</span>
                    <Info className="w-4 h-4" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="mt-4">{sidebarContent}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Form Content */}
          <div className="flex-1 mb-6 space-y-6">{formContent}</div>
        </div>
      </div>

      {/* Right Sidebar - Preview and Request */}
      <div className="w-full md:w-80 p-4 md:p-6 border-t md:border-t-0 md:border-l border-zinc-800">
        <div className="flex flex-col h-full">
          <div className="flex-1 mb-6">{previewContent}</div>
          <div>{requestContent}</div>
        </div>
      </div>
    </div>
  )
}
