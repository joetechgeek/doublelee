import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/types/cart';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function POST(req: Request) {
  const { items, couponCode } = await req.json() as { items: CartItem[], couponCode: string | null };

  // Update stock levels
  for (const item of items) {
    const { data, error } = await supabase
      .from('products')
      .select('stock')
      .eq('id', item.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Error fetching product stock' }, { status: 400 });
    }

    const newStock = data.stock - item.quantity;
    if (newStock < 0) {
      return NextResponse.json({ error: 'Not enough stock available' }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', item.id);

    if (updateError) {
      return NextResponse.json({ error: 'Error updating stock' }, { status: 400 });
    }
  }

  let couponId: string | undefined;
  if (couponCode) {
    const { data: couponData } = await supabase
      .from('profiles')
      .select('id')
      .eq('coupon_code', couponCode)
      .single();

    if (couponData) {
      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: 'once',
      });
      couponId = coupon.id;
    }
  }

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
    success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/cart`,
    discounts: couponId ? [{ coupon: couponId }] : undefined,
  });

  return NextResponse.json({ id: session.id });
}
