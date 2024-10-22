# Todo List

## Setup Supabase and Stripe
1. Create a Supabase client utility file
2. Set up Supabase environment variables
3. Create a Stripe client utility file
4. Set up Stripe environment variables

## Display Products on Homepage
1. Create a new component `ProductCard.tsx` in `components` folder
2. Fetch products from Supabase in `app/page.tsx`
3. Display products using `ProductCard` component on the homepage
4. Style the product grid using Tailwind CSS

## Implement Add to Cart Functionality
1. Create a `CartContext.tsx` in `contexts` folder to manage cart state
2. Implement `addToCart`, `removeFromCart`, and `updateQuantity` functions in `CartContext`
3. Create a `useCart` hook to easily access cart functionality throughout the app
4. Add "Add to Cart" button on `ProductCard` component
5. Implement quantity selector on `ProductCard` for products already in cart

## Create Cart Counter
1. Create a `CartCounter.tsx` component in `components` folder
2. Display total number of items in cart
3. Position the cart counter in the top right corner of the page

## Update Layout
1. Create a `Header.tsx` component in `components` folder
2. Add the `CartCounter` to the `Header` component
3. Update `app/layout.tsx` to include the `Header` component

## Next Steps (after completing the above)
- Implement a cart page to display all items in the cart
- Create a checkout process
- Integrate Stripe for payments
- Implement the coupon system during checkout

Remember to use Tailwind CSS for styling and leverage Next.js 13 App Router features for efficient routing and data fetching.
