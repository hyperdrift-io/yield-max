import { useState, useEffect } from 'react'

/**
 * Custom hook to detect the user's preferred color scheme
 * @returns {boolean} isDarkTheme - Whether the user prefers dark mode
 */
export const useThemeDetection = (): boolean => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkTheme(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isDarkTheme
}
