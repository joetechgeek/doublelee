import { supabase } from '../utils/supabase'
import CheckoutButton from './components/CheckoutButton'

export const revalidate = 0; // This tells Next.js to not cache this page

export default async function Home() {
  try {
    const { data, error } = await supabase.from('test').select('message')

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Failed to fetch data from Supabase')
    }

    // Add a timestamp to see when the page was last rendered
    const timestamp = new Date().toISOString();

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
        <CheckoutButton />
      </div>
    );
  } catch (error) {
    console.error('Render error:', error);
    return <div>An error occurred while rendering the page. Please check the server logs.</div>;
  }
}
