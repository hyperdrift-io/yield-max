export type Protocol = {
  id: string
  name: string
  logoUrl: string
  description: string
  website: string
  apy: number
  tvl: number
  safetyScore: number
  easeOfUseScore: number
  audits: number
  liquidity: number
  unbondingPeriod: number
  vcBacking: string[]
  engagement: {
    twitter: number
    discord: number
    github: number
  }
}
