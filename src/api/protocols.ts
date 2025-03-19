import axios from 'axios'

export type Protocol = {
  id: string
  name: string
  logoUrl: string
  apy: number
  tvl: number
  website: string
  token: string
  unbondingPeriod: number
  risk: 'low' | 'medium' | 'high'
  description: string
  safetyScore: number
  easeOfUseScore: number
}

// Mock data for development
const mockProtocols: Protocol[] = [
  {
    id: 'osmosis',
    name: 'Osmosis',
    logoUrl: 'https://assets.coingecko.com/coins/images/16724/small/osmo.png',
    apy: 69.42,
    tvl: 243500000,
    website: 'https://osmosis.zone',
    token: 'OSMO',
    unbondingPeriod: 14,
    risk: 'medium',
    description: 'Osmosis is an automated market maker (AMM) protocol built for liquidity providers.',
    safetyScore: 8,
    easeOfUseScore: 9
  },
  {
    id: 'juno',
    name: 'Juno',
    logoUrl: 'https://assets.coingecko.com/coins/images/19249/small/juno.png',
    apy: 52.18,
    tvl: 95600000,
    website: 'https://junonetwork.io',
    token: 'JUNO',
    unbondingPeriod: 28,
    risk: 'medium',
    description: 'Juno is a sovereign public blockchain in the Cosmos ecosystem.',
    safetyScore: 7,
    easeOfUseScore: 8
  },
  {
    id: 'kava',
    name: 'Kava',
    logoUrl: 'https://assets.coingecko.com/coins/images/9761/small/kava.png',
    apy: 23.65,
    tvl: 375800000,
    website: 'https://www.kava.io',
    token: 'KAVA',
    unbondingPeriod: 21,
    risk: 'medium',
    description: 'Kava is a layer-1 blockchain featuring a developer-optimized co-chain architecture.',
    safetyScore: 7,
    easeOfUseScore: 8
  },
  {
    id: 'cosmos',
    name: 'Cosmos Hub',
    logoUrl: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png',
    apy: 19.25,
    tvl: 1250000000,
    website: 'https://cosmos.network',
    token: 'ATOM',
    unbondingPeriod: 21,
    risk: 'low',
    description: 'Cosmos Hub is the first of thousands of interconnected blockchains that will comprise the Cosmos Network.',
    safetyScore: 9,
    easeOfUseScore: 10
  },
  {
    id: 'akash',
    name: 'Akash',
    logoUrl: 'https://assets.coingecko.com/coins/images/12785/small/akash-logo.png',
    apy: 17.35,
    tvl: 45200000,
    website: 'https://akash.network',
    token: 'AKT',
    unbondingPeriod: 21,
    risk: 'medium',
    description: 'Akash Network is a distributed peer-to-peer marketplace for cloud compute.',
    safetyScore: 7,
    easeOfUseScore: 8
  },
  {
    id: 'stargaze',
    name: 'Stargaze',
    logoUrl: 'https://assets.coingecko.com/coins/images/24186/small/Stargaze_Logomark_White.png',
    apy: 88.75,
    tvl: 23800000,
    website: 'https://stargaze.zone',
    token: 'STARS',
    unbondingPeriod: 14,
    risk: 'high',
    description: 'Stargaze is a permissionless and sovereign NFT marketplace built on the Cosmos blockchain.',
    safetyScore: 6,
    easeOfUseScore: 7
  },
  {
    id: 'secret',
    name: 'Secret Network',
    logoUrl: 'https://assets.coingecko.com/coins/images/11871/small/Secret.png',
    apy: 26.40,
    tvl: 180600000,
    website: 'https://scrt.network',
    token: 'SCRT',
    unbondingPeriod: 21,
    risk: 'medium',
    description: 'Secret Network is the first blockchain with data privacy by default, allowing you to build and use applications that are both permissionless and privacy-preserving.',
    safetyScore: 8,
    easeOfUseScore: 9
  },
  {
    id: 'evmos',
    name: 'Evmos',
    logoUrl: 'https://assets.coingecko.com/coins/images/24023/small/evmos.png',
    apy: 93.15,
    tvl: 67500000,
    website: 'https://evmos.org',
    token: 'EVMOS',
    unbondingPeriod: 14,
    risk: 'high',
    description: 'Evmos is an EVM-compatible blockchain built on the Cosmos SDK.',
    safetyScore: 6,
    easeOfUseScore: 7
  }
]

// Get a list of all protocols
export const getProtocols = async (): Promise<Protocol[]> => {
  // In a real app, you would fetch this from an API
  // return (await axios.get<Protocol[]>('/api/protocols')).data

  // Using mock data for development
  return Promise.resolve(mockProtocols)
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
    p.token.toLowerCase().includes(query.toLowerCase())
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
export const sortProtocols = (protocols: Protocol[], field: keyof Protocol, ascending: boolean = true): Protocol[] => {
  return [...protocols].sort((a, b) => {
    if (ascending) {
      return a[field] > b[field] ? 1 : -1
    } else {
      return a[field] < b[field] ? 1 : -1
    }
  })
}
