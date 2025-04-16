"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface DropdownSelectorProps {
  options: Option[]
  value: string | null
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export default function DropdownSelector({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  icon,
}: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex items-center bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-zinc-600"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {icon && <div className="w-5 h-5 mr-2">{icon}</div>}
        <span className={selectedOption ? "text-white" : "text-zinc-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="ml-auto">
          <ChevronRight className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-zinc-700 ${
                  value === option.value ? "bg-purple-500/20 text-purple-300" : "text-white"
                }`}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
