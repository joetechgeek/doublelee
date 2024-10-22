'use client';

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          DoubleLee Shop
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-foreground hover:text-secondary">
                Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
