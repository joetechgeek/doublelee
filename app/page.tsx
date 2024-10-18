import { supabase } from '../utils/supabase'
import getStripe from '../utils/stripe'

export const revalidate = 0; // This tells Next.js to not cache this page

export default async function Home() {
  const { data, error } = await supabase.from('test').select('message')

  if (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading data</div>
  }

  // Add a timestamp to see when the page was last rendered
  const timestamp = new Date().toISOString();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            price: 'price_XXXXXXXXXXXXXXXXXXXXXXXX', // Replace with an actual Stripe Price ID
            quantity: 1,
          },
        ],
      }),
    });

    const { sessionId } = await response.json();
    const result = await stripe?.redirectToCheckout({ sessionId });

    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Test Messages</h1>
      {data && data.length > 0 ? (
        <ul className="list-disc pl-5 mb-4">
          {data.map((item, index) => (
            <li key={index} className="text-xl mb-2">{item.message}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl mb-4">No messages found</p>
      )}
      <p className="text-sm text-gray-500">
        Last updated: {timestamp}
      </p>
      <button
        onClick={handleCheckout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Stripe Checkout
      </button>
    </div>
  );
}
