import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/types/cart';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

// Replace this with your actual live site URL
const LIVE_SITE_URL = 'https://doublelee.vercel.app';

export async function POST(req: Request) {
  const { items } = await req.json() as { items: CartItem[] };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${LIVE_SITE_URL}/success`,
    cancel_url: `${LIVE_SITE_URL}/cart`,
  });

  return NextResponse.json({ id: session.id });
}
