/**
 * This file maps protocols from yield_data.jsonc to protocol types
 * for use in the CompareRisks page.
 */

interface ProtocolType {
  name: string;
  examples: string;
  riskLevel: string;
  safetyScore: string;
  benefits: string[];
  risks: string[];
  bestFor: string;
}

// Map protocol IDs to their types
export const protocolTypeMap: Record<string, string> = {
  // Lending platforms
  'aave': 'Lending Platforms',
  'makerdao': 'Lending Platforms',
  'frax-finance': 'Lending Platforms',

  // DEXes and Liquidity Pools
  'uniswap': 'Liquidity Pools (DEXs)',
  'sushiswap': 'Liquidity Pools (DEXs)',
  'pancakeswap': 'Liquidity Pools (DEXs)',
  'curve-finance': 'Liquidity Pools (DEXs)',
  'balancer': 'Liquidity Pools (DEXs)',

  // Yield Aggregators
  'yearn-finance': 'Yield Aggregators',
  'convex-finance': 'Yield Aggregators',
  'aura-finance': 'Yield Aggregators',
  'beefy-finance': 'Yield Aggregators',
  'harvest-finance': 'Yield Aggregators',
  'stake-dao': 'Yield Aggregators',

  // Staking Services
  'lido-finance': 'Staking Services',
  'eigenlayer': 'Staking Services',
  'jito': 'Staking Services',

  // Leveraged Yield
  'alpaca-finance': 'Leveraged Yield',
  'pendle': 'Yield Tokenization'
};

// Define protocol types with their properties
export const protocolTypes: ProtocolType[] = [
  {
    name: 'Lending Platforms',
    examples: 'Aave, MakerDAO, Frax Finance',
    riskLevel: 'Low to Medium',
    safetyScore: '7-9',
    benefits: [
      'Relatively stable yields',
      'Clear revenue model from borrower interest',
      'Usually well-audited',
      'Typically no impermanent loss'
    ],
    risks: [
      'Smart contract risk',
      'Liquidation risk when borrowing',
      'Interest rate volatility',
      'Potential governance attacks'
    ],
    bestFor: 'Conservative yield seekers looking for steady returns with manageable risk'
  },
  {
    name: 'Liquidity Pools (DEXs)',
    examples: 'Uniswap, Curve, Balancer, SushiSwap, PancakeSwap',
    riskLevel: 'Medium',
    safetyScore: '6-8',
    benefits: [
      'Trading fee income',
      'Potential for additional reward tokens',
      'High liquidity for major assets',
      'Transparency in operation'
    ],
    risks: [
      'Impermanent loss',
      'Smart contract risk',
      'Market volatility exposure',
      'Competition leading to yield reduction'
    ],
    bestFor: 'Traders willing to accept some volatility for potentially higher returns'
  },
  {
    name: 'Yield Aggregators',
    examples: 'Yearn Finance, Convex, Aura, Beefy, Harvest',
    riskLevel: 'Medium to High',
    safetyScore: '5-7',
    benefits: [
      'Automated yield optimization',
      'Professional management',
      'Gas efficiency through batching',
      'Diversification across strategies'
    ],
    risks: [
      'Strategy risk (complex composition)',
      'Smart contract risk across multiple protocols',
      'Higher management fees',
      'Potential oracle attacks'
    ],
    bestFor: 'Users seeking maximized returns who understand the complexities of yield strategies'
  },
  {
    name: 'Staking Services',
    examples: 'Lido Finance, EigenLayer, Jito',
    riskLevel: 'Low to Medium',
    safetyScore: '7-8',
    benefits: [
      'Straightforward passive income',
      'No impermanent loss',
      'Often backed by network security',
      'Liquid staking options available'
    ],
    risks: [
      'Protocol risks for liquid staking',
      'Validator performance risk',
      'Slashing penalties',
      'Network governance changes'
    ],
    bestFor: 'Long-term investors looking for sustainable passive income from network participation'
  },
  {
    name: 'Leveraged Yield',
    examples: 'Alpaca Finance',
    riskLevel: 'High',
    safetyScore: '4-6',
    benefits: [
      'Potential for multiplied returns',
      'Capital efficiency',
      'Maximized yield potential',
      'Market movement amplification'
    ],
    risks: [
      'Liquidation risk (high)',
      'Interest rate fluctuation',
      'Market volatility magnification',
      'Complex position management'
    ],
    bestFor: 'Advanced users comfortable with higher risk for amplified returns'
  },
  {
    name: 'Yield Tokenization',
    examples: 'Pendle',
    riskLevel: 'Medium to High',
    safetyScore: '5-7',
    benefits: [
      'Flexibility in yield trading',
      'Time-tailored strategies',
      'Separation of principal and yield',
      'Yield curve speculation'
    ],
    risks: [
      'Complex tokenomics',
      'Smart contract risks',
      'Market efficiency challenges',
      'Price discovery complexity'
    ],
    bestFor: 'Sophisticated users seeking yield management flexibility and time-based strategies'
  }
];
