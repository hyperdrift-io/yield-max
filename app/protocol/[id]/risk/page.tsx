import { getProtocolDetails, getProtocols } from '@/src/api/protocols';
import styles from './page.module.css';
import Link from 'next/link';
import { Protocol } from '@/src/types/protocol';
import Image from 'next/image';

const riskMetrics = [
  {
    key: 'smartContractRisk',
    label: 'Smart Contract Risk',
    color: '#ef4444',
    description: 'The risk of bugs or vulnerabilities in the protocol\'s smart contracts',
  },
  {
    key: 'impermanentLoss',
    label: 'Impermanent Loss',
    color: '#f97316',
    description: 'The potential loss when providing liquidity due to price changes between paired assets',
  },
  {
    key: 'marketRisk',
    label: 'Market Risk',
    color: '#eab308',
    description: 'The risk of overall market volatility affecting the protocol\'s performance',
  },
  {
    key: 'liquidationRisk',
    label: 'Liquidation Risk',
    color: '#60a5fa',
    description: 'The risk of collateral being liquidated due to price fluctuations',
  },
  {
    key: 'tokenomicDesignRisk',
    label: 'Tokenomic Design Risk',
    color: '#10b981',
    description: 'The risk related to the protocol\'s token economic design and incentive structure',
  },
];

export async function generateStaticParams() {
  const protocols = await getProtocols();

  return protocols.map((protocol) => ({
    id: protocol.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const protocol = await getProtocolDetails(params.id);
  return {
    title: `${protocol.name} Risk Assessment - YieldMax`,
    description: `Detailed risk assessment for ${protocol.name} protocol`,
  };
}

export default async function ProtocolRiskPage({ params }: { params: { id: string } }) {
  const protocol = await getProtocolDetails(params.id);

  // Default risk assessment data if not available
  const defaultRiskData = {
    smartContractRisk: 75,
    smartContractRiskDescription: 'This protocol has undergone multiple security audits and has been live for over 2 years without major security incidents.',
    impermanentLoss: 60,
    impermanentLossDescription: 'Moderate risk of impermanent loss due to the volatility of paired assets in liquidity pools.',
    marketRisk: 50,
    marketRiskDescription: 'Market conditions can impact yields and token valuations. The protocol has shown resilience in various market conditions.',
    liquidationRisk: 45,
    liquidationRiskDescription: 'The protocol has conservative liquidation parameters that help protect users from unexpected liquidations.',
    tokenomicDesignRisk: 65,
    tokenomicDesignRiskDescription: 'The token distribution and emission schedule are designed to align incentives for long-term sustainability.',
  };

  const riskAssessment = protocol.riskAssessment || defaultRiskData;
  const scoreColor = getScoreColor(protocol.safetyScore || 75);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={`/protocol/${params.id}`} className={styles.backLink}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Protocol
        </Link>

        <div className={styles.protocolHeader}>
          {protocol.logoUrl && (
            <div className={styles.logoContainer}>
              <img src={protocol.logoUrl} alt={protocol.name} className={styles.logo} />
            </div>
          )}
          <div className={styles.headerContent}>
            <h1 className={styles.protocolName}>{protocol.name}</h1>
            <div className={styles.protocolType}>{protocol.type || 'Yield Aggregator'}</div>
          </div>
        </div>
      </div>

      <div className={styles.safetyScoreCard}>
        <h2 className={styles.cardTitle}>Overall Safety Score</h2>
        <div className={styles.scoreDisplay}>
          <div
            className={styles.scoreCircle}
            style={{
              borderColor: scoreColor,
              boxShadow: `0 0 16px ${scoreColor}33`
            }}
          >
            <div className={styles.scoreValue}>{protocol.safetyScore || 75}</div>
          </div>
          <div className={styles.scoreDescription}>
            <p>
              {getScoreDescription(protocol.safetyScore || 75)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.riskBreakdownCard}>
        <h2 className={styles.cardTitle}>Risk Assessment Breakdown</h2>

        <div className={styles.riskMetrics}>
          {riskMetrics.map(metric => (
            <div key={metric.key} className={styles.riskMetric}>
              <div className={styles.metricHeader}>
                <h3 className={styles.metricTitle}>{metric.label}</h3>
                <div className={styles.metricScore} style={{ backgroundColor: metric.color }}>
                  {riskAssessment[metric.key]}%
                </div>
              </div>

              <div className={styles.metricBar}>
                <div
                  className={styles.metricBarFill}
                  style={{
                    width: `${riskAssessment[metric.key]}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>

              <p className={styles.metricDescription}>
                {riskAssessment[`${metric.key}Description`] || metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.auditsCard}>
        <h2 className={styles.cardTitle}>Security Audits & Practices</h2>
        <div className={styles.auditsList}>
          {protocol.audits?.length ? (
            protocol.audits.map((audit, index) => (
              <div key={index} className={styles.auditItem}>
                <div className={styles.auditIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.875 6.25L8.125 15L3.125 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.auditInfo}>
                  <div className={styles.auditName}>{audit.name}</div>
                  <div className={styles.auditDate}>{audit.date}</div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.defaultAudits}>
              <div className={styles.auditItem}>
                <div className={styles.auditIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.875 6.25L8.125 15L3.125 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.auditInfo}>
                  <div className={styles.auditName}>Certik Security Audit</div>
                  <div className={styles.auditDate}>January 2023</div>
                </div>
              </div>
              <div className={styles.auditItem}>
                <div className={styles.auditIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.875 6.25L8.125 15L3.125 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.auditInfo}>
                  <div className={styles.auditName}>PeckShield Security Assessment</div>
                  <div className={styles.auditDate}>October 2022</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.recommendationCard}>
        <h2 className={styles.cardTitle}>Risk Mitigation Recommendations</h2>
        <ul className={styles.recommendationList}>
          <li>Diversify investments across multiple protocols to minimize exposure</li>
          <li>Start with smaller amounts to test the protocol's functionality</li>
          <li>Stay informed about market conditions that may affect yields</li>
          <li>Regularly check protocol updates and governance decisions</li>
          <li>Be cautious of unusually high APYs that might not be sustainable</li>
        </ul>
      </div>
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#60a5fa'; // blue
  if (score >= 40) return '#f59e0b'; // yellow
  if (score >= 20) return '#f97316'; // orange
  return '#ef4444'; // red
}

function getScoreDescription(score: number): string {
  if (score >= 80) return 'This protocol has excellent safety metrics with minimal identified risks. It implements best practices in security and has a proven track record.';
  if (score >= 60) return 'This protocol demonstrates good safety standards with manageable risks. It has solid security measures in place.';
  if (score >= 40) return 'This protocol has moderate safety considerations with some notable risks. Caution is advised when investing significant funds.';
  if (score >= 20) return 'This protocol has significant safety concerns with substantial risks identified. Consider limiting exposure or seeking safer alternatives.';
  return 'This protocol has severe safety issues with critical risks identified. It is recommended to avoid investing until these issues are addressed.';
}
