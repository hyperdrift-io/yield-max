import { useQuery } from '@tanstack/react-query'
import { useState, useMemo, useEffect } from 'react'
import { getProtocols } from '../api/protocols'

export type FilterState = {
  minApy: number
  maxUnbondingPeriod: number
  minSafetyScore: number
}

export type SortField = 'apy' | 'tvl' | 'safetyScore' | 'easeOfUseScore' | 'unbondingPeriod' | 'audits' | 'liquidity'
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
    minSafetyScore: initialFilters?.minSafetyScore ?? 0
  })

  // Update filters when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setFilters(prevFilters => ({
        ...prevFilters,
        ...initialFilters
      }))
    }
  }, [initialFilters])

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
      return true
    })

    // Then apply sorting
    result = [...result].sort((a, b) => {
      // Handle special case for unbonding period (lower is better)
      if (sortConfig.field === 'unbondingPeriod') {
        return sortConfig.order === 'desc'
          ? a[sortConfig.field] - b[sortConfig.field]
          : b[sortConfig.field] - a[sortConfig.field]
      }

      // Regular sorting (higher is better for most metrics)
      return sortConfig.order === 'desc'
        ? b[sortConfig.field] - a[sortConfig.field]
        : a[sortConfig.field] - b[sortConfig.field]
    })

    return result
  }, [protocols, filters, sortConfig])

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
      minSafetyScore: 0
    })
  }

  // Update a single filter
  const updateFilter = (name: keyof FilterState, value: number) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
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
    refetch
  }
}
