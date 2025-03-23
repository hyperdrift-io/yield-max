import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import styles from './Header.module.css'
import { useThemeDetection } from '../hooks/useThemeDetection'

// Define logo paths - now only for the emblem
const darkLogoPath = '/logos/YM-logo-dark.svg'
const lightLogoPath = '/logos/YM-logo.svg'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDarkTheme = useThemeDetection()
  const location = useLocation()

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Choose logo based on theme
  const logoPath = isDarkTheme ? darkLogoPath : lightLogoPath

  // Memoize the isActive function to prevent recreating it on each render
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  )

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <img src={logoPath} alt="YM Logo" className={styles.logoEmblem} />
            </div>
            <span className={styles.logoText}>YieldMax</span>
          </div>
        </Link>

        <nav className={`${styles.mainNav} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                to="/"
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                key={`home-${isActive('/')}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/compare"
                className={`${styles.navLink} ${isActive('/compare') ? styles.active : ''}`}
                key={`compare-${isActive('/compare')}`}
                onClick={closeMenu}
              >
                Compare
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/simulator"
                className={`${styles.navLink} ${isActive('/simulator') ? styles.active : ''}`}
                key={`simulator-${isActive('/simulator')}`}
                onClick={closeMenu}
              >
                Simulator
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/guide"
                className={`${styles.navLink} ${isActive('/guide') ? styles.active : ''}`}
                key={`guide-${isActive('/guide')}`}
                onClick={closeMenu}
              >
                Beginner Guide
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/risks"
                className={`${styles.navLink} ${isActive('/risks') ? styles.active : ''}`}
                key={`risks-${isActive('/risks')}`}
                onClick={closeMenu}
              >
                Risks
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/faq"
                className={`${styles.navLink} ${isActive('/faq') ? styles.active : ''}`}
                key={`faq-${isActive('/faq')}`}
                onClick={closeMenu}
              >
                FAQ
              </Link>
            </li>
            <li className={styles.navItem}>
              <a
                href="#"
                className={`button-primary ${styles.walletButton}`}
                onClick={closeMenu}
              >
                Connect Wallet
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuButton}
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
