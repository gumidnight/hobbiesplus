# Hobbies+ — Setup Guide

## Production Deployment on Cloudflare Pages

### Step 1: Create D1 Database

```bash
wrangler d1 create hobbies-plus-db
```

This will output:
```
✅ Successfully created DB 'hobbies-plus-db'!

[[d1_databases]]
binding = "DB"
database_name = "hobbies-plus-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id`** and update it in [wrangler.toml](wrangler.toml).

### Step 2: Run Database Migration (Remote)

```bash
npm run db:migrate:remote
```

This creates the `registrations` table in your production D1 database.

### Step 3: Set Environment Variables in Cloudflare Dashboard

Go to your Cloudflare Pages project → **Settings** → **Environment Variables** and add:

| Variable | Value | Description |
|----------|-------|-------------|
| `ADMIN_PASSWORD` | Your secure password | Admin panel login password |
| `JWT_SECRET` | Random 32+ char string | JWT signing secret (generate with OpenSSL or similar) |

**Generate a secure JWT secret:**
```bash
openssl rand -base64 32
```

### Step 4: Connect GitHub Repository

1. Go to **Cloudflare Pages** → **Create a project**
2. Connect your GitHub account and select this repository
3. Configure build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`

### Step 5: Deploy

Push to `main` branch and Cloudflare Pages will automatically:
- Build your Next.js app
- Deploy to the edge
- Assign a `*.pages.dev` domain

### Step 6: Bind D1 Database to Pages

In Cloudflare Dashboard → **Pages** → Your Project → **Settings** → **Functions**:

1. Scroll to **D1 database bindings**
2. Add binding:
   - **Variable name:** `DB`
   - **D1 database:** Select `hobbies-plus-db`
3. Save

---

## Local Development

### Prerequisites
- Node.js 18+
- Wrangler CLI: `npm i -g wrangler`

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create D1 database (local):**
   ```bash
   wrangler d1 create hobbies-plus-db
   ```
   Update `database_id` in `wrangler.toml` with the output.

3. **Run migration (local):**
   ```bash
   npm run db:migrate:local
   ```

4. **Copy environment variables:**
   ```bash
   cp .dev.vars.example .dev.vars
   ```
   Edit `.dev.vars` and set your `ADMIN_PASSWORD` and `JWT_SECRET`.

5. **Start dev server:**
   ```bash
   npm run dev
   ```

   Visit:
   - Landing page: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login

---

## Usage

### Landing Page (Beta Registration)
- Users enter their email (and optionally name)
- Data is stored in D1 database with IP and user agent
- Duplicate emails are rejected

### Admin Panel
1. Go to `/admin/login`
2. Enter the `ADMIN_PASSWORD`
3. View all registrations in a table
4. Export registrations as CSV

### Admin Routes (Protected)
- `/admin` — Dashboard
- `/admin/login` — Login
- `/api/admin/registrations` — List all registrations (JSON)
- `/api/admin/export` — Download CSV
- `/api/admin/logout` — Clear session

---

## Database Schema

```sql
CREATE TABLE registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip TEXT,
  user_agent TEXT
);
```

---

## Security Features

✅ JWT authentication with httpOnly cookies  
✅ Admin password via environment variable  
✅ Middleware protecting admin routes  
✅ Email validation  
✅ Unique email constraint (prevents duplicates)  
✅ XSS sanitization in CSV export  
✅ Rate limiting via Cloudflare (automatic)  

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Cloudflare Pages Functions (Edge Runtime)
- **Database:** Cloudflare D1 (Serverless SQLite)
- **Auth:** JWT with `jose` library
- **Deployment:** Cloudflare Pages with GitHub Actions

---

## Troubleshooting

### "Database not found" error
- Make sure you've run the migration: `npm run db:migrate:local`
- Check that `database_id` in `wrangler.toml` matches your D1 database

### "Unauthorized" on admin panel
- Verify `ADMIN_PASSWORD` is set in `.dev.vars` (local) or Cloudflare env vars (production)
- Clear cookies and try logging in again

### Build fails
- Ensure Node.js 18+ is installed
- Delete `node_modules` and `.next` folders, then run `npm install` again

### Images not showing
- Verify `public/images/character.png` exists
- Images must be in `public/` folder for Next.js to serve them

---

## License

MIT
