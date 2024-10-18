'use client';

import { useCart } from '../../contexts/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { cart, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <Image src={item.image_url} alt={item.name} width={100} height={100} className="mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-2xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}
