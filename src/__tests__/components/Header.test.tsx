import { describe, test, expect, beforeEach, mock } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';

// Mock the useThemeDetection hook
const mockUseThemeDetection = mock(() => false); // default to light theme
mock.module('../../hooks/useThemeDetection', () => ({
  useThemeDetection: mockUseThemeDetection
}));

describe('Header Component', () => {
  let scrollCallback: ((ev: Event) => void) | null = null;

  beforeEach(() => {
    // Reset the scroll position and any mocks before each test
    window.scrollY = 0;
    // Mock window event listeners manually
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject) {
      if (type === 'scroll' && typeof listener === 'function') {
        scrollCallback = listener as (ev: Event) => void;
      }
      originalAddEventListener.call(window, type, listener);
    };
    window.removeEventListener = function() {
      scrollCallback = null;
    };
  });

  test.skip('renders the header with logo and navigation', () => {
    render(<Header />);

    // Check if logo is visible
    expect(screen.getByAltText('YM Logo')).toBeDefined();

    // Check if navigation links are present
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Compare')).toBeDefined();
    expect(screen.getByText('Simulator')).toBeDefined();
    expect(screen.getByText('Beginner Guide')).toBeDefined();
    expect(screen.getByText('Risks')).toBeDefined();
    expect(screen.getByText('FAQ')).toBeDefined();

    // Check if connect wallet button is present
    expect(screen.getByText('Connect Wallet')).toBeDefined();
  });

  test.skip('toggles mobile menu when menu button is clicked', () => {
    render(<Header />);

    // Find the mobile menu button
    const menuButton = screen.getByLabelText('Toggle menu');

    // Check that menu is initially closed
    const nav = document.querySelector('nav');
    expect(nav?.classList.contains('mobileMenuOpen')).toBeFalsy();

    // Click the button to open the menu
    fireEvent.click(menuButton);

    // Check that menu is now open
    expect(nav?.classList.contains('mobileMenuOpen')).toBeTruthy();

    // Click again to close
    fireEvent.click(menuButton);

    // Check that menu is closed again
    expect(nav?.classList.contains('mobileMenuOpen')).toBeFalsy();
  });

  test.skip('adds scroll class when window is scrolled', () => {
    render(<Header />);

    // Get the header element
    const header = document.querySelector('header');

    // Check initial state (no scroll)
    expect(header?.classList.contains('scrolled')).toBeFalsy();

    // Simulate scroll
    window.scrollY = 20;
    if (scrollCallback) {
      scrollCallback(new Event('scroll'));
    }

    // Check that scrolled class is added
    expect(header?.classList.contains('scrolled')).toBeTruthy();
  });

  test.skip('cleans up event listeners on unmount', () => {
    const { unmount } = render(<Header />);

    // Unmount component
    unmount();

    // Check that event listener was removed (callback should be null)
    expect(scrollCallback).toBeNull();
  });
});
