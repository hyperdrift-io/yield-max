"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BeginnerGuidePage() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Set initial active section based on URL hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Update URL hash without scrolling
            const url = new URL(window.location.href);
            url.hash = entry.target.id;
            window.history.replaceState({}, '', url);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px', threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.guide-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = useCallback((event, sectionId) => {
    event.preventDefault();
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update URL hash after scroll
      const url = new URL(window.location.href);
      url.hash = sectionId;
      window.history.pushState({}, '', url);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Beginner's Guide to Yield Farming</h1>
        <p>Learn how to earn passive income with your crypto assets through DeFi protocols</p>
      </div>

      <div className={styles.guideContent}>
        <div className={styles.sidebar}>
          <div className={styles.tocHeader}>Table of Contents</div>
          <div className={styles.tocList}>
            <a
              href="#introduction"
              className={activeSection === 'introduction' ? styles.tocItemActive : styles.tocItem}
              onClick={(e) => scrollToSection(e, 'introduction')}
            >
              Introduction to Yield Farming
            </a>
            <a
              href="#key-concepts"
              className={activeSection === 'key-concepts' ? styles.tocItemActive : styles.tocItem}
              onClick={(e) => scrollToSection(e, 'key-concepts')}
            >
              Key Concepts to Understand
            </a>
            <a
              href="#strategies"
              className={activeSection === 'strategies' ? styles.tocItemActive : styles.tocItem}
              onClick={(e) => scrollToSection(e, 'strategies')}
            >
              Types of Yield Farming Strategies
            </a>
            <a
              href="#risks"
              className={activeSection === 'risks' ? styles.tocItemActive : styles.tocItem}
              onClick={(e) => scrollToSection(e, 'risks')}
            >
              Risks and How to Mitigate Them
            </a>
            <a
              href="#getting-started"
              className={activeSection === 'getting-started' ? styles.tocItemActive : styles.tocItem}
              onClick={(e) => scrollToSection(e, 'getting-started')}
            >
              Getting Started: Step-by-Step
            </a>
            <a
              href="#advanced"
              className={activeSection === 'advanced' ? styles.tocItemActive : styles.tocItem}
              onClick={(e) => scrollToSection(e, 'advanced')}
            >
              Advanced Techniques
            </a>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div id="introduction" className={`${styles.section} guide-section`}>
            <h2>Introduction to Yield Farming</h2>
            <p>
              Yield farming (or liquidity mining) is a way to generate rewards with cryptocurrency holdings.
              It involves lending or staking your crypto assets to obtain rewards in the form of transaction
              fees or interest. This can be thought of as a more advanced investment strategy within the DeFi ecosystem.
            </p>
            <p>
              The process typically involves depositing or locking up cryptocurrencies into a smart contract-based
              liquidity pool. These pools power the Decentralized Finance ecosystem by facilitating trading, lending,
              and borrowing.
            </p>
            <div className={styles.callout}>
              <p>
                <strong>Key Takeaway:</strong> Yield farming allows you to put your crypto assets to work, earning
                passive income instead of simply holding them in a wallet.
              </p>
            </div>
          </div>

          <div id="key-concepts" className={`${styles.section} guide-section`}>
            <h2>Key Concepts to Understand</h2>

            <h3>Annual Percentage Yield (APY)</h3>
            <p>
              APY represents the real rate of return earned on an investment, taking into account the effect of
              compounding interest. Unlike APR (Annual Percentage Rate), APY factors in how often the interest is
              compounded within the year.
            </p>

            <h3>Total Value Locked (TVL)</h3>
            <p>
              TVL represents the total value of assets deposited in a DeFi protocol. It's an important metric to
              gauge the health and popularity of a protocol. Generally, higher TVL indicates more trust in the protocol.
            </p>

            <h3>Impermanent Loss</h3>
            <p>
              This refers to the temporary loss of funds when providing liquidity to a pool, compared to simply
              holding the assets. It occurs due to price volatility between the paired assets and can become
              permanent if you withdraw your assets during a period of imbalance.
            </p>
          </div>

          <div id="strategies" className={`${styles.section} guide-section`}>
            <h2>Types of Yield Farming Strategies</h2>

            <h3>Liquidity Provision</h3>
            <p>
              By providing liquidity to Automated Market Makers (AMMs) like Uniswap or Curve, you earn a portion
              of the trading fees generated by the platform. This typically requires providing both tokens in a
              trading pair in equal value.
            </p>

            <h3>Lending</h3>
            <p>
              Platforms like Aave and Compound allow you to lend your crypto assets to borrowers in exchange for
              interest. This is one of the simplest and relatively lower-risk ways to participate in yield farming.
            </p>

            <h3>Staking</h3>
            <p>
              Many protocols offer staking opportunities where you lock up their native token to secure the network
              and earn rewards. This is common in Proof of Stake (PoS) blockchains and DeFi governance tokens.
            </p>
          </div>

          <div id="risks" className={`${styles.section} guide-section`}>
            <h2>Risks and How to Mitigate Them</h2>

            <p>
              While yield farming can be profitable, it's important to understand and manage the associated risks:
            </p>

            <h3>Smart Contract Risk</h3>
            <p>
              Vulnerabilities in smart contracts can lead to loss of funds. Mitigate this by choosing protocols
              that have undergone multiple security audits, have a long track record, and possibly insurance coverage.
            </p>

            <h3>Market Risk</h3>
            <p>
              Crypto price volatility can lead to impermanent loss or reduced dollar value of rewards. Diversify
              your yield farming strategies and consider more stable pairs to reduce this risk.
            </p>

            <h3>Liquidation Risk</h3>
            <p>
              When borrowing against your assets, price movements could trigger liquidation. Always maintain a
              healthy collateralization ratio and monitor your positions regularly.
            </p>
          </div>

          <div id="getting-started" className={`${styles.section} guide-section`}>
            <h2>Getting Started: Step-by-Step</h2>

            <h3>1. Set Up a Wallet</h3>
            <p>
              Start by creating a non-custodial wallet like MetaMask, Trust Wallet, or Ledger that supports the
              blockchain you want to farm on (typically Ethereum, BSC, Solana, etc.).
            </p>

            <h3>2. Fund Your Wallet</h3>
            <p>
              Purchase or transfer crypto to your wallet. Make sure to include some extra for gas fees
              (especially on Ethereum).
            </p>

            <h3>3. Research Protocols</h3>
            <p>
              Use YieldMax to compare different protocols based on APY, safety score, and ease of use.
              Start with established protocols that have been thoroughly audited.
            </p>

            <h3>4. Start Small</h3>
            <p>
              Begin with a small amount to familiarize yourself with the process before committing larger sums.
            </p>
          </div>

          <div id="advanced" className={`${styles.section} guide-section`}>
            <h2>Advanced Techniques</h2>

            <h3>Yield Aggregators</h3>
            <p>
              Yield aggregators automatically move your funds between different protocols to maximize returns.
              Platforms like Yearn Finance can help simplify complex yield farming strategies.
            </p>

            <h3>Leverage Farming</h3>
            <p>
              Some platforms allow you to borrow assets to amplify your yield farming returns. Be cautious as this
              significantly increases risk and requires active management of your position.
            </p>

            <h3>Cross-Chain Farming</h3>
            <p>
              Explore opportunities across different blockchains like Ethereum, Solana, and Polygon to diversify and
              potentially find higher returns or lower fees.
            </p>

            <h3>Strategic Token Staking</h3>
            <p>
              Understand tokenomics of governance tokens and strategically stake during periods of high rewards or
              before important protocol events to maximize returns.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2>Ready to start your yield farming journey?</h2>
        <Link href="/compare" className={styles.ctaButton}>Compare Protocols Now</Link>
      </div>
    </div>
  );
}
