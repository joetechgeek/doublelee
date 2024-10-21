import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="mb-8">Your order has been successfully processed.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Continue Shopping
        </Link>
      </main>
    </div>
  );
}
