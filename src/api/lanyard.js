export async function handleLanyardAPI(request) {
  try {
    console.log("Fetching from Lanyard API...");

    const response = await fetch(
      "https://api.lanyard.rest/v1/users/879393496627306587",
      {
        headers: {
          "User-Agent": "kmmiio99o-portfolio/1.0.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Lanyard API returned ${response.status}`);
    }

    const data = await response.json();
    console.log("Lanyard response:", data);

    // Transform the data to include avatar URL
    if (data.success && data.data && data.data.discord_user) {
      const user = data.data.discord_user;
      if (user.avatar) {
        data.data.discord_user.avatar_url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
      }
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (error) {
    console.error("Lanyard API error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        fallback: {
          username: "kmmiio99o",
          status: "offline",
          custom_status: null,
          activities: [],
        },
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

export function generateDiscordHTML(data) {
  if (!data || !data.success || !data.data) {
    return `
      <div class="discord-section">
        <div class="discord-unavailable">
          <span>⚠️ Discord status unavailable</span>
        </div>
      </div>
    `;
  }

  const userData = data.data;
  const user = userData.discord_user;
  const activities = userData.activities || [];
  const status = userData.discord_status || "offline";

  // Generate badges
  let badgesHTML = "";
  if (user && user.public_flags) {
    const badges = [];
    const flags = user.public_flags;

    // Discord badges based on public flags
    // HypeSquad Bravery (example, you can add more if you want)
    if (flags & 64)
      badges.push({
        name: "HypeSquad Bravery",
        url: "https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png",
      });
    // Active Developer
    if (flags & 4194304)
      badges.push({
        name: "Active Developer",
        url: "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png",
      });
    // Custom badge (always show, or add your own logic)
    badges.push({
      name: "Custom Badge",
      url: "https://gb.obamabot.me/04b5f1aeb78dee22295d532d8030d53c104bf8e1.png",
    });

    if (badges.length > 0) {
      badgesHTML = `
        <div class="discord-badges">
          ${badges
            .map(
              (badge) => `
            <div class="discord-badge${badge.name === "Custom Badge" ? " custom-badge" : ""}" title="${badge.name}">
              <img src="${badge.url}" alt="${badge.name}" style="${badge.name === "Custom Badge" ? "width:28px;height:28px;" : "width:36px;height:36px;"}display:block;" />
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    }
  }

  // Custom status for cloud bubble
  const customActivity = activities.find((activity) => activity.type === 4);
  let customStatusText = "";

  if (customActivity && customActivity.state) {
    customStatusText = customActivity.state;
  }

  // Activities with Discord styling
  const otherActivities = activities.filter((activity) => activity.type !== 4);
  let activitiesHTML = "";

  otherActivities.forEach((activity) => {
    let activityIcon = "";
    if (activity.assets && activity.assets.large_image) {
      if (activity.assets.large_image.startsWith("mp:external/")) {
        const imageUrl = activity.assets.large_image
          .replace("mp:external/", "https://media.discordapp.net/external/")
          .replace(/\\/g, "/");
        activityIcon = `<img src="${imageUrl}" alt="${activity.name}" class="activity-large-image">`;
      } else {
        const imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
        activityIcon = `<img src="${imageUrl}" alt="${activity.name}" class="activity-large-image">`;
      }
    }

    let smallIcon = "";
    if (activity.assets && activity.assets.small_image) {
      if (activity.assets.small_image.startsWith("mp:external/")) {
        const imageUrl = activity.assets.small_image
          .replace("mp:external/", "https://media.discordapp.net/external/")
          .replace(/\\/g, "/");
        smallIcon = `<img src="${imageUrl}" alt="${activity.assets.small_text || ""}" class="activity-small-image">`;
      } else {
        const imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
        smallIcon = `<img src="${imageUrl}" alt="${activity.assets.small_text || ""}" class="activity-small-image">`;
      }
    }

    let activityType = "";
    let activityColor = "";
    switch (activity.type) {
      case 0:
        activityType = "Playing";
        activityColor = "#5865f2";
        break;
      case 1:
        activityType = "Streaming";
        activityColor = "#593695";
        break;
      case 2:
        activityType = "Listening to";
        activityColor = "#1db954";
        break;
      case 3:
        activityType = "Watching";
        activityColor = "#f47b67";
        break;
      case 5:
        activityType = "Competing in";
        activityColor = "#faa61a";
        break;
      default:
        activityType = "Playing";
        activityColor = "#5865f2";
        break;
    }

    let timeInfo = "";
    if (activity.timestamps) {
      const now = Date.now();
      if (activity.timestamps.start) {
        const elapsed = now - activity.timestamps.start;
        const totalSeconds = Math.floor(elapsed / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
          timeInfo = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} elapsed`;
        } else {
          timeInfo = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} elapsed`;
        }
      }

      if (activity.timestamps.end) {
        const remaining = activity.timestamps.end - now;
        if (remaining > 0) {
          const totalSeconds = Math.floor(remaining / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          if (hours > 0) {
            timeInfo = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} left`;
          } else {
            timeInfo = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} left`;
          }
        }
      }
    }

    activitiesHTML += `
      <div class="discord-activity" style="border-left-color: ${activityColor};">
        <div class="activity-content">
          <div class="activity-images">
            ${activityIcon}
            ${smallIcon ? `<div class="activity-small-container">${smallIcon}</div>` : ""}
          </div>
          <div class="activity-info">
            <div class="activity-type" style="color: ${activityColor};">${activityType}</div>
            <div class="activity-name">${activity.name}</div>
            ${activity.details ? `<div class="activity-details">${activity.details}</div>` : ""}
            ${activity.state ? `<div class="activity-state">${activity.state}</div>` : ""}
            ${timeInfo ? `<div class="activity-time">${timeInfo}</div>` : ""}
          </div>
        </div>
      </div>
    `;
  });

  return `
    <div class="discord-section">
      ${badgesHTML}
      ${activitiesHTML}
    </div>

    <style>
      .discord-section {
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .discord-badges {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .discord-badge {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--md-sys-color-surface), 0.8);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        border: 1.5px solid rgba(var(--md-sys-color-on-surface-variant), 0.2);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin: 0 2px;
        overflow: hidden;
      }

      .discord-badge:hover {
        transform: scale(1.1);
        background: rgba(var(--md-sys-color-surface), 1);
      }

      .discord-badge img {
        display: block;
        object-fit: contain;
      }

      .discord-badge.custom-badge {
        width: 44px;
        height: 44px;
        padding: 0;
        background: rgba(var(--md-sys-color-surface), 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .discord-badge.custom-badge img {
        width: 28px !important;
        height: 28px !important;
        object-fit: contain;
      }



      .discord-activity {
        background: rgba(var(--md-sys-color-surface), 0.6);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(var(--md-sys-color-on-surface-variant), 0.2);
        border-left: 4px solid #5865f2;
        border-radius: 12px;
        padding: 16px;
        max-width: 400px;
        margin: 0 auto;
        transition: all 0.3s ease;
      }

      .discord-activity:hover {
        background: rgba(var(--md-sys-color-surface), 0.8);
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(var(--md-sys-color-primary), 0.2);
      }

      .activity-content {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .activity-images {
        position: relative;
        flex-shrink: 0;
      }

      .activity-large-image {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
      }

      .activity-small-container {
        position: absolute;
        bottom: -4px;
        right: -4px;
        background: rgb(var(--md-sys-color-surface));
        border-radius: 50%;
        padding: 2px;
        border: 2px solid rgb(var(--md-sys-color-surface));
      }

      .activity-small-image {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        object-fit: cover;
      }

      .activity-info {
        flex: 1;
        min-width: 0;
      }

      .activity-type {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .activity-name {
        font-size: 16px;
        font-weight: 600;
        color: rgb(var(--md-sys-color-on-surface));
        margin-bottom: 4px;
        line-height: 1.2;
      }

      .activity-details {
        font-size: 14px;
        color: rgb(var(--md-sys-color-on-surface));
        margin-bottom: 2px;
        font-weight: 500;
      }

      .activity-state {
        font-size: 14px;
        color: rgb(var(--md-sys-color-on-surface-variant));
        margin-bottom: 4px;
      }

      .activity-time {
        font-size: 12px;
        color: rgb(var(--md-sys-color-on-surface-variant));
        font-weight: 500;
        margin-top: 6px;
      }

      .discord-unavailable {
        text-align: center;
        color: rgb(var(--md-sys-color-on-surface-variant));
        font-style: italic;
        padding: 1rem;
      }

      @media (max-width: 768px) {
        .discord-custom-status,
        .discord-activity {
          max-width: 100%;
          margin: 0;
        }

        .activity-large-image {
          width: 50px;
          height: 50px;
        }

        .activity-small-image {
          width: 18px;
          height: 18px;
        }
      }
    </style>

    <script>
      // Set Discord status indicator
      const statusElement = document.getElementById('discord-status');
      if (statusElement) {
        statusElement.className = "discord-status status-${status}";
      }

      // Set custom status cloud
      const statusCloud = document.getElementById('status-cloud');
      const customStatus = "${customStatusText}";
      if (statusCloud && customStatus) {
        statusCloud.textContent = customStatus;
        statusCloud.style.display = 'block';
      }
    </script>
  `;
}
