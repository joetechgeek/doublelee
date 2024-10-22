import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function generateCouponCode(firstName: string, lastName: string): Promise<string> {
  const prefix = (firstName.slice(0, 3) + lastName.slice(0, 3)).toUpperCase();
  
  let couponCode: string;
  let isUnique = false;

  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 900) + 100; // generates a random number between 100 and 999
    couponCode = `${prefix}${randomNum}`;

    // Check if the coupon code already exists in the database
    const { data, error } = await supabase
      .from('profiles')
      .select('coupon_code')
      .eq('coupon_code', couponCode)
      .single();

    if (error || !data) {
      isUnique = true;
    }
  }

  return couponCode!;
}
