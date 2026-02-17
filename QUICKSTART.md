# 🚀 Quick Start — Hobbies+ Beta Registration System

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Local D1 Database
```bash
# Create D1 database
wrangler d1 create hobbies-plus-db

# Copy the database_id from output and update wrangler.toml
# Then run the migration:
npm run db:migrate:local
```

### 3. Configure Environment
```bash
# Copy example env file
cp .dev.vars.example .dev.vars

# Edit .dev.vars and set:
# ADMIN_PASSWORD=your-secure-password
# JWT_SECRET=random-32-character-secret
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access the App
- **Landing Page:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
  - Use the password you set in `.dev.vars`

---

## 📖 Full Documentation

- **[SETUP.md](SETUP.md)** — Production deployment guide
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** — Complete file reference & API docs
- **[README.md](README.md)** — Project overview

---

## 🎯 What You Get

✅ Modern landing page with hero, features, and email signup  
✅ Beta registration system with D1 database storage  
✅ Admin panel with login, dashboard, and CSV export  
✅ JWT authentication with httpOnly cookies  
✅ Cloudflare Pages-ready deployment configuration  
✅ GitHub Actions CI/CD workflow  
✅ TypeScript + Tailwind CSS + Next.js 15  

---

## 📸 Project Features

### Landing Page
- Gradient hero with Hobbies+ mascot character
- Email registration form (name optional)
- Feature cards showcasing benefits
- Call-to-action section
- Responsive design with smooth animations

### Admin Panel
- Secure password-protected login
- View all beta registrations
- Export data as CSV
- Real-time stats (total signups, latest registration, etc.)
- Clean, modern dashboard UI

---

## 🛠️ Tech Stack

- **Next.js 15** — App Router with React 19
- **TypeScript** — Full type safety
- **Tailwind CSS** — Modern utility-first styling
- **Cloudflare Pages** — Edge deployment
- **Cloudflare D1** — Serverless SQLite database
- **jose** — JWT authentication
- **Wrangler** — Cloudflare CLI

---

## 🔐 Security

- JWT tokens with 8-hour expiry
- httpOnly cookies (prevents XSS)
- Admin password via environment variables
- Middleware protection for admin routes
- Email validation and sanitization
- Unique constraint on emails

---

## 🌐 Deployment

### Option 1: GitHub Actions (Recommended)
1. Push to GitHub
2. Add secrets to repository:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. GitHub Actions will auto-deploy on push to `main`

### Option 2: Manual Deploy
```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy
npm run pages:deploy
```

**Don't forget to:**  
- Set `ADMIN_PASSWORD` and `JWT_SECRET` in Cloudflare Pages environment variables  
- Bind D1 database to your Pages project  
- Run remote migration: `npm run db:migrate:remote`

---

## 📞 Support

See [SETUP.md](SETUP.md) for detailed deployment instructions and troubleshooting.

---

**Ready to launch your beta? Let's go! 🎉**
