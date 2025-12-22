/**
 * src/api/lanyard.ts
 *
 * TypeScript wrapper for the Lanyard REST API (https://api.lanyard.rest).
 * Provides:
 *  - typed interfaces for common Lanyard data
 *  - `fetchLanyard` - one-off fetch with transformation (adds avatar_url)
 *  - `fetchLanyardCached` - cached fetch with configurable TTL
 *  - `pollLanyard` - polling helper that calls a callback whenever new data is fetched
 *  - `subscribeLanyard` - lightweight pub/sub for a single userId (returns unsubscribe)
 *  - `getDiscordAvatarUrl` - helper to build avatar CDN url (falls back to embed avatar)
 *
 * This file is intended for client-side usage in Home / About pages.
 */

export type DiscordUser = {
  id: string;
  username: string;
  discriminator?: string;
  avatar?: string | null;
  public_flags?: number;
  // any additional fields are allowed
  [k: string]: any;
};

export type LanyardActivityAssets = {
  large_image?: string | null;
  large_text?: string | null;
  small_image?: string | null;
  small_text?: string | null;
  [k: string]: any;
};

export type LanyardActivity = {
  application_id?: string | null;
  name?: string | null;
  details?: string | null;
  state?: string | null;
  timestamps?: {
    start?: number | null;
    end?: number | null;
  } | null;
  type?: number;
  assets?: LanyardActivityAssets | null;
  [k: string]: any;
};

export type LanyardData = {
  discord_user?: DiscordUser | null;
  discord_status?: "online" | "idle" | "dnd" | "offline" | string;
  activities?: LanyardActivity[] | null;
  kv?: Record<string, any> | null;
  listening_to_spotify?: boolean;
  spotify?: any;
  [k: string]: any;
};

export type LanyardResponse = {
  success: boolean;
  data?: LanyardData;
  // the API may return extra fields
  [k: string]: any;
};

const BASE = "https://api.lanyard.rest/v1/users";

/**
 * Build a Discord CDN avatar URL from a discord_user object.
 * If the user has an animated avatar (starts with "a_") returns a gif url, otherwise png.
 * If avatar missing, returns undefined (caller can fallback to embed avatars).
 */
export function getDiscordAvatarUrl(user?: { id?: string; avatar?: string | null }, size = 128): string | undefined {
  if (!user) return undefined;
  const { id, avatar } = user;
  if (!id) return undefined;
  if (!avatar) return undefined;
  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}?size=${size}`;
}

/**
 * Fallback embed avatar (when no custom avatar set).
 * Returns a url for the embed avatars (0..4).
 */
export function getDiscordEmbedAvatarUrl(user?: { discriminator?: string | null }) {
  const disc = user?.discriminator ? parseInt(user.discriminator, 10) : 0;
  const idx = Number.isFinite(disc) ? disc % 5 : 0;
  return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
}

/**
 * Transform raw Lanyard response to enrich it with `discord_user.avatar_url`
 * and make it easier to consume in UI components.
 */
function transformLanyardResponse(raw: any): LanyardResponse {
  try {
    if (!raw || typeof raw !== "object") {
      return { success: false };
    }
    const resp: LanyardResponse = { ...raw };

    const user = resp.data?.discord_user as DiscordUser | undefined;
    if (user) {
      // add avatar_url field if possible
      const avatarUrl = getDiscordAvatarUrl(user);
      if (avatarUrl) {
        // Add non-enumerable aware assignment so downstream code can use it
        resp.data = { ...(resp.data || {}), discord_user: { ...(user || {}), avatar_url: avatarUrl } } as LanyardData;
      } else {
        resp.data = { ...(resp.data || {}), discord_user: { ...(user || {}), avatar_url: getDiscordEmbedAvatarUrl(user) } } as LanyardData;
      }
    }

    return resp;
  } catch (e) {
    return { success: false };
  }
}

/**
 * One-off fetch from the Lanyard API for a given Discord user id.
 * Returns a transformed LanyardResponse (with avatar_url set when possible).
 *
 * Throws an Error on network failure; returns { success: false } for other cases.
 */
export async function fetchLanyard(userId: string, signal?: AbortSignal): Promise<LanyardResponse> {
  if (!userId) return { success: false };
  const url = `${BASE}/${encodeURIComponent(userId)}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "kmmiio99o-portfolio/1.0.0",
        // No auth required for Lanyard public API
      },
      signal,
    });

    if (!res.ok) {
      return { success: false, error: `Lanyard API returned ${res.status}` } as any;
    }

    const data = await res.json();
    return transformLanyardResponse(data);
  } catch (err: any) {
    // If aborted, propagate the abort error
    if (err && err.name === "AbortError") throw err;
    // Otherwise return a failure shape
    return { success: false, error: err?.message || String(err) } as any;
  }
}

