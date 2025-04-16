"use client"

import { useState } from "react"
import StudioEmptyState from "@/components/Studio/StudioEmptyState"
import RequestInfoModal from "@/components/Studio/RequestInfoModal"
import TipsModal from "@/components/Studio/TipsModal"
import { useRouter } from "next/navigation"

export default function StudioPage() {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showRequestInfo, setShowRequestInfo] = useState(false)
  const [showTipsInfo, setShowTipsInfo] = useState(false)

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // In a real app, you would upload the file to your server or cloud storage
      // For this example, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentImage(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
      // Handle error state
    } finally {
      setIsUploading(false)
    }
  }

  const handleRenderDesign = () => {
    // In a real app, this would trigger the AI design generation
    console.log("Rendering design with current image:", currentImage)
    // Navigate to results page or show loading state
    // router.push('/studio/results')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded mr-2"></div>
            <span className="font-bold">Space Gen</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/studio" className="text-purple-400">
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
          <div className="flex items-center">
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
            <span className="text-sm mr-1">1/8</span>
          </div>
          <div className="bg-zinc-800 rounded-full h-8 w-8 flex items-center justify-center">
            <span className="text-sm">M</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-64px)]">
        <StudioEmptyState
          onImageUpload={handleImageUpload}
          onRenderDesign={handleRenderDesign}
          onOpenRequestInfo={() => setShowRequestInfo(true)}
          onOpenTipsInfo={() => setShowTipsInfo(true)}
          isUploading={isUploading}
          currentImage={currentImage}
        />
      </main>

      {/* Modals */}
      <RequestInfoModal isOpen={showRequestInfo} onClose={() => setShowRequestInfo(false)} />

      <TipsModal isOpen={showTipsInfo} onClose={() => setShowTipsInfo(false)} />
    </div>
  )
}
