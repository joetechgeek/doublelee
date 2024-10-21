'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import { useCart } from '../../../contexts/CartContext';
import Navbar from '../../../components/Navbar';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id, fetchProduct]);

  const fetchProduct = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
    } else {
      setProduct(data);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Image src={product.image_url} alt={product.name} width={500} height={300} className="w-full h-64 object-cover mb-6 rounded" />
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-4 rounded ${
              isAdded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </main>
    </div>
  );
}