/**
 * Simple in-memory cache for a userId -> { response, expiresAt }
 * TTL is configurable per call via fetchLanyardCached.
 */
type CacheEntry = {
  resp: LanyardResponse;
  expiresAt: number;
};

const CACHE = new Map<string, CacheEntry>();

/**
 * Cached fetch: returns cached response if still fresh, otherwise performs network fetch.
 * TTL is milliseconds (default 15s).
 */
export async function fetchLanyardCached(userId: string, ttl = 15_000): Promise<LanyardResponse> {
  if (!userId) return { success: false };
  const now = Date.now();
  const cached = CACHE.get(userId);
  if (cached && cached.expiresAt > now) {
    return cached.resp;
  }

  const resp = await fetchLanyard(userId);
  // if success false, still cache it briefly to avoid rapid retry storms
  const effectiveTtl = resp.success ? ttl : Math.min(5000, ttl);
  CACHE.set(userId, { resp, expiresAt: Date.now() + effectiveTtl });
  return resp;
}

/**
 * Polling helper: starts polling Lanyard every `intervalMs` milliseconds and calls `onUpdate`
 * whenever we receive a new response (shallow compare by JSON string).
 *
 * Returns a stop() function to clear the interval.
 */
export function pollLanyard(
  userId: string,
  onUpdate: (resp: LanyardResponse) => void,
  intervalMs = 5000,
): { stop: () => void; immediate: () => Promise<void> } {
  let stopped = false;
  let lastJson: string | null = null;
  let timer: number | undefined;

  const doFetch = async () => {
    if (stopped) return;
    try {
      const resp = await fetchLanyard(userId);
      const json = JSON.stringify(resp);
      if (json !== lastJson) {
        lastJson = json;
        onUpdate(resp);
      }
    } catch (err) {
      // ignore transient errors; callback may want to handle stale UI
      // console.debug("pollLanyard error", err);
    }
  };

  // start immediately
  doFetch();
  timer = window.setInterval(doFetch, intervalMs);

  return {
    stop() {
      stopped = true;
      if (timer) clearInterval(timer);
    },
    async immediate() {
      await doFetch();
    },
  };
}

/**
 * Lightweight subscribe manager per-user to allow multiple UI consumers to share polling.
 *
 * Example:
 *  const unsubscribe = subscribeLanyard('8793934...', (data) => setState(data));
 *  // later unsubscribe()
 */
type Subscriber = (resp: LanyardResponse) => void;
type SubEntry = {
  subscribers: Set<Subscriber>;
  pollHandle?: { stop: () => void; immediate: () => Promise<void> };
};

const SUBSCRIBERS = new Map<string, SubEntry>();

export function subscribeLanyard(userId: string, cb: Subscriber, intervalMs = 5000): () => void {
  if (!userId) {
    cb({ success: false });
    return () => {};
  }

  let entry = SUBSCRIBERS.get(userId);
  if (!entry) {
    const subs = new Set<Subscriber>();
    entry = { subscribers: subs };
    SUBSCRIBERS.set(userId, entry);

    // start polling and broadcast to subscribers
    const handle = pollLanyard(
      userId,
      (resp) => {
        // broadcast
        entry!.subscribers.forEach((s) => {
          try {
            s(resp);
          } catch (e) {
            // swallow subscriber errors to avoid breaking the loop
            // eslint-disable-next-line no-console
            console.warn("lanyard subscriber error", e);
          }
        });
      },
      intervalMs,
    );
    entry.pollHandle = handle;
  }

  entry.subscribers.add(cb);

  // Try to deliver cached data immediately if present
  const cached = CACHE.get(userId);
  if (cached) {
    try {
      cb(cached.resp);
    } catch {
      // ignore
    }
  }

  return () => {
    const e = SUBSCRIBERS.get(userId);
    if (!e) return;
    e.subscribers.delete(cb);
    if (e.subscribers.size === 0) {
      // stop polling and delete entry
      e.pollHandle?.stop();
      SUBSCRIBERS.delete(userId);
    }
  };
}

/**
 * Clears the in-memory cache for a user (useful for testing or forced refresh).
 */
export function clearLanyardCache(userId?: string) {
  if (userId) {
    CACHE.delete(userId);
  } else {
    CACHE.clear();
  }
}
