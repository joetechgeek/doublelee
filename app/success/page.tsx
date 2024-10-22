import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">Thank You for Your Purchase!</h1>
      <p className="text-xl text-foreground mb-8">
        Your order has been successfully processed.
      </p>
      <p className="text-foreground mb-8">
        You will receive an email confirmation shortly.
      </p>
      <Link 
        href="/" 
        className="inline-block bg-secondary text-background px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors duration-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
