import Link from 'next/link';
import { getProtocols } from '../src/api/protocols';
import styles from './page.module.css';
import ProtocolList from '../src/components/ProtocolList';

export default async function HomePage() {
  const protocols = await getProtocols();

  return (
    <div className={styles['home-container']}>
      <section className={styles.hero}>
        <h1>Find the Best Yield Farming Opportunities</h1>
        <p>Compare protocols based on safety, returns, and ease of use to maximize your yield</p>
        <div className={styles['hero-buttons']}>
          <Link href="/compare" className={styles['primary-button']}>Compare Protocols</Link>
          <Link href="/simulator" className={styles['secondary-button']}>Try Simulator</Link>
        </div>
      </section>

      <section className={styles['stats-container']}>
        <div className={styles['stat-card']}>
          <h3>Highest APY</h3>
          <div className={styles['stat-value']}>18.0%</div>
          <div className={styles['stat-label']}>Alpaca Finance</div>
        </div>
        <div className={styles['stat-card']}>
          <h3>Avg. Safety Score</h3>
          <div className={styles['stat-value']}>8.4/10</div>
          <div className={styles['stat-label']}>All protocols</div>
        </div>
        <div className={styles['stat-card']}>
          <h3>Total Value Locked</h3>
          <div className={styles['stat-value']}>$122.6B+</div>
          <div className={styles['stat-label']}>Across all protocols</div>
        </div>
      </section>

      <section className={styles['protocols-section']}>
        <div className={styles['section-header']}>
          <div>
            <h2>Top Yield Protocols</h2>
            <p>Explore the highest-rated yield opportunities across DeFi</p>
          </div>
          <Link href="/compare" className={styles['view-all']}>
            View All
          </Link>
        </div>

        <div className={styles['filter-section']}>
          <button className={styles['filter-button']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
            Show Advanced Filters
          </button>
        </div>

        <ProtocolList protocols={protocols.slice(0, 8)} />
      </section>

      <section className={styles['features-section']}>
        <h2>Why Choose YieldMax</h2>
        <p>Get the tools you need to make informed decisions about yield protocols</p>

        <div className={styles['features-grid']}>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3>Safety First</h3>
            <p>We thoroughly assess each protocol's safety through comprehensive audits and track record analysis.</p>
          </div>

          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3>Accurate Data</h3>
            <p>We provide real-time, reliable data on yields, unlocking periods, and other critical metrics.</p>
          </div>

          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3>Yield Simulation</h3>
            <p>Our simulator helps you forecast potential earnings based on your deposit amount and timeframe.</p>
          </div>
        </div>
      </section>

      <section className={styles['faq-preview']}>
        <h2>Frequently Asked Questions</h2>
        <p>Get quick answers to common questions about yield protocols.</p>

        <div className={styles['faq-grid']}>
          <div className={styles['faq-item']}>
            <h3>What is yield farming?</h3>
            <p>Yield farming is a way to earn rewards by providing liquidity to DeFi protocols. Users can deposit their crypto assets to earn interest and other rewards.</p>
          </div>
          <div className={styles['faq-item']}>
            <h3>How safe are these protocols?</h3>
            <p>Protocol safety varies based on several factors including audits, code quality, and track record. We provide safety ratings to help you make informed decisions.</p>
          </div>
          <div className={styles['faq-item']}>
            <h3>What is APY?</h3>
            <p>Annual Percentage Yield (APY) represents the rate of return earned on an investment over a year, accounting for compound interest.</p>
          </div>
        </div>

        <div className={styles['faq-cta']}>
          <Link href="/faq" className={styles['button-secondary']}>
            View All FAQs
          </Link>
        </div>
      </section>

      <section className={styles['bottom-cta']}>
        <h2>Start Earning Yield Today</h2>
        <p>Compare protocols, simulate potential earnings, and make informed decisions about your crypto investments.</p>
        <div className={styles['cta-buttons']}>
          <Link href="/compare" className={styles['button-primary']}>
            Compare Protocols
          </Link>
          <Link href="/simulator" className={styles['button-secondary']}>
            Try Simulator
          </Link>
        </div>
      </section>
    </div>
  );
}
