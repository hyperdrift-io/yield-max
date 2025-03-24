import { Helmet } from 'react-helmet-async'
import styles from './FAQ.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// Define FAQ items for each page
const faqPages = [
  // Page 1
  [
    {
      question: "What is DeFi yield farming?",
      answer: (
        <>
          <p>Yield farming is a way to earn passive income by putting your cryptocurrency to work. Rather than leaving your assets sitting idle in your wallet, you can deposit them in DeFi protocols to earn interest, fees, or rewards.</p>
          <p>When you participate in yield farming, you're essentially lending your crypto assets to others through smart contracts, providing liquidity to decentralized exchanges, or staking your tokens to support network operations.</p>
          <p>The returns you earn are typically expressed as Annual Percentage Yield (APY), which shows your potential yearly returns including the effect of compound interest.</p>
          <p>To get started, check out our <Link to="/simulator">Yield Simulator</Link> to see how much you could earn.</p>
        </>
      )
    },
    {
      question: "Which DeFi protocols offer the highest yields?",
      answer: (
        <>
          <p>The highest-yielding DeFi protocols change frequently as market conditions evolve. Currently, some protocols offering competitive yields include:</p>
          <ul>
            <li>Lending platforms like Aave and Compound</li>
            <li>Liquidity pools on decentralized exchanges like Uniswap and Curve Finance</li>
            <li>Yield aggregators like Yearn Finance</li>
            <li>Newer protocols that offer incentives to attract liquidity</li>
          </ul>
          <p>However, it's important to remember that higher yields often come with higher risks. Before chasing the highest APY, consider factors like protocol security, audit history, and sustainable tokenomics.</p>
          <p>Our <Link to="/">Home page</Link> always shows the current highest APY protocol, and you can use our <Link to="/compare">Compare tool</Link> to see all protocols ranked by yield.</p>
        </>
      )
    },
    {
      question: "How safe are DeFi yield farming protocols?",
      answer: (
        <>
          <p>DeFi protocols have varying levels of safety, which is why we've created our proprietary safety score to help you assess risk. Some key factors that affect protocol safety include:</p>
          <ul>
            <li><strong>Code Audits:</strong> Has the protocol been audited by reputable security firms?</li>
            <li><strong>Track Record:</strong> How long has the protocol been operating without incidents?</li>
            <li><strong>TVL (Total Value Locked):</strong> Larger protocols often have more scrutiny and security testing</li>
            <li><strong>Team:</strong> Is the team known (doxxed) or anonymous?</li>
            <li><strong>Insurance Coverage:</strong> Is there insurance available for the protocol?</li>
          </ul>
          <p>Remember that even the safest DeFi protocols carry risks like smart contract vulnerabilities, so never invest more than you can afford to lose.</p>
          <p>Check our <Link to="/compare">Protocol Comparison</Link> page to see safety ratings for all major platforms.</p>
        </>
      )
    },
    {
      question: "How much can I earn from yield farming?",
      answer: (
        <>
          <p>Your earnings from yield farming depend on several factors:</p>
          <ul>
            <li>The amount you invest</li>
            <li>The APY (Annual Percentage Yield) of the protocol</li>
            <li>How long you keep your assets deposited</li>
            <li>Whether you reinvest (compound) your earnings</li>
            <li>Market conditions and token price fluctuations</li>
          </ul>
          <p>Currently, DeFi yields typically range from 1-20% APY for stable assets like stablecoins, and can be higher for riskier assets or new protocols offering incentives.</p>
          <p>Use our <Link to="/simulator">Yield Simulator</Link> to calculate potential returns based on your investment amount and time horizon.</p>
        </>
      )
    },
    {
      question: "What is the difference between staking and yield farming?",
      answer: (
        <>
          <p>While both staking and yield farming generate passive income from your crypto assets, they work differently:</p>
          <p><strong>Staking:</strong></p>
          <ul>
            <li>Involves locking up tokens to support network operations</li>
            <li>Typically used in Proof-of-Stake blockchains</li>
            <li>Generally considered lower risk</li>
            <li>Often has a lockup period</li>
            <li>Returns are more predictable and stable</li>
          </ul>
          <p><strong>Yield Farming:</strong></p>
          <ul>
            <li>Involves providing liquidity or lending assets to DeFi protocols</li>
            <li>Often requires more active management</li>
            <li>Generally higher risk but potentially higher returns</li>
            <li>May involve multiple tokens and complex strategies</li>
            <li>Returns can fluctuate significantly</li>
          </ul>
          <p>Many users incorporate both staking and yield farming in their overall strategy to balance risk and return.</p>
        </>
      )
    }
  ],
  // Page 2
  [
    {
      question: "What are the risks of yield farming?",
      answer: (
        <>
          <p>Yield farming involves several types of risks that you should understand before starting:</p>
          <ul>
            <li><strong>Smart Contract Risk:</strong> Vulnerabilities in the protocol's code that could lead to funds being hacked</li>
            <li><strong>Impermanent Loss:</strong> Potential losses when providing liquidity to trading pairs that change in relative value</li>
            <li><strong>Token Price Risk:</strong> The value of reward tokens may drop, offsetting your yield gains</li>
            <li><strong>Liquidation Risk:</strong> In lending protocols, your collateral could be liquidated if its value drops</li>
            <li><strong>Gas Costs:</strong> High Ethereum gas fees can eat into profits, especially for smaller investments</li>
            <li><strong>Protocol Risk:</strong> Governance decisions or <span className={styles.tooltipContainer}>Tokenomic Design<span className={styles.tooltip}>The economic model of a token, including its supply, distribution, inflation/deflation mechanisms, and utility within its ecosystem.</span></span> flaws that affect the platform</li>
          </ul>
          <p>We recommend starting with established protocols that have strong safety records, and only investing funds you can afford to lose.</p>
        </>
      )
    },
    {
      question: "How do I get started with yield farming?",
      answer: (
        <>
          <p>Getting started with yield farming is simpler than you might think:</p>
          <ol>
            <li><strong>Set up a wallet:</strong> Create a non-custodial wallet like MetaMask or Trust Wallet</li>
            <li><strong>Buy cryptocurrency:</strong> Purchase crypto on an exchange and transfer it to your wallet</li>
            <li><strong>Research protocols:</strong> Use YieldMax to compare protocols and find one that matches your risk tolerance</li>
            <li><strong>Connect your wallet:</strong> Visit the protocol's website and connect your wallet</li>
            <li><strong>Deposit funds:</strong> Follow the protocol's instructions to deposit your assets</li>
            <li><strong>Monitor your position:</strong> Keep track of your yields and adjust as needed</li>
          </ol>
          <p>For beginners, we recommend starting with user-friendly platforms like Aave or Compound that offer stable returns on mainstream assets like ETH or stablecoins.</p>
          <p>Check our <Link to="/compare">Compare page</Link> to find beginner-friendly platforms with strong safety ratings.</p>
        </>
      )
    },
    {
      question: "What are stablecoins and why are they popular for yield farming?",
      answer: (
        <>
          <p>Stablecoins are cryptocurrencies designed to maintain a stable value, typically pegged to a fiat currency like the US dollar. Popular stablecoins include USDC, USDT, and DAI.</p>
          <p>They're popular for yield farming for several reasons:</p>
          <ul>
            <li><strong>Price Stability:</strong> You don't have to worry about crypto market volatility affecting your principal</li>
            <li><strong>Predictable Returns:</strong> The APY you see is the actual return you can expect (minus any fees)</li>
            <li><strong>No Impermanent Loss:</strong> When providing liquidity for stablecoin pairs, impermanent loss is minimized</li>
            <li><strong>Easier Comparison:</strong> It's simpler to compare yields across different platforms</li>
          </ul>
          <p>Many beginners start with stablecoin yield farming as a lower-risk entry point to DeFi.</p>
          <p>Use our <Link to="/compare">Protocol Comparison</Link> to filter for platforms that accept stablecoin deposits.</p>
        </>
      )
    },
    {
      question: "What is impermanent loss and how can I avoid it?",
      answer: (
        <>
          <p>Impermanent loss occurs when you provide liquidity to a trading pair in a decentralized exchange, and the price ratio between the two assets changes compared to when you deposited them.</p>
          <p>For example, if you provide ETH-USDC liquidity and ETH doubles in price, you would have been better off just holding the assets instead of providing liquidity (unless the trading fees compensate for this loss).</p>
          <p>Ways to minimize impermanent loss:</p>
          <ul>
            <li><strong>Choose correlated asset pairs:</strong> Like stablecoin pairs (USDC-USDT) that move together</li>
            <li><strong>Use impermanent loss protection:</strong> Some protocols offer features to protect against these losses</li>
            <li><strong>Consider single-sided staking:</strong> Alternatives that don't require providing liquidity pairs</li>
            <li><strong>Focus on high-fee pools:</strong> Where trading fees might offset potential impermanent loss</li>
          </ul>
          <p>Our <Link to="/simulator">Yield Simulator</Link> includes impermanent loss calculations to help you understand the potential impact.</p>
        </>
      )
    },
    {
      question: "How do gas fees affect yield farming profitability?",
      answer: (
        <>
          <p>Gas fees are transaction costs on blockchains like Ethereum, and they can significantly impact yield farming profitability, especially for smaller investments.</p>
          <p>Consider these factors when evaluating gas costs:</p>
          <ul>
            <li><strong>Investment Size:</strong> Larger investments can better absorb gas costs</li>
            <li><strong>Frequency of Transactions:</strong> More frequent compounding means more gas fees</li>
            <li><strong>Network Congestion:</strong> Gas prices are higher during peak usage times</li>
            <li><strong>Layer 2 Solutions:</strong> Networks like Polygon, Arbitrum, or Optimism offer lower gas fees</li>
            <li><strong>Gas Optimization:</strong> Some protocols optimize for gas efficiency</li>
          </ul>
          <p>A general rule of thumb: if gas fees exceed 1% of your investment amount, consider waiting for lower gas prices or using a different network.</p>
          <p>Our <Link to="/simulator">Yield Simulator</Link> can help you estimate the impact of gas fees on your returns.</p>
        </>
      )
    }
  ],
  // Page 3
  [
    {
      question: "What are the tax implications of yield farming?",
      answer: (
        <>
          <p>Tax treatment of yield farming varies by country, but generally:</p>
          <ul>
            <li><strong>Interest/Rewards:</strong> Usually treated as income and taxed at your regular income tax rate</li>
            <li><strong>Capital Gains:</strong> Any appreciation in token value is typically subject to capital gains tax when you sell</li>
            <li><strong>Liquidity Provision:</strong> May have complex tax implications, especially with impermanent loss</li>
            <li><strong>Network Rewards:</strong> Staking rewards may be treated as income or capital gains depending on your jurisdiction</li>
          </ul>
          <p>It's important to keep detailed records of all your yield farming activities, including deposits, withdrawals, rewards, and fees paid. Consider using specialized crypto tax software or consulting with a tax professional familiar with cryptocurrency.</p>
        </>
      )
    },
    {
      question: "Are there insurance options for yield farming?",
      answer: (
        <>
          <p>Yes, several DeFi insurance protocols have emerged to provide coverage against certain risks:</p>
          <ul>
            <li><strong>Nexus Mutual:</strong> Offers coverage against smart contract failures</li>
            <li><strong>InsurAce:</strong> Provides coverage for protocol hacks and stablecoin de-pegging</li>
            <li><strong>Bridge Mutual:</strong> Coverage for exchange hacks, stablecoins, and smart contracts</li>
            <li><strong>Unslashed Finance:</strong> Insurance against technical and financial risks</li>
          </ul>
          <p>Insurance premiums typically range from 2-10% annually of the covered amount, depending on the protocol's risk assessment. While this reduces your effective yield, it can provide significant peace of mind, especially for larger investments.</p>
        </>
      )
    },
    {
      question: "What are yield aggregators and how do they work?",
      answer: (
        <>
          <p>Yield aggregators are protocols that automatically move your funds between different DeFi platforms to maximize returns. They work by:</p>
          <ul>
            <li>Automatically finding the highest-yielding opportunities across multiple protocols</li>
            <li>Handling complex transactions and gas optimization</li>
            <li>Compounding rewards regularly to maximize returns</li>
            <li>Often implementing complex strategies that would be difficult for individuals to manage</li>
          </ul>
          <p>Popular yield aggregators include Yearn Finance, Beefy Finance, and Harvest Finance. These platforms typically charge a performance fee on your earnings (often 5-20%) in exchange for their services.</p>
          <p>Yield aggregators are particularly useful for users who want to optimize returns without constant monitoring and rebalancing of their positions.</p>
        </>
      )
    },
    {
      question: "How do lending protocols work in DeFi?",
      answer: (
        <>
          <p>Lending protocols in DeFi allow users to earn interest by lending their crypto assets to others. The basic process works like this:</p>
          <ul>
            <li><strong>Depositing Assets:</strong> You deposit crypto into a lending pool</li>
            <li><strong>Interest Accrual:</strong> You start earning interest immediately, which is funded by borrowers</li>
            <li><strong>Over-collateralization:</strong> Most DeFi lending requires borrowers to deposit more collateral than they borrow (typically 125-200%)</li>
            <li><strong>Liquidation:</strong> If a borrower's collateral value falls below the required threshold, they're liquidated to protect lenders</li>
          </ul>
          <p>Popular lending protocols include Aave, Compound, and Maker. These platforms are often considered among the safest yield opportunities in DeFi due to their overcollateralized model and established security practices.</p>
        </>
      )
    },
    {
      question: "What's the difference between APY and APR?",
      answer: (
        <>
          <p>APY (Annual Percentage Yield) and APR (Annual Percentage Rate) are both ways to express interest rates, but they differ in how they account for compounding:</p>
          <ul>
            <li><strong>APR:</strong> Simple annual interest rate without accounting for compounding</li>
            <li><strong>APY:</strong> Effective annual rate that includes the effect of compounding</li>
          </ul>
          <p>For example, a 10% APR compounded daily would result in approximately 10.52% APY. The more frequently interest is compounded, the greater the difference between APR and APY.</p>
          <p>In DeFi, APY is more commonly used as it better represents the actual returns you can expect when reinvesting your earnings. However, it's important to note that APY figures in DeFi are usually projections based on current rates, which can change frequently.</p>
        </>
      )
    }
  ],
  // Add more pages as needed
];

