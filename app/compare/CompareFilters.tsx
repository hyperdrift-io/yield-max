'use client';

import { useState } from 'react';
import { Protocol } from '../../src/types/protocol';
import styles from './page.module.css';
import ProtocolList from '../../src/components/ProtocolList';

type CompareFiltersProps = {
  protocols: Protocol[];
};

export default function CompareFilters({ protocols }: CompareFiltersProps) {
  const [filters, setFilters] = useState({
    minApy: 0,
    minSafetyScore: 0,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleReset = () => {
    setFilters({
      minApy: 0,
      minSafetyScore: 0,
    });
  };

  return (
    <>
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
            <span className={styles.sliderValue}>{filters.minApy}%</span>
          </div>
          <input
            type="range"
            name="minApy"
            min="0"
            max="20"
            step="0.5"
            value={filters.minApy}
            onChange={handleFilterChange}
            className={styles.slider}
          />
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
            <span className={styles.sliderValue}>{filters.minSafetyScore}/100</span>
          </div>
          <input
            type="range"
            name="minSafetyScore"
            min="0"
            max="100"
            step="5"
            value={filters.minSafetyScore}
            onChange={handleFilterChange}
            className={styles.slider}
          />
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
        <button
          className={styles.resetButton}
          onClick={handleReset}
          disabled={filters.minApy === 0 && filters.minSafetyScore === 0}
        >
          Reset Filters
        </button>
      </div>

      <div className={styles.showAdvanced}>
        <button className={styles.advancedButton}>Show Advanced Filters</button>
      </div>

      <div className={styles.protocolList}>
        <ProtocolList protocols={protocols} filters={filters} />
      </div>
    </>
  );
}
