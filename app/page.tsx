import { supabase } from '../utils/supabase'

export const revalidate = 0; // This tells Next.js to not cache this page

export default async function Home() {
  const { data, error } = await supabase.from('test').select('message')

  if (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading data</div>
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
    </div>
  );
}
