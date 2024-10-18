'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { User } from '@supabase/supabase-js';
import { useCart } from '../../contexts/CartContext';
import { HomeIcon, ShoppingCartIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { cart } = useCart();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Double Lee Electronics</Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-400' : ''} hover:text-blue-300`}>
            <HomeIcon className="h-6 w-6" />
          </Link>
          <Link href="/cart" className={`${pathname === '/cart' ? 'text-blue-400' : ''} hover:text-blue-300 relative`}>
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <Link href="/affiliate" className={`${pathname === '/affiliate' ? 'text-blue-400' : ''} hover:text-blue-300`}>
            <CurrencyDollarIcon className="h-6 w-6" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/profile" className={`${pathname === '/profile' ? 'text-blue-400' : ''} hover:text-blue-300`}>
                <UserIcon className="h-6 w-6" />
              </Link>
              <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Login/Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
