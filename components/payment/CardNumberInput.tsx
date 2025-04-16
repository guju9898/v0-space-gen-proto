"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface CardNumberInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function CardNumberInput({ value, onChange, error }: CardNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "")
    const formatted = input.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
    onChange(formatted)
  }

  // Determine card type based on first digits
  const getCardType = () => {
    const cardNumber = value.replace(/\s/g, "")
    if (/^4/.test(cardNumber)) return "visa"
    if (/^5[1-5]/.test(cardNumber)) return "mastercard"
    if (/^3[47]/.test(cardNumber)) return "amex"
    if (/^6(?:011|5)/.test(cardNumber)) return "discover"
    return null
  }

  const cardType = getCardType()

  return (
    <div className="mb-4">
      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
        Card number
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div
        className={`flex items-center w-full bg-zinc-900 border ${
          error ? "border-red-500" : isFocused ? "border-blue-500" : "border-zinc-700"
        } rounded-md px-4 py-2 focus-within:border-blue-500 transition-colors`}
      >
        <input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-white"
          maxLength={19}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "cardNumber-error" : undefined}
          required
        />
        <div className="flex space-x-2">
          <div className={`w-8 h-5 ${cardType === "visa" ? "opacity-100" : "opacity-40"}`}>
            <Image src="/visa.svg" alt="Visa" width={32} height={20} />
          </div>
          <div className={`w-8 h-5 ${cardType === "mastercard" ? "opacity-100" : "opacity-40"}`}>
            <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} />
          </div>
        </div>
      </div>
      {error && (
        <p id="cardNumber-error" className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
