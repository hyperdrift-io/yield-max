import type { Metadata } from 'next';
import Link from 'next/link';
import { getProtocolDetails, getProtocols } from '../../../src/api/protocols';
import styles from './page.module.css';
import { FiExternalLink, FiLink, FiDollarSign, FiShield, FiArrowRight, FiTwitter, FiGithub, FiMessageCircle } from 'react-icons/fi';
import { FaDiscord, FaTelegram, FaForumbee } from 'react-icons/fa';
import { RiFileList2Line } from 'react-icons/ri';

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

  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#60a5fa"; // blue
    if (score >= 40) return "#f59e0b"; // yellow
    if (score >= 20) return "#f97316"; // orange
    return "#ef4444"; // red
  };

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

      {/* Safety Score Section */}
      <div className={styles.safetyScoreSection}>
        <div className={styles.safetyScoreHeader}>
          <div className={styles.sectionTitleWithIcon}>
            <FiShield size={24} color="#60a5fa" />
            <h2 className={styles.sectionTitle}>Safety Score</h2>
          </div>
          <Link href={`/protocol/${params.id}/risk`} className={styles.viewRiskLink}>
            <span>View Risk Assessment</span>
            <FiArrowRight size={18} />
          </Link>
        </div>
        <div className={styles.safetyScoreDisplay}>
          <div
            className={styles.scoreCircle}
            style={{
              borderColor: getScoreColor(protocol.safetyScore)
            }}
          >
            <span
              className={styles.scoreNumber}
              style={{
                color: getScoreColor(protocol.safetyScore)
              }}
            >
              {protocol.safetyScore}
            </span>
            <span className={styles.scoreMax}>/100</span>
          </div>
          <div className={styles.scoreDescription}>
            <p>This protocol has a {protocol.safetyScore >= 80 ? 'high' : protocol.safetyScore >= 60 ? 'moderate' : 'low'} safety score.</p>
            <p>View the detailed risk assessment for more information.</p>
          </div>
        </div>
      </div>

      {/* Community & Resources Section */}
      <div className={styles.sectionsContainer}>
        {/* Social Links Section */}
        {protocol.communityLinks && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWithIcon}>
                <FiMessageCircle size={24} color="#60a5fa" />
                <h2 className={styles.sectionTitle}>Community Links</h2>
              </div>
            </div>
            <div className={styles.communityLinks}>
              {protocol.communityLinks.twitter && (
                <a
                  href={protocol.communityLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityLink}
                >
                  <div className={styles.linkIcon} style={{ backgroundColor: 'rgba(29, 161, 242, 0.1)' }}>
                    <FiTwitter size={20} color="#1DA1F2" />
                  </div>
                  <span>Twitter</span>
                </a>
              )}
              {protocol.communityLinks.discord && (
                <a
                  href={protocol.communityLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityLink}
                >
                  <div className={styles.linkIcon} style={{ backgroundColor: 'rgba(114, 137, 218, 0.1)' }}>
                    <FaDiscord size={20} color="#7289DA" />
                  </div>
                  <span>Discord</span>
                </a>
              )}
              {protocol.communityLinks.github && (
                <a
                  href={protocol.communityLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityLink}
                >
                  <div className={styles.linkIcon} style={{ backgroundColor: 'rgba(36, 41, 46, 0.1)' }}>
                    <FiGithub size={20} color="#24292E" />
                  </div>
                  <span>GitHub</span>
                </a>
              )}
              {protocol.communityLinks.telegram && (
                <a
                  href={protocol.communityLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityLink}
                >
                  <div className={styles.linkIcon} style={{ backgroundColor: 'rgba(0, 136, 204, 0.1)' }}>
                    <FaTelegram size={20} color="#0088cc" />
                  </div>
                  <span>Telegram</span>
                </a>
              )}
              {protocol.communityLinks.forum && (
                <a
                  href={protocol.communityLinks.forum}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityLink}
                >
                  <div className={styles.linkIcon} style={{ backgroundColor: 'rgba(247, 147, 26, 0.1)' }}>
                    <FaForumbee size={20} color="#F7931A" />
                  </div>
                  <span>Forum</span>
                </a>
              )}
              {protocol.communityLinks.blog && (
                <a
                  href={protocol.communityLinks.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityLink}
                >
                  <div className={styles.linkIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <RiFileList2Line size={20} color="#10b981" />
                  </div>
                  <span>Blog</span>
                </a>
              )}
              {protocol.communityLinks.custom && protocol.communityLinks.custom.map((link, index) => {
                let hostname;
                try {
                  hostname = new URL(link).hostname.replace('www.', '');
                } catch (e) {
                  hostname = link;
                }
                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.communityLink}
                  >
                    <div className={styles.linkIcon}>
                      <FiExternalLink size={20} color="#60a5fa" />
                    </div>
                    <span>{hostname}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* News Links Section */}
        {protocol.newsAndDataSources?.news && protocol.newsAndDataSources.news.length > 0 ? (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWithIcon}>
                <FiExternalLink size={24} color="#f59e0b" />
                <h2 className={styles.sectionTitle}>News & Resources</h2>
              </div>
            </div>
            <div className={styles.communityLinks}>
              {protocol.newsAndDataSources.news.map((link, index) => {
                let hostname;
                try {
                  hostname = new URL(link).hostname.replace('www.', '');
                } catch (e) {
                  hostname = link;
                }

                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.communityLink}
                  >
                    <div className={styles.linkIcon}>
                      <FiExternalLink size={20} color="#f59e0b" />
                    </div>
                    <span>{hostname}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Token & Chain Info Section */}
        {(protocol.metadata?.token || (protocol.metadata?.chains && protocol.metadata.chains.length > 0)) && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWithIcon}>
                <FiDollarSign size={24} color="#10b981" />
                <h2 className={styles.sectionTitle}>Protocol Details</h2>
              </div>
            </div>
            <div className={styles.detailsContainer}>
              {/* Token Info */}
              {protocol.metadata?.token && (
                <div className={styles.tokenInfo}>
                  <div className={styles.linkIcon}>
                    <FiDollarSign size={20} color="#f59e0b" />
                  </div>
                  <div className={styles.tokenInfoContent}>
                    <strong>Token</strong>
                    <div className={styles.tokenDetails}>
                      <span>{protocol.metadata.token}</span>
                      {protocol.apiSources?.tokenData && (
                        <a
                          href={protocol.apiSources.tokenData}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.tokenLink}
                        >
                          View Token Info <FiExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Chains Info */}
              {protocol.metadata?.chains && protocol.metadata.chains.length > 0 && (
                <div className={styles.chainInfo}>
                  <div className={styles.linkIcon}>
                    <FiLink size={20} color="#10b981" />
                  </div>
                  <div className={styles.tokenInfoContent}>
                    <strong>Chains</strong>
                    <div className={styles.chainList}>
                      {protocol.metadata.chains.map((chain, index) => (
                        <span key={index} className={styles.chainBadge}>
                          {chain}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
