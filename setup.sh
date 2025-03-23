#!/bin/bash

# YieldMax setup script

echo "Setting up YieldMax with Next.js and Bun..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "Bun is not installed. Installing Bun..."
    curl -fsSL https://bun.sh/install | bash

    # Source the Bun executable for the current session
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Install dependencies
echo "Installing dependencies..."
bun install

# Create necessary directories if they don't exist
mkdir -p app/protocol/\\[id\\] 2>/dev/null || true
mkdir -p app/compare 2>/dev/null || true
mkdir -p app/simulator 2>/dev/null || true
mkdir -p app/faq 2>/dev/null || true

# Initialize Next.js environment
echo "touch next-env.d.ts"
touch next-env.d.ts 2>/dev/null || true

echo ""
echo "Setup complete! To start the development server, run:"
echo "bun run dev"
