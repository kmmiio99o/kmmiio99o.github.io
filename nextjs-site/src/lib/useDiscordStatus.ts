"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  LanyardResponse,
  DiscordData,
  ProcessedDiscordActivity,
} from "@/types";

const DISCORD_USER_ID = "879393496627306587";
const LANYARD_API_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;

// Fetcher function for SWR
const fetcher = async (url: string): Promise<DiscordData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Discord status");
  }
  const data: LanyardResponse = await response.json();
  if (!data.success) {
    throw new Error("Lanyard API returned an error");
  }
  return data.data;
};

export function useDiscordStatus() {
  const { data, error, isLoading, mutate } = useSWR(LANYARD_API_URL, fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000, // Prevent duplicate requests within 5 seconds
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  // Format avatar URL
  const getAvatarUrl = (user: DiscordData["discord_user"]) => {
    if (!user.avatar) {
      // Default Discord avatar
      const defaultAvatarId = parseInt(user.discriminator) % 5;
      return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarId}.png`;
    }
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=128`;
  };

  // Format activity asset URLs
  const getActivityImageUrl = (activity: DiscordData["activities"][0]) => {
    if (!activity.assets?.large_image) return null;

    if (activity.assets.large_image.startsWith("spotify:")) {
      return `https://i.scdn.co/image/${activity.assets.large_image.slice(8)}`;
    }

    if (activity.assets.large_image.startsWith("mp:external/")) {
      return `https://media.discordapp.net/external/${activity.assets.large_image.slice(12)}`;
    }

    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`;
  };

  // Get status color and label
  const getStatusInfo = (status: DiscordData["discord_status"]) => {
    switch (status) {
      case "online":
        return { color: "#23a55a", label: "Online" };
      case "idle":
        return { color: "#f0b232", label: "Away" };
      case "dnd":
        return { color: "#f23f43", label: "Do Not Disturb" };
      case "offline":
      default:
        return { color: "#80848e", label: "Offline" };
    }
  };

  // Format time for activities
  const formatElapsedTime = (start: number) => {
    const now = Date.now();
    const elapsed = Math.floor((now - start) / 1000);

    if (elapsed < 60) return `${elapsed}s`;
    if (elapsed < 3600) return `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Get the primary activity (non-Spotify, non-custom status)
  const getPrimaryActivity = (activities: DiscordData["activities"]) => {
    return activities.find(
      (activity) =>
        activity.type !== 4 && // Not custom status
        activity.name !== "Spotify" && // Not Spotify
        activity.name !== "Custom Status",
    );
  };

  // Get custom status
  const getCustomStatus = (activities: DiscordData["activities"]) => {
    return activities.find((activity) => activity.type === 4);
  };

  // Process and return formatted data
  const processedData = data
    ? {
        user: {
          ...data.discord_user,
          avatarUrl: getAvatarUrl(data.discord_user),
          displayName:
            data.discord_user.global_name ||
            data.discord_user.display_name ||
            data.discord_user.username,
        },
        status: {
          ...getStatusInfo(data.discord_status),
          raw: data.discord_status,
        },
        activity: (() => {
          const primaryActivity = getPrimaryActivity(data.activities);
          if (!primaryActivity) return null;

          return {
            ...primaryActivity,
            imageUrl: getActivityImageUrl(primaryActivity),
            elapsedTime: primaryActivity.timestamps?.start
              ? formatElapsedTime(primaryActivity.timestamps.start)
              : null,
          } as ProcessedDiscordActivity;
        })(),
        customStatus: getCustomStatus(data.activities),
        spotify: data.listening_to_spotify ? data.spotify : null,
        activities: data.activities.map((activity) => ({
          ...activity,
          imageUrl: getActivityImageUrl(activity),
          elapsedTime: activity.timestamps?.start
            ? formatElapsedTime(activity.timestamps.start)
            : null,
        })) as ProcessedDiscordActivity[],
        raw: data, // Keep raw data for debugging
      }
    : null;

  return {
    data: processedData,
    isLoading,
    error,
    refresh: mutate,
  };
}

// Hook for WebSocket connection (optional enhancement)
export function useDiscordStatusWebSocket() {
  const [data, setData] = useState<DiscordData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://api.lanyard.rest/socket`);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);

      // Subscribe to user
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: DISCORD_USER_ID,
          },
        }),
      );
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
          setData(message.d);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.onerror = () => {
      setError("WebSocket connection error");
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    data,
    isConnected,
    error,
  };
}
