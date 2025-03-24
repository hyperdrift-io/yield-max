import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - YieldMax',
  description: 'The requested page could not be found',
};

export default function NotFound() {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh'
    }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist or is currently unavailable during our migration to Next.js.</p>

      <p>We're in the process of updating our website architecture to improve performance and user experience.</p>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Return to Home
        </Link>
      </div>

      <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#666' }}>
        <p>Working pages:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '0.5rem 0' }}><Link href="/">Home Page</Link></li>
          <li style={{ margin: '0.5rem 0' }}><Link href="/journey">Development Journey</Link></li>
        </ul>
      </div>
    </div>
  );
}
