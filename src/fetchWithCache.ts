import { cacheManager } from "./cacheManager";

type FetchOptions<T> = {
  fallback?: T; // Fallback content in case of failure
  cacheTime?: number; // Time-to-live in milliseconds
};

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: FetchOptions<T> = {},
): Promise<T> {
  const { fallback, cacheTime = 60000 } = options;

  // Try to get from cache
  const cachedData = cacheManager.get<T>(key);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Fetch fresh data
    const data = await fetcher();
    cacheManager.set(key, data, cacheTime);
    return data;
  } catch (error) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Failed to fetch data and no fallback provided: ${error}`);
  }
}
