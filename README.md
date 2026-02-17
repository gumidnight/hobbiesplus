# Hobbies+

Beta registration system built with Next.js 15, TypeScript, Tailwind CSS, and Cloudflare Pages.

🌐 **Live Site:** https://hobbiesplus.pages.dev

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Wrangler CLI (`npm i -g wrangler`)

### Install Dependencies

```bash
npm install
```

### Local Development

1. **Create a D1 database** (one-time setup):
   ```bash
   npx wrangler d1 create hobbies-plus-db
   ```
   Copy the `database_id` output and paste it into `wrangler.toml`.

2. **Run the migration** (creates the registrations table):
   ```bash
   npm run db:migrate:local
   ```

3. **Configure environment variables**:
   Edit `.dev.vars` with your admin password and JWT secret:
   ```
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=your-random-jwt-secret
   ```

4. **Start the dev server**:
   ```bash
   npm run dev
   ```

### Build for Cloudflare Pages

```bash
npm run pages:build
```

### Deploy to Cloudflare Pages

```bash
npm run pages:deploy
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Tailwind + custom styles
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard
│   │   └── login/
│   │       └── page.tsx            # Admin login
│   └── api/
│       ├── register/
│       │   └── route.ts            # POST /api/register
│       └── admin/
│           ├── login/
│           │   └── route.ts        # POST /api/admin/login
│           ├── registrations/
│           │   └── route.ts        # GET /api/admin/registrations
│           ├── export/
│           │   └── route.ts        # GET /api/admin/export
│           └── logout/
│               └── route.ts        # POST /api/admin/logout
├── components/
│   └── RegistrationForm.tsx        # Email registration form
├── lib/
│   ├── auth.ts                     # JWT helpers
│   └── utils.ts                    # Validation utilities
└── middleware.ts                    # Admin route protection
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with beta registration |
| `/admin/login` | Admin authentication |
| `/admin` | Admin dashboard (protected) |
| `POST /api/register` | Register email for beta |
| `POST /api/admin/login` | Authenticate admin |
| `GET /api/admin/registrations` | List all registrations |
| `GET /api/admin/export` | Download CSV export |
| `POST /api/admin/logout` | Clear admin session |

## Environment Variables

Set these in Cloudflare Pages dashboard → Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Password for admin panel access |
| `JWT_SECRET` | Secret key for signing JWT tokens |
