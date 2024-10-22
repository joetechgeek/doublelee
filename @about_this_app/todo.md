# Todo List

## Setup Supabase and Stripe
- [ ] Create a Supabase client utility file
- [ ] Set up Supabase environment variables
- [ ] Create a Stripe client utility file
- [ ] Set up Stripe environment variables

## Display Products on Homepage
- [x] Create a new component `ProductCard.tsx` in `components` folder
- [ ] Fetch products from Supabase in `app/page.tsx`
- [x] Display products using `ProductCard` component on the homepage
- [x] Style the product grid using Tailwind CSS

## Implement Add to Cart Functionality
- [x] Create a `CartContext.tsx` in `contexts` folder to manage cart state
- [x] Implement `addToCart`, `removeFromCart`, and `updateQuantity` functions in `CartContext`
- [x] Create a `useCart` hook to easily access cart functionality throughout the app
- [x] Add "Add to Cart" button on `ProductCard` component
- [x] Implement quantity selector on `ProductCard` for products already in cart

## Create Cart Counter
- [x] Create a `CartCounter.tsx` component in `components` folder (integrated into Header)
- [x] Display total number of items in cart
- [x] Position the cart counter in the top right corner of the page

## Update Layout
- [x] Create a `Header.tsx` component in `components` folder
- [x] Add the `CartCounter` to the `Header` component
- [x] Update `app/layout.tsx` to include the `Header` component

## Next Steps
- [x] Implement a cart page to display all items in the cart
- [ ] Create a checkout process
- [ ] Integrate Stripe for payments
- [ ] Implement the coupon system during checkout

Remember to use Tailwind CSS for styling and leverage Next.js 13 App Router features for efficient routing and data fetching.
