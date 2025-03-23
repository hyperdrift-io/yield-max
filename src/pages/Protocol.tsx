import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './Protocol.module.css'
import { useProtocolDetails } from '../hooks/useProtocolDetails'
import ProtocolRiskAssessment from '../components/ProtocolRiskAssessment'

type TabType = 'overview' | 'performance' | 'risks'

const Protocol = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const { protocol, rawData, isLoading, error } = useProtocolDetails(id)

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <span className={styles.loadingText}>Loading protocol data...</span>
      </div>
    )
  }

  if (error || !protocol) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Protocol Not Found</h2>
        <p className={styles.errorMessage}>
          The protocol you're looking for doesn't exist or there was an error loading the data.
        </p>
        <Link to="/" className={styles.errorButton}>
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{protocol.name} - Protocol Details | YieldMax</title>
        <meta name="description" content={`Details about ${protocol.name} including APY, risks, and performance`} />
      </Helmet>

      {/* Protocol Header */}
      <section className={styles.protocolHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.titleWrapper}>
              <img
                src={protocol.logoUrl}
                alt={`${protocol.name} logo`}
                className={styles.protocolLogo}
              />
              <div>
                <h1 className={styles.protocolTitle}>{protocol.name}</h1>
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>
                    <svg className={styles.tagIconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    APY: {protocol.apy}%
                  </span>
                  <span className={styles.tag}>
                    <svg className={styles.tagIconSecondary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Safety: {protocol.safetyScore}/100
                  </span>
                  <span className={styles.tag}>
                    <svg className={styles.tagIconTertiary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Unbonding: {protocol.unbondingPeriod === 0 ? 'Instant' : `${protocol.unbondingPeriod} days`}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <a
                href={protocol.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                Visit Website
              </a>
              <Link
                to={`/simulator?protocol=${protocol.id}`}
                className={styles.secondaryButton}
              >
                Calculate Returns
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <nav className={styles.tabNav}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`${styles.tabButton} ${activeTab === 'performance' ? styles.activeTab : ''}`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`${styles.tabButton} ${activeTab === 'risks' ? styles.activeTab : ''}`}
            >
              Risks
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.container}>
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>About {protocol.name}</h2>
              <div className={styles.cardContent}>
                <p className={styles.protocolDescription}>
                  {protocol.description}
                </p>

                {protocol.apyExplanation && (
                  <div className={styles.apyExplanationBox}>
                    <h3 className={styles.apyExplanationTitle}>How the {protocol.apy}% APY Works</h3>
                    <p className={styles.apyExplanation}>{protocol.apyExplanation}</p>
                  </div>
                )}

                <div className={styles.metricsContainer}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>TVL</span>
                    <span className={styles.metricValue}>${(protocol.tvl / 1e9).toFixed(2)}B</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Liquidity</span>
                    <span className={styles.metricValue}>${(protocol.liquidity / 1e9).toFixed(2)}B</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Audits</span>
                    <span className={styles.metricValue}>{protocol.audits}</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Ease of Use</span>
                    <span className={styles.metricValue}>{protocol.easeOfUseScore}/100</span>
                  </div>
                </div>

                {protocol.metadata && (
                  <div className={styles.metadata}>
                    <h3 className={styles.metadataTitle}>Blockchain Support</h3>
                    <div className={styles.chainsList}>
                      {protocol.metadata.chains.map(chain => (
                        <span key={chain} className={styles.chainTag}>{chain}</span>
                      ))}
                    </div>

                    <div className={styles.metadataGrid}>
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Launch Date</span>
                        <span className={styles.metadataValue}>{new Date(protocol.metadata.launchDate).toLocaleDateString()}</span>
                      </div>
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Token</span>
                        <span className={styles.metadataValue}>{protocol.metadata.token}</span>
                      </div>
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Governance</span>
                        <span className={styles.metadataValue}>{protocol.metadata.governance}</span>
                      </div>
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Real-Time Data</span>
                        <span className={styles.metadataValue}>{protocol.metadata.realTimeData ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Engagement & Community</h2>
              <div className={styles.cardContent}>
                <div className={styles.engagementContainer}>
                  <div className={styles.engagementItem}>
                    <svg className={styles.engagementIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    <span className={styles.engagementLabel}>Twitter</span>
                    <span className={styles.engagementValue}>{protocol.engagement.twitter.toLocaleString()} followers</span>
                  </div>
                  <div className={styles.engagementItem}>
                    <svg className={styles.engagementIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className={styles.engagementLabel}>Discord</span>
                    <span className={styles.engagementValue}>{protocol.engagement.discord.toLocaleString()} members</span>
                  </div>
                  <div className={styles.engagementItem}>
                    <svg className={styles.engagementIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span className={styles.engagementLabel}>GitHub</span>
                    <span className={styles.engagementValue}>{protocol.engagement.github.toLocaleString()} stars</span>
                  </div>
                </div>

                <div className={styles.vcContainer}>
                  <h3 className={styles.vcTitle}>Venture Capital Backing</h3>
                  <div className={styles.vcList}>
                    {protocol.vcBacking.map(vc => (
                      <span key={vc} className={styles.vcItem}>{vc}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {protocol.auditDetails && protocol.auditDetails.length > 0 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Security Audits</h2>
                <div className={styles.cardContent}>
                  <div className={styles.auditsList}>
                    {protocol.auditDetails.map((audit, index) => (
                      <div key={index} className={styles.auditItem}>
                        <span className={styles.auditFirm}>{audit.firm}</span>
                        <span className={styles.auditDate}>{audit.date}</span>
                        {audit.url && (
                          <a
                            href={audit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.auditLink}
                          >
                            View Report
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Performance Metrics</h2>
              <div className={styles.cardContent}>
                <div className={styles.performanceChart}>
                  {/* Performance chart would go here */}
                  <div className={styles.chartPlaceholder}>
                    <span>Historical APY chart will be displayed here</span>
                  </div>
                </div>

                <div className={styles.performanceData}>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Current APY</span>
                    <span className={styles.dataValueLarge}>{protocol.apy}%</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>TVL</span>
                    <span className={styles.dataValue}>${(protocol.tvl / 1e9).toFixed(2)}B</span>
                  </div>
                </div>

                {protocol.apiSources && (
                  <div className={styles.apiSourcesContainer}>
                    <h3 className={styles.sourcesTitle}>Data Sources</h3>
                    <div className={styles.sourcesList}>
                      {protocol.apiSources.tvlAndApy && (
                        <div className={styles.sourceItem}>
                          <span className={styles.sourceLabel}>TVL & APY:</span>
                          <span className={styles.sourceValue}>{protocol.apiSources.tvlAndApy}</span>
                        </div>
                      )}
                      {protocol.apiSources.tokenData && (
                        <div className={styles.sourceItem}>
                          <span className={styles.sourceLabel}>Token Data:</span>
                          <span className={styles.sourceValue}>{protocol.apiSources.tokenData}</span>
                        </div>
                      )}
                      {protocol.apiSources.onChainData && (
                        <div className={styles.sourceItem}>
                          <span className={styles.sourceLabel}>On-Chain Data:</span>
                          <span className={styles.sourceValue}>{protocol.apiSources.onChainData}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Risk Assessment</h2>
              <div className={styles.cardContent}>
                {rawData ? (
                  <ProtocolRiskAssessment protocol={rawData} />
                ) : (
                  <p className={styles.riskIntro}>
                    Detailed risk assessment is not available for this protocol.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Protocol
