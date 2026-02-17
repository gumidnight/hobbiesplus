# Cloudflare Pages Deployment Script
# Run this to build and deploy your app
#
# Prerequisites:
#   Set your API token as an environment variable BEFORE running:
#     $env:CLOUDFLARE_API_TOKEN = "your-token-here"
#   Or use: wrangler login (interactive browser auth)

Write-Host "🚀 Starting Cloudflare Pages Deployment..." -ForegroundColor Cyan

# Verify API token is set
if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Host "❌ CLOUDFLARE_API_TOKEN environment variable is not set." -ForegroundColor Red
    Write-Host "   Set it with: `$env:CLOUDFLARE_API_TOKEN = 'your-token'`" -ForegroundColor Yellow
    Write-Host "   Or run: npx wrangler login" -ForegroundColor Yellow
    exit 1
}

# Step 1: Build
Write-Host "`n📦 Building Next.js app for Cloudflare Pages..." -ForegroundColor Yellow
node node_modules\@cloudflare\next-on-pages\bin\index.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed!" -ForegroundColor Green

# Step 2: Deploy
Write-Host "`n🌐 Deploying to Cloudflare Pages..." -ForegroundColor Yellow
node node_modules\wrangler\bin\wrangler.js pages deploy .vercel\output\static --project-name=hobbiesplus

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
    Write-Host "🎉 Your app is live at: https://hobbiesplus.pages.dev" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Deployment failed!" -ForegroundColor Red
}
