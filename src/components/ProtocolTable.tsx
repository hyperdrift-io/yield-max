import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProtocols } from '../api/protocols'
import type { Protocol } from '../types/protocol'
import styles from './ProtocolTable.module.css'

type SortField = 'apy' | 'tvl' | 'safetyScore' | 'easeOfUseScore' | 'audits' | 'unbondingPeriod'
type SortOrder = 'asc' | 'desc'

type ProtocolTableProps = {
  filters?: {
    minApy?: number
    maxUnbondingPeriod?: number
    minSafetyScore?: number
  }
  limit?: number
}

const ProtocolTable = ({ filters = {}, limit }: ProtocolTableProps) => {
  const [sortField, setSortField] = useState<SortField>('apy')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const { data: protocols = [], isLoading, error } = useQuery({
    queryKey: ['protocols'],
    queryFn: getProtocols
  })

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  let sortedAndFilteredProtocols = protocols
    .filter(protocol => {
      if (filters.minApy !== undefined && protocol.apy < filters.minApy) {
        return false
      }
      if (filters.maxUnbondingPeriod !== undefined && protocol.unbondingPeriod > filters.maxUnbondingPeriod) {
        return false
      }
      if (filters.minSafetyScore !== undefined && protocol.safetyScore < filters.minSafetyScore) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      // Special case for unbonding period where lower is better
      if (sortField === 'unbondingPeriod') {
        return sortOrder === 'desc' ? aValue - bValue : bValue - aValue
      }

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

  // Apply limit if provided
  if (limit && sortedAndFilteredProtocols.length > limit) {
    sortedAndFilteredProtocols = sortedAndFilteredProtocols.slice(0, limit)
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <span className={styles.loadingText}>Loading protocols...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <svg className={styles.errorIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Failed to load protocols
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeaderRow}>
            <th className={styles.tableHeader}>
              Protocol
            </th>
            <th
              className={`${styles.tableHeader} ${styles.sortableHeader}`}
              onClick={() => handleSort('apy')}
            >
              <div className={styles.protocolCell}>
                <span>APY</span>
                {sortField === 'apy' && (
                  <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                  </svg>
                )}
              </div>
            </th>
            <th
              className={`${styles.tableHeader} ${styles.sortableHeader}`}
              onClick={() => handleSort('tvl')}
            >
              <div className={styles.protocolCell}>
                <span>TVL</span>
                {sortField === 'tvl' && (
                  <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                  </svg>
                )}
              </div>
            </th>
            <th
              className={`${styles.tableHeader} ${styles.sortableHeader}`}
              onClick={() => handleSort('safetyScore')}
            >
              <div className={styles.protocolCell}>
                <span>Safety</span>
                {sortField === 'safetyScore' && (
                  <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                  </svg>
                )}
              </div>
            </th>
            <th
              className={`${styles.tableHeader} ${styles.sortableHeader} ${styles.hiddenTablet}`}
              onClick={() => handleSort('easeOfUseScore')}
            >
              <div className={styles.protocolCell}>
                <span>Ease of Use</span>
                {sortField === 'easeOfUseScore' && (
                  <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                  </svg>
                )}
              </div>
            </th>
            <th
              className={`${styles.tableHeader} ${styles.sortableHeader} ${styles.hiddenMobile}`}
              onClick={() => handleSort('unbondingPeriod')}
            >
              <div className={styles.protocolCell}>
                <span>Unbonding</span>
                {sortField === 'unbondingPeriod' && (
                  <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                  </svg>
                )}
              </div>
            </th>
            <th className={`${styles.tableHeader} ${styles.tableHeaderRight}`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredProtocols.length > 0 ? (
            sortedAndFilteredProtocols.map(protocol => (
              <tr key={protocol.id} className={styles.protocolRow}>
                <td className={styles.tableCell}>
                  <div className={styles.protocolCell}>
                    <img
                      src={protocol.logoUrl}
                      alt={protocol.name}
                      className={styles.protocolLogo}
                    />
                    <div className={styles.protocolName}>{protocol.name}</div>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.apyValue}>{protocol.apy}%</span>
                </td>
                <td className={styles.tableCell}>${protocol.tvl.toLocaleString()}</td>
                <td className={styles.tableCell}>
                  <div className={styles.scoreWrapper}>
                    <span className={styles.scoreValue}>{protocol.safetyScore}</span>
                    <div className={styles.scoreBar}>
                      <div
                        className={`${styles.scoreBarFill} ${styles.safetyScoreFill}`}
                        style={{ width: `${protocol.safetyScore * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className={`${styles.tableCell} ${styles.hiddenTablet}`}>
                  <div className={styles.scoreWrapper}>
                    <span className={styles.scoreValue}>{protocol.easeOfUseScore}</span>
                    <div className={styles.scoreBar}>
                      <div
                        className={`${styles.scoreBarFill} ${styles.easeScoreFill}`}
                        style={{ width: `${protocol.easeOfUseScore * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className={`${styles.tableCell} ${styles.hiddenMobile}`}>
                  {protocol.unbondingPeriod === 0 ? (
                    <span className={styles.unbondingPeriod}>Instant</span>
                  ) : (
                    `${protocol.unbondingPeriod} days`
                  )}
                </td>
                <td className={`${styles.tableCell} ${styles.tableCellRight}`}>
                  <Link
                    to={`/protocol/${protocol.id}`}
                    className={styles.detailsButton}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className={styles.emptyState}>
                <svg className={styles.emptyStateIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                No protocols match your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProtocolTable
