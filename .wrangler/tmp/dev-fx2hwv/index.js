var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/api/lanyard.js
async function handleLanyardAPI(request) {
  try {
    console.log("Fetching from Lanyard API...");
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/879393496627306587",
      {
        headers: {
          "User-Agent": "kmmiio99o-portfolio/1.0.0"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Lanyard API returned ${response.status}`);
    }
    const data = await response.json();
    console.log("Lanyard response:", data);
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
        "Cache-Control": "public, max-age=30"
      }
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
          activities: []
        }
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}
__name(handleLanyardAPI, "handleLanyardAPI");
function generateDiscordHTML(data) {
  if (!data || !data.success || !data.data) {
    return `
      <div class="discord-section">
        <div class="discord-unavailable">
          <span>\u26A0\uFE0F Discord status unavailable</span>
        </div>
      </div>
    `;
  }
  const userData = data.data;
  const user = userData.discord_user;
  const activities = userData.activities || [];
  const status = userData.discord_status || "offline";
  let badgesHTML = "";
  if (user && user.public_flags) {
    const badges = [];
    const flags = user.public_flags;
    if (flags & 64)
      badges.push({
        name: "HypeSquad Bravery",
        url: "https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png"
      });
    if (flags & 4194304)
      badges.push({
        name: "Active Developer",
        url: "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png"
      });
    badges.push({
      name: "Custom Badge",
      url: "https://gb.obamabot.me/04b5f1aeb78dee22295d532d8030d53c104bf8e1.png"
    });
    if (badges.length > 0) {
      badgesHTML = `
        <div class="discord-badges">
          ${badges.map(
        (badge) => `
            <div class="discord-badge${badge.name === "Custom Badge" ? " custom-badge" : ""}" title="${badge.name}">
              <img src="${badge.url}" alt="${badge.name}" style="${badge.name === "Custom Badge" ? "width:28px;height:28px;" : "width:36px;height:36px;"}display:block;" />
            </div>
          `
      ).join("")}
        </div>
      `;
    }
  }
  const customActivity = activities.find((activity) => activity.type === 4);
  let customStatusText = "";
  if (customActivity && customActivity.state) {
    customStatusText = customActivity.state;
  }
  const otherActivities = activities.filter((activity) => activity.type !== 4);
  let activitiesHTML = "";
  otherActivities.forEach((activity) => {
    let activityIcon = "";
    if (activity.assets && activity.assets.large_image) {
      if (activity.assets.large_image.startsWith("mp:external/")) {
        const imageUrl = activity.assets.large_image.replace("mp:external/", "https://media.discordapp.net/external/").replace(/\\/g, "/");
        activityIcon = `<img src="${imageUrl}" alt="${activity.name}" class="activity-large-image">`;
      } else {
        const imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
        activityIcon = `<img src="${imageUrl}" alt="${activity.name}" class="activity-large-image">`;
      }
    }
    let smallIcon = "";
    if (activity.assets && activity.assets.small_image) {
      if (activity.assets.small_image.startsWith("mp:external/")) {
        const imageUrl = activity.assets.small_image.replace("mp:external/", "https://media.discordapp.net/external/").replace(/\\/g, "/");
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
        const totalSeconds = Math.floor(elapsed / 1e3);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(totalSeconds % 3600 / 60);
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
          const totalSeconds = Math.floor(remaining / 1e3);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor(totalSeconds % 3600 / 60);
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
    <\/script>
  `;
}
__name(generateDiscordHTML, "generateDiscordHTML");

// src/index.js
var src_default = {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/") {
        return await handleHomePage();
      }
      if (url.pathname === "/api/discord") {
        return handleLanyardAPI(request);
      }
      if (url.pathname.startsWith("/themes/")) {
        return new Response("Theme preview coming soon", {
          headers: { "Content-Type": "text/plain" }
        });
      }
      return new Response("Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" }
      });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
};
async function handleHomePage() {
  let discordHTML = "";
  let avatarUrl = "";
  let username = "kmmiio99o";
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/879393496627306587"
    );
    if (response.ok) {
      const data = await response.json();
      discordHTML = generateDiscordHTML(data);
      if (data.success && data.data && data.data.discord_user) {
        const user = data.data.discord_user;
        if (user.avatar && user.id) {
          avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
        }
        if (user.username) {
          username = user.username;
        }
      }
    } else {
      discordHTML = '<div class="status-section"><div class="custom-status"><span>\u26A0\uFE0F Discord API unavailable</span></div></div>';
    }
  } catch (error) {
    discordHTML = '<div class="status-section"><div class="custom-status"><span>\u274C Could not load Discord status</span></div></div>';
  }
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>kmmiio99o - Developer Portfolio</title>
    <meta name="description" content="Personal portfolio website with Material You design">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --md-sys-color-primary: 208, 188, 255;
            --md-sys-color-on-primary: 55, 30, 115;
            --md-sys-color-secondary: 204, 194, 220;
            --md-sys-color-surface: 16, 14, 19;
            --md-sys-color-on-surface: 230, 225, 229;
            --md-sys-color-on-surface-variant: 202, 196, 208;
            --md-sys-color-background: 16, 14, 19;
            --md-sys-color-on-background: 230, 225, 229;
            --md-sys-color-error: 255, 180, 171;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, rgb(var(--md-sys-color-background)) 0%, rgb(24, 21, 28) 50%, rgb(var(--md-sys-color-background)) 100%);
            color: rgb(var(--md-sys-color-on-background));
            line-height: 1.6;
            min-height: 100vh;
            position: relative;
        }

        .bg-decoration {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 80%, rgba(var(--md-sys-color-primary), 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(var(--md-sys-color-secondary), 0.1) 0%, transparent 50%);
            z-index: -1;
            pointer-events: none;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .hero {
            text-align: center;
            padding: 8rem 0 4rem;
        }

        .avatar-container {
            position: relative;
            margin: 0 auto 2rem;
            width: 120px;
            height: 120px;
        }

        .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgb(var(--md-sys-color-primary)) 0%, rgb(var(--md-sys-color-secondary)) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--md-sys-color-on-primary));
            border: 3px solid rgb(var(--md-sys-color-primary));
            box-shadow: 0 8px 32px rgba(var(--md-sys-color-primary), 0.3);
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .discord-status {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid rgb(var(--md-sys-color-background));
            z-index: 1;
        }

        .status-online { background-color: #23a55a; }
        .status-idle { background-color: #f0b232; }
        .status-dnd { background-color: #f23f43; }
        .status-offline { background-color: #80848e; }

        .avatar-status-wrapper {
            position: relative;
            display: flex;
            align-items: flex-end;
        }
        .avatar-container {
            position: relative;
        }
        .status-cloud {
            position: absolute;
            left: auto;
            right: 150px;
            bottom: 100px;
            background: rgba(var(--md-sys-color-surface), 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(var(--md-sys-color-on-surface-variant), 0.2);
            border-radius: 20px;
            padding: 10px 16px;
            min-width: 100px;
            max-width: 340px;
            color: rgb(var(--md-sys-color-on-surface));
            font-size: 15px;
            white-space: pre-line;
            overflow-wrap: break-word;
            word-break: break-word;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            text-align: left;
            transition: all 0.2s;
        }
        .status-cloud::before {
            content: '';
            position: absolute;
            left: -10px;
            bottom: 10px;
            width: 14px;
            height: 14px;
            background: rgba(var(--md-sys-color-surface), 0.95);
            border-radius: 50%;
            z-index: 1;
        }

        @media (max-width: 768px) {
            .avatar-status-wrapper {
                flex-direction: column;
                align-items: center;
            }
            .avatar-container {
                width: 100px;
                height: 100px;
            }
            .avatar {
                width: 100px;
                height: 100px;
                font-size: 2.5rem;
            }
            .discord-status {
                width: 20px;
                height: 20px;
                bottom: 6px;
                right: 6px;
            }
            .status-cloud {
                position: static !important;
                margin: 18px auto 18px auto !important;
                display: block !important;
                min-width: 0;
                max-width: 95vw;
                width: 100%;
                text-align: center;
                font-size: 13px;
                padding: 10px 12px;
                border-radius: 16px;
                box-sizing: border-box;
                background: rgba(var(--md-sys-color-surface), 0.95);
                border: 1px solid rgba(var(--md-sys-color-on-surface-variant), 0.2);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            }
            .status-cloud::before {
                display: none !important;
            }
        }

        .activity-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .activity-icon {
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        .activity-name {
            font-weight: 500;
            color: rgb(var(--md-sys-color-on-surface));
        }

        .activity-details {
            font-size: 0.85rem;
            color: rgb(var(--md-sys-color-on-surface-variant));
            line-height: 1.4;
        }

        .loading {
            opacity: 0.7;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }

        .gradient-text {
            background: linear-gradient(135deg, rgb(var(--md-sys-color-primary)) 0%, rgb(var(--md-sys-color-secondary)) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        h1 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            max-width: 600px;
            margin: 0 auto 2rem;
            color: rgb(var(--md-sys-color-on-surface-variant));
        }

        .social-links {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            color: rgb(var(--md-sys-color-primary));
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-btn:hover {
            background: rgba(var(--md-sys-color-primary), 0.2);
            transform: translateY(-2px);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: inherit;
        }

        .btn-primary {
            background: linear-gradient(135deg, rgb(var(--md-sys-color-primary)) 0%, rgb(var(--md-sys-color-primary)) 100%);
            color: rgb(var(--md-sys-color-on-primary));
        }

        .btn-outlined {
            background: transparent;
            border: 1px solid rgba(var(--md-sys-color-primary), 0.5);
            color: rgb(var(--md-sys-color-primary));
        }

        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .hero-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .skills-section {
            padding: 4rem 0;
            text-align: center;
        }

        .section-title {
            font-size: clamp(2rem, 4vw, 2.5rem);
            margin-bottom: 3rem;
        }

        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            max-width: 800px;
            margin: 0 auto;
        }

        .chip {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            border-radius: 16px;
            background: rgba(var(--md-sys-color-primary), 0.12);
            color: rgb(var(--md-sys-color-primary));
            border: 1px solid rgba(var(--md-sys-color-primary), 0.3);
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .chip:hover {
            background: rgba(var(--md-sys-color-primary), 0.2);
            transform: translateY(-1px);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            transition: all 0.3s ease;
        }

        .glass-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .projects-section {
            padding: 4rem 0;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .project-card {
            padding: 1.5rem;
            text-align: left;
        }

        .project-card h3 {
            margin-bottom: 0.5rem;
            color: rgb(var(--md-sys-color-on-surface));
        }

        .project-card p {
            margin-bottom: 1rem;
            color: rgb(var(--md-sys-color-on-surface-variant));
        }

        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .project-tags .chip {
            font-size: 0.75rem;
            padding: 4px 12px;
        }

        .footer {
            padding: 3rem 0;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 4rem;
        }

        @media (max-width: 768px) {
            .container {
                padding: 0 1rem;
            }

            .hero {
                padding: 4rem 0 2rem;
            }

            .avatar-container {
                width: 100px;
                height: 100px;
            }

            .avatar {
                width: 100px;
                height: 100px;
                font-size: 2.5rem;
            }

            .discord-status {
                width: 20px;
                height: 20px;
                bottom: 6px;
                right: 6px;
            }

            .hero-actions {
                flex-direction: column;
                align-items: center;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="bg-decoration"></div>

    <main>
        <div class="container">
            <!-- Hero Section -->
            <section class="hero">
                <div class="avatar-status-wrapper">
                    <div class="avatar-container">
                        <div class="avatar" id="user-avatar" ${avatarUrl ? `style="background-image: url(${avatarUrl}); background-size: cover; background-position: center;"` : ""}>
                            ${avatarUrl ? "" : "K"}
                        </div>
                        <div class="discord-status status-offline" id="discord-status"></div>
                    </div>
                    <div class="status-cloud" id="status-cloud" style="display: none;"></div>
                </div>
                <h1 class="gradient-text" id="username">${username}</h1>

                ${discordHTML}

                <p class="hero-subtitle">
                    Creative developer specializing in Discord themes, web development, and Material You design systems
                </p>

                <div class="social-links">
                    <a href="https://github.com/kmmiio99o" target="_blank" rel="noopener noreferrer" class="social-btn">
                        <span class="material-icons">code</span>
                    </a>
                    <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" class="social-btn">
                        <span class="material-icons">forum</span>
                    </a>
                </div>

                <div class="hero-actions">
                    <a href="#projects" class="btn btn-primary">
                        <span class="material-icons">palette</span>
                        View Projects
                    </a>
                    <a href="https://github.com/kmmiio99o" target="_blank" rel="noopener noreferrer" class="btn btn-outlined">
                        <span class="material-icons">launch</span>
                        GitHub
                    </a>
                </div>
            </section>

            <!-- Skills Section -->
            <section class="skills-section">
                <h2 class="gradient-text section-title">Skills & Technologies</h2>
                <div class="skills-grid">
                    <span class="chip">React</span>
                    <span class="chip">Next.js</span>
                    <span class="chip">TypeScript</span>
                    <span class="chip">Node.js</span>
                    <span class="chip">Discord.js</span>
                    <span class="chip">CSS3</span>
                    <span class="chip">HTML5</span>
                    <span class="chip">Git</span>
                    <span class="chip">Cloudflare</span>
                    <span class="chip">Material You</span>
                </div>
            </section>

            <!-- Projects Section -->
            <section class="projects-section" id="projects">
                <h2 class="gradient-text section-title">Featured Projects</h2>
                <div class="projects-grid">
                    <div class="project-card glass-card">
                        <h3>Blossom Theme</h3>
                        <p>A beautiful cherry blossom inspired Discord theme with soft pink gradients and elegant design elements.</p>
                        <div class="project-tags">
                            <span class="chip">CSS</span>
                            <span class="chip">Discord</span>
                            <span class="chip">Pink</span>
                        </div>
                    </div>

                    <div class="project-card glass-card">
                        <h3>Tenka Theme</h3>
                        <p>A sleek and modern Discord theme with dark tones and vibrant accent colors.</p>
                        <div class="project-tags">
                            <span class="chip">CSS</span>
                            <span class="chip">Discord</span>
                            <span class="chip">Dark</span>
                        </div>
                    </div>

                    <div class="project-card glass-card">
                        <h3>Vencord Midnight</h3>
                        <p>A midnight-themed Discord theme optimized for Vencord with deep blues and subtle animations.</p>
                        <div class="project-tags">
                            <span class="chip">CSS</span>
                            <span class="chip">Vencord</span>
                            <span class="chip">Blue</span>
                        </div>
                    </div>

                    <div class="project-card glass-card">
                        <h3>Theme Marketplace</h3>
                        <p>A Material You themed website showcasing Discord themes with beautiful animations and modern design.</p>
                        <div class="project-tags">
                            <span class="chip">React</span>
                            <span class="chip">Material You</span>
                            <span class="chip">TypeScript</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="footer">
                <p>Made with <span class="material-icons" style="color: rgb(var(--md-sys-color-error)); font-size: inherit;">favorite</span> using Cloudflare Workers</p>
                <p>&copy; 2024 kmmiio99o. All rights reserved.</p>
            </footer>
        </div>
    </main>

    <script>
        // Simple fade-in animation
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.glass-card, .chip');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease-out';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    <\/script>
</body>
</html>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
__name(handleHomePage, "handleHomePage");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-dSfzEe/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-dSfzEe/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
