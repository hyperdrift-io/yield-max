import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getProtocols, type Protocol } from '../api/protocols'
import SimulatorResult from '../components/SimulatorResult'
import styles from './Simulator.module.css'

const Simulator = () => {
  const [amount, setAmount] = useState<number>(1000)
  const [duration, setDuration] = useState<number>(90)
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>('')
  const [showResults, setShowResults] = useState<boolean>(false)

  const { data: protocols, isLoading } = useQuery<Protocol[]>({
    queryKey: ['protocols'],
    queryFn: getProtocols
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount > 0 && duration > 0 && selectedProtocolId) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setShowResults(false)
  }

  return (
    <>
      <Helmet>
        <title>Yield Simulator | YieldMax</title>
        <meta name="description" content="Simulate your potential returns from yield farming protocols" />
      </Helmet>

      <div className={styles.simulatorContainer}>
        {!showResults ? (
          <div>
            <h1 className={styles.simulatorTitle}>Yield Simulator</h1>
            <p className={styles.simulatorDescription}>
              Enter the details of your planned investment to simulate potential returns
            </p>

            <div className={styles.simulatorCard}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Amount Input */}
                <div className={styles.formGroup}>
                  <label htmlFor="amount" className={styles.label}>
                    Investment Amount (USD)
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.currencySymbol}>$</span>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      min="1"
                      className={styles.input}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>

                {/* Duration Input */}
                <div className={styles.formGroup}>
                  <label htmlFor="duration" className={styles.label}>
                    Investment Duration (Days)
                  </label>
                  <div className={styles.rangeControl}>
                    <input
                      type="range"
                      id="duration"
                      min="1"
                      max="365"
                      step="1"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className={styles.range}
                    />
                    <div className={styles.rangeLabels}>
                      <span>1 day</span>
                      <span>{duration} days</span>
                      <span>365 days</span>
                    </div>
                  </div>
                </div>

                {/* Protocol Selection */}
                <div className={styles.formGroup}>
                  <label htmlFor="protocol" className={styles.label}>
                    Select Protocol
                  </label>
                  {isLoading ? (
                    <div className={styles.loader}>
                      <div className={styles.spinner}></div>
                    </div>
                  ) : (
                    <select
                      id="protocol"
                      value={selectedProtocolId}
                      onChange={(e) => setSelectedProtocolId(e.target.value)}
                      className={styles.select}
                      required
                    >
                      <option value="">Select a protocol</option>
                      {protocols?.map((protocol) => (
                        <option key={protocol.id} value={protocol.id}>
                          {protocol.name} ({protocol.apy}% APY)
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`button-primary ${styles.submitButton}`}
                  disabled={!amount || !duration || !selectedProtocolId}
                >
                  <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Simulate Yield
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleReset}
              className={styles.backButton}
            >
              <svg className={styles.backIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to simulator
            </button>

            <SimulatorResult
              params={{
                amount,
                duration,
                protocolId: selectedProtocolId
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Simulator
