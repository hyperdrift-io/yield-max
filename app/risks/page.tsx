import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Understanding DeFi Risks - YieldMax',
  description: 'Comprehensive guide to risks in DeFi yield farming and how to mitigate them'
};

export default function RisksPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Understanding DeFi Risks</h1>
        <p>A comprehensive guide to potential risks in yield farming and strategies to mitigate them</p>
      </div>

      <div className={styles.risksGrid}>
        <div className={styles.riskCard}>
          <div className={styles.riskTitle}>
            <div className={styles.riskIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            Smart Contract Risk
          </div>
          <p className={styles.riskDescription}>
            Smart contracts may contain vulnerabilities or bugs that can be exploited by malicious actors.
            Even audited contracts can have undiscovered vulnerabilities, potentially leading to the loss of deposited funds.
          </p>
          <div className={styles.mitigationStrategies}>
            <div className={styles.mitigationTitle}>How to Mitigate:</div>
            <ul className={styles.mitigationList}>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Choose protocols with multiple third-party audits</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Look for protocols with bug bounty programs</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Consider DeFi insurance products for smart contract coverage</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.riskCard}>
          <div className={styles.riskTitle}>
            <div className={styles.riskIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Impermanent Loss
          </div>
          <p className={styles.riskDescription}>
            When providing liquidity to AMMs, the value of your deposited assets may change compared to simply holding them.
            This happens due to price divergence between the paired assets in a liquidity pool.
          </p>
          <div className={styles.mitigationStrategies}>
            <div className={styles.mitigationTitle}>How to Mitigate:</div>
            <ul className={styles.mitigationList}>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Choose stable pairs (like stablecoin pairs) to minimize volatility</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Use protocols with impermanent loss protection</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Consider if farming rewards outweigh potential impermanent loss</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.riskCard}>
          <div className={styles.riskTitle}>
            <div className={styles.riskIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            Liquidation Risk
          </div>
          <p className={styles.riskDescription}>
            When borrowing against your crypto assets, significant price drops can trigger liquidation of your collateral,
            often with additional penalty fees. This can result in substantial losses beyond market movements.
          </p>
          <div className={styles.mitigationStrategies}>
            <div className={styles.mitigationTitle}>How to Mitigate:</div>
            <ul className={styles.mitigationList}>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Maintain a healthy collateralization ratio (higher than required)</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Set up alerts for when your position approaches liquidation</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Have additional collateral ready to deposit in case of market volatility</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.riskCard}>
          <div className={styles.riskTitle}>
            <div className={styles.riskIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            Market Risk
          </div>
          <p className={styles.riskDescription}>
            Cryptocurrency markets are highly volatile. Significant price drops of the assets you're farming
            can outweigh any yield earned, resulting in a net loss when measured in fiat value.
          </p>
          <div className={styles.mitigationStrategies}>
            <div className={styles.mitigationTitle}>How to Mitigate:</div>
            <ul className={styles.mitigationList}>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Diversify across different protocols and strategies</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Consider stablecoin farming to reduce exposure to market volatility</span>
              </li>
              <li className={styles.mitigationItem}>
                <span className={styles.mitigationItemIcon}>✓</span>
                <span>Have a clear exit strategy before entering a position</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.severitySection}>
        <h2>Risk Severity Classification</h2>
        <table className={styles.severityTable}>
          <thead>
            <tr>
              <th>Risk Type</th>
              <th>Severity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Smart Contract Risk</td>
              <td>
                <div className={styles.severityLevel}>
                  <span className={`${styles.severityDot} ${styles.highRisk}`}></span>
                  High
                </div>
              </td>
              <td>Can result in complete loss of funds through exploits or bugs</td>
            </tr>
            <tr>
              <td>Oracle Manipulation</td>
              <td>
                <div className={styles.severityLevel}>
                  <span className={`${styles.severityDot} ${styles.highRisk}`}></span>
                  High
                </div>
              </td>
              <td>Price feed manipulation can lead to draining of funds or unfair liquidations</td>
            </tr>
            <tr>
              <td>Liquidation Risk</td>
              <td>
                <div className={styles.severityLevel}>
                  <span className={`${styles.severityDot} ${styles.mediumRisk}`}></span>
                  Medium
                </div>
              </td>
              <td>Can lead to loss of collateral, but typically with some warning and preventive options</td>
            </tr>
            <tr>
              <td>Impermanent Loss</td>
              <td>
                <div className={styles.severityLevel}>
                  <span className={`${styles.severityDot} ${styles.mediumRisk}`}></span>
                  Medium
                </div>
              </td>
              <td>Usually gradual and often offset by trading fees and rewards</td>
            </tr>
            <tr>
              <td>Market Risk</td>
              <td>
                <div className={styles.severityLevel}>
                  <span className={`${styles.severityDot} ${styles.mediumRisk}`}></span>
                  Medium
                </div>
              </td>
              <td>Affects overall value but doesn't typically result in total loss</td>
            </tr>
            <tr>
              <td>UI/Front-end Risk</td>
              <td>
                <div className={styles.severityLevel}>
                  <span className={`${styles.severityDot} ${styles.lowRisk}`}></span>
                  Low
                </div>
              </td>
              <td>Usually detectable with proper verification steps</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.ctaSection}>
        <h2>Ready to explore yield opportunities with risk awareness?</h2>
        <Link href="/compare" className={styles.ctaButton}>Compare Protocols Now</Link>
      </div>
    </div>
  );
}
