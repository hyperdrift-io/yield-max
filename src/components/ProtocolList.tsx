"use client";

import Link from 'next/link';
import { Protocol } from '../types/protocol';
import styles from './ProtocolList.module.css';
import ProtocolLogo from './ProtocolLogo';

type ProtocolListProps = {
  protocols: Protocol[];
  limit?: number;
};

export default function ProtocolList({ protocols, limit = 5 }: ProtocolListProps) {
  const displayProtocols = limit ? protocols.slice(0, limit) : protocols;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.headerCell}>PROTOCOL</th>
            <th className={styles.headerCell}>APY <span className={styles.sortArrow}>▼</span></th>
            <th className={styles.headerCell}>TVL</th>
            <th className={styles.headerCell}>SAFETY</th>
            <th className={styles.headerCell}>EASE OF USE</th>
            <th className={styles.headerCell}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {displayProtocols.map((protocol) => (
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
                <div className={styles.scoreContainer}>
                  <div className={styles.scoreBar}>
                    <div className={styles.scoreFill} style={{width: `${protocol.safetyScore || 75}%`}}></div>
                  </div>
                  <span>{protocol.safetyScore || 75}</span>
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.scoreContainer}>
                  <div className={styles.scoreBar}>
                    <div className={styles.scoreFillAlt} style={{width: `${protocol.easeOfUseScore || 70}%`}}></div>
                  </div>
                  <span>{protocol.easeOfUseScore || 70}</span>
                </div>
              </td>
              <td className={styles.actionCell}>
                <Link href={`/protocol/${protocol.id}`} className={styles.viewDetails}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
