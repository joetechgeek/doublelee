'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type CartItem = Product & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  couponCode: string | null;
  setCouponCode: (code: string | null) => void;
  couponDiscount: number;
  applyCoupon: (code: string) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product: Product) => {
    // Check current stock
    const { data, error } = await supabase
      .from('products')
      .select('stock')
      .eq('id', product.id)
      .single();

    if (error || !data) {
      console.error('Error checking stock:', error);
      return;
    }

    if (data.stock === 0) {
      console.error('Product out of stock');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Update stock in database
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: data.stock - 1 })
      .eq('id', product.id);

    if (updateError) {
      console.error('Error updating stock:', updateError);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    const { data, error } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single();

    if (error || !data) {
      console.error('Error checking stock:', error);
      return;
    }

    if (data.stock < quantity) {
      console.error('Not enough stock');
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    );

    // Update stock in database
    const currentItem = cart.find(item => item.id === productId);
    if (currentItem) {
      const stockChange = quantity - currentItem.quantity;
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: data.stock - stockChange })
        .eq('id', productId);

      if (updateError) {
        console.error('Error updating stock:', updateError);
      }
    }
  };

  const applyCoupon = async (code: string) => {
    // Your coupon application logic here
    // For now, let's just set a fixed discount
    setCouponCode(code);
    setCouponDiscount(0.1); // 10% discount
    return true;
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode(null);
    setCouponDiscount(0);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartCount,
      couponCode,
      setCouponCode,
      couponDiscount,
      applyCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
