import { NextResponse } from 'next/server';
import { stripe } from '../../../utils/stripe';
import { supabase } from '../../../utils/supabase';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { items, userId, couponCode } = await req.json();

      // Fetch the user's email from Supabase
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (userError) throw new Error('User not found');

      // Check if the coupon code is valid
      let couponOwner = null;
      if (couponCode) {
        const { data: couponData, error: couponError } = await supabase
          .from('profiles')
          .select('id')
          .eq('coupon_code', couponCode)
          .single();

        if (!couponError && couponData) {
          couponOwner = couponData.id;
        }
      }

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Stripe expects amounts in cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/cart`,
        customer_email: userData.email,
        metadata: {
          userId,
          couponCode,
          couponOwner,
        },
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (err: unknown) {
      console.error('Error creating checkout session:', err);
      return NextResponse.json({ error: { message: err instanceof Error ? err.message : 'An unknown error occurred' } }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: { message: 'Method not allowed' } }, { status: 405 });
  }
}
