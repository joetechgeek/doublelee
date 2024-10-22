This app is a **Next.js** e-commerce platform integrated with **Supabase** for backend services and user management, and a payment gateway like **Stripe**. It allows users to purchase products and utilize a built-in affiliate program through unique coupon codes.

When users sign up, Supabase handles authentication out of the box. Each user’s profile is extended with additional details like first name, last name, phone number, and an auto-generated unique coupon code based on their name and random digits. This coupon code can be shared, allowing others to apply it at checkout for a 10% discount on their purchase.

The system tracks coupon usage to identify the user who issued it. When the coupon is redeemed, the issuer receives a 10% commission on the total cart value, credited to their account. The app has a **commissions tracking system**, where users can view their earned commissions from referred sales.

The product catalog is dynamically fetched from Supabase, while cart and checkout functionality leverages **React Context** for state management. At checkout, the app applies the coupon, calculates discounts, processes the payment via Stripe, and records the order details in Supabase’s `orders` and `commissions` tables.

The app also features **admin functionality** for managing products and viewing sales data, including coupon usage analytics and pending commission payouts. Supabase’s real-time features allow tracking coupon redemptions and commission earnings.

The application will be deployed on **Vercel**, leveraging server-side rendering and Next.js' built-in API routes for handling actions like user profile updates, coupon validation, checkout, and commission payouts. This scalable setup ensures high performance, real-time data handling, and flexibility for future enhancements.