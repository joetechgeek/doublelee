'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../utils/supabase';
import { stripePromise } from '../utils/stripe';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cart } = useCart();

  const handleCheckout = async () => {
    setIsLoading(true);

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login?redirect=/cart');
      return;
    }

    try {
      // Create a Stripe Checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          userId: user.id,
          // You can add coupon code here if it's available in the cart context
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || cart.length === 0}
      className={`mt-4 w-full py-2 px-4 rounded ${
        isLoading || cart.length === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
    </button>
  );
}
