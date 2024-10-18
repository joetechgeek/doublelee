'use client';

import React from 'react';

const CheckoutButton: React.FC = () => {
  const handleCheckout = () => {
    alert('Checkout functionality will be implemented here');
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
