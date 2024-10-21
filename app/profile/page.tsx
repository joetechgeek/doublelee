'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  coupon_code: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>No profile found</div>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div>
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone_number}</p>
        <p><strong>Coupon Code:</strong> {profile.coupon_code}</p>
      </div>
    </div>
  );
}
