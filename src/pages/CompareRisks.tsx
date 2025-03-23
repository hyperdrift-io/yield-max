import { Helmet } from 'react-helmet-async'
import styles from './CompareRisks.module.css'
import { Link } from 'react-router-dom'

const CompareRisks = () => {
  // Sample risk data for different protocol types
  const protocolTypes = [
    {
      name: 'Lending Platforms',
      examples: 'Aave, Compound, Maple',
      riskLevel: 'Low to Medium',
      safetyScore: '7-9',
      benefits: [
        'Relatively stable yields',
        'Clear revenue model from borrower interest',
        'Usually well-audited',
        'Typically no impermanent loss'
      ],
      risks: [
        'Smart contract risk',
        'Liquidation risk when borrowing',
        'Interest rate volatility',
        'Potential governance attacks'
      ],
      bestFor: 'Conservative yield seekers looking for steady returns with manageable risk'
    },
    {
      name: 'Liquidity Pools (DEXs)',
      examples: 'Uniswap, Curve, Balancer',
      riskLevel: 'Medium',
      safetyScore: '6-8',
      benefits: [
        'Trading fee income',
        'Potential for additional reward tokens',
        'High liquidity for major assets',
        'Transparency in operation'
      ],
      risks: [
        'Impermanent loss',
        'Smart contract risk',
        'Market volatility exposure',
        'Competition leading to yield reduction'
      ],
      bestFor: 'Traders willing to accept some volatility for potentially higher returns'
    },
    {
      name: 'Yield Aggregators',
      examples: 'Yearn Finance, Beefy, Pickle',
      riskLevel: 'Medium to High',
      safetyScore: '5-7',
      benefits: [
        'Automated yield optimization',
        'Professional management',
        'Gas efficiency through batching',
        'Diversification across strategies'
      ],
      risks: [
        'Strategy complexity risks',
        'Multiple layers of smart contract risk',
        'Higher management fees',
        'Potential for strategy failures'
      ],
      bestFor: 'Experienced users who want active yield management without manual rebalancing'
    },
    {
      name: 'Staking Protocols',
      examples: 'Ethereum 2.0, Cosmos, Polkadot',
      riskLevel: 'Low to Medium',
      safetyScore: '7-9',
      benefits: [
        'Support network security',
        'Predictable rewards',
        'No impermanent loss',
        'Often native to blockchain'
      ],
      risks: [
        'Lock-up periods',
        'Slashing risk for validator issues',
        'Network adoption risk',
        'Lower yields compared to other strategies'
      ],
      bestFor: 'Long-term holders who want to earn yield while supporting blockchain infrastructure'
    },
    {
      name: 'Options/Derivatives Platforms',
      examples: 'Ribbon Finance, Opyn, dYdX',
      riskLevel: 'High',
      safetyScore: '4-6',
      benefits: [
        'Potentially high yields',
        'Market-neutral strategies available',
        'Unique yield mechanisms',
        'Less correlated to direct price movements'
      ],
      risks: [
        'Complex mechanisms',
        'High volatility in returns',
        'Additional market risks',
        'Usually lower total value locked (TVL)'
      ],
      bestFor: 'Sophisticated users with risk appetite and understanding of options markets'
    }
  ]

  // Risk mitigation strategies
  const mitigationStrategies = [
    {
      risk: 'Smart Contract Risk',
      strategies: [
        'Use protocols that have undergone multiple security audits',
        'Prioritize protocols with longer track records of security',
        'Consider protocols with bug bounty programs',
        'Look for insurance coverage options through platforms like Nexus Mutual'
      ]
    },
    {
      risk: 'Impermanent Loss',
      strategies: [
        'Focus on correlated asset pairs like stablecoin pairs',
        'Use protocols that offer impermanent loss protection',
        'Consider single-sided staking options instead',
        'Only provide liquidity for assets you plan to hold long-term anyway'
      ]
    },
    {
      risk: 'Market Volatility',
      strategies: [
        'Use stablecoins for more predictable yield',
        'Implement dollar-cost averaging for entry and exit',
        'Diversify across different protocol types',
        'Set stop-loss strategies for volatile positions'
      ]
    },
    {
      risk: 'Liquidation Risk',
      strategies: [
        'Maintain conservative collateralization ratios',
        'Regularly monitor positions',
        'Use platforms with gradual liquidation mechanisms',
        'Set up alerts for approaching liquidation thresholds'
      ]
    },
    {
      risk: 'Governance/Economic Risk',
      strategies: [
        'Research tokenomics and emission schedules',
        'Check governance voting history for responsible decision-making',
        'Verify team backgrounds and incentive alignment',
        'Avoid protocols with concentrated token ownership'
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Comparing DeFi Yield Farming Risks and Benefits | YieldMax</title>
        <meta name="description" content="Compare the risks and benefits of different DeFi yield farming strategies. Learn how to protect your investments and find the right balance of risk and reward." />
        <meta name="keywords" content="defi risks, yield farming safety, crypto yield comparison, defi security, defi risk management" />
      </Helmet>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Understanding Yield Farming Risks & Benefits</h1>
          <p className={styles.heroSubtitle}>
            Make informed decisions by comparing different protocols and risk factors
          </p>
        </div>
      </section>

      <section className={styles.navSection}>
        <div className={styles.container}>
          <div className={styles.navLinks}>
            <a href="#protocol-comparison" className={styles.navLink}>Protocol Types</a>
            <a href="#risk-factors" className={styles.navLink}>Risk Factors</a>
            <a href="#mitigation-strategies" className={styles.navLink}>Risk Mitigation</a>
            <a href="#safety-metrics" className={styles.navLink}>Safety Metrics</a>
          </div>
        </div>
      </section>

      <section id="protocol-comparison" className={styles.comparisonSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Protocol Type Comparison</h2>
          <p className={styles.sectionIntro}>
            Different types of DeFi protocols come with their own risk and reward profiles.
            Understanding these differences can help you build a portfolio that aligns with your risk tolerance.
          </p>

          <div className={styles.protocolCards}>
            {protocolTypes.map((protocol, index) => (
              <div key={index} className={styles.protocolCard}>
                <div className={styles.protocolHeader}>
                  <h3 className={styles.protocolName}>{protocol.name}</h3>
                  <div className={styles.protocolMeta}>
                    <span className={styles.riskBadge} style={{
                      backgroundColor:
                        protocol.riskLevel.includes('Low') ? 'rgba(var(--color-success-rgb), 0.1)' :
                        protocol.riskLevel.includes('Medium') ? 'rgba(var(--color-warning-rgb), 0.1)' :
                        'rgba(var(--color-danger-rgb), 0.1)',
                      color:
                        protocol.riskLevel.includes('Low') ? 'var(--color-success)' :
                        protocol.riskLevel.includes('Medium') ? 'var(--color-warning)' :
                        'var(--color-danger)'
                    }}>
                      {protocol.riskLevel}
                    </span>
                    <span className={styles.safetyScore}>
                      Safety Score: {protocol.safetyScore}/10
                    </span>
                  </div>
                </div>

                <div className={styles.protocolExamples}>
                  <strong>Examples:</strong> {protocol.examples}
                </div>

                <div className={styles.benefitsRisksContainer}>
                  <div className={styles.benefitsBox}>
                    <h4 className={styles.listTitle}>Benefits</h4>
                    <ul className={styles.benefitsList}>
                      {protocol.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.risksBox}>
                    <h4 className={styles.listTitle}>Risks</h4>
                    <ul className={styles.risksList}>
                      {protocol.risks.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.bestFor}>
                  <strong>Best for:</strong> {protocol.bestFor}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.compareAction}>
            <Link to="/compare" className="button-primary">Compare Specific Protocols</Link>
          </div>
        </div>
      </section>

      <section id="risk-factors" className={styles.riskFactorsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Understanding DeFi Risk Factors</h2>
          <p className={styles.sectionIntro}>
            Yield farming comes with various types of risks that should be understood before investing.
            These risks can vary in importance based on the protocol type and your investment strategy.
          </p>

          <div className={styles.riskMatrix}>
            <div className={styles.riskMatrixHeader}>
              <div className={styles.riskMatrixCorner}></div>
              <div className={styles.riskMatrixHeading}>Impact</div>
              <div className={styles.riskMatrixHeading}>Likelihood</div>
              <div className={styles.riskMatrixHeading}>Mitigation Potential</div>
            </div>

            <div className={styles.riskMatrixRow}>
              <div className={styles.riskMatrixType}>Smart Contract Risk</div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '90%'}}></div>
                <span>High</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '40%'}}></div>
                <span>Medium-Low</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '70%'}}></div>
                <span>Medium-High</span>
              </div>
            </div>

            <div className={styles.riskMatrixRow}>
              <div className={styles.riskMatrixType}>Impermanent Loss</div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '60%'}}></div>
                <span>Medium</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '80%'}}></div>
                <span>High</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '80%'}}></div>
                <span>High</span>
              </div>
            </div>

            <div className={styles.riskMatrixRow}>
              <div className={styles.riskMatrixType}>Market Risk</div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '70%'}}></div>
                <span>Medium-High</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '90%'}}></div>
                <span>High</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '60%'}}></div>
                <span>Medium</span>
              </div>
            </div>

            <div className={styles.riskMatrixRow}>
              <div className={styles.riskMatrixType}>Liquidation Risk</div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '80%'}}></div>
                <span>High</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '50%'}}></div>
                <span>Medium</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '90%'}}></div>
                <span>High</span>
              </div>
            </div>

            <div className={styles.riskMatrixRow}>
              <div className={styles.riskMatrixType}>Tokenomic Design Risk</div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '75%'}}></div>
                <span>Medium-High</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '60%'}}></div>
                <span>Medium</span>
              </div>
              <div className={styles.riskMatrixCell}>
                <div className={styles.riskBar} style={{width: '40%'}}></div>
                <span>Medium-Low</span>
              </div>
            </div>
          </div>

          <div className={styles.riskFactorsNote}>
            <h3>Yield Farming Risk Breakdown</h3>
            <ul className={styles.riskFactorsList}>
              <li>
                <strong>Smart Contract Risk:</strong> The potential for bugs or vulnerabilities in the protocol's code.
                High impact but relatively rare in audited protocols.
                Look out for forotocols audited by reputable firms like Certik, OpenZeppelin, or Trail of Bits.
              </li>
              <li>
                <strong>Impermanent Loss:</strong> The loss experienced when providing liquidity to trading pairs where assets change in relative value.
                Very common but can be mitigated through careful asset selection.
              </li>
              <li>
                <strong>Market Risk:</strong> Exposure to general market volatility and price fluctuations.
                Unavoidable but can be managed through diversification and stablecoin strategies.
              </li>
              <li>
                <strong>Liquidation Risk:</strong> The risk of having collateral liquidated in lending protocols if value falls below required thresholds.
                Highly impactful but can be managed with conservative ratios.
              </li>
              <li>
                <strong>Tokenomic Design Risk:</strong> Flaws in tokenomics, governance, or incentive structures that could lead to protocol failure.
                Often overlooked but harder to mitigate through individual actions.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="mitigation-strategies" className={styles.mitigationSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Risk Mitigation Strategies</h2>
          <p className={styles.sectionIntro}>
            While you can't eliminate risk entirely, these strategies can help you reduce your exposure
            and build a more resilient yield farming portfolio.
          </p>

          <div className={styles.mitigationCards}>
            {mitigationStrategies.map((item, index) => (
              <div key={index} className={styles.mitigationCard}>
                <h3 className={styles.mitigationTitle}>{item.risk}</h3>
                <ul className={styles.mitigationStrategiesList}>
                  {item.strategies.map((strategy, i) => (
                    <li key={i}>{strategy}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.portfolioAllocationBox}>
            <h3>Recommended Portfolio Allocation Based on Risk Tolerance</h3>

            <div className={styles.allocationContainer}>
              <div className={styles.allocationBox}>
                <h4>Conservative</h4>
                <div className={styles.allocationChart}>
                  <div className={styles.allocationBar} style={{height: '70%', backgroundColor: 'var(--color-success)'}}>
                    <span className={styles.allocationPercent}>70%</span>
                    <span className={styles.allocationType}>Low Risk</span>
                  </div>
                  <div className={styles.allocationBar} style={{height: '25%', backgroundColor: 'var(--color-warning)'}}>
                    <span className={styles.allocationPercent}>25%</span>
                    <span className={styles.allocationType}>Medium Risk</span>
                  </div>
                  <div className={styles.allocationBar} style={{height: '5%', backgroundColor: 'var(--color-danger)'}}>
                    <span className={styles.allocationPercent}>5%</span>
                    <span className={styles.allocationType}>High Risk</span>
                  </div>
                </div>
                <p>Focus on stablecoin lending and established protocols with strong security track records.</p>
              </div>

              <div className={styles.allocationBox}>
                <h4>Moderate</h4>
                <div className={styles.allocationChart}>
                  <div className={styles.allocationBar} style={{height: '40%', backgroundColor: 'var(--color-success)'}}>
                    <span className={styles.allocationPercent}>40%</span>
                    <span className={styles.allocationType}>Low Risk</span>
                  </div>
                  <div className={styles.allocationBar} style={{height: '50%', backgroundColor: 'var(--color-warning)'}}>
                    <span className={styles.allocationPercent}>50%</span>
                    <span className={styles.allocationType}>Medium Risk</span>
                  </div>
                  <div className={styles.allocationBar} style={{height: '10%', backgroundColor: 'var(--color-danger)'}}>
                    <span className={styles.allocationPercent}>10%</span>
                    <span className={styles.allocationType}>High Risk</span>
                  </div>
                </div>
                <p>Balanced approach with liquidity provision in established DEXs and some yield aggregator exposure.</p>
              </div>

              <div className={styles.allocationBox}>
                <h4>Aggressive</h4>
                <div className={styles.allocationChart}>
                  <div className={styles.allocationBar} style={{height: '20%', backgroundColor: 'var(--color-success)'}}>
                    <span className={styles.allocationPercent}>20%</span>
                    <span className={styles.allocationType}>Low Risk</span>
                  </div>
                  <div className={styles.allocationBar} style={{height: '45%', backgroundColor: 'var(--color-warning)'}}>
                    <span className={styles.allocationPercent}>45%</span>
                    <span className={styles.allocationType}>Medium Risk</span>
                  </div>
                  <div className={styles.allocationBar} style={{height: '35%', backgroundColor: 'var(--color-danger)'}}>
                    <span className={styles.allocationPercent}>35%</span>
                    <span className={styles.allocationType}>High Risk</span>
                  </div>
                </div>
                <p>Higher allocation to yield aggregators, options strategies, and newer protocols with growth potential.</p>
              </div>
            </div>

            <div className={styles.allocationNote}>
              <strong>Note:</strong> These are general guidelines. Your personal allocation should also consider your investment timeline,
              financial goals, and existing crypto portfolio.
            </div>
          </div>
        </div>
      </section>

      <section id="safety-metrics" className={styles.metricsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Understanding Our Safety Metrics</h2>
          <p className={styles.sectionIntro}>
            YieldMax's proprietary safety scores are calculated using multiple factors that help assess
            the relative risk of different protocols. Here's how we evaluate safety:
          </p>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Security Audits</h3>
              <p>We evaluate the number, recency, and reputation of security audits performed on the protocol's smart contracts.</p>
              <div className={styles.metricWeight}>Weight: 25%</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Track Record</h3>
              <p>We assess how long the protocol has been operating without security incidents or significant exploits.</p>
              <div className={styles.metricWeight}>Weight: 20%</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3>Total Value Locked</h3>
              <p>The amount of capital deposited in a protocol often indicates market trust and provides greater security scrutiny.</p>
              <div className={styles.metricWeight}>Weight: 15%</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3>Team & Governance</h3>
              <p>We evaluate team experience, transparency, and the quality of governance processes.</p>
              <div className={styles.metricWeight}>Weight: 15%</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3>Tokenomic Design</h3>
              <p>We analyze tokenomics, revenue models, and sustainability of yield sources to assess long-term viability.</p>
              <div className={styles.metricWeight}>Weight: 15%</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Protocol Complexity</h3>
              <p>More complex protocols with multiple dependencies and interconnections typically carry higher risk.</p>
              <div className={styles.metricWeight}>Weight: 10%</div>
            </div>
          </div>

          <div className={styles.safetyScoreBox}>
            <h3>How to Interpret Safety Scores</h3>
            <div className={styles.scoreRanges}>
              <div className={styles.scoreRange}>
                <div className={styles.scoreRangeBar} style={{backgroundColor: 'var(--color-success)'}}></div>
                <div className={styles.scoreRangeInfo}>
                  <span className={styles.scoreRangeValue}>8-10</span>
                  <span className={styles.scoreRangeDesc}>Highest safety - Established protocols with excellent security records</span>
                </div>
              </div>

              <div className={styles.scoreRange}>
                <div className={styles.scoreRangeBar} style={{backgroundColor: 'var(--color-success-light)'}}></div>
                <div className={styles.scoreRangeInfo}>
                  <span className={styles.scoreRangeValue}>7-8</span>
                  <span className={styles.scoreRangeDesc}>Very safe - Strong protocols with good track records</span>
                </div>
              </div>

              <div className={styles.scoreRange}>
                <div className={styles.scoreRangeBar} style={{backgroundColor: 'var(--color-warning-light)'}}></div>
                <div className={styles.scoreRangeInfo}>
                  <span className={styles.scoreRangeValue}>5-7</span>
                  <span className={styles.scoreRangeDesc}>Moderate safety - Generally reliable but with some risk factors</span>
                </div>
              </div>

              <div className={styles.scoreRange}>
                <div className={styles.scoreRangeBar} style={{backgroundColor: 'var(--color-warning)'}}></div>
                <div className={styles.scoreRangeInfo}>
                  <span className={styles.scoreRangeValue}>3-5</span>
                  <span className={styles.scoreRangeDesc}>Speculative - Higher risk protocols with potential for higher returns</span>
                </div>
              </div>

              <div className={styles.scoreRange}>
                <div className={styles.scoreRangeBar} style={{backgroundColor: 'var(--color-danger)'}}></div>
                <div className={styles.scoreRangeInfo}>
                  <span className={styles.scoreRangeValue}>0-3</span>
                  <span className={styles.scoreRangeDesc}>High risk - New or unproven protocols with significant uncertainty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to find the right balance of risk and reward?</h2>
            <p className={styles.ctaText}>
              Use our tools to compare protocols based on your personal risk tolerance and yield goals.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/compare" className="button-primary">Compare Protocols</Link>
              <Link to="/simulator" className="button-secondary">Try Risk-Adjusted Return Simulator</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompareRisks
