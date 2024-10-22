import Image from 'next/image'
import { Product } from '@/types/product'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image
        src={product.image_url}
        alt={product.alt_image || product.name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
