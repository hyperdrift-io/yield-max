import { Helmet } from 'react-helmet-async'
import ProtocolTable from '../components/ProtocolTable'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>YieldMax - Best Yield Farming Opportunities</title>
        <meta name="description" content="Compare the top yield farming protocols for safety, liquidity, and returns" />
      </Helmet>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Find the Best <span className={styles.gradientText}>Yield Farming</span> Opportunities
            </h1>
            <p className={styles.heroSubtitle}>
              Compare protocols based on safety, returns, and ease of use to maximize your yield
            </p>
            <div className={styles.heroActions}>
              <Link to="/compare" className="button-primary">Compare Protocols</Link>
              <Link to="/simulator" className="button-secondary">Try Simulator</Link>
            </div>
          </div>
        </div>

        {/* Floating statistics cards */}
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            <div className="stat-card animate-fade-in" style={{animationDelay: '0s'}}>
              <div className="stat-label">Highest APY</div>
              <div className="stat-value">8.5%</div>
              <div className={styles.statProvider}>Yearn Finance</div>
            </div>
            <div className="stat-card animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="stat-label">Safest Protocol</div>
              <div className="stat-value">9/10</div>
              <div className={styles.statProvider}>Lido</div>
            </div>
            <div className="stat-card animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="stat-label">Total Value Locked</div>
              <div className="stat-value">$33.5B+</div>
              <div className={styles.statProvider}>Across all protocols</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose YieldMax?</h2>
            <p className={styles.sectionSubtitle}>
              We provide comprehensive data to help you make the best yield farming decisions
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <svg className={`${styles.featureIcon} ${styles.featureIconSafety}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Safety First</h3>
              <p className={styles.featureDescription}>
                We analyze audit reports, security practices, and historical performance to give you accurate safety scores.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <svg className={`${styles.featureIcon} ${styles.featureIconData}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Accurate Data</h3>
              <p className={styles.featureDescription}>
                Real-time updates on APY, TVL, and other critical metrics to ensure you always have the latest information.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <svg className={`${styles.featureIcon} ${styles.featureIconSimulation}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Yield Simulation</h3>
              <p className={styles.featureDescription}>
                Calculate potential returns with our advanced simulator that accounts for unbonding periods and compounding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Table Section */}
      <section className={styles.protocolsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderWithAction}>
            <h2 className={styles.sectionTitle}>Top Yield Protocols</h2>
            <Link to="/compare" className={styles.viewAllLink}>
              View All
              <svg className={styles.viewAllIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className={styles.protocolTableWrapper}>
            <ProtocolTable limit={5} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
