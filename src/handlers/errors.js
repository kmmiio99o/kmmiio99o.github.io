export async function handleNotFound(request, env) {
  const notFoundContent = `
    <div class="container">
      <div class="error-container">
        <div class="error-content glass-card">
          <div class="error-icon">
            <span class="material-icons">error_outline</span>
          </div>
          <h1 class="error-title gradient-text">404 - Page Not Found</h1>
          <p class="error-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="error-actions">
            <a href="/" class="btn btn-primary">
              <span class="material-icons">home</span>
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>

    <style>
      .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
        padding: 2rem 0;
      }

      .error-content {
        max-width: 500px;
        padding: 3rem;
        text-align: center;
      }

      .error-icon {
        font-size: 4rem;
        color: rgb(var(--md-sys-color-error));
        margin-bottom: 1.5rem;
      }

      .error-icon .material-icons {
        font-size: inherit;
      }

      .error-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .error-description {
        color: rgb(var(--md-sys-color-on-surface-variant));
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.6;
      }

      .error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      @media (max-width: 768px) {
        .error-content {
          padding: 2rem;
          margin: 1rem;
        }
      }
    </style>
  `;

  const html = getBaseHTML({
    title: '404 - Page Not Found | kmmiio99o',
    description: 'The page you are looking for could not be found.',
    content: notFoundContent
  });

  return new Response(html, {
    status: 404,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

function getBaseHTML({ title, description, content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
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
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
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

        .gradient-text {
            background: linear-gradient(135deg, rgb(var(--md-sys-color-primary)) 0%, rgb(var(--md-sys-color-secondary)) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body>
    <main>${content}</main>
</body>
</html>`;
}
