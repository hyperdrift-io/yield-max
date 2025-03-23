import styles from './ProtocolRiskAssessment.module.css';

type ProtocolRiskAssessmentProps = {
  protocol: any; // Original protocol data from yieldmax_23_03_2025.json
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
  ];

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
          if (!riskAssessment[category.key]) return null;

          const riskData = riskAssessment[category.key];
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
