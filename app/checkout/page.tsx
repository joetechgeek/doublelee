'use client';

import { useCart } from '@/contexts/CartContext'
import { useUser } from '@/contexts/UserContext'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cart, couponCode } = useCart()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleOrderSubmission = async () => {
    if (!user) {
      console.error('User not logged in')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          userId: user.id,
          couponCode,
        }),
      })

      if (!response.ok) {
        throw new Error('Order submission failed')
      }

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error during checkout:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Checkout</h1>
      {/* Display cart items, total, etc. */}
      <button onClick={handleOrderSubmission} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  )
}
