'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';

export default function Success() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Clear the cart when the success page is loaded
    clearCart();

    // Force a hard refresh of the page after a short delay
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-5">Order Confirmed!</h1>
      <p className="mb-8">Thank you for your purchase. Your order has been successfully processed.</p>
      <p className="mb-4">You will be redirected to the homepage in 5 seconds.</p>
      <div className="space-y-4">
        <Link href="/" className="block w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Continue Shopping
        </Link>
        <Link href="/profile" className="block w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          View Profile
        </Link>
        <Link href="/affiliate" className="block w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
          Affiliate Program
        </Link>
      </div>
    </div>
  );
}
