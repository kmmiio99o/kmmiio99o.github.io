export async function handleStaticAssets(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Handle theme preview images
  if (pathname.startsWith("/theme-previews/")) {
    const imagePath = pathname.substring("/theme-previews/".length);

    // Basic security check
    if (imagePath.includes("..") || imagePath.includes("//")) {
      return new Response("Invalid path", { status: 400 });
    }

    // For now, return a placeholder response
    // In a real implementation, you'd fetch from R2 or another storage
    return new Response("Asset not found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Handle other static assets
  if (pathname.startsWith("/assets/")) {
    const assetPath = pathname.substring("/assets/".length);

    // Basic security check
    if (assetPath.includes("..") || assetPath.includes("//")) {
      return new Response("Invalid path", { status: 400 });
    }

    // Return appropriate response based on file type
    const extension = assetPath.split(".").pop()?.toLowerCase();
    let contentType = "application/octet-stream";

    switch (extension) {
      case "css":
        contentType = "text/css";
        break;
      case "js":
        contentType = "application/javascript";
        break;
      case "json":
        contentType = "application/json";
        break;
      case "png":
        contentType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "gif":
        contentType = "image/gif";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
      case "ico":
        contentType = "image/x-icon";
        break;
    }

    return new Response("Asset not found", {
      status: 404,
      headers: { "Content-Type": contentType },
    });
  }

  return new Response("Not found", { status: 404 });
}
