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
      <div className="mt-12">
        <Link 
          href="/" 
          className="inline-block bg-secondary text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-80 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
      <p className="mt-6 text-foreground">
        We hope you enjoy your purchase! Click the button above to browse more products.
      </p>
    </div>
  );
}
