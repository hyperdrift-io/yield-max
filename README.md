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

This repository is configured with GitHub Actions for automatic deployment to the production server. We use Bun for all build and deployment processes.

### Setting up SSH Deployment

1. Generate an SSH key pair if you don't already have one:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/yieldmax_deploy
   ```

2. Add the public key to the authorized_keys file on the server:
   ```bash
   ssh-copy-id -i ~/.ssh/yieldmax_deploy.pub yannvr@69.62.124.138
   ```
   Or manually add the content of `yieldmax_deploy.pub` to `~/.ssh/authorized_keys` on the server.

3. Add the private key as a GitHub secret:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `SSH_PRIVATE_KEY`
   - Value: Copy the entire contents of your private key file (~/.ssh/yieldmax_deploy)
   - Click "Add secret"

4. The GitHub workflow will now be able to deploy directly to the server whenever code is pushed to the main branch.

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to Production" workflow
3. Click "Run workflow"
4. Select the branch you want to deploy
5. Click "Run workflow"

### Server Requirements

Make sure your server has the following:
1. Bun installed: `curl -fsSL https://bun.sh/install | bash`
2. PM2 for process management: `bun install -g pm2`

## Project Structure

- `/app` - Next.js app directory (Pages and layouts)
- `/src` - Source code
  - `/api` - API functions for data fetching
  - `/components` - React components
  - `/data` - Data files and types
- `/out` - Static build output (generated after build)

## Features

- Protocol comparison
- Yield simulation
- Risk assessment
- Protocol details
