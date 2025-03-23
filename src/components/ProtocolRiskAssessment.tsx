import styles from './ProtocolRiskAssessment.module.css';

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
};

type ProtocolRiskAssessmentProps = {
  protocol: Protocol;
}

const ProtocolRiskAssessment = ({ protocol }: ProtocolRiskAssessmentProps) => {
  if (!protocol.riskAssessment) {
    return (
      <div className={styles.noDataContainer}>
        <p>Detailed risk assessment is not available for this protocol.</p>
      </div>
    );
  }

  const { riskAssessment } = protocol;

  // Risk categories from the data
  const riskCategories = [
    { key: 'smartContractRisk', name: 'Smart Contract Risk' },
    { key: 'impermanentLoss', name: 'Impermanent Loss Risk' },
    { key: 'marketRisk', name: 'Market Risk' },
    { key: 'liquidationRisk', name: 'Liquidation Risk' },
    { key: 'tokenomicDesignRisk', name: 'Tokenomic Design Risk' }
  ] as const;

  return (
    <div className={styles.riskAssessmentContainer}>
      <div className={styles.overallRisk}>
        <div className={styles.scoreCircle}>
          <div className={styles.scoreNumber}>{riskAssessment.safetyScore / 10}</div>
          <div className={styles.scoreMax}>/10</div>
        </div>
        <div className={styles.scoreLabel}>Overall Safety</div>
      </div>

      <div className={styles.riskCategories}>
        {riskCategories.map(category => {
          const categoryKey = category.key as keyof RiskAssessment;
          const riskData = riskAssessment[categoryKey];

          if (!riskData) return null;

          return (
            <div key={category.key} className={styles.riskCategory}>
              <div className={styles.riskHeader}>
                <h3 className={styles.riskTitle}>{category.name}</h3>
                <div className={styles.riskScore}>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreBarFill}
                      style={{
                        width: `${riskData.score}%`,
                        backgroundColor:
                          riskData.score >= 80 ? 'var(--color-success)' :
                          riskData.score >= 70 ? 'var(--color-warning)' :
                          'var(--color-danger)'
                      }}
                    ></div>
                  </div>
                  <span className={styles.scoreValue}>{riskData.score}/100</span>
                </div>
              </div>
              <p className={styles.riskDescription}>{riskData.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProtocolRiskAssessment;
