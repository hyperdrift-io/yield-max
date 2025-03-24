import type { FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProtocolsStore, FilterState } from '../hooks/useProtocolsStore'
import { Protocol } from '../types/protocol'
import styles from './ProtocolTable.module.css'
import ProtocolRiskAssessment from './ProtocolRiskAssessment'

type ProtocolTableProps = {
  filters?: Partial<FilterState>
  limit?: number
}

// Map for chain names to icon filenames
const chainIconMap: Record<string, string> = {
  'Ethereum': 'ethereum.svg',
  'Polygon': 'polygon.svg',
  'Arbitrum': 'arbitrum.svg',
  'Optimism': 'optimism.svg',
  'Avalanche': 'avalanche.svg',
  'BSC': 'bsc.svg',
  'Binance Smart Chain': 'bsc.svg',
  'Solana': 'solana.svg',
  'Fantom': 'fantom.svg',
  'Aptos': 'aptos.svg',
}

// Gets a clean display name for chains
const getChainDisplayName = (chain: string): string => {
  if (chain === 'Binance Smart Chain') return 'BSC';
  return chain;
}

const ProtocolTable: FC<ProtocolTableProps> = ({ filters = {}, limit = undefined }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const {
    protocols,
    sortConfig,
    handleSort,
    isLoading,
    error,
    availableChains,
    filters: activeFilters,
    toggleChainFilter
  } = useProtocolsStore(filters)

  // Apply limit if provided
  const displayProtocols = limit && protocols.length > limit
    ? protocols.slice(0, limit)
    : protocols

  const handleShowRiskAssessment = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setShowRiskModal(true);
  };

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
console.log("🚀 ~ ProtocolTable ~ limit:", limit)

  return (
    <div>
      <div className={styles.filtersContainer}>
        <button
          className={styles.advancedFilterToggle}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>

        {showAdvancedFilters && (
          <div className={styles.advancedFilters}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterHeading}>Chain Filters</h3>
              <div className={styles.chainFilters}>
                {availableChains.map((chain: string) => (
                  <label key={chain} className={styles.chainFilterItem}>
                    <input
                      type="checkbox"
                      checked={activeFilters.chains.includes(chain)}
                      onChange={() => toggleChainFilter(chain)}
                    />
                    <div className={styles.chainFilterLabel}>
                      {chainIconMap[chain] && (
                        <img
                          src={`/chains/${chainIconMap[chain]}`}
                          alt={chain}
                          className={styles.chainFilterIcon}
                        />
                      )}
                      <span>{getChainDisplayName(chain)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

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
                  {sortConfig.field === 'apy' && (
                    <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.order === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
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
                  {sortConfig.field === 'tvl' && (
                    <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.order === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
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
                  {sortConfig.field === 'safetyScore' && (
                    <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.order === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
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
                  {sortConfig.field === 'easeOfUseScore' && (
                    <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.order === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                    </svg>
                  )}
                </div>
              </th>
              <th
                className={`${styles.tableHeader} ${styles.sortableHeader}`}
                onClick={() => handleSort('chains')}
              >
                <div className={styles.protocolCell}>
                  <span>Chains</span>
                  {sortConfig.field === 'chains' && (
                    <svg className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.order === 'desc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                    </svg>
                  )}
                </div>
              </th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderRight}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayProtocols.length > 0 ? (
              displayProtocols.map((protocol: Protocol) => (
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
                          style={{ width: `${protocol.safetyScore}%` }}
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
                          style={{ width: `${protocol.easeOfUseScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.chainIconsContainer}>
                      {protocol.metadata?.chains?.slice(0, 5).map((chain: string, index: number) => (
                        <div key={index} className={styles.chainIconWrapper} title={chain}>
                          {chainIconMap[chain] && (
                            <img
                              src={`/chains/${chainIconMap[chain]}`}
                              alt={chain}
                              className={styles.chainIcon}
                            />
                          )}
                        </div>
                      ))}
                      {protocol.metadata?.chains && protocol.metadata.chains.length > 5 && (
                        <div className={styles.moreChains} title={protocol.metadata.chains.slice(5).join(', ')}>
                          +{protocol.metadata.chains.length - 5}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellRight}`}>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => handleShowRiskAssessment(protocol)}
                        className={styles.riskButton}
                      >
                        Risk Assessment
                      </button>
                      <Link
                        to={`/protocol/${protocol.id}`}
                        className={styles.detailsButton}
                      >
                        View Details
                      </Link>
                    </div>
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

      {/* Risk Assessment Modal */}
      {showRiskModal && selectedProtocol && (
        <div className={styles.modalOverlay} onClick={() => setShowRiskModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowRiskModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ProtocolRiskAssessment protocol={selectedProtocol} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProtocolTable
