'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import getStripe from '../../utils/stripe';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../utils/supabase';

const CheckoutButton: React.FC = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Redirect to login page if user is not authenticated
      router.push('/login?redirect=checkout');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [item.image_url],
              },
              unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity,
          })),
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('An error occurred. Please try again.');
      } else {
        clearCart(); // Clear the cart after successful checkout
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      disabled={cart.length === 0}
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
