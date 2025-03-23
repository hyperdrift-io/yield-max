import { expect, test, describe, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock all the necessary dependencies
mock.module('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }: { path: string, element: React.ReactNode }) =>
    <div data-testid={`route-${path}`}>{element}</div>,
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

mock.module('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet-provider">{children}</div>,
}));

mock.module('@tanstack/react-query', () => ({
  QueryClient: function() {
    return {
      setDefaultOptions: () => {},
    };
  },
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="query-client-provider">{children}</div>,
}));

// Mock the pages
mock.module('../pages/Home', () => () => <div data-testid="home-page">Home Page</div>);
mock.module('../pages/Protocol', () => () => <div data-testid="protocol-page">Protocol Page</div>);
mock.module('../pages/Compare', () => () => <div data-testid="compare-page">Compare Page</div>);
mock.module('../pages/Simulator', () => () => <div data-testid="simulator-page">Simulator Page</div>);
mock.module('../pages/FAQ', () => () => <div data-testid="faq-page">FAQ Page</div>);
mock.module('../pages/BeginnerGuide', () => () => <div data-testid="beginner-guide-page">Beginner Guide Page</div>);
mock.module('../pages/CompareRisks', () => () => <div data-testid="compare-risks-page">Compare Risks Page</div>);

// Mock layout
mock.module('../layouts/MainLayout', () => () => <div data-testid="main-layout">Main Layout</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);

    // Check that the main providers are rendered
    expect(screen.getByTestId('query-client-provider')).toBeDefined();
    expect(screen.getByTestId('helmet-provider')).toBeDefined();
    expect(screen.getByTestId('browser-router')).toBeDefined();
    expect(screen.getByTestId('routes')).toBeDefined();
  });

  test('contains all expected routes', () => {
    render(<App />);

    // Check that all routes are defined
    expect(screen.getByTestId('route-/')).toBeDefined();
    expect(screen.getByTestId('route-/protocol/:id')).toBeDefined();
    expect(screen.getByTestId('route-/compare')).toBeDefined();
    expect(screen.getByTestId('route-/simulator')).toBeDefined();
    expect(screen.getByTestId('route-/faq')).toBeDefined();
    expect(screen.getByTestId('route-/guide')).toBeDefined();
    expect(screen.getByTestId('route-/risks')).toBeDefined();
  });
});
