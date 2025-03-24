"use client";

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Protocol } from '../types/protocol';
import styles from './ProtocolList.module.css';
import ProtocolLogo from './ProtocolLogo';

type SortField = 'apy' | 'tvl';
type SortOrder = 'asc' | 'desc';

type ProtocolListProps = {
  protocols: Protocol[];
  limit?: number;
  filters?: {
    minApy: number;
    minSafetyScore: number;
  };
};

const riskMetrics = [
  { key: 'smartContractRisk', label: 'Smart Contract Risk', color: '#ef4444' },
  { key: 'impermanentLoss', label: 'Impermanent Loss', color: '#f97316' },
  { key: 'marketRisk', label: 'Market Risk', color: '#eab308' },
  { key: 'liquidationRisk', label: 'Liquidation Risk', color: '#84cc16' },
  { key: 'tokenomicDesignRisk', label: 'Tokenomic Design Risk', color: '#22c55e' },
];

const ProtocolList: FC<ProtocolListProps> = ({ protocols, limit, filters }) => {
  const [sortField, setSortField] = useState<SortField>('apy');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredProtocols = useMemo(() => {
    let result = [...protocols];

    if (filters) {
      result = result.filter((protocol: Protocol) => {
        if (filters.minApy > 0 && protocol.apy < filters.minApy) {
          return false;
        }
        if (filters.minSafetyScore > 0 && protocol.safetyScore < filters.minSafetyScore) {
          return false;
        }
        return true;
      });
    }

    // Sort protocols
    result.sort((a: Protocol, b: Protocol) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'apy') {
        return (a.apy - b.apy) * multiplier;
      } else if (sortField === 'tvl') {
        return (a.tvl - b.tvl) * multiplier;
      }
      return 0;
    });

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [protocols, limit, filters, sortField, sortOrder]);

  if (filteredProtocols.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No protocols match your criteria</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.headerCell}>PROTOCOL</th>
            <th
              className={`${styles.headerCell} ${styles.sortable}`}
              onClick={() => handleSort('apy')}
            >
              APY
              <span className={styles.sortArrow}>
                {sortField === 'apy' ? (sortOrder === 'desc' ? '▼' : '▲') : '▼'}
              </span>
            </th>
            <th
              className={`${styles.headerCell} ${styles.sortable}`}
              onClick={() => handleSort('tvl')}
            >
              TVL
              <span className={styles.sortArrow}>
                {sortField === 'tvl' ? (sortOrder === 'desc' ? '▼' : '▲') : '▼'}
              </span>
            </th>
            <th className={styles.headerCell}>SAFETY</th>
            <th className={styles.headerCell}></th>
          </tr>
        </thead>
        <tbody>
          {filteredProtocols.map((protocol: Protocol) => (
            <tr key={protocol.id} className={styles.tableRow}>
              <td className={styles.protocolCell}>
                <ProtocolLogo
                  name={protocol.name}
                  logoUrl={protocol.logoUrl}
                  size="md"
                />
                <div className={styles.protocolName}>{protocol.name}</div>
              </td>
              <td className={styles.cell}>{protocol.apy}%</td>
              <td className={styles.cell}>${(protocol.tvl / 1e9).toFixed(1)}B</td>
              <td className={styles.cell}>
                <Link href={`/protocol/${protocol.id}/risk`} className={styles.scoreLink}>
                  <div className={styles.scoreContainer}>
                    <div className={styles.scoreBar}>
                      <div className={styles.scoreFill} style={{width: `${protocol.safetyScore || 75}%`}}></div>
                    </div>
                    <span>{protocol.safetyScore || 75}</span>
                  </div>
                </Link>
              </td>
              <td className={styles.actionCell}>
                <div className={styles.actionButtons}>
                  <Link href={`/protocol/${protocol.id}/risk`} className={styles.viewDetails}>
                    View Risk Report
                  </Link>
                  <Link href={`/protocol/${protocol.id}`} className={styles.viewProtocol}>
                    View Detail
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProtocolList;
