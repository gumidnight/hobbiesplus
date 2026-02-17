# 🔧 Group Policy Workaround Guide

Your system has group policy restrictions blocking `npx` and direct node execution. Here are the workarounds:

## ✅ Quick Solutions

### Start Development Server
Instead of `npm run dev`, use:
```powershell
.\dev.bat
# or
.\dev.ps1
```

### Create D1 Database
Instead of `wrangler d1 create`, use:
```powershell
.\wrangler.bat d1 create hobbies-plus-db
# or
.\wrangler.ps1 d1 create hobbies-plus-db
```

### Run Database Migration (Local)
```powershell
.\wrangler.bat d1 execute hobbies-plus-db --local --file=./migrations/0001_create_registrations.sql
```

### Build for Production
```powershell
.\build.bat
```

### Build for Cloudflare Pages
```powershell
node node_modules\@cloudflare\next-on-pages\dist\cli\index.js
```

---

## 📝 Complete Setup Steps

### 1. Create D1 Database
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

**Copy the `database_id`** and update it in `wrangler.toml` (line 8).

### 2. Run Database Migration
```powershell
.\wrangler.bat d1 execute hobbies-plus-db --local --file=./migrations/0001_create_registrations.sql
```

### 3. Configure Environment Variables
Edit `.dev.vars` and set strong passwords:
```
ADMIN_PASSWORD=your-secure-admin-password-here
JWT_SECRET=your-random-jwt-secret-at-least-32-characters
```

**Generate a secure JWT secret:**
```powershell
# Random base64 string:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 4. Start Development Server
```powershell
.\dev.bat
```

Then visit:
- **Landing page:** http://localhost:3000
- **Admin login:** http://localhost:3000/admin/login

---

## 🎯 Alternative: All Direct Node Commands

If the `.bat` scripts don't work, use these direct commands:

### Dev Server
```powershell
node node_modules\next\dist\bin\next dev
```

### Build
```powershell
node node_modules\next\dist\bin\next build
```

### Wrangler D1 Commands
```powershell
# Create database
node node_modules\wrangler\bin\wrangler.js d1 create hobbies-plus-db

# Run migration (local)
node node_modules\wrangler\bin\wrangler.js d1 execute hobbies-plus-db --local --file=./migrations/0001_create_registrations.sql

# List databases
node node_modules\wrangler\bin\wrangler.js d1 list
```

### Cloudflare Pages Build
```powershell
node node_modules\@cloudflare\next-on-pages\dist\cli\index.js
```

---

## 🔍 Troubleshooting

### If `.bat` scripts fail:
Use the direct `node` commands above.

### If you need to run wrangler frequently:
Create a PowerShell alias:
```powershell
# Add to your PowerShell profile:
function wrangler { node node_modules\wrangler\bin\wrangler.js $args }
```

### If dev server won't start:
1. Check port 3000 is not in use:
   ```powershell
   Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
   ```
2. Try a different port:
   ```powershell
   node node_modules\next\dist\bin\next dev -p 3001
   ```

---

## ✨ You're All Set!

Once you've completed the setup steps above, you'll have:
- ✅ Local D1 database with registrations table
- ✅ Environment variables configured
- ✅ Dev server running at http://localhost:3000
- ✅ Admin panel accessible at http://localhost:3000/admin

Happy coding! 🚀
