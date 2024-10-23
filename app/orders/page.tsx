import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { OrderItem } from '@/types/order'

export const dynamic = 'force-dynamic'

export default async function OrderHistory() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in to view your order history.</div>
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return <div>Error loading orders. Please try again later.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {orders.map(order => (
        <div key={order.id} className="mb-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Order #{order.id.slice(0, 8)}</h2>
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_amount.toFixed(2)}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
          <ul>
            {order.order_items.map((item: OrderItem) => (
              <li key={item.id}>
                {item.product.name} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <Link href={`/orders/${order.id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}
