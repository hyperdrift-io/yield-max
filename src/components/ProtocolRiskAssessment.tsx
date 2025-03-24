import styles from './ProtocolRiskAssessment.module.css';
import { protocolTypeMap, protocolTypes } from '../data/protocolTypeMapping';

type RiskData = {
  score: number;
  description: string;
};

type RiskAssessment = {
  safetyScore: number;
  smartContractRisk?: RiskData;
  impermanentLoss?: RiskData;
  marketRisk?: RiskData;
  liquidationRisk?: RiskData;
  tokenomicDesignRisk?: RiskData;
};

type Protocol = {
  id: string;
  name: string;
  riskAssessment?: RiskAssessment;
  safetyScore: number;
  tvl: number;
  audits: number;
  metadata?: {
    chains: string[];
  };
};

type ProtocolRiskAssessmentProps = {
  protocol: Protocol;
};

export default function ProtocolRiskAssessment({ protocol }: ProtocolRiskAssessmentProps) {
  const protocolType = protocolTypeMap[protocol.id];
  const typeDetails = protocolTypes.find(type => type.name === protocolType);

    return (
    <div className={styles.riskAssessment}>
      <h2 className={styles.title}>Risk Assessment</h2>

      {/* Overall Safety Score */}
      <div className={styles.scoreSection}>
        <h3>Overall Safety Score: {protocol.safetyScore}/100</h3>
        <div className={styles.scoreBar}>
          <div
            className={styles.scoreFill}
            style={{
              width: `${protocol.safetyScore}%`,
              backgroundColor: getScoreColor(protocol.safetyScore)
            }}
          />
        </div>
      </div>

      {/* Protocol Type Risks */}
      {typeDetails && (
        <div className={styles.typeSection}>
          <h3>Protocol Type: {typeDetails.name}</h3>
          <div className={styles.riskLevel}>
            Risk Level: <span className={styles.highlight}>{typeDetails.riskLevel}</span>
          </div>

          <div className={styles.riskFactors}>
            <h4>Risk Factors:</h4>
            <ul>
              {typeDetails.risks.map((risk, index) => (
                <li key={index} className={styles.riskFactor}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Security Metrics */}
      <div className={styles.securityMetrics}>
        <h3>Security Metrics</h3>
        <div className={styles.metricsGrid}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Audits</span>
            <span className={styles.metricValue}>{protocol.audits}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>TVL</span>
            <span className={styles.metricValue}>${formatTVL(protocol.tvl)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Chains</span>
            <span className={styles.metricValue}>{protocol.metadata?.chains?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Detailed Risk Assessment */}
      {protocol.riskAssessment && (
        <div className={styles.detailedRisks}>
          <h3>Detailed Risk Analysis</h3>

          {protocol.riskAssessment.smartContractRisk && (
            <RiskFactor
              title="Smart Contract Risk"
              data={protocol.riskAssessment.smartContractRisk}
            />
          )}

          {protocol.riskAssessment.impermanentLoss && (
            <RiskFactor
              title="Impermanent Loss Risk"
              data={protocol.riskAssessment.impermanentLoss}
            />
          )}

          {protocol.riskAssessment.marketRisk && (
            <RiskFactor
              title="Market Risk"
              data={protocol.riskAssessment.marketRisk}
            />
          )}

          {protocol.riskAssessment.liquidationRisk && (
            <RiskFactor
              title="Liquidation Risk"
              data={protocol.riskAssessment.liquidationRisk}
            />
          )}

          {protocol.riskAssessment.tokenomicDesignRisk && (
            <RiskFactor
              title="Tokenomic Design Risk"
              data={protocol.riskAssessment.tokenomicDesignRisk}
            />
          )}
        </div>
      )}
    </div>
  );
}

function RiskFactor({ title, data }: { title: string, data: RiskData }) {
          return (
    <div className={styles.riskFactor}>
      <h4>{title}</h4>
                <div className={styles.riskScore}>
                  <div className={styles.scoreBar}>
                    <div
            className={styles.scoreFill}
                      style={{
              width: `${data.score}%`,
              backgroundColor: getScoreColor(data.score)
                      }}
          />
                  </div>
        <span className={styles.scoreValue}>{data.score}/100</span>
      </div>
      <p className={styles.riskDescription}>{data.description}</p>
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-success)';
  if (score >= 60) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function formatTVL(tvl: number): string {
  if (tvl >= 1e9) return `${(tvl / 1e9).toFixed(2)}B`;
  if (tvl >= 1e6) return `${(tvl / 1e6).toFixed(2)}M`;
  return tvl.toLocaleString();
}
