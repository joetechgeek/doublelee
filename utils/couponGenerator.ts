import { supabase } from './supabase';

export async function generateUniqueCouponCode(firstName: string, lastName: string): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const couponCode = generateCouponCode(firstName, lastName);
    
    // Check if the coupon code already exists
    const { data, error } = await supabase
      .from('profiles')
      .select('coupon_code')
      .eq('coupon_code', couponCode)
      .single();

    if (error || !data) {
      // If there's an error or no data, it means the coupon code doesn't exist
      return couponCode;
    }

    attempts++;
  }

  // If we've reached this point, we couldn't generate a unique code after maxAttempts
  throw new Error('Unable to generate a unique coupon code');
}

function generateCouponCode(firstName: string, lastName: string): string {
  const prefix = (firstName.substring(0, 2) + lastName.substring(0, 2)).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomNum}`;
}
