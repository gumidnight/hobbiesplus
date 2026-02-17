# 🚀 GitHub + Cloudflare Pages Deployment Guide

Complete step-by-step guide to deploy Hobbies+ to production.

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository settings:
   - **Name:** `hobbies-plus` (or your preferred name)
   - **Description:** "Beta registration system for Hobbies+ built with Next.js 15 and Cloudflare Pages"
   - **Visibility:** Private or Public (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **Create repository**

### Step 2: Push Code to GitHub

Copy and run these commands (replace `YOUR_USERNAME` with your GitHub username):

```powershell
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/hobbies-plus.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push code
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/alexandrosgeorgiou/hobbies-plus.git
git branch -M main
git push -u origin main
```

If prompted for credentials, use:
- **Username:** Your GitHub username
- **Password:** A [Personal Access Token](https://github.com/settings/tokens) (not your password)

---

## Part 2: Create Cloudflare D1 Database

### Step 1: Authenticate Wrangler

```powershell
.\wrangler.bat login
```

Or:
```powershell
node node_modules\wrangler\bin\wrangler.js login
```

This will open your browser to log in to Cloudflare.

### Step 2: Create Production D1 Database

```powershell
.\wrangler.bat d1 create hobbies-plus-db
```

**Output will look like:**
```
✅ Successfully created DB 'hobbies-plus-db'!

[[d1_databases]]
binding = "DB"
database_name = "hobbies-plus-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**⚠️ IMPORTANT:** Copy the `database_id` value!

### Step 3: Update wrangler.toml

Open `wrangler.toml` and replace `YOUR_D1_DATABASE_ID` with your actual database ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "hobbies-plus-db"
database_id = "paste-your-database-id-here"  # ← Update this!
```

### Step 4: Run Production Migration

```powershell
.\wrangler.bat d1 execute hobbies-plus-db --remote --file=./migrations/0001_create_registrations.sql
```

This creates the `registrations` table in your production database.

### Step 5: Commit and Push Changes

```powershell
git add wrangler.toml
git commit -m "Add production D1 database ID"
git push
```

---

## Part 3: Set Up Cloudflare Pages

### Step 1: Create Cloudflare Pages Project

1. Go to https://dash.cloudflare.com
2. Select your account
3. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Connect to GitHub:
   - Click **Connect GitHub**
   - Authorize Cloudflare
   - Select your `hobbies-plus` repository

### Step 2: Configure Build Settings

On the "Set up builds and deployments" page:

| Setting | Value |
|---------|-------|
| **Project name** | `hobbies-plus` |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` |
| **Build command** | `npx @cloudflare/next-on-pages` |
| **Build output directory** | `.vercel/output/static` |

Click **Save and Deploy** (it will fail first time - that's okay!)

### Step 3: Add D1 Database Binding

1. Go to your Pages project → **Settings** → **Functions**
2. Scroll to **D1 database bindings**
3. Click **Add binding**:
   - **Variable name:** `DB`
   - **D1 database:** Select `hobbies-plus-db`
4. Click **Save**

### Step 4: Add Environment Variables

Still in **Settings** → **Environment variables**:

Click **Add variable** and add these two variables:

| Variable name | Value | Notes |
|---------------|-------|-------|
| `ADMIN_PASSWORD` | Your secure password | Use a strong password! |
| `JWT_SECRET` | Random 32+ character string | See below for generation |

**Generate a secure JWT secret:**

**On Windows:**
```powershell
# Option 1: Using PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Option 2: Online generator
# Visit: https://generate-secret.vercel.app/32
```

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**Example values (DO NOT USE THESE - generate your own):**
```
ADMIN_PASSWORD=MySecureP@ssw0rd2026!
JWT_SECRET=K7mN9pQ2rT5vX8zA1bC4dE6fG9hJ2kL5nM8pQ1rT4vW7yZ
```

Make sure to select **Production** environment for both variables!

Click **Save**.

---

## Part 4: Set Up GitHub Actions (Automated Deployment)

### Step 1: Get Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Use **Edit Cloudflare Workers** template
4. Configure permissions:
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Account** → **D1** → **Edit**
5. Set **Account Resources** → **Include** → Select your account
6. Click **Continue to summary** → **Create Token**
7. **⚠️ COPY THE TOKEN** (you won't see it again!)

### Step 2: Get Cloudflare Account ID

1. Go to https://dash.cloudflare.com
2. Select your account
3. Scroll down on the right sidebar
4. Copy your **Account ID** (it's under "Account ID")

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/hobbies-plus`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | The API token from Step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | The Account ID from Step 2 |

### Step 4: Trigger Deployment

GitHub Actions will now automatically deploy whenever you push to `main`!

**Manual trigger (optional):**
```powershell
# Make a small change
git commit --allow-empty -m "Trigger deployment"
git push
```

Go to your repo → **Actions** tab to watch the deployment.

---

## Part 5: Verify Deployment

### Step 1: Check Deployment Status

1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** → **hobbies-plus**
3. You should see a successful deployment

### Step 2: Get Your URL

Your site will be live at:
```
https://hobbies-plus.pages.dev
```

Or a custom subdomain based on your project name.

### Step 3: Test the Application

**Landing Page:**
```
https://hobbies-plus.pages.dev/
```

**Admin Login:**
```
https://hobbies-plus.pages.dev/admin/login
```

Log in with the `ADMIN_PASSWORD` you set earlier.

### Step 4: Test Beta Registration

1. Go to your landing page
2. Enter an email address
3. Submit the form
4. Log in to admin panel
5. Verify the registration appears in the dashboard
6. Test CSV export

---

## Part 6: Custom Domain (Optional)

### Add Custom Domain

1. In Cloudflare Pages → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `hobbies.example.com`)
4. Follow DNS setup instructions
5. Cloudflare will automatically provision SSL certificate

---

## 🎉 You're Live!

Your Hobbies+ beta registration system is now deployed and ready to collect signups!

### Quick Links

- **Production Site:** `https://hobbies-plus.pages.dev`
- **Admin Panel:** `https://hobbies-plus.pages.dev/admin`
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **GitHub Repo:** `https://github.com/YOUR_USERNAME/hobbies-plus`

### Next Steps

1. Share your landing page URL
2. Monitor registrations in the admin panel
3. Export data as needed
4. Customize branding and copy
5. Add analytics (Cloudflare Web Analytics)

---

## 🔧 Troubleshooting

### Build Fails on Cloudflare Pages

**Error:** "Module not found"
- **Fix:** Make sure `Build command` is `npx @cloudflare/next-on-pages`

**Error:** "D1 database not found"
- **Fix:** Check D1 binding is set to `DB` (variable name) and points to correct database

### "Unauthorized" on Admin Panel

- Check `ADMIN_PASSWORD` is set in Cloudflare Pages environment variables
- Check `JWT_SECRET` is set
- Clear cookies and try again

### GitHub Actions Fails

**Error:** "Unauthorized"
- **Fix:** Verify `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are correct

**Error:** "Project not found"
- **Fix:** Update `.github/workflows/deploy.yml` with your actual project name

---

## 📞 Support Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages
- **Cloudflare D1 Docs:** https://developers.cloudflare.com/d1
- **Next.js on Pages:** https://github.com/cloudflare/next-on-pages

---

**🚀 Happy launching!**
