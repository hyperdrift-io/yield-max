/**
 * Next.js API utilities to replace React Query
 * This allows us to fetch data in the new Next.js app directory
 */

// Helper function to fetch data with type safety
export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Simple caching mechanism
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function fetchWithCache<T>(url: string, options?: RequestInit): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options || {})}`;
  const cachedItem = cache.get(cacheKey);

  // Return cached data if it exists and isn't stale
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_TTL) {
    return cachedItem.data as T;
  }

  // Fetch fresh data
  const data = await fetchData<T>(url, options);

  // Cache the result
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

// Clear cache
export function clearCache(urlPattern?: string): void {
  if (!urlPattern) {
    cache.clear();
    return;
  }

  // Clear specific cache entries matching the pattern
  for (const key of cache.keys()) {
    if (key.includes(urlPattern)) {
      cache.delete(key);
    }
  }
}
