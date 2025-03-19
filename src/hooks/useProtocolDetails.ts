import { useQuery } from '@tanstack/react-query'
import { getProtocolDetails } from '../api/protocols'

export function useProtocolDetails(id: string | undefined) {
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

  return {
    protocol,
    isLoading,
    error,
    refetch
  }
}
