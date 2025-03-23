import { Protocol } from '../../types/protocol';

// Mock protocols that match the actual data structure in the project
export const mockProtocols: Protocol[] = [
  {
    id: 'uniswap',
    name: 'Uniswap',
    apy: 8.2,
    tvl: 1200000000,
    safetyScore: 92,
    easeOfUseScore: 85,
    unbondingPeriod: 0,
    audits: 4,
    liquidity: 1100000000,
    metadata: {
      chains: ['Ethereum', 'Polygon', 'Arbitrum'],
      token: 'UNI',
      description: 'The largest decentralized exchange with automated market making.',
      website: 'https://uniswap.org',
      twitter: 'https://twitter.com/uniswap',
      github: 'https://github.com/Uniswap',
    },
    logoUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=040',
    apiSources: {
      poolData: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      tokenData: 'https://api.coingecko.com/api/v3/coins/uniswap',
      tvlAndApy: 'https://api.llama.fi/protocols',
    },
    auditDetails: [
      {
        firm: 'OpenZeppelin',
        date: '2020-03',
        url: 'https://blog.openzeppelin.com/uniswap-v2-audit/',
      },
    ],
    engagement: {
      twitter: 300000,
      discord: 80000,
      github: 1200,
    },
    newsAndDataSources: {
      audits: 'https://docs.uniswap.org/protocol/concepts/governance/security',
      news: ['CoinDesk', 'The Block'],
      realTime: 'https://info.uniswap.org/',
    },
    vcBacking: ['a16z', 'Paradigm'],
    description: 'The largest decentralized exchange with automated market making.',
  },
  {
    id: 'sushiswap',
    name: 'SushiSwap',
    apy: 6,
    tvl: 2000000000,
    safetyScore: 85,
    easeOfUseScore: 80,
    unbondingPeriod: 0,
    audits: 3,
    liquidity: 1800000000,
    metadata: {
      chains: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'],
      token: 'SUSHI',
      governance: 'SUSHI Governance',
      launchDate: '2020-08-28',
      realTimeData: true,
    },
    logoUrl: 'https://imgs.search.brave.com/gu-oPak84vFkA5bce-jY8So7Zf55tC4kXbFpcJkiVHA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dvdHlwLnVzL2ZpbGUvc3VzaGlzd2FwLnN2Zw',
    apiSources: {
      poolData: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
      tokenData: 'https://api.coingecko.com/api/v3/coins/sushi',
      tvlAndApy: 'https://api.llama.fi/protocols',
    },
    auditDetails: [
      {
        firm: 'Quantstamp',
        date: '2020-09',
        url: 'https://docs.sushi.com/security/audits',
      },
    ],
    engagement: {
      twitter: 120000,
      discord: 40000,
      github: 800,
    },
    newsAndDataSources: {
      audits: 'https://docs.sushi.com/security/audits',
      news: ['Decrypt', 'CoinTelegraph'],
      realTime: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    },
    vcBacking: ['Digital Currency Group', 'Alameda Research'],
    description: 'A DEX forked from Uniswap, expanding into yield farming, staking, and lending via its ecosystem.',
  },
  {
    id: 'alpaca-finance',
    name: 'Alpaca Finance',
    apy: 20,
    tvl: 500000000,
    safetyScore: 80,
    easeOfUseScore: 75,
    unbondingPeriod: 0,
    audits: 2,
    liquidity: 400000000,
    metadata: {
      chains: ['BSC', 'Fantom'],
      token: 'ALPACA',
      governance: 'ALPACA Governance',
      launchDate: '2021-02-15',
      realTimeData: true,
    },
    logoUrl: 'https://www.alpacafinance.org/static/alpaca-logo-f7fcf612582ebf134e0d118b5d62670f.svg',
    apiSources: {
      poolData: 'https://api.thegraph.com/subgraphs/name/alpacafinance/alpaca-finance',
      tokenData: 'https://api.coingecko.com/api/v3/coins/alpaca-finance',
      tvlAndApy: 'https://api.llama.fi/protocols',
    },
    auditDetails: [
      {
        firm: 'CertiK',
        date: '2021-02',
        url: 'https://docs.alpacafinance.org/security',
      },
    ],
    engagement: {
      twitter: 60000,
      discord: 20000,
      github: 300,
    },
    newsAndDataSources: {
      audits: 'https://docs.alpacafinance.org/security',
      news: ['CoinTelegraph', 'The Defiant'],
      realTime: 'https://api.llama.fi/protocols',
    },
    vcBacking: ['Spartan Group', 'Multicoin Capital'],
    description: 'A leveraged yield farming protocol on BSC and other chains.',
  }
];

export const mockFilterState = {
  minApy: 0,
  maxUnbondingPeriod: 100,
  minSafetyScore: 0,
  chains: []
};

export const mockSortConfig = {
  field: 'apy' as const,
  order: 'desc' as const
};

export const mockSimulationParams = {
  protocolId: 'alpaca-finance',
  amount: 1000,
  duration: 365
};

export const mockSimulationResult = {
  initialAmount: 1000,
  finalAmount: 1200,
  yield: 200,
  yieldPercentage: 20,
  dailyYield: 0.548,
  effectiveApy: 19.2,
  totalDaysLocked: 365
};
