'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { useState, ReactNode, useEffect } from 'react';

// The key to making this work is to ensure that the component
// only initializes React Query and React Helmet on the client side

export function Providers({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Disable all refetching and network operations during SSG
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: Infinity,
      },
    },
  }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSG, render children directly without the providers
  // This avoids the React Query and Helmet errors during static generation
  if (!isClient) {
    return <>{children}</>;
  }

  // On the client side, use the actual providers
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </HelmetProvider>
  );
}
