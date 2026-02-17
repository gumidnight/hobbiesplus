# Cloudflare Pages Deployment Script
# Run this to build and deploy your app

Write-Host "🚀 Starting Cloudflare Pages Deployment..." -ForegroundColor Cyan

# Set API Token
$env:CLOUDFLARE_API_TOKEN = "REVOKED"

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
