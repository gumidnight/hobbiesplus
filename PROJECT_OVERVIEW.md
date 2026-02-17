# Hobbies+ — Complete File Reference

## 📁 Project Structure

```
hobbies+/
├── 📄 package.json                         # Dependencies & scripts
├── 📄 tsconfig.json                        # TypeScript configuration
├── 📄 next.config.mjs                      # Next.js + Cloudflare setup
├── 📄 tailwind.config.ts                   # Tailwind theme & animations
├── 📄 postcss.config.mjs                   # PostCSS + Tailwind
├── 📄 wrangler.toml                        # Cloudflare D1/R2 bindings
├── 📄 env.d.ts                             # TypeScript environment types
├── 📄 .dev.vars                            # Local environment variables (gitignored)
├── 📄 .dev.vars.example                    # Example env vars for local dev
├── 📄 .gitignore                           # Git ignore rules
├── 📄 README.md                            # Quick reference & overview
├── 📄 SETUP.md                             # Production deployment guide
│
├── 📂 migrations/
│   └── 📄 0001_create_registrations.sql    # D1 database schema
│
├── 📂 .github/
│   └── 📂 workflows/
│       └── 📄 deploy.yml                   # GitHub Actions CI/CD
│
├── 📂 public/
│   └── 📂 images/
│       ├── 🖼️ character.png                # Hobbies+ mascot (for hero)
│       └── 🖼️ website-design-example.png  # Design reference
│
└── 📂 src/
    ├── 📂 app/
    │   ├── 📄 layout.tsx                   # Root layout (metadata, fonts)
    │   ├── 📄 globals.css                  # Tailwind + custom CSS (animations, glass effect)
    │   ├── 📄 page.tsx                     # 🏠 Landing page (hero, features, CTA)
    │   │
    │   ├── 📂 admin/
    │   │   ├── 📄 page.tsx                 # 🔒 Admin dashboard (view registrations)
    │   │   └── 📂 login/
    │   │       └── 📄 page.tsx             # 🔑 Admin login form
    │   │
    │   └── 📂 api/
    │       ├── 📂 register/
    │       │   └── 📄 route.ts             # POST /api/register
    │       └── 📂 admin/
    │           ├── 📂 login/
    │           │   └── 📄 route.ts         # POST /api/admin/login
    │           ├── 📂 registrations/
    │           │   └── 📄 route.ts         # GET /api/admin/registrations
    │           ├── 📂 export/
    │           │   └── 📄 route.ts         # GET /api/admin/export (CSV)
    │           └── 📂 logout/
    │               └── 📄 route.ts         # POST /api/admin/logout
    │
    ├── 📂 components/
    │   └── 📄 RegistrationForm.tsx         # Client component: email signup form
    │
    ├── 📂 lib/
    │   ├── 📄 auth.ts                      # JWT helpers (create, verify, cookie)
    │   └── 📄 utils.ts                     # Email validation, sanitization
    │
    └── 📄 middleware.ts                    # Route protection for /admin and /api/admin
```

---

## 🧩 Component Breakdown

### **Landing Page** (`src/app/page.tsx`)
- Hero section with gradient background and mascot image
- Email registration form (name optional)
- Features section (3 benefits)
- CTA section with "Join the Beta" button
- Responsive design with Tailwind animations

### **Registration Form** (`src/components/RegistrationForm.tsx`)
- Client component with React state
- Email + name input fields
- Form validation
- Success/error states with animations
- Calls `POST /api/register`

### **Admin Login** (`src/app/admin/login/page.tsx`)
- Password-only login form
- Authenticates against `ADMIN_PASSWORD` env var
- Sets httpOnly JWT cookie on success
- Redirects to `/admin`

### **Admin Dashboard** (`src/app/admin/page.tsx`)
- Protected by middleware
- Fetches registrations from D1
- Displays stats (total, latest, with name)
- Table view of all registrations
- Export to CSV button
- Logout button

### **Middleware** (`src/middleware.ts`)
- Runs on `/admin/*` and `/api/admin/*` routes
- Verifies JWT from cookie
- Redirects to login if unauthorized
- Returns 401 for API routes if unauthorized

---

## 🔌 API Endpoints

### Public API

