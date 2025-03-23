# YieldMax

YieldMax is a platform that helps you compare and analyze different yield opportunities in the DeFi ecosystem. 
We aggregate data from various protocols to provide you with transparent information to make informed decisions.

## Tech Stack

- **Next.js** - React framework with SSR and static site generation capabilities
- **TypeScript** - For type safety and better developer experience
- **Bun** - JavaScript runtime and package manager

## Getting Started

Make sure you have [Bun](https://bun.sh) installed on your machine.

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Static Site Generation

Next.js generates static HTML files for all pages during the build process, which enables faster loading times and SEO benefits. The output is saved to the `/out` directory.

## Deployment

This app can be deployed to any static hosting service. For example:

1. Build the app: `bun run build`
2. The static files are generated in the `/out` directory
3. Deploy the contents of the `/out` directory to your hosting service

## Project Structure

- `/app` - Next.js app directory (Pages and layouts)
- `/src` - Source code
  - `/api` - API functions for data fetching
  - `/components` - React components
  - `/data` - Data files and types

## Features

- Protocol comparison
- Yield simulation
- Risk assessment
- Protocol details
