import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/types/cart';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  const { items, userId, couponCode } = await req.json() as { items: CartItem[], userId: string, couponCode: string | null };

  // Calculate total amount
  const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create order in Supabase
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: total_amount,
      status: 'pending',
      coupon_code: couponCode,
    })
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }

  // Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    return NextResponse.json({ error: 'Error creating order items' }, { status: 500 });
  }

  // Create Stripe session
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
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: {
      order_id: order.id,
    },
  });

  return NextResponse.json({ id: session.id });
}
