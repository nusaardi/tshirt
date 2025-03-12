import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmation() {
  return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
      <p className="text-gray-600 mb-8">
        Your custom portrait t-shirt is being processed. 
        You'll receive a confirmation email with production updates.
      </p>
      <button
        className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition"
        onClick={() => window.location.reload()}
      >
        Create Another Design
      </button>
    </div>
  )
}
