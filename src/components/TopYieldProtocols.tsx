import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Protocol } from '../types/protocol'
import { getTopYieldProtocols } from '../api/protocols'

type TopYieldProtocolsProps = {
  limit?: number
  className?: string
}

const TopYieldProtocols = ({ limit = 5, className = '' }: TopYieldProtocolsProps) => {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getTopYieldProtocols(limit)
        setProtocols(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching top yield protocols:', err)
        setError('Failed to load yield protocols data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [limit])

  if (loading) {
    return (
      <div className={`top-yield-loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Loading top yield protocols...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`top-yield-error ${className}`}>
        <p>{error}</p>
        <button onClick={() => getTopYieldProtocols(limit)}>Retry</button>
      </div>
    )
  }

  return (
    <div className={`top-yield-protocols ${className}`}>
      <h3 className="top-yield-title">Top Yield Opportunities</h3>
      <div className="top-yield-list">
        {protocols.map(protocol => (
          <Link
            to={`/protocol/${protocol.id}`}
            key={protocol.id}
            className="protocol-card"
          >
            <div className="protocol-logo">
              <img src={protocol.logoUrl} alt={protocol.name} />
            </div>
            <div className="protocol-info">
              <h4 className="protocol-name">{protocol.name}</h4>
              <div className="protocol-metrics">
                <div className="apy">
                  <span className="metric-value">{protocol.apy.toFixed(2)}%</span>
                  <span className="metric-label">APY</span>
                </div>
                <div className="tvl">
                  <span className="metric-value">${(protocol.tvl / 1000000).toFixed(2)}M</span>
                  <span className="metric-label">TVL</span>
                </div>
              </div>
            </div>
            {protocol.risk && (
              <div className={`risk-badge risk-${protocol.risk}`}>
                {protocol.risk.toUpperCase()}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopYieldProtocols
