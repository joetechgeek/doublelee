import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Our Store
        </Link>
        <div className="flex items-center">
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/signup" className="text-white mr-4">
            Sign Up
          </Link>
          <Link href="/cart" className="text-white relative">
            Cart
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
