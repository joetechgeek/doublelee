import { supabase } from '../utils/supabase'
import { Product } from '../types/product'
import CheckoutButton from './components/CheckoutButton'

export const revalidate = 0; // This tells Next.js to not cache this page

export default async function Home() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id')

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Failed to fetch products from Supabase')
    }

    return (
      <>
        <h1 className="text-3xl font-bold mb-6">Welcome to Double Lee Electronics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-2"/>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 flex-grow">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <CheckoutButton />
      </>
    );
  } catch (error) {
    console.error('Render error:', error);
    return <div>An error occurred while rendering the page. Please check the server logs.</div>;
  }
}
