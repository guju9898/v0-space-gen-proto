"use client"

import type React from "react"

import { CreditCard, Lock } from "lucide-react"

interface StepFourProps {
  cardNumber: string
  setCardNumber: (value: string) => void
  cardName: string
  setCardName: (value: string) => void
  expiryDate: string
  setExpiryDate: (value: string) => void
  cvv: string
  setCvv: (value: string) => void
  selectedPlan: string
}

export default function StepFour({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  selectedPlan,
}: StepFourProps) {
  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim()
    setCardNumber(formattedValue)
  }

  // Format expiry date with slash
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 2) {
      setExpiryDate(value)
    } else {
      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`)
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard size={32} className="text-[#ec4899]" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">Payment Information</h2>
        <p className="text-gray-400">Enter your payment details to complete your subscription</p>
      </div>

      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-400 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec4899] text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec4899] text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec4899] text-white"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="123"
              maxLength={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec4899] text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Lock size={16} />
          <span>Your payment information is secured with 256-bit encryption</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] rounded-md text-white font-medium hover:opacity-90 transition-opacity"
        >
          Complete Payment
        </button>
      </form>
    </div>
  )
}
