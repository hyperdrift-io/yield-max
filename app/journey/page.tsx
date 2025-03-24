import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Development Journey - YieldMax',
  description: 'The development journey of the YieldMax project',
};

// This is a special page that serves the content from /public/journey.html
// The actual content will be available at /journey
export default function JourneyPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Development Journey</h1>
      <p>This page will display the development journey of YieldMax.</p>
    </div>
  );
}
