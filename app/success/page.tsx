'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      // Payment was successful, set a flag in localStorage
      // We'll use client-side JavaScript to actually clear the cart
    } else {
      redirect('/');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    redirect('/');
  }

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
      <p className="text-lg text-foreground">
        We hope you enjoy your purchase! Click the button above to browse more products.
      </p>
      <script dangerouslySetInnerHTML={{
        __html: `
          localStorage.setItem('clearCart', 'true');
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('storage'));
          }
        `
      }} />
    </div>
  );
}
