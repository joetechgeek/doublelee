import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/types/cart';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const supabase = createServerComponentClient({ cookies });

export async function POST(req: Request) {
  const { items, userId, couponCode } = await req.json() as { items: CartItem[], userId: string, couponCode: string | null };

  // Calculate total amount
  const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Apply discount if coupon is used
  const discount_applied = couponCode ? total_amount * 0.1 : 0; // 10% discount
  const final_amount = total_amount - discount_applied;

  // Fetch the issuer of the coupon if a coupon is used
  let issued_by = null;
  if (couponCode) {
    const { data: issuer } = await supabase
      .from('profiles')
      .select('id')
      .eq('coupon_code', couponCode)
      .single();
    issued_by = issuer?.id;
  }

  // Create order in Supabase
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: final_amount,
      discount_applied: discount_applied,
      coupon_code: couponCode,
      issued_by: issued_by,
      commission_paid: false,
      status: 'pending',
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

  return NextResponse.json({ sessionId: session.id });
}
