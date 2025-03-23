import { Helmet } from 'react-helmet-async'
import ProtocolTable from '../components/ProtocolTable'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { useProtocolsStore } from '../hooks/useProtocolsStore'

const Home = () => {
  const { allProtocols } = useProtocolsStore()

  // Get highest APY protocol
  const highestApyProtocol = allProtocols.length > 0
    ? allProtocols.reduce((prev, current) => (prev.apy > current.apy) ? prev : current)
    : null

  // Get protocol with highest safety score
  const safestProtocol = allProtocols.length > 0
    ? allProtocols.reduce((prev, current) => (prev.safetyScore > current.safetyScore) ? prev : current)
    : null

  // Calculate total TVL
  const totalTvl = allProtocols.reduce((sum, protocol) => sum + protocol.tvl, 0)

  return (
    <>
      <Helmet>
        <title>YieldMax - Best DeFi Yield Farming Opportunities | Compare Highest APY</title>
        <meta name="description" content="Find and compare the best DeFi yield farming protocols for highest APY, safety, and returns. Maximize your passive income with our real-time protocol comparison and simulator." />
        <meta name="keywords" content="defi yield farming, highest apy crypto, safe defi protocols, crypto passive income, yield comparison, best roi crypto" />
        <link rel="canonical" href="https://yieldmax.app/" />
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
              <div className="stat-value">{highestApyProtocol?.apy.toFixed(1)}%</div>
              <div className={styles.statProvider}>{highestApyProtocol?.name}</div>
            </div>
            <div className="stat-card animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="stat-label">Safest Protocol</div>
              <div className="stat-value">{safestProtocol ? ((safestProtocol.safetyScore / 10).toFixed(1)) : '0.0'}/10</div>
              <div className={styles.statProvider}>{safestProtocol?.name}</div>
            </div>
            <div className="stat-card animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="stat-label">Total Value Locked</div>
              <div className="stat-value">${(totalTvl / 1e9).toFixed(1)}B+</div>
              <div className={styles.statProvider}>Across all protocols</div>
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
            <ProtocolTable limit={10} />
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

      {/* Top DeFi Questions Section */}
      <section className={styles.questionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Find Answers to Your DeFi Questions</h2>
            <p className={styles.sectionSubtitle}>
              Get clear information about yield farming, staking, and passive income opportunities in DeFi
            </p>
          </div>

          <div className={styles.questionsGrid}>
            <div className={styles.questionCard}>
              <h3 className={styles.questionTitle}>Which DeFi Protocol Has the Highest Yield?</h3>
              <p className={styles.questionAnswer}>
                Currently, {highestApyProtocol?.name} offers the highest APY at {highestApyProtocol?.apy.toFixed(1)}%. However, higher yields often come with higher risks. We recommend comparing protocols based on both APY and safety score.
              </p>
              <Link to="/compare" className={styles.questionLink}>Compare Protocols</Link>
            </div>

            <div className={styles.questionCard}>
              <h3 className={styles.questionTitle}>What Are the Safest DeFi Yield Protocols?</h3>
              <p className={styles.questionAnswer}>
                Safety in DeFi comes from audit history, TVL, team transparency, and track record. Currently, {safestProtocol?.name} has our highest safety rating at {(safestProtocol?.safetyScore / 10).toFixed(1)}/10.
              </p>
              <Link to="/risks" className={styles.questionLink}>Learn About Risks</Link>
            </div>

            <div className={styles.questionCard}>
              <h3 className={styles.questionTitle}>How Much Can I Earn With Yield Farming?</h3>
              <p className={styles.questionAnswer}>
                Your earnings depend on your investment amount, the protocol's APY, compound frequency, and time horizon. Use our simulator to calculate potential returns with different parameters.
              </p>
              <Link to="/simulator" className={styles.questionLink}>Try Simulator</Link>
            </div>

            <div className={styles.questionCard}>
              <h3 className={styles.questionTitle}>What's the Difference Between Staking and Yield Farming?</h3>
              <p className={styles.questionAnswer}>
                Staking involves locking tokens to support network operations, typically with lower risk and returns. Yield farming involves more active strategies like providing liquidity or lending, often with higher risk and returns.
              </p>
              <Link to="/guide" className={styles.questionLink}>Read Beginner's Guide</Link>
            </div>

            <div className={styles.questionCard}>
              <h3 className={styles.questionTitle}>How Do I Start Yield Farming?</h3>
              <p className={styles.questionAnswer}>
                To start yield farming, you need to set up a wallet, acquire cryptocurrency, research protocols, and deposit your funds. Our beginner's guide covers the entire process step-by-step.
              </p>
              <Link to="/guide" className={styles.questionLink}>Get Started</Link>
            </div>

            <div className={styles.questionCard}>
              <h3 className={styles.questionTitle}>What Are the Risks of Yield Farming?</h3>
              <p className={styles.questionAnswer}>
                Yield farming involves risks like smart contract vulnerabilities, impermanent loss, market volatility, and liquidation risks. Understanding these risks is essential before starting.
              </p>
              <Link to="/faq" className={styles.questionLink}>Read FAQ</Link>
            </div>
          </div>

          <div className={styles.questionsAction}>
            <Link to="/faq" className="button-primary">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to maximize your crypto returns?</h2>
            <p className={styles.ctaSubtitle}>
              Start comparing DeFi protocols and find the best yield opportunities that match your risk profile.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/compare" className="button-primary">Compare Protocols</Link>
              <Link to="/guide" className="button-secondary">Read Beginner's Guide</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
