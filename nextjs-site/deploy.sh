#!/bin/bash

# Deployment script for GitHub Pages with custom domain
# This script builds the Next.js application and deploys it to GitHub Pages
# with support for custom domain (kmmiio99o.workers.dev)

set -e  # Exit on any error

echo "🚀 Starting deployment process for custom domain..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the nextjs-site directory."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d "../.git" ]; then
    echo "❌ Error: Not in a git repository."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running ESLint..."
npm run lint --silent || echo "⚠️  ESLint warnings found (continuing anyway)"

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed. No 'out' directory found."
    exit 1
fi

# Navigate to parent directory (repository root)
echo "📁 Preparing deployment files..."
cd ..

# Create a backup of important files
echo "💾 Creating backup of important files..."
cp -r .github .github.backup 2>/dev/null || true
cp LICENSE LICENSE.backup 2>/dev/null || true
cp README.md README.backup 2>/dev/null || true

# Remove old build files but keep important directories and files
echo "🧹 Cleaning old build files..."
find . -maxdepth 1 -type f -name "*.html" -delete 2>/dev/null || true
find . -maxdepth 1 -type f -name "*.js" -delete 2>/dev/null || true
find . -maxdepth 1 -type f -name "*.css" -delete 2>/dev/null || true
find . -maxdepth 1 -type d -name "_next" -exec rm -rf {} + 2>/dev/null || true

# Copy new files from Next.js build
echo "📋 Copying new build files..."
cp -r nextjs-site/out/* .

# Create CNAME file for custom domain
echo "🌐 Setting up custom domain..."
echo "kmmiio99o.workers.dev" > CNAME

# Create .nojekyll file to prevent Jekyll processing
touch .nojekyll

# Restore important files
echo "🔄 Restoring important files..."
if [ -d ".github.backup" ]; then
    rm -rf .github
    mv .github.backup .github
fi
if [ -f "LICENSE.backup" ]; then
    mv LICENSE.backup LICENSE
fi
if [ -f "README.backup" ]; then
    mv README.backup README.md
fi

# Git operations
echo "📝 Committing changes..."
git add .
git commit -m "Deploy Next.js site to custom domain - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://kmmiio99o.workers.dev"
echo "⏰ It may take a few minutes for changes to appear."
echo ""
echo "📋 Next steps:"
echo "   1. Go to your GitHub repository settings"
echo "   2. Navigate to Pages section"
echo "   3. Ensure source is set to 'Deploy from a branch'"
echo "   4. Select 'main' branch and '/ (root)' folder"
echo "   5. Your custom domain should be automatically detected from CNAME"
echo ""
echo "🔧 Custom domain setup:"
echo "   - CNAME file created with: kmmiio99o.workers.dev"
echo "   - Make sure your DNS points to GitHub Pages:"
echo "     CNAME record: kmmiio99o.workers.dev → your-username.github.io"
echo ""

# Return to the nextjs-site directory
cd nextjs-site
