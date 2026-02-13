#!/bin/bash

# Exit on error
set -e

echo "🧹 Cleaning previous build..."
rm -rf public

echo "📖 Building Documentation..."
# Build Zola site into public/docs
cd barley/docs
zola build --base-url /docs/ --output-dir ../../public/docs
cd ../..

echo "🏠 Setting up Landing Page..."
# Copy landing page to root of public
cp index.html public/index.html

# Copy dist files if needed (e.g. if index.html or docs reference them relative to root)
mkdir -p public/dist
cp -r barley/dist/* public/dist/

echo "✅ Build Complete!"
echo "The 'public' directory is ready for deployment."
