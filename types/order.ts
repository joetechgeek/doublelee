import { Product } from './product'

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: string
  created_at: string
  status: string
  total_amount: number
  order_items: OrderItem[]
}
