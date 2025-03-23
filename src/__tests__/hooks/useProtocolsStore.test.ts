import { expect, test, describe, mock, beforeEach } from 'bun:test';
import { renderHook, act } from '@testing-library/react-hooks';
import { useProtocolsStore } from '../../hooks/useProtocolsStore';
import * as reactQuery from '@tanstack/react-query';
import { mockProtocols, mockFilterState } from '../mocks/mockData';

// Mock the useQuery hook to return our mock data
mock.module('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: () => ({
      data: mockProtocols,
      isLoading: false,
      error: null,
      refetch: () => Promise.resolve({ data: mockProtocols })
    })
  };
});

describe('useProtocolsStore', () => {
  test('should return protocols', () => {
    const { result } = renderHook(() => useProtocolsStore());

    expect(result.current.allProtocols).toEqual(mockProtocols);
    expect(result.current.protocols).toEqual(mockProtocols);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should filter protocols by minApy', () => {
    const { result } = renderHook(() => useProtocolsStore());

    act(() => {
      result.current.updateFilter('minApy', 10);
    });

    // Only Alpaca Finance has APY >= 10
    expect(result.current.protocols.length).toBe(1);
    expect(result.current.protocols[0].id).toBe('alpaca-finance');
  });

  test('should filter protocols by maxUnbondingPeriod', () => {
    const { result } = renderHook(() => useProtocolsStore());

    // All protocols have unbondingPeriod 0, so set it to -1 to get none
    act(() => {
      result.current.updateFilter('maxUnbondingPeriod', -1);
    });

    // No protocols have unbondingPeriod < 0
    expect(result.current.protocols.length).toBe(0);
  });

  test('should filter protocols by minSafetyScore', () => {
    const { result } = renderHook(() => useProtocolsStore());

    act(() => {
      result.current.updateFilter('minSafetyScore', 90);
    });

    // Only Uniswap has safetyScore >= 90
    expect(result.current.protocols.length).toBe(1);
    expect(result.current.protocols[0].id).toBe('uniswap');
  });

  test('should filter protocols by chains', () => {
    const { result } = renderHook(() => useProtocolsStore());

    act(() => {
      result.current.updateFilter('chains', ['Ethereum']);
    });

    // Uniswap and SushiSwap have Ethereum chain
    expect(result.current.protocols.length).toBe(2);
    expect(result.current.protocols.map(p => p.id)).toContain('uniswap');
    expect(result.current.protocols.map(p => p.id)).toContain('sushiswap');
  });

  test('should toggle chain filter', () => {
    const { result } = renderHook(() => useProtocolsStore());

    // Add Ethereum to filters
    act(() => {
      result.current.toggleChainFilter('Ethereum');
    });

    expect(result.current.filters.chains).toContain('Ethereum');
    expect(result.current.protocols.length).toBe(2);

    // Remove Ethereum from filters
    act(() => {
      result.current.toggleChainFilter('Ethereum');
    });

    expect(result.current.filters.chains).not.toContain('Ethereum');
    expect(result.current.protocols.length).toBe(3);
  });

  test('should sort protocols', () => {
    const { result } = renderHook(() => useProtocolsStore());

    // Default sort is by APY desc
    expect(result.current.sortConfig.field).toBe('apy');
    expect(result.current.sortConfig.order).toBe('desc');
    expect(result.current.protocols[0].id).toBe('alpaca-finance'); // Highest APY

    // Change sort to safetyScore
    act(() => {
      result.current.handleSort('safetyScore');
    });

    expect(result.current.sortConfig.field).toBe('safetyScore');
    expect(result.current.sortConfig.order).toBe('desc');
    expect(result.current.protocols[0].id).toBe('uniswap'); // Highest safety score

    // Toggle sort order to ascending
    act(() => {
      result.current.handleSort('safetyScore');
    });

    expect(result.current.sortConfig.field).toBe('safetyScore');
    expect(result.current.sortConfig.order).toBe('asc');
    expect(result.current.protocols[0].id).toBe('alpaca-finance'); // Lowest safety score
  });

  test('should reset filters', () => {
    const { result } = renderHook(() => useProtocolsStore());

    // Apply some filters
    act(() => {
      result.current.updateFilter('minApy', 10);
      result.current.updateFilter('minSafetyScore', 85);
    });

    expect(result.current.protocols.length).toBe(1);

    // Reset filters
    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual(mockFilterState);
    expect(result.current.protocols.length).toBe(3);
  });

  test('should initialize with provided filters', () => {
    const initialFilters = {
      minApy: 7,
      chains: ['Ethereum']
    };

    const { result } = renderHook(() => useProtocolsStore(initialFilters));

    expect(result.current.filters.minApy).toBe(7);
    expect(result.current.filters.chains).toEqual(['Ethereum']);

    // Only Uniswap has Ethereum chain and APY >= 7
    expect(result.current.protocols.length).toBe(1);
    expect(result.current.protocols[0].id).toBe('uniswap');
  });
});
