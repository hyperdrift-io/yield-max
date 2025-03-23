import type { Metadata } from 'next';
import Link from 'next/link';
import { getProtocolDetails, getProtocols } from '../../../src/api/protocols';
import ProtocolRiskAssessment from '../../../src/components/ProtocolRiskAssessment';
import styles from './page.module.css';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const protocol = await getProtocolDetails(params.id);

  return {
    title: `${protocol?.name || 'Protocol'} - YieldMax`,
    description: `Details about ${protocol?.name} yield opportunities and risk assessment`,
  };
}

// Generate static paths at build time
export async function generateStaticParams() {
  const protocols = await getProtocols();

  return protocols.map((protocol) => ({
    id: protocol.id,
  }));
}

export default async function ProtocolPage({ params }: { params: { id: string } }) {
  const protocol = await getProtocolDetails(params.id);

  if (!protocol) {
    return (
      <div className={styles['error-container']}>
        <h1>Protocol Not Found</h1>
        <p>The protocol you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className={styles['back-button']}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles['protocol-detail-container']}>
      <div className={styles['protocol-header']}>
        <h1>{protocol.name}</h1>
        <div className={styles['protocol-meta']}>
          <div className={styles['apy-display']}>
            <span className={styles['apy-value']}>{protocol.apy}%</span>
            <span className={styles['apy-label']}>APY</span>
          </div>
        </div>
      </div>

      <div className={styles['protocol-description']}>
        <h2>About {protocol.name}</h2>
        <p>{protocol.description}</p>
      </div>

      {protocol.apyExplanation && (
        <div className={styles['apy-explanation']}>
          <h2>APY Explanation</h2>
          <p>{protocol.apyExplanation}</p>
        </div>
      )}

      <ProtocolRiskAssessment protocol={protocol} />

      <div className={styles['protocol-actions']}>
        <Link href="/compare" className={styles['action-button']}>
          Compare with Other Protocols
        </Link>
        <Link href="/simulator" className={styles['action-button']}>
          Simulate Yield
        </Link>
      </div>
    </div>
  );
}
