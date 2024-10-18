'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Double Lee Electronics</Link>
        <div className="space-x-4">
          <Link href="/" className={pathname === '/' ? 'font-bold' : ''}>Home</Link>
          <Link href="/cart" className={pathname === '/cart' ? 'font-bold' : ''}>Cart</Link>
          <Link href="/login" className={pathname === '/login' ? 'font-bold' : ''}>Login</Link>
          <Link href="/register" className={pathname === '/register' ? 'font-bold' : ''}>Register</Link>
          <Link href="/affiliate" className={pathname === '/affiliate' ? 'font-bold' : ''}>Affiliate Program</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
