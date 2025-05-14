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
  // If you have public resources with special handling needs
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable trailing slash to prevent mismatches in exported static files
  trailingSlash: true,

  // Add webpack configuration for .jsonc files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.jsonc$/,
      type: 'json',
      use: ['json-loader']
    });

    return config;
  },
};

export default nextConfig;
