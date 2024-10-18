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
- [ ] Design simple schema for products, users, orders, and affiliate links
- [ ] Set up tables in Supabase
- [ ] Add sample product data to the database
- [ ] Define Row Level Security (RLS) policies for tables

## 3. Homepage (Product Listing)
- [ ] Create product model
- [ ] Implement API route to fetch products from Supabase
- [ ] Design and implement homepage with product listing
- [ ] Ensure product listing is visible to all users (authenticated and unauthenticated)

## 4. Navigation and Layout
- [ ] Create a basic layout component with navbar
- [ ] Add links for Home, Cart, Login/Register, and Affiliate Program

## 5. Authentication
- [ ] Implement user registration (customers and affiliates)
- [ ] Implement login functionality
- [ ] Implement sign-out functionality
- [ ] Create protected routes for user-specific pages
- [ ] Add login/logout functionality to navbar
- [ ] Ensure sign-out option is available on all authenticated pages

## 6. Shopping Cart
- [ ] Implement cart state management (React Context or local storage)
- [ ] Create add to cart functionality (available for all users)
- [ ] Design and implement cart view page

## 7. Checkout Process
- [ ] Design checkout form (accessible only to logged-in users)
- [ ] Implement Stripe payment integration
- [ ] Create order confirmation page
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
