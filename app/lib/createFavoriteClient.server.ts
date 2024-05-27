import {createWithCache, type WithCache} from '@shopify/hydrogen';

function CacheNoCache() {
  return {cache: false};
}

function CacheLong() {
  return {cache: true, duration: 1000 * 60 * 60 * 24}; // 24 hours
}

type AllCacheOptions = Parameters<WithCache>[1];

export function createFavoriteClient({
  cache,
  waitUntil,
  favoriteDomain,
}: {
  cache: Cache;
  waitUntil: ExecutionContext['waitUntil'];
  favoriteDomain: string;
}) {
  async function get<T>(endpoint: string): Promise<T | null> {
    // async function () {
    const response = await fetch(`${favoriteDomain}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching from rick and morty api: ${response.statusText}`,
      );
    }

    const data = await response.text();
    return data ? (JSON.parse(data) as T) : null; // Type assertion to T
    // },
    // );
  }

  async function post<T>(
    endpoint: string,
    body: Record<string, any>,
  ): Promise<T> {
    const response = await fetch(`${favoriteDomain}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Error posting to rick and morty api: ${response.statusText}`,
      );
    }

    const json = await response.json<T>();

    return json;
  }

  async function delelete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${favoriteDomain}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error deleting from rick and morty api: ${response.statusText}`,
      );
    }

    const json = await response.json<T>();

    return json;
  }

  return {get, post, delelete};
}
