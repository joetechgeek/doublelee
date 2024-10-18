import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error:', err);
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: { message: err.message } }, { status: err.statusCode });
    }
    return NextResponse.json({ error: { message: 'An unexpected error occurred' } }, { status: 500 });
  }
}
