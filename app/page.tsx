import { supabase } from '../utils/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('test').select('message').single()

  if (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading data</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-2xl font-bold">
        {data ? data.message : 'No message found'}
      </p>
    </div>
  );
}
