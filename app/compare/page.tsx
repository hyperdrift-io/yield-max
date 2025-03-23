import type { Metadata } from 'next';
import Link from 'next/link';
import { getProtocols } from '../../src/api/protocols';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Compare Protocols - YieldMax',
  description: 'Compare different yield aggregators side by side'
};

export default async function ComparePage() {
  const protocols = await getProtocols();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Compare Protocols</h1>
        <p>Find the best yield farming opportunities by comparing key metrics across protocols</p>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filter Protocols</span>
        </div>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            <span>Minimum APY (%)</span>
            <span className={styles.sliderValue}>0%</span>
          </div>
          <input type="range" min="0" max="20" defaultValue="0" className={styles.slider} />
          <div className={styles.sliderMarkers}>
            <span>0%</span>
            <span>5%</span>
            <span>10%</span>
            <span>15%</span>
            <span>20%+</span>
          </div>
        </div>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            <span>Max Unbonding Period (days)</span>
            <span className={styles.sliderValue}>100 days</span>
          </div>
          <input type="range" min="0" max="100" defaultValue="100" className={styles.slider} />
          <div className={styles.sliderMarkers}>
            <span>0</span>
            <span>7</span>
            <span>14</span>
            <span>21</span>
            <span>30+</span>
          </div>
        </div>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            <span>Minimum Safety Score</span>
            <span className={styles.sliderValue}>0/100</span>
          </div>
          <input type="range" min="0" max="100" defaultValue="0" className={styles.slider} />
          <div className={styles.sliderMarkers}>
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <div className={styles.resultsHeader}>
        <h2>Protocols Matching Your Criteria</h2>
        <button className={styles.resetButton}>Reset Filters</button>
      </div>

      <div className={styles.showAdvanced}>
        <button className={styles.advancedButton}>Show Advanced Filters</button>
      </div>

      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>PROTOCOL</div>
        <div className={styles.headerCell}>APY<span className={styles.sortArrow}>▼</span></div>
        <div className={styles.headerCell}>TVL</div>
        <div className={styles.headerCell}>SAFETY</div>
        <div className={styles.headerCell}>EASE OF USE</div>
        <div className={styles.headerCell}>CHAINS</div>
        <div className={styles.headerCell}>ACTION</div>
      </div>

      <div className={styles.protocolList}>
        {protocols.map((protocol) => (
          <div key={protocol.id} className={styles.protocolRow}>
            <div className={styles.protocolCell}>
              <div className={styles.protocolLogo}></div>
              <div className={styles.protocolName}>{protocol.name}</div>
            </div>
            <div className={styles.cell}>{protocol.apy}%</div>
            <div className={styles.cell}>${protocol.tvl || '500,000,000'}</div>
            <div className={styles.cell}>
              <div className={styles.scoreBar}>
                <div className={styles.scoreFill} style={{width: `${protocol.safetyScore || 75}%`}}></div>
              </div>
              <span>{protocol.safetyScore || 75}</span>
            </div>
            <div className={styles.cell}>
              <div className={styles.scoreBar}>
                <div className={styles.scoreFillAlt} style={{width: `${protocol.easeOfUse || 70}%`}}></div>
              </div>
              <span>{protocol.easeOfUse || 70}</span>
            </div>
            <div className={styles.cell}>
              <div className={styles.chainIcons}>
                {(protocol.metadata?.chains || ['ETH']).map((chain, i) => (
                  <span key={i} className={styles.chainIcon}>{chain.substring(0, 3)}</span>
                ))}
              </div>
            </div>
            <div className={styles.cell}>
              <Link href={`/protocol/${protocol.id}`} className={styles.viewDetails}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
