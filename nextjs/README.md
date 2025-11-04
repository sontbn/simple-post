# Simple Post — Next.js (App Router)

A minimal blog-style app that implements the assessment features with **Next.js 16**, **Prisma (SQLite)**, **NextAuth v4**, and **DaisyUI**:

* Authentication: Sign Up, Sign In, Sign Out
* Posts CRUD: list with pagination, show, create, edit, delete
* Clean UI using DaisyUI components (CDN)

---

## Tech

* Next.js 16 (App Router)
* Prisma + SQLite
* NextAuth v4 (Credentials)
* DaisyUI via CDN
* TypeScript

---

## Quick Start

### Single-shot setup (Install + DB + Run)

```bash
# from repo root
cd nextjs

# deps
npm install

# env
cp .env.example .env || true
# If you don't have .env.example, create .env with the lines below
# DATABASE_URL="file:./prisma/dev.db"
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="devsecret"

# prisma
npx prisma migrate dev --name init

# dev server
npm run dev
```

Open: `http://localhost:3000`

Register or sign in from the UI, then create/edit/delete posts.

---

## UI

To exactly match the Laravel look, DaisyUI is loaded via CDN in `app/layout.tsx`:

```tsx
<head>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" />
</head>
```

Layout centering:

* Shell: `container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl`
* Content column (list/detail): `mx-auto max-w-3xl`

If you prefer plugin mode instead of CDN:

```bash
npm i daisyui @tailwindcss/typography
```

Then in `app/globals.css` (Tailwind v4 style):

```css
@import "tailwindcss";
@plugin "daisyui";
@plugin "@tailwindcss/typography";
```

Restart `npm run dev` after changing plugins.

---

## Environment

`.env` used by Prisma and NextAuth:

```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="devsecret"
```

---

## Notes

* Using Next.js 16, dynamic route props like `params` and `searchParams` are Promises; pages in this project `await` them.
* Prisma schema defines `User` and `Post` in `prisma/schema.prisma` and stores data in `prisma/dev.db`.
* You can inspect data with `npx prisma studio`.
