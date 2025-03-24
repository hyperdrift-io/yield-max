import type { Metadata } from 'next';
import { getProtocols } from '../../src/api/protocols';
import styles from './page.module.css';
import CompareFilters from './CompareFilters';

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

        <CompareFilters protocols={protocols} />
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
