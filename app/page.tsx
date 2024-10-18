'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'
import { Product } from '../types/product'
import CheckoutButton from './components/CheckoutButton'
import { useCart } from '../contexts/CartContext';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Welcome to Double Lee Electronics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col">
            <Image 
              src={product.image_url} 
              alt={product.name} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 flex-grow">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
            <button 
              onClick={() => addToCart(product)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <CheckoutButton />
    </>
  );
}
