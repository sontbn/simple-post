# Simple Post (Monorepo)

This repository contains **two independent implementations** of the same small Post app, built to satisfy the assessment requirements:

* **`/laravel`** — Laravel 11 + Blade + SQLite + DaisyUI (CDN)
* **`/nextjs`** — Next.js 16 (App Router) + Prisma + SQLite + NextAuth v4 + DaisyUI

Each stack has its **own README** with full setup and details.

---

## Features

* Authentication: Sign Up, Sign In, Sign Out
* Posts CRUD: list with pagination, show, create, edit, delete
* Clean, consistent UI using DaisyUI, centered layout, single‑row action bars

---

## Folder Structure

```
simple-post/
├─ laravel/   # Laravel implementation (Blade + DaisyUI via CDN)
└─ nextjs/    # Next.js implementation (Prisma + NextAuth + DaisyUI)
```

Each folder is self‑contained and can be run independently.

---

## Quick Start (summary)

### Laravel

```bash
cd laravel
composer install
cp .env.example .env
php artisan key:generate
# Set DB_CONNECTION=sqlite and DB_DATABASE to absolute path of database/database.sqlite
mkdir -p database && : > database/database.sqlite
php artisan migrate
php artisan serve
```

Open: `http://localhost:8000`

### Next.js

```bash
cd nextjs
npm install
# Create .env if missing
# DATABASE_URL="file:./prisma/dev.db"
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="devsecret"

npx prisma migrate dev --name init
npm run dev
```

Open: `http://localhost:3000`

---

## UI Parity

Both stacks use the same DaisyUI component classes and layout widths:

* Shell container: `container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl`
* Content column (list/detail): `mx-auto max-w-3xl`

Laravel loads DaisyUI via **CDN**. Next.js also uses the **CDN** by default to ensure pixel parity.

---

## Notes

* The two apps are independent; you can work with either one without the other.
* If the `nextjs/` folder ever appears as a **submodule** on GitHub (blue arrow), remove its nested `.git` before committing to keep it a normal folder.
* For details, troubleshooting, or alternative setups (e.g., Tailwind plugin mode), read the stack‑specific READMEs in `/laravel` and `/nextjs`.
