#!/bin/bash

# Simple deployment script for Cloudflare Pages
# This script builds the Next.js site and deploys it using Wrangler

set -e  # Exit on any error

echo "🚀 Starting Cloudflare Pages deployment..."

# Check if we're in the correct directory
if [ ! -d "nextjs-site" ]; then
    echo "❌ Error: nextjs-site directory not found!"
    echo "Please run this script from the root of your repository."
    exit 1
fi

# Check if wrangler is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js."
    exit 1
fi

echo "📁 Navigating to Next.js project..."
cd nextjs-site

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building Next.js project for production..."
NODE_ENV=production npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed - output directory 'out' not found!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Go back to root
cd ..

# Deploy to Cloudflare Pages
echo "☁️ Deploying to Cloudflare Pages..."
npx wrangler pages deploy nextjs-site/out --project-name=kmmiio99o

echo ""
echo "🎉 Deployment completed!"
echo "🌐 Your site will be available at:"
echo "   https://kmmiio99o.pages.dev"
echo ""
echo "💡 To set up custom domain (kmmiio99o.workers.dev):"
echo "   1. Go to Cloudflare Dashboard → Pages → kmmiio99o-site"
echo "   2. Click on 'Custom domains' tab"
echo "   3. Add 'kmmiio99o.workers.dev' as a custom domain"
echo ""
echo "📊 To view deployment history:"
echo "   npx wrangler pages deployment list --project-name=kmmiio99o-site"
echo ""
