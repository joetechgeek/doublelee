'use client';

import React from 'react';
import getStripe from '../../utils/stripe';

const CheckoutButton: React.FC = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              price: 'price_XXXXXXXXXXXXXXXXXXXXXXXX', // Replace with an actual Stripe Price ID
              quantity: 1,
            },
          ],
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Test Stripe Checkout
    </button>
  );
};

export default CheckoutButton;
