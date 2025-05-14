export interface ProtocolData {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  website: string;
  apy: {
    value: number;
    explanation: string;
  };
  tvl: number;
  easeOfUseScore: number;
  liquidity: number;
  vcBacking: string[];
  communityLinks: {
    twitter?: string;
    discord?: string;
    github?: string;
    telegram?: string;
    forum?: string;
    blog?: string;
    custom?: string | string[];
  };
  metadata: {
    chains: string[];
    launchDate: string;
    token: string;
    governance: string;
  };
  tokenPages: {
    tvlAndApy: string;
    tokenData: string;
  };
  infoSources: {
    news: string[];
    security: string;
  };
  riskAssessment: {
    smartContractRisk: {
      description: string;
      score: number;
    };
    impermanentLoss: {
      description: string;
      score: number;
    };
    marketRisk: {
      description: string;
      score: number;
    };
    liquidationRisk: {
      description: string;
      score: number;
    };
    tokenomicDesignRisk: {
      description: string;
      score: number;
    };
    safetyScore: number;
  };
}
