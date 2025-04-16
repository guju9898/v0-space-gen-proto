export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and check if it's a valid length
  const digitsOnly = cardNumber.replace(/\s/g, "")

  // Most card types have 16 digits, but some have 15 (Amex) or other lengths
  if (!/^\d{15,16}$/.test(digitsOnly)) {
    return false
  }

  // Luhn algorithm for card number validation
  let sum = 0
  let shouldDouble = false

  // Loop through values starting from the rightmost digit
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digitsOnly.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

export const validateExpiryDate = (expiryDate: string): boolean => {
  // Check format
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return false
  }

  const [monthStr, yearStr] = expiryDate.split("/")
  const month = Number.parseInt(monthStr, 10)
  const year = Number.parseInt(yearStr, 10) + 2000 // Assuming 20xx

  // Check if month is valid
  if (month < 1 || month > 12) {
    return false
  }

  // Get current date
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // JavaScript months are 0-indexed

  // Check if the card is expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false
  }

  return true
}

export const validateCVV = (cvv: string): boolean => {
  // CVV is typically 3 digits, or 4 for Amex
  return /^\d{3,4}$/.test(cvv)
}
