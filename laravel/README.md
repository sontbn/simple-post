# Simple Post — Laravel

A minimal blog-style app that implements the assessment features with **Laravel** + **Blade** + **DaisyUI (CDN)**:

* Authentication: Sign Up, Sign In, Sign Out
* Posts CRUD: list with pagination, show, create, edit, delete
* Clean UI using DaisyUI components

---

## Tech

* Laravel 11
* SQLite (local dev)
* Blade views styled with **DaisyUI** via CDN (no build tools required)
* Pagination styled to DaisyUI

---

## Quick Start

### Single-shot setup (Install + Database)

```bash
# from repo root
cd laravel

# dependencies
composer install

# env + app key
cp .env.example .env
php artisan key:generate

# configure SQLite path in .env (example below)
# DB_CONNECTION=sqlite
# DB_DATABASE="/absolute/path/to/laravel/database/database.sqlite"

# create sqlite file and run migrations
mkdir -p database
: > database/database.sqlite
php artisan migrate

# run dev server
php artisan serve
```

> Make sure `DB_DATABASE` in `.env` points to the **absolute path** of `database/database.sqlite` on your machine.

Open: `http://localhost:8000`

Register a user from the UI, then create/edit/delete posts.

---

## UI

DaisyUI is loaded via CDN in `resources/views/layouts/app.blade.php`:

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
```

Layout centering:

* Shell: `container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl`
* Content column (list/detail): `mx-auto max-w-3xl`

---

## Project Structure

This repo keeps each implementation in its own folder (`/laravel`, `/nextjs`).

---

## Notes

* No asset pipeline required; CDN is enough.
* You can later switch to Vite + Tailwind + daisyUI plugin with the same Blade markup.
