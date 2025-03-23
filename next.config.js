/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  // Set base path if needed, remove or adjust if deploying to root domain
  // basePath: '',
  images: {
    unoptimized: true, // Required for static export
    domains: [''],
  },
  experimental: {
    // Enable app directory to use Next.js 13+ App Router
    appDir: true,
  },
  // If you have public resources with special handling needs
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
};

module.exports = nextConfig;
