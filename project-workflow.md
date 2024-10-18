# Double Lee Electronics Project Workflow

## 1. Project Setup and Configuration
- [x] Initialize Next.js project
- [x] Set up GitHub repository
- [x] Deploy to Vercel
- [x] Set up Supabase project
- [x] Configure Supabase connection in Next.js
- [x] Obtain Stripe test API keys
- [x] Set up Stripe in Next.js

## 2. Database Design and Setup
- [x] Create 'test' table with 'message' column in Supabase
- [x] Add sample data to 'test' table
- [x] Test Supabase connection by displaying message on homepage
- [x] Design simple schema for products, users, orders, and affiliate links
- [x] Set up products table in Supabase
- [x] Add sample product data to the database
- [ ] Set up users, orders, and affiliate links tables
- [ ] Define Row Level Security (RLS) policies for tables

## 3. Homepage (Product Listing)
- [x] Create product model
- [x] Implement API route to fetch products from Supabase
- [x] Design and implement homepage with product listing
- [x] Ensure product listing is visible to all users (authenticated and unauthenticated)

## 4. Navigation and Layout
- [x] Create a basic layout component with navbar
- [x] Add links for Home, Cart, Login/Register, and Affiliate Program

## 5. Authentication
- [x] Implement user registration (customers and affiliates)
- [x] Implement login functionality
- [x] Implement sign-out functionality
- [x] Create protected routes for user-specific pages
- [x] Add login/logout functionality to navbar
- [x] Ensure sign-out option is available on all authenticated pages

## 6. Shopping Cart
- [x] Implement cart state management using React Context
- [x] Create add to cart functionality (available for all users)
- [x] Design and implement cart view page
- [x] Refine cart UI with quantity adjustments
- [x] Connect cart to Stripe checkout process

## 7. Checkout Process
- [x] Implement Stripe payment integration with cart items
- [x] Create order confirmation page
- [x] Clear cart after successful checkout
- [ ] Set up basic email confirmation

## 8. Affiliate System
- [ ] Create separate affiliate signup page
- [ ] Implement affiliate link generation
- [ ] Create system to track clicks on affiliate links
- [ ] Design and implement basic affiliate dashboard

## 9. UI/UX Refinement
- [ ] Ensure responsive design
- [ ] Implement consistent styling across the site
- [ ] Add loading states and error handling

## 10. Testing
- [ ] Perform manual testing of all functionalities
- [ ] Test responsiveness on different devices

## 11. Documentation
- [ ] Update README with project overview and setup instructions
- [ ] Document any complex parts of the codebase

## 12. Final Deployment and Submission
- [ ] Ensure all environment variables are set in Vercel
- [ ] Final deployment to Vercel
- [ ] Prepare project presentation or report as required by your school
