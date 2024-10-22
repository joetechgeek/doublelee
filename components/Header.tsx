'use client';

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          DoubleLee Shop
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="text-lg text-foreground hover:text-secondary transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-lg text-foreground hover:text-secondary transition-colors duration-200">
                Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
