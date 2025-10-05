export async function handleHomePage(request, env) {
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

        .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 2rem;
            background: linear-gradient(135deg, rgb(var(--md-sys-color-primary)) 0%, rgb(var(--md-sys-color-secondary)) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--md-sys-color-on-primary));
            border: 3px solid rgb(var(--md-sys-color-primary));
            box-shadow: 0 8px 32px rgba(var(--md-sys-color-primary), 0.3);
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

            .avatar {
                width: 100px;
                height: 100px;
                font-size: 2.5rem;
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
                <div class="avatar">K</div>
                <h1 class="gradient-text">kmmiio99o</h1>
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
    </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
