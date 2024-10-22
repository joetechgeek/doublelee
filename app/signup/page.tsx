'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { generateCouponCode } from '@/utils/couponGenerator';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Generate coupon code
        const couponCode = await generateCouponCode(firstName, lastName);

        // Create profile entry
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          coupon_code: couponCode,
        });

        if (profileError) throw profileError;

        // Redirect to profile page or dashboard
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      // Handle error (show message to user, etc.)
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
