'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Here you would typically verify the payment with Stripe
      // and update your database accordingly
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-primary mb-6">Thank You for Your Purchase!</h1>
      <p className="text-2xl text-secondary mb-8">
        Your order has been successfully processed.
      </p>
      <p className="text-xl text-foreground mb-12">
        You will receive an email confirmation shortly.
      </p>
      <div className="mb-12">
        <Link 
          href="/" 
          className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-80 transition-colors duration-200 shadow-lg border border-secondary"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
