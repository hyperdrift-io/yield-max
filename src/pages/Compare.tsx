import { Helmet } from 'react-helmet-async'
import ProtocolTable from '../components/ProtocolTable'
import { useProtocolsStore } from '../hooks/useProtocolsStore'
import styles from './Compare.module.css'

const Compare = () => {
  const {
    filters,
    updateFilter,
    resetFilters
  } = useProtocolsStore()

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFilter(name as any, Number(value))
  }

  return (
    <>
      <Helmet>
        <title>Compare Yield Protocols - YieldMax</title>
        <meta name="description" content="Compare yield farming protocols side by side" />
      </Helmet>

      {/* Header */}
      <section className={styles.headerSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Compare Protocols</h1>
          <p className={styles.subtitle}>
            Find the best yield farming opportunities by comparing key metrics across protocols
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.filterCard}>
          <h2 className={styles.filterTitle}>
            <svg className={styles.filterIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Protocols
          </h2>

          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabelWrapper}>
                <label className={styles.filterLabel}>
                  Minimum APY (%)
                </label>
                <span className={styles.filterValue}>{filters.minApy}%</span>
              </div>
              <input
                type="range"
                name="minApy"
                min="0"
                max="20"
                step="0.5"
                value={filters.minApy}
                onChange={handleFilterChange}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLabels}>
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
                <span>20%+</span>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterLabelWrapper}>
                <label className={styles.filterLabel}>
                  Max Unbonding Period (days)
                </label>
                <span className={styles.filterValueSecondary}>{filters.maxUnbondingPeriod} days</span>
              </div>
              <input
                type="range"
                name="maxUnbondingPeriod"
                min="0"
                max="30"
                value={filters.maxUnbondingPeriod}
                onChange={handleFilterChange}
                className={styles.rangeInputSecondary}
              />
              <div className={styles.rangeLabels}>
                <span>0</span>
                <span>7</span>
                <span>14</span>
                <span>21</span>
                <span>30+</span>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterLabelWrapper}>
                <label className={styles.filterLabel}>
                  Minimum Safety Score
                </label>
                <span className={styles.filterValueTertiary}>{filters.minSafetyScore}/10</span>
              </div>
              <input
                type="range"
                name="minSafetyScore"
                min="0"
                max="10"
                value={filters.minSafetyScore}
                onChange={handleFilterChange}
                className={styles.rangeInputTertiary}
              />
              <div className={styles.rangeLabels}>
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.resultsCard}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Protocols Matching Your Criteria</h2>
            <button className={styles.resetButton} onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
          <ProtocolTable />
        </div>
      </div>
    </>
  )
}

export default Compare