// Define categories and their associated FAQs
const categories = [
  { name: "General", active: true },
  { name: "Safety", active: false },
  { name: "Strategies", active: false },
  { name: "Platforms", active: false },
  { name: "Advanced", active: false }
];

const FAQ = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const totalPages = faqPages.length;

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setActiveItem(null); // Reset active item when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (categoryIndex: number) => {
    setActiveCategory(categoryIndex);
    // Reset to first page when changing categories
    setCurrentPage(0);
    setActiveItem(null);
  };

  const toggleItem = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions about DeFi Yield Farming | YieldMax</title>
        <meta name="description" content="Get answers to the most common questions about DeFi yield farming, including safety, returns, and how to get started with the best protocols." />
        <meta name="keywords" content="defi yield, yield farming, crypto passive income, apy, staking, best defi protocols, yield risks" />
      </Helmet>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroSubtitle}>
            Everything you need to know about DeFi yield farming and maximizing your returns
          </p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqCategories}>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${styles.categoryButton} ${index === activeCategory ? styles.active : ''}`}
                onClick={() => handleCategoryChange(index)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className={styles.faqContainer}>
            {faqPages[currentPage].map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${activeItem === index ? styles.active : ''}`}
                onClick={() => toggleItem(index)}
              >
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <div className={`${styles.faqAnswer} ${activeItem === index ? styles.open : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`${styles.paginationButton} ${currentPage === index ? styles.active : ''}`}
              >
                {index + 1}
              </button>
            ))}
            {totalPages > 5 && (
              <>
                <span className={styles.paginationEllipsis}>...</span>
                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(totalPages - 1)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to start earning yield?</h2>
            <p className={styles.ctaText}>
              Compare the top protocols and find the best opportunities for your portfolio.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/compare" className="button-primary">Compare Protocols</Link>
              <Link to="/simulator" className="button-secondary">Try Simulator</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
