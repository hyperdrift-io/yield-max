# YieldMax

Compare and optimize DeFi yield opportunities with transparent protocol analysis and risk assessment.

[![Deploy to Production](https://github.com/yourusername/yieldmax/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/yieldmax/actions/workflows/deploy.yml)

## Features

- **Protocol Comparison** - Compare yields across multiple protocols
- **Risk Assessment** - Understand the risks associated with each protocol
- **Yield Simulation** - Project potential earnings based on investment amount and time
- **Beginner Guides** - Learn about DeFi yield strategies

## Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Run tests
bun run test
```

## Tech Stack

- **Next.js** - React framework with SSR and static site generation
- **TypeScript** - Type-safe JavaScript
- **Bun** - Fast JavaScript runtime and package manager
- **React Query** - Data fetching and state management
- **CSS Modules** - Scoped styling

## Development

### Testing

We use Bun's built-in test runner with React Testing Library:

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch
```

### Linting

```bash
# Lint codebase
bun run lint

# Verify CSS styles
bun run verify-styles
```

## Deployment

Deployment is automated via GitHub Actions. When code is pushed to the main branch, it's automatically:

1. Tested
2. Linted
3. Built
4. Deployed to the production server

## Project Structure

- `/app` - Next.js app directory (Pages and layouts)
- `/src` - Core source code
  - `/api` - API functions and services
  - `/components` - Reusable UI components
  - `/hooks` - Custom React hooks
  - `/types` - TypeScript type definitions
  - `/__tests__` - Test files

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
