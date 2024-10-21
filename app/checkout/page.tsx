'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../utils/supabase';
import Navbar from '../../components/Navbar';

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  };

  const handleApplyCoupon = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('coupon_code', couponCode)
        .single();

      if (error) throw error;

      if (data) {
        setDiscount(0.1); // 10% discount
      } else {
        alert('Invalid coupon code');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Error applying coupon');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteCheckout = async () => {
    setIsLoading(true);
    try {
      // Here you would typically create a Stripe PaymentIntent
      // and handle the payment process

      // For this example, we'll just simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear the cart and redirect to a success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = getCartTotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isLoading || !couponCode}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Apply Coupon
            </button>
          </div>
          <button
            onClick={handleCompleteCheckout}
            disabled={isLoading || cart.length === 0}
            className={`mt-6 w-full py-2 px-4 rounded ${
              isLoading || cart.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isLoading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </main>
    </div>
  );
}
