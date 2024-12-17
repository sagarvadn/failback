import { fetchWithCache } from "./fetchWithCache";
import { cacheManager } from "./cacheManager";

describe("fetchWithCache", () => {
  beforeEach(() => {
    cacheManager.clearAll();
  });

  it("fetches and caches data", async () => {
    const fetcher = jest.fn().mockResolvedValue("fresh data");
    const result = await fetchWithCache("test-key", fetcher, {
      cacheTime: 1000,
    });
    expect(result).toBe("fresh data");
    expect(fetcher).toHaveBeenCalledTimes(1);

    // Use cached data
    const cachedResult = await fetchWithCache("test-key", fetcher);
    expect(cachedResult).toBe("fresh data");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("uses fallback on fetch failure", async () => {
    const fetcher = jest.fn().mockRejectedValue(new Error("Fetch failed"));
    const result = await fetchWithCache("test-key", fetcher, {
      fallback: "fallback data",
    });
    expect(result).toBe("fallback data");
  });
});
