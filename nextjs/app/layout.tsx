import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = { title: "Posts" }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-base-200">
        <header className="sticky top-0 z-20 backdrop-blur bg-base-100/80 border-b">
          <div className="navbar container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="flex-1">
              <Link href="/posts" className="btn btn-ghost text-xl">Posts</Link>
            </div>
            <div className="flex-none gap-2">
              {session ? (
                <>
                  <Link href="/new" className="btn btn-primary">New Post</Link>
                  <a href="/api/auth/signout?callbackUrl=/posts" className="btn btn-ghost">Sign Out</a>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="btn btn-ghost">Sign In</Link>
                  <Link href="/sign-up" className="btn btn-primary">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  )
}
