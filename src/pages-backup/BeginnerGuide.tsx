import { Helmet } from 'react-helmet-async'
import styles from './BeginnerGuide.module.css'
import { Link } from 'react-router-dom'

const BeginnerGuide = () => {
  return (
    <>
      <Helmet>
        <title>Beginner's Guide to DeFi Yield Farming | YieldMax</title>
        <meta name="description" content="Learn the basics of DeFi yield farming with our comprehensive beginner's guide. Understand how to earn passive income with cryptocurrency safely." />
        <meta name="keywords" content="defi beginner, yield farming for beginners, how to start yield farming, crypto passive income, defi tutorial" />
      </Helmet>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Beginner's Guide to DeFi Yield Farming</h1>
          <p className={styles.heroSubtitle}>
            Start your journey to earning passive income with cryptocurrency
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.tableOfContents}>
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ul className={styles.tocList}>
              <li><a href="#what-is-defi">What is DeFi?</a></li>
              <li><a href="#what-is-yield-farming">What is Yield Farming?</a></li>
              <li><a href="#how-yield-works">How Yield Farming Works</a></li>
              <li><a href="#getting-started">Getting Started: Step by Step</a></li>
              <li><a href="#common-strategies">Common Yield Farming Strategies</a></li>
              <li><a href="#risks">Understanding the Risks</a></li>
              <li><a href="#choosing-protocols">How to Choose Safe Protocols</a></li>
              <li><a href="#tools">Tools and Resources</a></li>
            </ul>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.guideSection} id="what-is-defi">
              <h2 className={styles.sectionTitle}>What is DeFi?</h2>
              <div className={styles.sectionContent}>
                <p>Decentralized Finance (DeFi) is an ecosystem of financial applications built on blockchain networks that operates without traditional financial intermediaries like banks or brokerages.</p>

                <p>Think of DeFi as a new financial system that:</p>
                <ul>
                  <li>Is open to anyone with an internet connection</li>
                  <li>Doesn't require trusting a central authority with your money</li>
                  <li>Operates 24/7 without closing hours or holidays</li>
                  <li>Provides innovative financial services through programmable smart contracts</li>
                </ul>

                <div className={styles.infoBox}>
                  <h4>Key DeFi Components</h4>
                  <ul>
                    <li><strong>Smart contracts:</strong> Self-executing code that automatically enforces agreements</li>
                    <li><strong>Decentralized exchanges (DEXs):</strong> Platforms where you can swap tokens without intermediaries</li>
                    <li><strong>Lending protocols:</strong> Platforms where you can lend or borrow crypto assets</li>
                    <li><strong>Stablecoins:</strong> Cryptocurrencies designed to maintain a stable value</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.guideSection} id="what-is-yield-farming">
              <h2 className={styles.sectionTitle}>What is Yield Farming?</h2>
              <div className={styles.sectionContent}>
                <p>Yield farming (also called liquidity mining) is the practice of putting your cryptocurrency assets to work to generate returns. Instead of just holding your crypto in a wallet, you're actively deploying it in various DeFi protocols to earn interest, fees, or additional tokens.</p>

                <div className={styles.comparisonBox}>
                  <div className={styles.comparisonCol}>
                    <h4>Traditional Savings</h4>
                    <ul>
                      <li>Bank holds your money</li>
                      <li>Typically 0.01-1% interest</li>
                      <li>Insured deposits (up to limits)</li>
                      <li>Controlled by financial institutions</li>
                    </ul>
                  </div>
                  <div className={styles.comparisonCol}>
                    <h4>Yield Farming</h4>
                    <ul>
                      <li>Smart contracts hold your assets</li>
                      <li>Potentially 1-20%+ APY (or higher)</li>
                      <li>Generally uninsured (some exceptions)</li>
                      <li>Controlled by code and community governance</li>
                    </ul>
                  </div>
                </div>

                <p>The key yield farming activities include:</p>
                <ul>
                  <li><strong>Lending:</strong> Deposit your crypto as loans to others and earn interest</li>
                  <li><strong>Liquidity provision:</strong> Add your tokens to liquidity pools to facilitate trading and earn a share of trading fees</li>
                  <li><strong>Staking:</strong> Lock up your tokens to support network operations and earn rewards</li>
                  <li><strong>Yield aggregation:</strong> Use platforms that automatically move your assets between protocols to maximize returns</li>
                </ul>
              </div>
            </div>

            <div className={styles.guideSection} id="how-yield-works">
              <h2 className={styles.sectionTitle}>How Yield Farming Works</h2>
              <div className={styles.sectionContent}>
                <p>To understand how yield farming works, let's break down a simple example:</p>

                <div className={styles.exampleBox}>
                  <h4>Example: Providing Liquidity to a DEX</h4>
                  <ol>
                    <li>You deposit equal values of two tokens (e.g., ETH and USDC) into a liquidity pool on a decentralized exchange like Uniswap</li>
                    <li>The platform gives you LP (liquidity provider) tokens representing your share of the pool</li>
                    <li>Traders pay fees to swap between these tokens using the liquidity you provided</li>
                    <li>You earn a portion of these trading fees proportional to your share of the pool</li>
                    <li>Some platforms also reward you with additional governance or incentive tokens</li>
                  </ol>
                </div>

                <h3 className={styles.subSectionTitle}>Understanding APY vs. APR</h3>
                <p>When comparing yield farming opportunities, you'll encounter these terms:</p>
                <ul>
                  <li><strong>APR (Annual Percentage Rate):</strong> The simple annual interest rate without compounding</li>
                  <li><strong>APY (Annual Percentage Yield):</strong> The effective annual rate accounting for compounding effects</li>
                </ul>
                <p>For example: An investment with 10% APR compounded daily would have an APY of approximately 10.52%.</p>

                <div className={styles.alertBox}>
                  <h4>Important Note</h4>
                  <p>APY figures in DeFi are typically projections based on current conditions and may change frequently as market conditions evolve.</p>
                </div>
              </div>
            </div>

            <div className={styles.guideSection} id="getting-started">
              <h2 className={styles.sectionTitle}>Getting Started: Step by Step</h2>
              <div className={styles.sectionContent}>
                <p>Ready to start yield farming? Follow these steps:</p>

                <div className={styles.stepBox}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Set Up a Wallet</h4>
                    <p>Start by creating a self-custody crypto wallet. MetaMask is a popular option for beginners:</p>
                    <ul>
                      <li>Install the MetaMask browser extension or mobile app</li>
                      <li>Create a new wallet and securely save your seed phrase</li>
                      <li>Never share your seed phrase or private keys with anyone</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.stepBox}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Acquire Cryptocurrency</h4>
                    <p>You'll need crypto assets to start yield farming:</p>
                    <ul>
                      <li>Purchase ETH or stablecoins (like USDC) from a reputable exchange</li>
                      <li>Transfer these assets to your wallet</li>
                      <li>For beginners, stablecoins are often recommended to avoid price volatility</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.stepBox}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Research Protocols</h4>
                    <p>Before investing, use YieldMax to compare different protocols:</p>
                    <ul>
                      <li>Check safety ratings and audit information</li>
                      <li>Compare APY rates across different platforms</li>
                      <li>Understand lock-up periods and withdrawal conditions</li>
                      <li>Start with established protocols that have strong security track records</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.stepBox}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Start Small</h4>
                    <p>Begin with a modest amount that you're comfortable risking:</p>
                    <ul>
                      <li>Visit the protocol's website and connect your wallet</li>
                      <li>Approve the token spending (a security feature in your wallet)</li>
                      <li>Deposit your assets according to the platform's instructions</li>
                      <li>Monitor your position to track earnings</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.alertBox}>
                  <h4>Gas Fees</h4>
                  <p>Be aware of transaction (gas) fees, especially on Ethereum. For smaller investments, consider platforms on lower-fee networks like Polygon, Arbitrum, or Optimism.</p>
                </div>
              </div>
            </div>

            <div className={styles.guideSection} id="common-strategies">
              <h2 className={styles.sectionTitle}>Common Yield Farming Strategies</h2>
              <div className={styles.sectionContent}>
                <p>Here are some popular strategies for beginners:</p>

                <div className={styles.strategyCard}>
                  <h4>1. Stablecoin Lending</h4>
                  <p><strong>Risk Level: Low</strong></p>
                  <p><strong>Strategy:</strong> Deposit stablecoins like USDC or DAI into lending platforms.</p>
                  <p><strong>Benefits:</strong> No exposure to crypto price volatility, predictable returns, typically 1-10% APY.</p>
                  <p><strong>Recommended for:</strong> Beginners looking for a low-risk entry point.</p>
                </div>

                <div className={styles.strategyCard}>
                  <h4>2. Stablecoin Liquidity Provision</h4>
                  <p><strong>Risk Level: Low-Medium</strong></p>
                  <p><strong>Strategy:</strong> Provide liquidity to stablecoin pairs (e.g., USDC-DAI).</p>
                  <p><strong>Benefits:</strong> Minimal impermanent loss risk, trading fee income, potentially additional reward tokens.</p>
                  <p><strong>Recommended for:</strong> Those with some DeFi experience seeking slightly higher returns.</p>
                </div>

                <div className={styles.strategyCard}>
                  <h4>3. Single-Asset Staking</h4>
                  <p><strong>Risk Level: Medium</strong></p>
                  <p><strong>Strategy:</strong> Stake ETH or other major tokens on proof-of-stake networks.</p>
                  <p><strong>Benefits:</strong> Relatively simple process, no need to manage token pairs, typically 3-7% APY for major assets.</p>
                  <p><strong>Recommended for:</strong> Long-term holders who already own these assets.</p>
                </div>

                <div className={styles.strategyCard}>
                  <h4>4. Yield Aggregators</h4>
                  <p><strong>Risk Level: Medium</strong></p>
                  <p><strong>Strategy:</strong> Deposit into platforms that automatically move your funds to optimal yield opportunities.</p>
                  <p><strong>Benefits:</strong> Professional management, gas fee optimization, automatic compounding.</p>
                  <p><strong>Recommended for:</strong> Those who want to optimize returns without constant management.</p>
                </div>

                <div className={styles.tipBox}>
                  <h4>Pro Tip</h4>
                  <p>Consider diversifying your yield farming activities across different protocols and strategies to balance risk and reward.</p>
                </div>
              </div>
            </div>

            <div className={styles.guideSection} id="risks">
              <h2 className={styles.sectionTitle}>Understanding the Risks</h2>
              <div className={styles.sectionContent}>
                <p>While yield farming can be rewarding, it's important to understand the potential risks:</p>

                <div className={styles.riskBox}>
                  <h4>Smart Contract Risk</h4>
                  <p>DeFi protocols rely on code that could contain bugs or vulnerabilities, potentially leading to loss of funds if exploited by hackers. Look out for forotocols audited by reputable firms like Certik, OpenZeppelin, or Trail of Bits.</p>
                  <p><strong>How to mitigate:</strong> Choose protocols with multiple security audits and longer track records.</p>
                </div>

                <div className={styles.riskBox}>
                  <h4>Impermanent Loss</h4>
                  <p>When providing liquidity for trading pairs, you may experience losses if the relative prices of the assets change significantly.</p>
                  <p><strong>How to mitigate:</strong> Start with stablecoin pairs or use protocols that offer impermanent loss protection.</p>
                </div>

                <div className={styles.riskBox}>
                  <h4>Market Risk</h4>
                  <p>The value of cryptocurrencies is volatile. Even with high yield, your overall returns could be negative if token prices drop.</p>
                  <p><strong>How to mitigate:</strong> Consider stablecoin strategies or dollar-cost averaging over time.</p>
                </div>

                <div className={styles.riskBox}>
                  <h4>Liquidation Risk</h4>
                  <p>In lending protocols, your collateral could be liquidated if its value falls below required thresholds.</p>
                  <p><strong>How to mitigate:</strong> Maintain healthy collateralization ratios and monitor positions regularly.</p>
                </div>

                <div className={styles.riskBox}>
                  <h4>Rug Pulls & Scams</h4>
                  <p>Some projects may be designed to steal user funds through hidden backdoors or by abandoning the project after collecting investments.</p>
                  <p><strong>How to mitigate:</strong> Stick to established protocols with doxxed teams and solid community reputation.</p>
                </div>

                <div className={styles.alertBox}>
                  <h4>Risk Management Strategy</h4>
                  <p>Only invest what you can afford to lose, especially when starting out. Consider allocating your DeFi investments with a risk pyramid approach: majority in lower-risk options, smaller amounts in higher-risk, higher-reward opportunities.</p>
                </div>
              </div>
            </div>

            <div className={styles.guideSection} id="choosing-protocols">
              <h2 className={styles.sectionTitle}>How to Choose Safe Protocols</h2>
              <div className={styles.sectionContent}>
                <p>Use this checklist when evaluating a DeFi protocol's safety:</p>

                <div className={styles.checklistBox}>
                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Security Audits:</strong> Has the protocol been audited by reputable firms like Certik, OpenZeppelin, or Trail of Bits?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>TVL (Total Value Locked):</strong> Does the protocol have significant assets locked, indicating user trust?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Team Transparency:</strong> Is the team known (doxxed) with verifiable backgrounds?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Track Record:</strong> How long has the protocol operated without security incidents?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Community Size:</strong> Is there an active community discussing the project?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Sustainable Yield Sources:</strong> Can you clearly understand where the yield comes from?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Insurance Coverage:</strong> Is there insurance available for the protocol?
                    </div>
                  </div>

                  <div className={styles.checklistItem}>
                    <input type="checkbox" className={styles.checklistCheckbox} />
                    <div className={styles.checklistText}>
                      <strong>Too Good To Be True?:</strong> Extremely high APYs (&gt;100%) often indicate unsustainable models or higher risk.
                    </div>
                  </div>
                </div>

                <p>YieldMax simplifies this process by providing safety scores that consider these factors. Higher safety scores generally indicate lower-risk protocols.</p>

                <div className={styles.callToAction}>
                  <Link to="/compare" className="button-primary">Compare Protocol Safety Scores</Link>
                </div>
              </div>
            </div>

            <div className={styles.guideSection} id="tools">
              <h2 className={styles.sectionTitle}>Tools and Resources</h2>
              <div className={styles.sectionContent}>
                <p>Beyond YieldMax, here are some useful tools for your yield farming journey:</p>

                <div className={styles.resourcesGrid}>
                  <div className={styles.resourceCard}>
                    <h4>Portfolio Trackers</h4>
                    <ul>
                      <li>DeBank</li>
                      <li>Zapper</li>
                      <li>APY.Vision</li>
                    </ul>
                    <p>Track your DeFi positions across multiple protocols and chains</p>
                  </div>

                  <div className={styles.resourceCard}>
                    <h4>Gas Fee Trackers</h4>
                    <ul>
                      <li>Etherscan Gas Tracker</li>
                      <li>Gas Now</li>
                    </ul>
                    <p>Monitor gas prices to time your transactions for lower fees</p>
                  </div>

                  <div className={styles.resourceCard}>
                    <h4>Risk Assessment</h4>
                    <ul>
                      <li>DeFi Safety</li>
                      <li>Rugdoc</li>
                    </ul>
                    <p>Third-party risk assessments of DeFi protocols</p>
                  </div>

                  <div className={styles.resourceCard}>
                    <h4>DeFi News</h4>
                    <ul>
                      <li>DeFi Pulse</li>
                      <li>DeFi Llama</li>
                      <li>The Defiant</li>
                    </ul>
                    <p>Stay updated on the latest developments in DeFi</p>
                  </div>
                </div>

                <div className={styles.tipBox}>
                  <h4>Learning Resources</h4>
                  <p>Continue your DeFi education with these resources:</p>
                  <ul>
                    <li>Finematics YouTube channel - Visual explanations of DeFi concepts</li>
                    <li>DeFi Dad tutorials - Step-by-step guides for using protocols</li>
                    <li>Bankless podcast - In-depth discussions on DeFi developments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.conclusionSection}>
              <h2>Ready to Start Your Yield Farming Journey?</h2>
              <p>DeFi yield farming offers exciting opportunities to earn passive income with your crypto assets. Remember to start small, prioritize safety, and gradually expand your knowledge and portfolio.</p>
              <p>YieldMax is here to help you find the right protocols for your risk tolerance and investment goals.</p>

              <div className={styles.finalCta}>
                <Link to="/compare" className="button-primary">Compare Yield Opportunities</Link>
                <Link to="/simulator" className="button-secondary">Calculate Potential Returns</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BeginnerGuide
