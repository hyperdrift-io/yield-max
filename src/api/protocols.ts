import { Protocol } from '../types/protocol'
import protocolsRawData from '../data/yield_data.json'

// Helper function to get a proper logo URL with fallbacks
function getLogoUrl(protocol: any): string {
  // First try the protocol's logoUrl if it exists
  if (protocol.logoUrl && typeof protocol.logoUrl === 'string') {
    return protocol.logoUrl;
  }

  // Then try to construct a URL based on protocol ID
  if (protocol.id) {
    // Try common paths that might work
    return `/logos/${protocol.id.toLowerCase()}.png`;
  }

  // Fallback to a generic placeholder
  return '/logos/placeholder.png';
}

// Convert the raw data to match our Protocol type
const mockProtocols: Protocol[] = protocolsRawData.map(p => ({
  id: p.id,
  name: p.name,
  logoUrl: getLogoUrl(p),
  description: p.description,
  website: p.website,
  apy: typeof p.apy === 'object' ? p.apy.value : p.apy,
  apyExplanation: typeof p.apy === 'object' ? p.apy.explanation : undefined,
  tvl: p.tvl,
  // Extract safetyScore from riskAssessment if it exists, otherwise use a default
  safetyScore: p.riskAssessment?.safetyScore || 50,
  // Use easeOfUseScore if it exists
  easeOfUseScore: p.easeOfUseScore || 70,
  // Default values for missing fields
  audits: p.riskAssessment?.smartContractRisk?.score || 0,
  liquidity: p.liquidity || 0,
  unbondingPeriod: 0, // Default to 0 if not specified
  vcBacking: p.vcBacking || [],
  // Map risk level from assessment scores
  risk: p.riskAssessment ?
    (p.riskAssessment.safetyScore >= 80 ? 'low' :
     p.riskAssessment.safetyScore >= 70 ? 'medium' : 'high') : 'medium',
  // Map community links
  communityLinks: p.communityLinks ? {
    twitter: p.communityLinks.twitter || undefined,
    discord: p.communityLinks.discord || undefined,
    github: p.communityLinks.github || undefined,
    telegram: p.communityLinks.telegram || undefined,
    forum: p.communityLinks.forum || undefined,
    blog: p.communityLinks.blog || undefined,
    custom: p.communityLinks.custom || undefined
  } : undefined,
  // Map metadata
  metadata: {
    chains: p.metadata?.chains || [],
    launchDate: p.metadata?.launchDate || '',
    token: p.metadata?.token || '',
    governance: p.metadata?.governance || '',
    realTimeData: true
  },
  // Map API sources
  apiSources: {
    tvlAndApy: p.tokenPages?.tvlAndApy || '',
    tokenData: p.tokenPages?.tokenData || '',
    onChainData: ''
  },
  // Map news and data sources
  newsAndDataSources: {
    news: p.infoSources?.news || [],
    realTime: '',
    audits: p.infoSources?.security || ''
  }
}))

// Get a list of all protocols
export const getProtocols = async (): Promise<Protocol[]> => {
  // In a real app, you would fetch this from an API
  // return (await axios.get<Protocol[]>('/api/protocols')).data

  // Using JSON data
  return Promise.resolve(mockProtocols)
}

// Get top yielding protocols
export const getTopYieldProtocols = async (limit: number = 10): Promise<Protocol[]> => {
  // Sort protocols by APY in descending order and return the top ones
  const sortedProtocols = [...mockProtocols].sort((a, b) => b.apy - a.apy).slice(0, limit)
  return Promise.resolve(sortedProtocols)
}

// Get details for a specific protocol by ID
export const getProtocolDetails = async (id: string): Promise<Protocol> => {
  // In a real app, you would fetch this from an API
  // return (await axios.get<Protocol>(`/api/protocols/${id}`)).data

  // Using mock data for development
  const protocol = mockProtocols.find(p => p.id === id)

  if (!protocol) {
    throw new Error(`Protocol with ID ${id} not found`)
  }

  return Promise.resolve(protocol)
}

// Search protocols by name
export const searchProtocols = async (query: string): Promise<Protocol[]> => {
  // In a real app, you would fetch this from an API
  // return (await axios.get<Protocol[]>(`/api/protocols/search?q=${query}`)).data

  // Using mock data for development
  const filtered = mockProtocols.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.metadata?.token.toLowerCase().includes(query.toLowerCase())
  )

  return Promise.resolve(filtered)
}

// Simulate yield for a protocol
export type SimulationParams = {
  protocolId: string
  amount: number
  duration: number // in days
}

export type SimulationResult = {
  initialAmount: number
  finalAmount: number
  yield: number
  yieldPercentage: number
  dailyYield: number
  effectiveApy: number
  totalDaysLocked: number
}

export const simulateYield = async (params: SimulationParams): Promise<SimulationResult> => {
  // In a real app, you would calculate this on the server
  // return (await axios.post<SimulationResult>('/api/simulate', params)).data

  // Using mock calculation for development
  const protocol = await getProtocolDetails(params.protocolId)

  // Calculate daily rate (APY / 365)
  const dailyRate = protocol.apy / 36500 // Divided by 100 for percentage and 365 for days

  // Calculate yield
  const finalAmount = params.amount * Math.pow(1 + dailyRate, params.duration)
  const yieldAmount = finalAmount - params.amount

  // Calculate unbonding period impact
  const totalDaysLocked = params.duration + protocol.unbondingPeriod
  const effectiveAPY = ((Math.pow(1 + dailyRate, params.duration) - 1) * 36500) / totalDaysLocked

  return Promise.resolve({
    initialAmount: params.amount,
    finalAmount,
    yield: yieldAmount,
    yieldPercentage: (yieldAmount / params.amount) * 100,
    dailyYield: yieldAmount / params.duration,
    effectiveApy: effectiveAPY,
    totalDaysLocked
  })
}

// Sort protocols by a specific field
export const sortProtocols = (protocols: Protocol[], field: keyof Protocol | string, ascending: boolean = true): Protocol[] => {
  return [...protocols].sort((a, b) => {
    // Handle special cases for nested properties
    if (typeof field === 'string' && field.includes('.')) {
      const [parent, child] = field.split('.') as [keyof Protocol, string]
      const aParent = a[parent]
      const bParent = b[parent]

      if (aParent && bParent && typeof aParent === 'object' && typeof bParent === 'object') {
        // Type assertion to access nested property
        const aValue = (aParent as Record<string, unknown>)[child]
        const bValue = (bParent as Record<string, unknown>)[child]

        if (aValue !== undefined && aValue !== null && bValue !== undefined && bValue !== null) {
          return ascending ?
            (aValue > bValue ? 1 : -1) :
            (aValue < bValue ? 1 : -1)
        }
      }
      return 0
    }

    const aValue = a[field as keyof Protocol]
    const bValue = b[field as keyof Protocol]

    if (aValue !== undefined && aValue !== null && bValue !== undefined && bValue !== null) {
      if (ascending) {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    }
    return 0
  })
}
