"use client"

import type React from "react"

import { useState, useCallback, createContext, useContext } from "react"

interface ExteriorConfig {
  exteriorType: string | null
  architecturalStyle: string | null
  colorPalette: string | null
  timeOfDay: string | null
  roofStyle: string | null
  exteriorMaterials: string[]
  exteriorAccents: string[]
  focalPoint: string | null
  views: string[]
  realism: number
}

interface DesignConfig {
  roomType: string | null
  designStyle: string | null
  composition: string | null
  mood: string | null
  colorPalette: string | null
  lighting: string | null
  materials: string[]
  realism: number
  exterior?: ExteriorConfig
  // Add more properties as needed
}

// Default exterior configuration
const defaultExteriorConfig: ExteriorConfig = {
  exteriorType: null,
  architecturalStyle: null,
  colorPalette: null,
  timeOfDay: null,
  roofStyle: null,
  exteriorMaterials: [],
  exteriorAccents: [],
  focalPoint: null,
  views: [],
  realism: 70,
}

const initialConfig: DesignConfig = {
  roomType: null,
  designStyle: null,
  composition: null,
  mood: null,
  colorPalette: null,
  lighting: null,
  materials: [],
  realism: 50,
  exterior: defaultExteriorConfig, // Include default exterior config
}

interface DesignConfigContextType {
  config: DesignConfig
  updateConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
  updateTypeConfig: (renderType: "interior" | "exterior" | "landscape", key: string, value: any) => void
  resetConfig: () => void
  renderType: "interior" | "exterior" | "landscape"
  setRenderType: (type: "interior" | "exterior" | "landscape") => void
}

const DesignConfigContext = createContext<DesignConfigContextType | undefined>(undefined)

export function DesignConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<DesignConfig>(initialConfig)
  const [renderType, setRenderType] = useState<"interior" | "exterior" | "landscape">("interior")

  type ConfigKey = keyof DesignConfig
  const updateConfig = useCallback((key: ConfigKey, value: DesignConfig[ConfigKey]) => {
    // If value is a string, check if it's empty and convert to null
    if (typeof value === "string" && value.trim() === "") {
      setConfig((prev) => ({
        ...prev,
        [key]: null,
      }))
    } else {
      setConfig((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }, [])

  // New function to update config based on render type
  const updateTypeConfig = useCallback((renderType: "interior" | "exterior" | "landscape", key: string, value: any) => {
    if (renderType === "exterior") {
      setConfig((prev) => ({
        ...prev,
        exterior: {
          ...(prev.exterior || defaultExteriorConfig),
          [key]: typeof value === "string" && value.trim() === "" ? null : value,
        },
      }))
    } else if (renderType === "interior") {
      // For interior, we update the main config directly
      setConfig((prev) => ({
        ...prev,
        [key]: typeof value === "string" && value.trim() === "" ? null : value,
      }))
    } else if (renderType === "landscape") {
      // For future landscape implementation
      // This would be similar to exterior but with a landscape property
      console.log("Landscape config updates not yet implemented")
    }
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(initialConfig)
  }, [])

  return (
    <DesignConfigContext.Provider
      value={{ config, updateConfig, updateTypeConfig, resetConfig, renderType, setRenderType }}
    >
      {children}
    </DesignConfigContext.Provider>
  )
}

export function useDesignConfig() {
  const context = useContext(DesignConfigContext)

  if (context === undefined) {
    // For demo purposes, we'll provide a mock implementation if used outside provider
    return {
      config: initialConfig,
      updateConfig: <K extends keyof DesignConfig>(_key: K, _value: DesignConfig[K]) => {},
      updateTypeConfig: (_renderType: "interior" | "exterior" | "landscape", _key: string, _value: any) => {},
      resetConfig: () => {},
      renderType: "interior" as const,
      setRenderType: (_type: "interior" | "exterior" | "landscape") => {},
    }
  }

  return context
}
