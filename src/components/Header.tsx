import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import styles from './Header.module.css'
import { useThemeDetection } from '../hooks/useThemeDetection'

// Define logo paths - now only for the emblem
const darkLogoPath = '/logos/YM-logo-dark.svg'
const lightLogoPath = '/logos/YM-logo.svg'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
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

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <img src={logoPath} alt="YM Logo" className={styles.logoEmblem} />
            </div>
            <span className={styles.logoText}>YIELDMAX</span>
          </div>
        </Link>

        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                to="/"
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                key={`home-${isActive('/')}`}
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/compare"
                className={`${styles.navLink} ${isActive('/compare') ? styles.active : ''}`}
                key={`compare-${isActive('/compare')}`}
              >
                Compare
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/simulator"
                className={`${styles.navLink} ${isActive('/simulator') ? styles.active : ''}`}
                key={`simulator-${isActive('/simulator')}`}
              >
                Simulator
              </Link>
            </li>
            <li className={styles.navItem}>
              <a
                href="#"
                className={`button-primary ${styles.walletButton}`}
              >
                Connect Wallet
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className={styles.mobileMenuButton} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
