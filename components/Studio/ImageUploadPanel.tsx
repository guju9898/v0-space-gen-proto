"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import SafeImage from "@/components/SafeImage"

interface ImageUploadPanelProps {
  currentImage: string | null
  onImageUpload: (file: File) => void
  onImageRemove?: () => void
  isUploading?: boolean
  acceptedFileTypes?: string[]
  maxFileSizeMB?: number
}

export default function ImageUploadPanel({
  currentImage,
  onImageUpload,
  onImageRemove,
  isUploading = false,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"],
  maxFileSizeMB = 8,
}: ImageUploadPanelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`File type not supported. Please upload ${acceptedFileTypes.join(", ")}`)
      return false
    }

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxFileSizeMB}MB`)
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onImageUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onImageUpload(file)
      }
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Ensure currentImage is not an empty string
  const imageSource = currentImage && currentImage.trim() !== "" ? currentImage : null

  return (
    <div className="w-full">
      <div
        className={`relative w-full aspect-square border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-zinc-700 hover:border-zinc-500"
        } ${imageSource ? "bg-zinc-900" : "bg-zinc-900/50"} cursor-pointer overflow-hidden`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(",")}
          className="hidden"
          disabled={isUploading}
        />

        {imageSource ? (
          <div className="relative w-full h-full group">
            <SafeImage
              src={imageSource}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            {onImageRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onImageRemove()
                }}
                className="absolute top-2 right-2 bg-black/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <Upload className="w-8 h-8 mb-4 text-zinc-400" />
            <p className="text-sm text-zinc-400">
              Click to upload or drag and drop
              <br />
              PNG, JPG up to {maxFileSizeMB}MB
            </p>
            {isUploading && <p className="mt-4 text-sm text-purple-400">Uploading...</p>}
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
