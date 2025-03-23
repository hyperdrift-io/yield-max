// Mock React Router DOM
// This allows us to test components that use routing without errors
import { vi } from 'bun:test';
import React from 'react';

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Routes: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Route: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Outlet: () => React.createElement('div', null, 'Outlet'),
  Link: ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) =>
    React.createElement('a', { href: to, className }, children),
  useParams: () => ({ id: 'test-protocol-id' }),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
}));

// Mock Helmet for SEO
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  HelmetProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
}));

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  QueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
    getQueryData: vi.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  useQuery: vi.fn(),
}));

// Make React available within our tests
global.React = React;
