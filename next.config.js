/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'example.com'], // Add the domains you're loading images from
  },
  output: 'standalone',
}

module.exports = nextConfig
