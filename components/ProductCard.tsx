'use client';

import Image from 'next/image'
import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'
import { useState, useEffect } from 'react'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gray-800 flex flex-col h-full">
      <Image
        src={product.image_url}
        alt={product.alt_image || product.name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2 text-primary">{product.name}</h2>
        <p className="text-gray-300 mb-2 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-secondary">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-primary text-background hover:bg-opacity-80'
            }`}
          >
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
