'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';

export default function Success() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Clear the cart when the success page is loaded
    clearCart();
  }, [clearCart]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-5">Order Confirmed!</h1>
      <p className="mb-8">Thank you for your purchase. Your order has been successfully processed.</p>
      <div className="space-y-4">
        <button 
          onClick={() => handleNavigation('/')} 
          className="block w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => handleNavigation('/profile')} 
          className="block w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          View Profile
        </button>
        <button 
          onClick={() => handleNavigation('/affiliate')} 
          className="block w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
        >
          Affiliate Program
        </button>
      </div>
    </div>
  );
}
