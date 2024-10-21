'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { CartProvider } from '../contexts/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
