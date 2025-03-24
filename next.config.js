/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  // Set base path if needed, remove or adjust if deploying to root domain
  // basePath: '',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Configure asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://yieldmax.xyz' : '',
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable trailing slash to prevent mismatches in exported static files

  trailingSlash: true,
};

export default nextConfig;