#### `POST /api/register`
**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe" // optional
}
```
**Response (201):**
```json
{
  "message": "You're on the list! We'll be in touch soon. 🎉"
}
```
**Response (409 - Duplicate):**
```json
{
  "error": "This email is already registered."
}
```

### Admin API (Protected)

#### `POST /api/admin/login`
**Request:**
```json
{
  "password": "your-admin-password"
}
```
**Response (200):**
```json
{
  "message": "Authenticated"
}
```
Sets `admin_token` httpOnly cookie.

#### `GET /api/admin/registrations`
**Response (200):**
```json
{
  "registrations": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2026-02-17 20:30:00",
      "ip": "1.2.3.4",
      "user_agent": "Mozilla/5.0..."
    }
  ]
}
```

#### `GET /api/admin/export`
**Response (200):**
CSV file download:
```csv
id,email,name,created_at,ip,user_agent
1,user@example.com,John Doe,2026-02-17 20:30:00,1.2.3.4,"Mozilla/5.0..."
```

#### `POST /api/admin/logout`
**Response (200):**
```json
{
  "message": "Logged out"
}
```
Clears `admin_token` cookie.

---

## 🎨 Design System

### Colors (Tailwind Theme)
- **Brand Purple:** `brand-50` to `brand-950` (primary gradient)
- **Background:** `#0a0a12` (dark navy)
- **Text:** `#f5f5f7` (off-white)
- **Accents:** Purple-to-pink gradients

### Animations
- `fade-in` — Opacity fade
- `slide-up` — Slide from below
- `float` — Gentle up/down motion (mascot)
- `pulse-soft` — Subtle pulsing
- `animate-border-glow` — Border glow effect

### Custom CSS Classes
- `.gradient-text` — Purple-pink gradient text
- `.glow` / `.glow-sm` — Box shadows with brand color
- `.glass` — Glass morphism background
- `.bg-grid` — Subtle grid background pattern
- `.noise` — Film grain overlay

---

## 🔒 Security Features

| Feature | Implementation |
|---------|---------------|
| JWT Auth | `jose` library with HS256, 8-hour expiry |
| httpOnly Cookies | Prevents XSS attacks on tokens |
| Admin Password | Environment variable, never hardcoded |
| Middleware Protection | Verifies JWT on all `/admin` routes |
| Email Validation | Regex + length check |
| Duplicate Prevention | `UNIQUE` constraint on email column |
| CSV Sanitization | Escapes special characters |
| Edge Runtime | Cloudflare's secure edge environment |

---

## 📦 npm Scripts

```bash
npm run dev                    # Local Next.js dev server
npm run build                  # Standard Next.js build
npm run start                  # Production Next.js server
npm run pages:build            # Build for Cloudflare Pages (@cloudflare/next-on-pages)
npm run pages:dev              # Wrangler local dev with D1 bindings
npm run pages:deploy           # Deploy to Cloudflare Pages
npm run db:migrate:local       # Run SQL migration on local D1
npm run db:migrate:remote      # Run SQL migration on production D1
```

---

## 🌐 Cloudflare Architecture

```
GitHub → GitHub Actions
    ↓
Cloudflare Pages (Edge Functions)
    ├── Next.js App (SSR/SSG)
    ├── API Routes (Edge Runtime)
    └── D1 Database (SQLite at edge)
```

### Bindings
- **D1:** `env.DB` (registrations table)
- **Env Vars:** `env.ADMIN_PASSWORD`, `env.JWT_SECRET`

### Edge Runtime
- All API routes use `export const runtime = "edge"`
- Server components run at the edge
- No Node.js runtime, only Web APIs + Cloudflare APIs

---

## ✅ Checklist for Launch

- [ ] D1 database created and `database_id` in `wrangler.toml`
- [ ] Migration run on production D1
- [ ] Environment variables set in Cloudflare Pages dashboard
- [ ] D1 binding added to Cloudflare Pages project
- [ ] GitHub Actions secrets configured (if using CI/CD)
- [ ] Custom domain configured (optional)
- [ ] SSL/TLS enabled (automatic on Cloudflare Pages)
- [ ] Analytics configured (Cloudflare Web Analytics)

---

## 🚀 Next Steps

1. **Test locally:** `npm run dev`
2. **Deploy to Cloudflare Pages**
3. **Share landing page URL**
4. **Monitor registrations in admin panel**
5. **Export CSV when ready to reach out to beta users**

---

**Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Cloudflare Pages**
