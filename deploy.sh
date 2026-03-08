#!/bin/bash
set -e

echo "🔨 Building..."
npm run build

echo "📄 Adding CNAME and .nojekyll..."
echo "nikibhavi.msdevbuild.com" > dist/CNAME
touch dist/.nojekyll

echo "🚀 Deploying to gh-pages..."
cd dist

git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')"

# Push to GitHub
git push -f https://github.com/jssuthahar/NikiBhavi.git gh-pages:gh-pages

cd ..
echo "✅ Done! Wait 2 minutes then check https://nikibhavi.msdevbuild.com"
