'use client'

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
      return;
    }

    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    // Set a flag to clear the cart after successful checkout
    localStorage.setItem('clearCart', 'true');

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
      // If there's an error, remove the clear cart flag
      localStorage.removeItem('clearCart');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-xl text-foreground">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-600 py-4">
              <div>
                <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
                <p className="text-gray-300">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-l hover:bg-gray-600"
                >
                  -
                </button>
                <span className="bg-gray-600 text-white px-4 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-r hover:bg-gray-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary">Total: ${total.toFixed(2)}</h2>
            <button
              onClick={handleCheckout}
              className="mt-6 bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition-colors duration-200 border border-secondary"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
