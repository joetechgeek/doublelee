import { supabase } from '../utils/supabase'

export const revalidate = 0; // This tells Next.js to not cache this page

export default async function Home() {
  const { data, error } = await supabase.from('test').select('message').single()

  if (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading data</div>
  }

  // Add a timestamp to see when the page was last rendered
  const timestamp = new Date().toISOString();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-bold mb-4">
        {data ? data.message : 'No message found'}
      </p>
      <p className="text-sm text-gray-500">
        Last updated: {timestamp}
      </p>
    </div>
  );
}
