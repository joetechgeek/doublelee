'use client'

import { useCart } from '@/contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('your_stripe_publishable_key');

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-primary">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-foreground">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-600 py-4">
              <div>
                <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
                <p className="text-gray-400">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-700 text-white px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="bg-gray-600 text-white px-4 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-700 text-white px-2 py-1 rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-primary">Total: ${total.toFixed(2)}</h2>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-secondary text-background px-6 py-2 rounded hover:bg-opacity-80"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
