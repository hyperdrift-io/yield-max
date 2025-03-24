import { useQuery } from '@tanstack/react-query'
import { useState, useMemo, useEffect } from 'react'
import { getProtocols } from '../api/protocols'
import React from 'react'

export type FilterState = {
  minApy: number
  maxUnbondingPeriod: number
  minSafetyScore: number
  chains: string[]
}

export type SortField = 'apy' | 'tvl' | 'safetyScore' | 'easeOfUseScore' | 'unbondingPeriod' | 'audits' | 'liquidity' | 'chains'
export type SortOrder = 'asc' | 'desc'

export type SortConfig = {
  field: SortField
  order: SortOrder
}

export function useProtocolsStore(initialFilters?: Partial<FilterState>) {
  // Initialize state with defaults or provided values
  const [filters, setFilters] = useState<FilterState>({
    minApy: initialFilters?.minApy ?? 0,
    maxUnbondingPeriod: initialFilters?.maxUnbondingPeriod ?? 100,
    minSafetyScore: initialFilters?.minSafetyScore ?? 0,
    chains: initialFilters?.chains ?? []
  })

  // Update filters when initialFilters change - using a ref to prevent infinite loops
  const prevInitialFiltersRef = React.useRef(initialFilters);

  useEffect(() => {
    // Deep comparison function for filter objects
    const haveFiltersChanged = () => {
      const prev = prevInitialFiltersRef.current;

      // If both are undefined or null, no change
      if (!prev && !initialFilters) return false;

      // If one is undefined/null but not the other, they've changed
      if (!prev || !initialFilters) return true;

      // Check each property that might exist
      return (
        (initialFilters.minApy !== undefined && prev.minApy !== initialFilters.minApy) ||
        (initialFilters.maxUnbondingPeriod !== undefined && prev.maxUnbondingPeriod !== initialFilters.maxUnbondingPeriod) ||
        (initialFilters.minSafetyScore !== undefined && prev.minSafetyScore !== initialFilters.minSafetyScore) ||
        (initialFilters.chains !== undefined &&
         (prev.chains !== initialFilters.chains ||
          !prev.chains?.every((chain, i) => initialFilters.chains?.[i] === chain) ||
          prev.chains?.length !== initialFilters.chains?.length))
      );
    };

    if (initialFilters && haveFiltersChanged()) {
      setFilters(prevFilters => ({
        ...prevFilters,
        ...initialFilters
      }));

      // Update ref to current value
      prevInitialFiltersRef.current = initialFilters;
    }
  }, [initialFilters]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'apy',
    order: 'desc'
  })

  // Fetch protocols data with React Query
  const { data: protocols = [], isLoading, error, refetch } = useQuery({
    queryKey: ['protocols'],
    queryFn: getProtocols,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Apply filters and sorting
  const processedProtocols = useMemo(() => {
    // First apply filters
    let result = protocols.filter(protocol => {
      if (filters.minApy !== undefined && protocol.apy < filters.minApy) {
        return false
      }
      if (filters.maxUnbondingPeriod !== undefined && protocol.unbondingPeriod > filters.maxUnbondingPeriod) {
        return false
      }
      if (filters.minSafetyScore !== undefined && protocol.safetyScore < filters.minSafetyScore) {
        return false
      }
      if (filters.chains && filters.chains.length > 0) {
        const protocolChains = protocol.metadata?.chains || []
        return filters.chains.some(chain =>
          protocolChains.includes(chain) ||
          (chain === 'BSC' && protocolChains.includes('Binance Smart Chain'))
        )
      }
      return true
    })

    // Then apply sorting
    result = [...result].sort((a, b) => {
      const aValue = a[sortConfig.field]
      const bValue = b[sortConfig.field]

      // Handle special cases
      if (sortConfig.field === 'unbondingPeriod') {
        return sortConfig.order === 'desc'
          ? bValue - aValue  // Higher unbonding period first
          : aValue - bValue  // Lower unbonding period first
      }

      if (sortConfig.field === 'chains') {
        const aChainsCount = a.metadata?.chains?.length || 0
        const bChainsCount = b.metadata?.chains?.length || 0
        return sortConfig.order === 'desc'
          ? bChainsCount - aChainsCount
          : aChainsCount - bChainsCount
      }

      // For APY and other numeric fields
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.order === 'desc'
          ? bValue - aValue  // Higher values first
          : aValue - bValue  // Lower values first
      }

      // Fallback for non-numeric fields
      return 0
    })

    return result
  }, [protocols, filters, sortConfig])

  // Get all available chains from protocols
  const availableChains = useMemo(() => {
    const chainSet = new Set<string>()
    protocols.forEach(protocol => {
      const chains = protocol.metadata?.chains || []
      chains.forEach(chain => chainSet.add(chain))
    })
    return Array.from(chainSet).sort()
  }, [protocols])

  // Handle sorting toggle
  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      order: prevConfig.field === field && prevConfig.order === 'desc' ? 'asc' : 'desc'
    }))
  }

  // Reset filters to initial state
  const resetFilters = () => {
    setFilters({
      minApy: 0,
      maxUnbondingPeriod: 100,
      minSafetyScore: 0,
      chains: []
    })
  }

  // Update a single filter
  const updateFilter = (name: keyof FilterState, value: number | string[]) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Toggle a chain in the chains filter array
  const toggleChainFilter = (chain: string) => {
    setFilters(prev => {
      const currentChains = prev.chains || []
      return {
        ...prev,
        chains: currentChains.includes(chain)
          ? currentChains.filter(c => c !== chain)
          : [...currentChains, chain]
      }
    })
  }

  return {
    protocols: processedProtocols,
    allProtocols: protocols,
    isLoading,
    error,
    filters,
    updateFilter,
    resetFilters,
    sortConfig,
    handleSort,
    refetch,
    availableChains,
    toggleChainFilter
  }
}
