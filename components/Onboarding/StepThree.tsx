"use client"

interface Plan {
  id: string
  name: string
  price: number
  credits: number
  period: string
  isPopular?: boolean
  description: string
}

interface StepThreeProps {
  selectedPlan: string | null
  onSelectPlan: (planId: string) => void
  billingCycle: "monthly" | "yearly"
  onChangeBillingCycle: (cycle: "monthly" | "yearly") => void
}

export default function StepThree({ selectedPlan, onSelectPlan, billingCycle, onChangeBillingCycle }: StepThreeProps) {
  // Mock plans data
  const plans: Plan[] = [
    {
      id: "temporary",
      name: "Temporary",
      price: 9.99,
      credits: 50,
      period: "One time charge",
      description: "credits that last for 30 days",
    },
    {
      id: "personal",
      name: "Personal",
      price: billingCycle === "monthly" ? 37.95 : 379.5,
      credits: 250,
      period: billingCycle === "monthly" ? "Monthly" : "Yearly",
      isPopular: true,
      description: "credits per month",
    },
    {
      id: "professional",
      name: "Professional",
      price: billingCycle === "monthly" ? 98 : 980,
      credits: 800,
      period: billingCycle === "monthly" ? "Monthly" : "Yearly",
      description: "credits per month",
    },
    {
      id: "business",
      name: "Business",
      price: billingCycle === "monthly" ? 249 : 2490,
      credits: 2500,
      period: billingCycle === "monthly" ? "Monthly" : "Yearly",
      description: "credits per month",
    },
  ]

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-400">
          Find the perfect plan for your design needs, from trial access to advanced professional features
        </p>
      </div>

      {/* Billing cycle toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 p-1 rounded-md inline-flex">
          <button
            onClick={() => onChangeBillingCycle("monthly")}
            className={`px-4 py-1.5 text-sm rounded ${
              billingCycle === "monthly" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onChangeBillingCycle("yearly")}
            className={`px-4 py-1.5 text-sm rounded ${
              billingCycle === "yearly" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border ${
              selectedPlan === plan.id ? "border-[#ec4899]" : "border-gray-700 hover:border-gray-600"
            } p-5 transition-colors cursor-pointer`}
            onClick={() => onSelectPlan(plan.id)}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 right-4 bg-[#8b5cf6] text-white text-xs px-3 py-1 rounded-full">
                Popular
              </div>
            )}

            <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
            <p className="text-xs text-gray-400 mb-4">{plan.period}</p>

            <div className="mb-4">
              <span className="text-2xl font-bold">${plan.price.toFixed(2)}</span>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              {plan.credits} {plan.description}
            </p>

            <button
              className={`w-full py-2 rounded-md transition-colors ${
                selectedPlan === plan.id
                  ? "bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
