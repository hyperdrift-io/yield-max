import type { Metadata } from 'next';
import Link from 'next/link';
import { getProtocols } from '../src/api/protocols';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'YieldMax - Compare Yield Aggregators',
  description: 'Discover and compare the best yield aggregators in DeFi'
};

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

      <section className={styles['protocols-list']}>
        <div className={styles['section-header']}>
          <h2>Top Yield Protocols</h2>
          <Link href="/compare" className={styles['view-all']}>View all</Link>
        </div>

        <div className={styles['filter-container']}>
          <button className={styles['filter-button']}>Show Advanced Filters</button>
        </div>

        <div className={styles['protocol-table']}>
          <div className={styles['table-header']}>
            <div className={styles['header-cell']}>PROTOCOL</div>
            <div className={styles['header-cell']}>APY</div>
            <div className={styles['header-cell']}>TVL</div>
            <div className={styles['header-cell']}>SAFETY</div>
            <div className={styles['header-cell']}>EASE OF USE</div>
            <div className={styles['header-cell']}>CHAINS</div>
            <div className={styles['header-cell']}>ACTION</div>
          </div>

          {protocols.slice(0, 8).map((protocol) => (
            <div key={protocol.id} className={styles['table-row']}>
              <div className={styles['protocol-cell']}>
                <div className={styles['protocol-logo']}></div>
                <div className={styles['protocol-name']}>{protocol.name}</div>
              </div>
              <div className={styles.cell}>{protocol.apy}%</div>
              <div className={styles.cell}>${protocol.tvl || '500,000,000'}</div>
              <div className={styles.cell}>
                <div className={styles['score-bar']}>
                  <div className={styles['score-fill']} style={{width: `${protocol.safetyScore || 78}%`}}></div>
                </div>
                <span>{protocol.safetyScore || 78}</span>
              </div>
              <div className={styles.cell}>
                <div className={styles['score-bar']}>
                  <div className={styles['score-fill-alt']} style={{width: `${protocol.easeOfUse || 76}%`}}></div>
                </div>
                <span>{protocol.easeOfUse || 76}</span>
              </div>
              <div className={styles.cell}>
                <div className={styles['chain-icons']}>
                  {(protocol.metadata?.chains || ['ETH']).map((chain, i) => (
                    <span key={i} className={styles['chain-icon']}>{chain.substring(0, 3)}</span>
                  ))}
                </div>
              </div>
              <div className={styles.cell}>
                <Link href={`/protocol/${protocol.id}`} className={styles['view-details']}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles['features-section']}>
        <h2>Why Choose YieldMax?</h2>
        <p className={styles['section-subtitle']}>We provide comprehensive tools to help you make the best yield farming decisions</p>

        <div className={styles['features-grid']}>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}></div>
            <h3>Safety First</h3>
            <p>We analyze every protocol's security, vulnerabilities, audit history, and more to give you accurate safety scores.</p>
          </div>

          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}></div>
            <h3>Accurate Data</h3>
            <p>Real-time updates for APY, TVL, and token price data from trusted sources. Always have the latest information.</p>
          </div>

          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}></div>
            <h3>Yield Simulation</h3>
            <p>Calculate potential yield over any time period with our interactive tools. Compare returns across competing protocols and protocols.</p>
          </div>
        </div>
      </section>

      <section className={styles['faq-preview']}>
        <h2>Find Answers to Your DeFi Questions</h2>
        <p>Get clear information about yield farming, staking, and passive income opportunities in DeFi</p>

        <div className={styles['faq-grid']}>
          <div className={styles['faq-item']}>
            <h3>Which DeFi Protocol Has the Highest Yield?</h3>
            <p>Typically high-yield farms like Alpaca Finance, PancakeSwap, and other newer yield-driven protocols yield higher yields. We continuously monitor protocols based on data.</p>
            <Link href="/compare" className={styles['text-link']}>Compare Protocols →</Link>
          </div>

          <div className={styles['faq-item']}>
            <h3>What Are the Safest DeFi Yield Protocols?</h3>
            <p>Aave, Lido Finance, and Curve tend to rank high for safety. Established protocols with high TVL, thorough audits, battle-tested smart contracts, and clean histories fare best.</p>
            <Link href="/compare?sort=safety" className={styles['text-link']}>View Safest Protocols →</Link>
          </div>

          <div className={styles['faq-item']}>
            <h3>How Much Can I Earn With Yield Farming?</h3>
            <p>Your earnings depend on your investment amount, the protocol's APY, compound frequency, and time invested. Our calculator helps estimate returns.</p>
            <Link href="/simulator" className={styles['text-link']}>Try Simulator →</Link>
          </div>
        </div>

        <div className={styles['faq-cta']}>
          <Link href="/faq" className={styles['text-button']}>View All FAQs</Link>
        </div>
      </section>

      <section className={styles['bottom-cta']}>
        <h2>Ready to maximize your crypto returns?</h2>
        <p>Start comparing DeFi protocols and find the best yield opportunities that match your risk profile.</p>

        <div className={styles['cta-buttons']}>
          <Link href="/compare" className={styles['primary-button']}>Compare Protocols</Link>
          <Link href="/beginner-guide" className={styles['outline-button']}>Read Beginner's Guide</Link>
        </div>
      </section>
    </div>
  );
}
