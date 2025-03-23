import { useQuery } from '@tanstack/react-query'
import { getProtocolDetails } from '../api/protocols'
import protocolsRawData from '../data/yieldmax_23_03_2025.json'

export function useProtocolDetails(id: string | undefined) {
  // Fetch the processed protocol data
  const {
    data: protocol,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['protocol', id],
    queryFn: () => getProtocolDetails(id as string),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Get the original protocol data with full risk assessment
  const rawData = id ? protocolsRawData.find(p => p.id === id) : undefined

  return {
    protocol,
    rawData,
    isLoading,
    error,
    refetch
  }
}
