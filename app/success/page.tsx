'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';

export default function Success() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the success page is loaded
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-5">Order Confirmed!</h1>
      <p className="mb-8">Thank you for your purchase. Your order has been successfully processed.</p>
      <div className="space-y-4">
        <Link href="/" className="block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Continue Shopping
        </Link>
        <Link href="/profile" className="block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          View Profile
        </Link>
        <Link href="/affiliate" className="block bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
          Affiliate Program
        </Link>
      </div>
    </div>
  );
}
