import { handleLanyardAPI, generateDiscordHTML } from "./api/lanyard.js";

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      // Simple routing without itty-router for debugging
      if (url.pathname === "/") {
        return await handleHomePage();
      }

      // Serve static files from /theme-previews/*
      if (url.pathname.startsWith("/theme-previews/")) {
        // Map the URL path to the local file path
        const fsPath = url.pathname.replace("/theme-previews/", "");
        // Only allow known files for security
        const allowedFiles = [
          "blossom/preview1.jpg",
          "blossom/preview2.jpg",
          "blossom/preview3.jpg",
          "blossom/preview4.jpg",
          "tenka/preview1.jpg",
          "tenka/preview2.jpg",
          "tenka/preview3.jpg",
          "tenka/preview4.jpg",
          "vencord-midnight/preview1.jpg",
          "vencord-midnight/preview2.jpg",
          "vencord-midnight/preview3.jpg",
          "vencord-midnight/preview4.jpg",
        ];
        if (allowedFiles.includes(fsPath)) {
          // Use import.meta.glob or require for static bundlers, but for Worker, use base64 inline
          // For demonstration, serve a placeholder response
          return new Response(
            "Preview file access enabled. Replace this with actual file serving logic.",
            {
              headers: { "Content-Type": "text/plain" },
            },
          );
        }
        return new Response("Not found", { status: 404 });
      }

      if (url.pathname === "/api/discord") {
        return handleLanyardAPI(request);
      }

      if (url.pathname.startsWith("/themes/")) {
        return new Response("Theme preview coming soon", {
          headers: { "Content-Type": "text/plain" },
        });
      }

      // 404 for everything else
      return new Response("Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
};

async function handleHomePage() {
  // Fetch Discord data server-side
  let discordHTML = "";
  let avatarUrl = "";
  let username = "kmmiio99o";
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/879393496627306587",
    );
    if (response.ok) {
      const data = await response.json();
      discordHTML = generateDiscordHTML(data);

      // Extract avatar and username directly
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
      discordHTML =
        '<div class="status-section"><div class="custom-status"><span>⚠️ Discord API unavailable</span></div></div>';
    }
  } catch (error) {
    discordHTML =
      '<div class="status-section"><div class="custom-status"><span>❌ Could not load Discord status</span></div></div>';
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
                  <a href="#projects" class="btn btn-primary" id="view-projects-btn">
                    <span class="material-icons">palette</span>
                    View Projects
                  </a>
                  <a href="https://github.com/kmmiio99o" target="_blank" rel="noopener noreferrer" class="btn btn-outlined">
                    <span class="material-icons">launch</span>
                    GitHub
                  </a>
                </div>
                <div class="mui-card personal-info-card">
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
              <h2 class="gradient-text section-title">Projects</h2>
              <div class="projects-grid">
                <div class="project-card glass-card">
                  <h3>Ormi Bot</h3>
                  <p>A powerful multipurpose Discord bot with moderation, utility, and fun features. Built for reliability and ease of use.</p>
                  <div class="project-tags">
                    <span class="chip">discord.py</span>
                    <span class="chip">Python</span>
                    <span class="chip">Bot</span>
                  </div>
                </div>
                <div class="project-card glass-card">
                  <h3>Kaoruko Bot</h3>
                  <p>An advanced Discord bot focused on anime, music, and community engagement. Includes custom commands and integrations.</p>
                  <div class="project-tags">
                    <span class="chip">Discord.js</span>
                    <span class="chip">Anime</span>
                    <span class="chip">Music</span>
                  </div>
                </div>
                <div class="project-card glass-card">
                  <h3>Plugins for Revenge/Kettu</h3>
                  <p>Custom plugins and extensions for the Revenge and Kettu Discord bot frameworks, adding unique features and integrations.</p>
                  <div class="project-tags">
                    <span class="chip">Plugins</span>
                    <span class="chip">Revenge</span>
                    <span class="chip">Kettu</span>
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
    </script>
</body>
</html>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('view-projects-btn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        const target = document.getElementById('projects');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
</script>
`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
