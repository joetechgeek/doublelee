'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { stripe } from '../../../utils/stripe';
import { supabase } from '../../../utils/supabase';

export default function CheckoutSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, [sessionId]);

  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const { userId, couponCode, couponOwner } = session.metadata as { userId: string; couponCode?: string; couponOwner?: string };

      // Create order in the database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: session.amount_total! / 100, // Convert from cents to dollars
          coupon_code: couponCode,
          issued_by: couponOwner,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // If a coupon was used, create a commission record
      if (couponOwner) {
        const commissionAmount = (session.amount_total! / 100) * 0.1; // 10% commission
        await supabase
          .from('commissions')
          .insert({
            issuer_id: couponOwner,
            order_id: orderData.id,
            commission_amount: commissionAmount,
          });
      }

      setIsLoading(false);
    } catch (err: any) {
      console.error('Error processing successful payment:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Processing your order...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="mb-8">Your order has been successfully processed.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Continue Shopping
        </Link>
      </main>
    </div>
  );
}
