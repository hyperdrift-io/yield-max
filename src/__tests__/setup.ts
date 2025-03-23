// Mock React Router DOM
// This allows us to test components that use routing without errors
import { vi } from 'bun:test';

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Outlet: () => <div>Outlet</div>,
  Link: ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) =>
    <a href={to} className={className}>{children}</a>,
  useParams: () => ({ id: 'test-protocol-id' }),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
}));

// Mock Helmet for SEO
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  QueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
    getQueryData: vi.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useQuery: vi.fn(),
}));

// Make React available within our tests
import React from 'react';
global.React = React;
