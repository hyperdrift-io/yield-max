import { Helmet } from 'react-helmet-async'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useProtocolsStore } from '../hooks/useProtocolsStore'
import { useYieldSimulator } from '../hooks/useYieldSimulator'
import { SimulationParams } from '../api/protocols'
import styles from './Simulator.module.css'

const Simulator = () => {
  const { allProtocols: protocols } = useProtocolsStore()
  const {
    simParams,
    updateSimParam,
    runSimulation,
    isSimulating,
    currentResult,
    simHistory,
    clearHistory
  } = useYieldSimulator()

  const [showHistory, setShowHistory] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updateSimParam(name as keyof SimulationParams,
      name === 'amount' || name === 'duration' ? Number(value) : value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (simParams.protocolId && simParams.amount > 0 && simParams.duration > 0) {
      runSimulation(simParams)
    }
  }

  // Load protocol ID from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const protocolId = urlParams.get('protocol')
    if (protocolId) {
      updateSimParam('protocolId', protocolId)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Yield Simulator - YieldMax</title>
        <meta name="description" content="Simulate your potential yield returns" />
      </Helmet>

      <section className={styles.headerSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Yield Simulator</h1>
          <p className={styles.subtitle}>
            Calculate your potential returns across different protocols and time periods
          </p>
        </div>
      </section>

      <div className={styles.simulatorContainer}>
        <div className={styles.simulatorCard}>
          <h2 className={styles.sectionTitle}>Input Parameters</h2>

          <form onSubmit={handleSubmit} className={styles.simulatorForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Protocol</label>
              <select
                name="protocolId"
                value={simParams.protocolId}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Select a protocol</option>
                {protocols.map(protocol => (
                  <option key={protocol.id} value={protocol.id}>
                    {protocol.name} ({protocol.apy}% APY)
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Investment Amount (USD)</label>
              <input
                type="number"
                name="amount"
                value={simParams.amount}
                onChange={handleInputChange}
                min="1"
                step="100"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Time Period (days)</label>
              <input
                type="number"
                name="duration"
                value={simParams.duration}
                onChange={handleInputChange}
                min="1"
                max="3650"
                className={styles.formInput}
                required
              />
              <div className={styles.timePresets}>
                <button
                  type="button"
                  onClick={() => updateSimParam('duration', 30)}
                  className={styles.timePresetButton}
                >
                  30 days
                </button>
                <button
                  type="button"
                  onClick={() => updateSimParam('duration', 90)}
                  className={styles.timePresetButton}
                >
                  90 days
                </button>
                <button
                  type="button"
                  onClick={() => updateSimParam('duration', 365)}
                  className={styles.timePresetButton}
                >
                  1 year
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.simulateButton}
              disabled={isSimulating || !simParams.protocolId}
            >
              {isSimulating ? 'Calculating...' : 'Calculate Returns'}
            </button>
          </form>
        </div>

        {currentResult && (
          <div className={styles.resultsCard}>
            <h2 className={styles.sectionTitle}>Simulation Results</h2>

            <div className={styles.resultsGrid}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Initial Investment</span>
                <span className={styles.resultValue}>${currentResult.initialAmount.toLocaleString()}</span>
              </div>

              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Final Amount</span>
                <span className={styles.resultValueHighlight}>${Math.round(currentResult.finalAmount).toLocaleString()}</span>
              </div>

              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Total Yield</span>
                <span className={styles.resultValuePositive}>${Math.round(currentResult.yield).toLocaleString()}</span>
              </div>

              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Yield Percentage</span>
                <span className={styles.resultValuePositive}>{currentResult.yieldPercentage.toFixed(2)}%</span>
              </div>

              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Effective APY</span>
                <span className={styles.resultValue}>{currentResult.effectiveApy.toFixed(2)}%</span>
              </div>

              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Total Days Locked</span>
                <span className={styles.resultValue}>{currentResult.totalDaysLocked} days</span>
              </div>
            </div>

            <div className={styles.resultActions}>
              <button
                className={styles.compareButton}
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>
          </div>
        )}

        {showHistory && simHistory.length > 0 && (
          <div className={styles.historyCard}>
            <div className={styles.historyHeader}>
              <h2 className={styles.sectionTitle}>Simulation History</h2>
              <button
                className={styles.clearButton}
                onClick={clearHistory}
              >
                Clear History
              </button>
            </div>

            <div className={styles.historyTable}>
              <table>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Duration</th>
                    <th>Final Amount</th>
                    <th>Yield</th>
                    <th>Effective APY</th>
                  </tr>
                </thead>
                <tbody>
                  {simHistory.map((result, index) => (
                    <tr key={index}>
                      <td>${result.initialAmount.toLocaleString()}</td>
                      <td>{result.totalDaysLocked} days</td>
                      <td>${Math.round(result.finalAmount).toLocaleString()}</td>
                      <td>${Math.round(result.yield).toLocaleString()}</td>
                      <td>{result.effectiveApy.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Simulator
