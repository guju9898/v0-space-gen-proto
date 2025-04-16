"use client"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { DesignConfigProvider, useDesignConfig } from "@/hooks/useDesignConfig"
import ImageUploadPanel from "@/components/Studio/ImageUploadPanel"
import RenderPreview from "@/components/Studio/RenderPreview"
import RequestSummary from "@/components/Studio/RequestSummary"
import RenderButton from "@/components/Studio/RenderButton"
import TipsModal from "@/components/Studio/TipsModal"
import ExteriorVariablesPanel from "@/components/Studio/Variables/ExteriorVariablesPanel"
import RenderingOverlay from "@/components/Studio/RenderingOverlay"
import { useRenderEngine } from "@/hooks/useRenderEngine"

function ExteriorStudio() {
  const { config, updateConfig, setRenderType } = useDesignConfig()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [renderImage, setRenderImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showTipsModal, setShowTipsModal] = useState(false)
  const [renderError, setRenderError] = useState<string | null>(null)

  // Use the new render engine hook
  const { render, isRendering } = useRenderEngine()

  // Set render type to exterior when component mounts
  useEffect(() => {
    setRenderType("exterior")
  }, [setRenderType])

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    setRenderImage(null) // Clear previous render when uploading new image

    try {
      // In a real app, you would upload the file to your server or cloud storage
      // For this example, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Ensure we're not setting an empty string
      if (imageUrl && imageUrl.trim() !== "") {
        setUploadedImage(imageUrl)
      } else {
        setUploadedImage(null)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setUploadedImage(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageRemove = () => {
    setUploadedImage(null)
    setRenderImage(null)
  }

  const handleRenderDesign = async () => {
    // Clear any previous errors
    setRenderError(null)

    try {
      // Use the render engine to generate the design
      const result = await render({
        renderType: "exterior",
        config: config.exterior,
        sourceImage: uploadedImage,
      })

      if (result.error) {
        setRenderError(result.error)
      } else if (result.imageUrl) {
        setRenderImage(result.imageUrl)
      }
    } catch (error) {
      console.error("Error in render process:", error)
      setRenderError("An unexpected error occurred during rendering")
    }
  }

  // Exterior-specific tips
  const exteriorTips = [
    {
      title: "Capture the full exterior",
      description: "Take a photo that shows the entire exterior of the building from a good angle.",
    },
    {
      title: "Good lighting conditions",
      description: "Shoot during daylight hours with even lighting, avoiding harsh shadows.",
    },
    {
      title: "Clear view",
      description: "Ensure there are no obstructions like vehicles, people, or temporary structures.",
    },
  ]

  return (
    <div className="flex h-full">
      {/* Left Column */}
      <div className="w-[360px] border-r border-zinc-800 flex flex-col">
        {/* Tabs */}
        <div className="p-4">
          <div className="flex space-x-2 mb-6">
            <a href="/studio/workspace" className="px-4 py-2 text-zinc-400 hover:text-white">
              Interior
            </a>
            <button className="px-4 py-2 bg-zinc-800 rounded-md text-white">Exterior</button>
            <a href="/studio/landscape" className="px-4 py-2 text-zinc-400 hover:text-white">
              Landscape
            </a>
          </div>

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-medium">Your current exterior</h2>
            <button onClick={() => setShowTipsModal(true)} className="flex items-center text-zinc-400 hover:text-white">
              <span className="mr-1 text-sm">Tips</span>
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Image */}
        <div className="px-4 mb-4">
          <ImageUploadPanel
            currentImage={uploadedImage}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            isUploading={isUploading}
          />
        </div>

        {/* Design Controls */}
        <div className="px-4 overflow-y-auto flex-1">
          <ExteriorVariablesPanel onGenerateDesign={handleRenderDesign} />
        </div>
      </div>

      {/* Middle Column - Render Preview */}
      <div className="flex-1 border-r border-zinc-800 p-6">
        <RenderPreview
          renderImage={renderImage && renderImage.trim() !== "" ? renderImage : null}
          isLoading={isRendering}
          error={renderError}
          emptyStateText="You don't have any generated exterior yet"
        />
      </div>

      {/* Right Column - Request Summary */}
      <div className="w-[320px] p-6 flex flex-col">
        <div className="flex-1">
          <RequestSummary onOpenInfo={() => console.log("Open request info")} />
        </div>

        {/* Render Button - Now positioned at the bottom of the right column */}
        <div className="mt-auto pt-4">
          <RenderButton
            disabled={
              !uploadedImage ||
              uploadedImage === "" ||
              !config.exterior?.exteriorType ||
              !config.exterior?.architecturalStyle ||
              isRendering
            }
            onRenderComplete={(imageUrl) => setRenderImage(imageUrl)}
            onRenderError={(error) => setRenderError(error)}
          />
        </div>
      </div>

      {/* Rendering Overlay */}
      <RenderingOverlay isRendering={isRendering} renderType="exterior" />

      {/* Modals */}
      <TipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
        title="Your current exterior"
        tips={exteriorTips}
      />
    </div>
  )
}

export default function ExteriorStudioPage() {
  return (
    <DesignConfigProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center">
            <div className="flex items-center mr-8">
              <div className="w-8 h-8 bg-gradient-to-r from-[#F97066] to-[#AD74FF] rounded mr-2"></div>
              <span className="font-bold text-lg">Space Gen</span>
            </div>
            <nav className="flex space-x-8">
              <a href="/studio" className="text-purple-400 font-medium">
                Studio
              </a>
              <a href="/projects" className="text-zinc-400 hover:text-white">
                My projects
              </a>
              <a href="/subscription" className="text-zinc-400 hover:text-white">
                Subscription
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-zinc-900 rounded-md px-2 py-1">
              <span className="text-sm mr-1">EN</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-400 mr-1"
              >
                <path d="M12 2v1" />
                <path d="M12 21v1" />
                <path d="M4.93 4.93l.7.7" />
                <path d="M18.36 18.36l.7.7" />
                <path d="M2 12h1" />
                <path d="M21 12h1" />
                <path d="M4.93 19.07l.7-.7" />
                <path d="M18.36 5.64l.7-.7" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span className="text-sm">178</span>
            </div>
            <div className="flex items-center bg-zinc-900 rounded-full px-4 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-400 mr-2"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-sm">Martin</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="h-[calc(100vh-64px)]">
          <ExteriorStudio />
        </div>
      </div>
    </DesignConfigProvider>
  )
}
