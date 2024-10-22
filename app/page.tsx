import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('id')

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
