export type Protocol = {
  id: string
  name: string
  logoUrl: string
  description: string
  website: string
  apy: number // Annual percentage yield in %
  apyExplanation?: string // Explanation of how the APY is calculated
  tvl: number // Total value locked in USD
  safetyScore: number // 0-100
  easeOfUseScore: number // 0-100
  audits: number // Number of audits
  liquidity: number // USD value of liquid assets
  unbondingPeriod: number // Days
  vcBacking: string[] // Venture capital firms
  risk?: string // Risk level (low, medium, high)
  communityLinks?: {
    twitter?: string
    discord?: string
    github?: string
    telegram?: string
    forum?: string
    blog?: string
    custom?: string[]
  }
  metadata?: {
    chains: string[] // Supported blockchains
    launchDate: string // ISO date
    token: string // Native token symbol
    governance: string // Governance model
    realTimeData: boolean // Supports real-time updates
  }
  apiSources?: {
    tvlAndApy?: string // API for TVL and APY
    tokenData?: string // API for token info
    onChainData?: string // Subgraph or blockchain API
  }
  newsAndDataSources?: {
    news: string[] // News outlets
    realTime?: string // Real-time data source
    audits?: string // Audit report source
  }
  auditDetails?: {
    firm: string
    date: string
    url?: string
  }[]
  riskAssessment?: {
    [key: string]: any; // Using any type for flexibility
    smartContractRisk?: number;
    smartContractRiskDescription?: string;
    impermanentLoss?: number;
    impermanentLossDescription?: string;
    marketRisk?: number;
    marketRiskDescription?: string;
    liquidationRisk?: number;
    liquidationRiskDescription?: string;
    tokenomicDesignRisk?: number;
    tokenomicDesignRiskDescription?: string;
    safetyScore?: number;
  }
  type?: string; // Protocol type (e.g., 'Lending Platform', 'DEX', etc.)
}
