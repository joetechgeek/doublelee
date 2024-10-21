'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../utils/supabase';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cart, getCartTotal } = useCart();

  const handleCheckout = async () => {
    setIsLoading(true);

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login?redirect=/cart');
      return;
    }

    // Here you would typically create a Stripe Checkout session
    // For this example, we'll just simulate the process
    try {
      // Simulate API call to create Stripe session
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to a simulated Stripe Checkout page
      router.push('/checkout');
    } catch (error) {
      console.error('Error creating checkout session:', error);
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
