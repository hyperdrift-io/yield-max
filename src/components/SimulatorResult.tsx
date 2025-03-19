import { useQuery } from '@tanstack/react-query'
import { getProtocolDetails } from '../api/protocols'
import styles from './SimulatorResult.module.css'

type SimulatorResultProps = {
  params: {
    amount: number
    duration: number
    protocolId: string
  }
}

const SimulatorResult = ({ params }: SimulatorResultProps) => {
  const { data: protocol, isLoading } = useQuery({
    queryKey: ['protocol', params.protocolId],
    queryFn: () => getProtocolDetails(params.protocolId)
  })

  if (isLoading || !protocol) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  // Calculate yield
  const dailyYield = params.amount * (protocol.apy / 100 / 365)
  const totalYield = dailyYield * params.duration
  const finalAmount = params.amount + totalYield

  // Calculate average monthly yield
  const monthlyYield = dailyYield * 30

  // Calculate compounded yield (if applicable)
  let compoundedAmount = params.amount
  if (protocol.compounding) {
    const periods = params.duration / protocol.compoundFrequency
    const rate = protocol.apy / 100 / (365 / protocol.compoundFrequency)
    compoundedAmount = params.amount * Math.pow(1 + rate, periods)
  }

  const compoundedYield = compoundedAmount - params.amount

  return (
    <div className={styles.resultCard}>
      <div className={styles.header}>
        <img
          src={protocol.logoUrl}
          alt={protocol.name}
          className={styles.logo}
        />
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{protocol.name} Yield Simulation</h2>
          <div className={styles.subtitle}>Based on current APY of {protocol.apy}%</div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Main Results */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statLabel}>Initial Investment</div>
              <div className={styles.iconWrapper}>
                <svg className={styles.statIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className={styles.statValue}>${params.amount.toLocaleString()}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statLabel}>Duration</div>
              <div className={styles.iconWrapper}>
                <svg className={styles.statIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className={styles.statValue}>{params.duration} days</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statLabel}>Estimated Yield</div>
              <div className={styles.iconWrapper}>
                <svg className={`${styles.statIcon} ${styles.positive}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className={`${styles.statValue} ${styles.positive}`}>+${totalYield.toFixed(2)}</div>
            <div className={styles.percentage}>+{((totalYield / params.amount) * 100).toFixed(2)}%</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statLabel}>Final Value</div>
              <div className={styles.iconWrapper}>
                <svg className={styles.statIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className={styles.statValue}>${finalAmount.toFixed(2)}</div>
          </div>
        </div>

        <div className={styles.resultSections}>
          {/* Timeline */}
          <div>
            <h3 className={styles.sectionTitle}>Timeline</h3>
            <div className={styles.timeline}>
              <div className={styles.timelineLine}></div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <svg className={styles.iconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineEvent}>Day 1</h4>
                  <p className={styles.timelineDescription}>Initial investment of ${params.amount.toLocaleString()}</p>
                </div>
              </div>

              {params.duration >= 30 && (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>
                    <svg className={styles.iconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineEvent}>Day 30</h4>
                    <p className={styles.timelineDescription}>
                      Earned ~${monthlyYield.toFixed(2)} in yield, balance: ${(params.amount + monthlyYield).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {params.duration >= 180 && (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>
                    <svg className={styles.iconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineEvent}>Day 180</h4>
                    <p className={styles.timelineDescription}>
                      Earned ~${(dailyYield * 180).toFixed(2)} in yield, balance: ${(params.amount + (dailyYield * 180)).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <svg className={styles.iconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineEvent}>Day {params.duration}</h4>
                  <p className={styles.timelineDescription}>
                    Total earned: ${totalYield.toFixed(2)}, final balance: ${finalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className={styles.disclaimerBox}>
            <div className={styles.disclaimerTitle}>
              <svg className={styles.iconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Important Note
            </div>
            <p className={styles.disclaimerText}>
              This simulation is based on the current APY of {protocol.apy}% and assumes it remains constant for the entire period.
              Actual returns may vary due to market conditions, protocol changes, or other factors.
              Always do your own research before investing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimulatorResult
