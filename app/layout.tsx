import { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../src/index.css'; // Import global CSS from src
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'YieldMax - Yield Aggregator Comparison',
  description: 'Compare yield opportunities across different protocols',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles['app-container']}>
          <header className={styles.header}>
            <nav className={styles.nav}>
              <div className={styles['logo-container']}>
                <Link href="/" className={styles.logo}>
                  <Image
                    src="/logos/YM-logo-dark.svg"
                    alt="YieldMax Logo"
                    width={32}
                    height={32}
                    className={styles.logoIcon}
                  />
                  YieldMax
                </Link>
              </div>
              <div className={styles['nav-links']}>
                <Link href="/" className={styles['nav-link']}>Home</Link>
                <Link href="/compare" className={styles['nav-link']}>Compare</Link>
                <Link href="/simulator" className={styles['nav-link']}>Simulator</Link>
                <Link href="/beginner-guide" className={styles['nav-link']}>Beginner Guide</Link>
                <Link href="/risks" className={styles['nav-link']}>Risks</Link>
                <Link href="/faq" className={styles['nav-link']}>FAQ</Link>
              </div>
            </nav>
          </header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <div className={styles['footer-container']}>
              <div className={styles['footer-logo']}>
                <Link href="/" className={styles.logo}>
                  <Image
                    src="/logos/YM-logo-dark.svg"
                    alt="YieldMax Logo"
                    width={32}
                    height={32}
                    className={styles.logoIcon}
                  />
                  YieldMax
                </Link>
                <p>Find and compare the best yield farming opportunities across multiple protocols. Make informed decisions based on safety, returns, and ease of use.</p>
              </div>

              <div className={styles['footer-links']}>
                <div className={styles['footer-section']}>
                  <h3>Features</h3>
                  <Link href="/">Home</Link>
                  <Link href="/compare">Compare Protocols</Link>
                  <Link href="/simulator">Yield Simulator</Link>
                  <Link href="/risks">Risk Analysis</Link>
                </div>

                <div className={styles['footer-section']}>
                  <h3>Learn</h3>
                  <Link href="/beginner-guide">Beginner's Guide</Link>
                  <Link href="/faq">FAQs</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/docs">Documentation</Link>
                </div>

                <div className={styles['footer-section']}>
                  <h3>Legal</h3>
                  <Link href="/terms">Terms of Service</Link>
                  <Link href="/privacy">Privacy Policy</Link>
                  <Link href="/disclaimer">Risk Disclaimer</Link>
                  <Link href="/contact">Contact Us</Link>
                </div>
              </div>

              <div className={styles['footer-social']}>
                <div className={styles['social-links']}>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <span className={styles['social-icon']}>Twitter</span>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <span className={styles['social-icon']}>GitHub</span>
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <span className={styles['social-icon']}>Discord</span>
                  </a>
                </div>

                <div className={styles['newsletter']}>
                  <h3>Stay Updated</h3>
                  <p>Subscribe to our newsletter for the latest updates.</p>
                  <div className={styles['email-form']}>
                    <input type="email" placeholder="Your email" />
                    <button type="submit">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['footer-bottom']}>
              <p>© {new Date().getFullYear()} YieldMax. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
