import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      // Update order status
      await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId);

      // Update product stock
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', orderId);

      if (orderItems) {
        for (const item of orderItems) {
          await supabase.rpc('decrease_stock', {
            p_id: item.product_id,
            amount: item.quantity
          });
        }
      }

      // Process commission if a coupon was used
      const { data: order } = await supabase
        .from('orders')
        .select('coupon_code, total_amount')
        .eq('id', orderId)
        .single();

      if (order && order.coupon_code) {
        const { data: couponIssuer } = await supabase
          .from('profiles')
          .select('id')
          .eq('coupon_code', order.coupon_code)
          .single();

        if (couponIssuer) {
          const commissionAmount = order.total_amount * 0.1; // 10% commission
          await supabase
            .from('commissions')
            .insert({
              issuer_id: couponIssuer.id,
              order_id: orderId,
              commission_amount: commissionAmount,
            });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
