import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description, image_url }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, quantity: 1 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link href={`/product/${id}`} className="block">
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
        <img src={image_url} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2 truncate">{description}</p>
        <p className="text-lg font-bold mb-4">${price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded ${
            isAdded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
