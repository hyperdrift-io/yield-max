import type { Metadata } from 'next';
import { getProtocols } from '../../src/api/protocols';
import styles from './page.module.css';
import ProtocolList from '../../src/components/ProtocolList';

export const metadata: Metadata = {
  title: 'Compare Protocols - YieldMax',
  description: 'Compare different yield aggregators side by side'
};

export default async function ComparePage() {
  try {
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
            <span>Filter Protocols (Disabled)</span>
          </div>

          <div className={styles.sliderGroup}>
            <div className={styles.sliderLabel}>
              <span>Minimum APY (%)</span>
              <span className={styles.sliderValue}>0%</span>
            </div>
            <input type="range" min="0" max="20" defaultValue="0" className={styles.slider} disabled />
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
              <span>Minimum Safety Score</span>
              <span className={styles.sliderValue}>0/100</span>
            </div>
            <input type="range" min="0" max="100" defaultValue="0" className={styles.slider} disabled />
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
          <h2>All Available Protocols</h2>
          <button className={styles.resetButton} disabled>Reset Filters</button>
        </div>

        <div className={styles.showAdvanced}>
          <button className={styles.advancedButton} disabled>Show Advanced Filters</button>
        </div>

        <div className={styles.protocolList}>
          <ProtocolList protocols={protocols} limit={undefined} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading protocols:', error);
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Compare Protocols</h1>
          <p>Find the best yield farming opportunities by comparing key metrics across protocols</p>
        </div>
        <div className={styles.error}>
          <p>Error loading protocol data. Please try again later.</p>
        </div>
      </div>
    );
  }
}
