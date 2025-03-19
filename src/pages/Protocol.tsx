import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './Protocol.module.css'

type TabType = 'overview' | 'performance' | 'risks'

// Define investor type
interface Engagement {
  twitter: number;
  discord: number;
  github: number;
}

interface Protocol {
  id: string;
  name: string;
  logo: string;
  description: string;
  apy: number;
  safetyScore: number;
  unbondingPeriod: number;
  easeOfUseScore: number;
  liquidity: number;
  investors: string[];
  website: string;
  engagement: Engagement;
}

const Protocol = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  // This would normally come from an API
  const protocol = protocolData.find(p => p.id === id)

  if (!id) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.spinner}></div>
        <span className={styles.loadingText}>Loading protocol details...</span>
      </div>
    )
  }

  if (!protocol) {
    return (
      <div className={styles.errorContainer}>
        <svg className={styles.errorIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className={styles.errorTitle}>Protocol Not Found</h2>
        <p className={styles.errorText}>We couldn't find the protocol you're looking for.</p>
        <Link to="/compare" className={styles.backLink}>Go to Protocol List</Link>
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
                src={protocol.logo}
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
                    Safety: {protocol.safetyScore}/10
                  </span>
                  <span className={styles.tag}>
                    <svg className={styles.tagIconTertiary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Unbonding: {protocol.unbondingPeriod} days
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
              <p className={styles.cardText}>{protocol.description}</p>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div>
                    <h3 className={styles.statLabel}>Safety Score</h3>
                    <div className={styles.statValue}>{protocol.safetyScore}/10</div>
                  </div>
                  <div className={styles.iconContainer}>
                    <svg className={styles.iconPrimary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statMeter}>
                  <div className={styles.meterLabels}>
                    <span className={styles.meterLabel}>Lower</span>
                    <span className={styles.meterLabel}>Higher</span>
                  </div>
                  <div className={styles.meterBar}>
                    <div
                      className={styles.meterFillPrimary}
                      style={{ width: `${protocol.safetyScore * 10}%` }}
                    ></div>
                  </div>
                </div>
                <div className={styles.statNote}>
                  Based on audits, time in market, and historical security
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div>
                    <h3 className={styles.statLabel}>Liquidity</h3>
                    <div className={styles.statValue}>${protocol.liquidity?.toLocaleString()}</div>
                  </div>
                  <div className={styles.iconContainer}>
                    <svg className={styles.iconSecondary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statNote}>
                  <p className={styles.statNoteText}>High liquidity means easier entry and exit</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div>
                    <h3 className={styles.statLabel}>Ease of Use</h3>
                    <div className={styles.statValue}>{protocol.easeOfUseScore}/10</div>
                  </div>
                  <div className={styles.iconContainer}>
                    <svg className={styles.iconTertiary} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <div className={styles.statMeter}>
                  <div className={styles.meterLabels}>
                    <span className={styles.meterLabel}>Complex</span>
                    <span className={styles.meterLabel}>Simple</span>
                  </div>
                  <div className={styles.meterBar}>
                    <div
                      className={styles.meterFillTertiary}
                      style={{ width: `${protocol.easeOfUseScore * 10}%` }}
                    ></div>
                  </div>
                </div>
                <div className={styles.statNote}>
                  Based on UI, documentation, and process complexity
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Investor Backing</h2>
              <div className={styles.backersList}>
                {protocol.investors?.map((investor: string, index: number) => (
                  <span key={index} className={styles.backer}>
                    {investor}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Analytics</h2>
              <div className={styles.analyticsPlaceholder}>
                <div className={styles.emptyStateCard}>
                  <svg className={styles.emptyStateIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className={styles.emptyStateText}>Detailed analytics will be available soon</p>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Community Engagement</h2>
              <div className={styles.engagementGrid}>
                <div className={styles.engagementCard}>
                  <div className={styles.engagementHeader}>
                    <h3 className={styles.engagementTitle}>Twitter</h3>
                    <svg className={styles.twitterIcon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </div>
                  <div className={styles.engagementValue}>{protocol.engagement.twitter.toLocaleString()}</div>
                  <p className={styles.engagementSubtext}>Followers</p>
                </div>

                <div className={styles.engagementCard}>
                  <div className={styles.engagementHeader}>
                    <h3 className={styles.engagementTitle}>Discord</h3>
                    <svg className={styles.discordIcon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                  </div>
                  <div className={styles.engagementValue}>{protocol.engagement.discord.toLocaleString()}</div>
                  <p className={styles.engagementSubtext}>Community Members</p>
                </div>

                <div className={styles.engagementCard}>
                  <div className={styles.engagementHeader}>
                    <h3 className={styles.engagementTitle}>GitHub</h3>
                    <svg className={styles.githubIcon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </div>
                  <div className={styles.engagementValue}>{protocol.engagement.github.toLocaleString()}</div>
                  <p className={styles.engagementSubtext}>Repository Stars</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// Mock data
const protocolData: Protocol[] = [
  {
    id: "lido",
    name: "Lido",
    logo: "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
    description: "Lido is a liquid staking solution for ETH and other PoS assets. Lido lets users stake their ETH without locking assets or maintaining infrastructure.",
    apy: 4.3,
    safetyScore: 9,
    unbondingPeriod: 3,
    easeOfUseScore: 8,
    liquidity: 13500000000,
    investors: ["Paradigm", "a16z", "Three Arrows Capital", "Dragonfly Capital"],
    website: "https://lido.fi",
    engagement: {
      twitter: 198500,
      discord: 42000,
      github: 1200
    }
  },
  {
    id: "secret",
    name: "Secret Network",
    logo: "https://cryptologos.cc/logos/secret-scrt-logo.png",
    description: "Secret Network is a blockchain-based privacy-first platform for decentralized applications that allows for computation over encrypted data, enabling new use cases for smart contracts and DApps.",
    apy: 6.2,
    safetyScore: 7,
    unbondingPeriod: 21,
    easeOfUseScore: 6,
    liquidity: 425000000,
    investors: ["Outlier Ventures", "Fenbushi Capital", "Hashed", "Arrington XRP Capital"],
    website: "https://scrt.network",
    engagement: {
      twitter: 142000,
      discord: 32500,
      github: 950
    }
  }
]

export default Protocol
