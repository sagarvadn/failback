# failback

## Dynamic Content Fallback Manager
A lightweight, flexible library for handling dynamic data fetching with caching and fallback mechanisms. Designed for React, Next.js, and other JavaScript/TypeScript projects.

## Features
- **Caching:** Automatically caches fetched data to improve performance.
- **Fallback Mechanism:** Provides fallback content in case of network or API failures.
- **Customizable:** Supports configurable caching durations and fallback options.
- **TypeScript Support:** Fully typed for a seamless developer experience.

## Installation

```bash
npm install failback
```

## Usage

### Basic Example

```typescript
import { fetchWithCache } from "failback";

// Define an API fetcher function
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

// Use fetchWithCache with caching and fallback options
async function getPosts() {
  try {
    const posts = await fetchWithCache("posts", fetchPosts, {
      cacheTime: 60000, // Cache for 60 seconds
      fallback: [], // Provide an empty array as fallback
    });
    console.log("Posts:", posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getPosts();
```

### Configuring Cache Duration

You can customize the cache duration `(cacheTime)` to suit your use case.

```typescript
const products = await fetchWithCache("products", fetchProducts, {
  cacheTime: 300000, // Cache for 5 minutes
});
```

### Using a Fallback

The `fallback` option ensures your application can gracefully handle errors.

```typescript
const user = await fetchWithCache("user", fetchUser, {
  fallback: { id: 0, name: "Guest" }, // Provide default user data as fallback
});
```

### Cache Management

The library includes a `cacheManager` to directly manage cached data.

```typescript
import { cacheManager } from "failback";

// Set a custom cache
cacheManager.set("customKey", { data: "example" }, 5000); // Cache for 5 seconds

// Get cached data
const cachedData = cacheManager.get("customKey");
console.log("Cached Data:", cachedData);

// Clear specific cache
cacheManager.clear("customKey");

// Clear all caches
cacheManager.clearAll();
```

## Contributing

Please feel free to contribute:

- Submit pull requests to improve functionality or add features.

## License

This project is licensed under the MIT License.

## Future Enhancements

- Offline support.
- Pluggable caching backends (e.g., Redis, IndexedDB).
- Enhanced React and Next.js integration (custom hooks).
