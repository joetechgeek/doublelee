'use client';

import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import CheckoutButton from '../../components/CheckoutButton';

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-8">
              <p className="text-2xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
              <CheckoutButton />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
