import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface OrderDetailProps {
  params: { id: string }
}

export default async function OrderDetail({ params }: OrderDetailProps) {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in to view order details.</div>
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (error || !order) {
    console.error('Error fetching order:', error)
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Order #{order.id.slice(0, 8)}</h2>
        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
        <p>Status: {order.status}</p>
        <p>Total: ${order.total_amount.toFixed(2)}</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
        <ul>
          {order.order_items.map((item: any) => (
            <li key={item.id} className="mb-2">
              <div>{item.product.name}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Price: ${item.price.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
