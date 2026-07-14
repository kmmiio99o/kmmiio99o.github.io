const BASE_URL = "https://api.lanyard.rest/v1";

export interface LanyardPresence {
  data: {
    discord_user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: string | null;
      display_name: string | null;
    };
    discord_status: "online" | "idle" | "dnd" | "offline";
    activities: LanyardActivity[];
    listening_to_spotify: boolean;
  };
}

export interface LanyardActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: { start: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

export function getDiscordAvatarUrl(user?: {
  id?: string;
  avatar?: string | null;
}): string | null {
  if (!user?.id || !user?.avatar) return null;
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}

export function getDiscordBannerUrl(user?: {
  id?: string;
  banner?: string | null;
}): string | null {
  if (!user?.id || !user?.banner) return null;
  const ext = user.banner.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=600`;
}

let pollIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();
let cachedData: Map<string, { data: LanyardPresence; timestamp: number }> =
  new Map();
const CACHE_TTL = 30000;

export async function fetchLanyard(
  userId: string,
): Promise<LanyardPresence | null> {
  const cached = cachedData.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) return null;
    const data: LanyardPresence = await res.json();
    cachedData.set(userId, { data, timestamp: Date.now() });
    return data;
  } catch {
    return null;
  }
}

export function pollLanyard(
  userId: string,
  callback: (data: LanyardPresence | null) => void,
  intervalMs: number = 5000,
): () => void {
  const key = `poll_${userId}`;
  if (pollIntervals.has(key)) {
    clearInterval(pollIntervals.get(key)!);
  }

  fetchLanyard(userId).then(callback);

  const id = setInterval(() => {
    fetchLanyard(userId).then(callback);
  }, intervalMs);

  pollIntervals.set(key, id);

  return () => {
    clearInterval(id);
    pollIntervals.delete(key);
  };
}

type Subscriber = (data: LanyardPresence | null) => void;
const subscribers: Map<string, Set<Subscriber>> = new Map();

export function subscribeLanyard(
  userId: string,
  callback: Subscriber,
  intervalMs: number = 5000,
): () => void {
  if (!subscribers.has(userId)) {
    subscribers.set(userId, new Set());

    const key = `sub_${userId}`;
    if (pollIntervals.has(key)) {
      clearInterval(pollIntervals.get(key)!);
    }

    const id = setInterval(async () => {
      const data = await fetchLanyard(userId);
      const subs = subscribers.get(userId);
      if (subs) {
        subs.forEach((cb) => cb(data));
      }
    }, intervalMs);

    pollIntervals.set(key, id);

    fetchLanyard(userId).then((data) => {
      const subs = subscribers.get(userId);
      if (subs) {
        subs.forEach((cb) => cb(data));
      }
    });
  }

  subscribers.get(userId)!.add(callback);

  return () => {
    const subs = subscribers.get(userId);
    if (subs) {
      subs.delete(callback);
      if (subs.size === 0) {
        subscribers.delete(userId);
        const key = `sub_${userId}`;
        const intervalId = pollIntervals.get(key);
        if (intervalId) {
          clearInterval(intervalId);
          pollIntervals.delete(key);
        }
      }
    }
  };
}
