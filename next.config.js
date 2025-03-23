/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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
};

export default nextConfig;
