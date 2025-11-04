export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

type PostWithUser = { id: number; title: string; body: string; user: { name: string; email: string } }

export default async function Posts({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageStr } = await searchParams
  const page = Number.parseInt(pageStr ?? "1", 10)
  const take = 10
  const skip = (page - 1) * take

  const items: PostWithUser[] = await prisma.post.findMany({
    include: { user: true },
    orderBy: { id: "desc" },
    take,
    skip,
  })
  const total = await prisma.post.count()
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Posts</h1>
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4">
          {items.map((p) => (
            <div key={p.id} className="card bg-base-100 shadow-lg rounded-2xl hover:shadow-xl transition">
              <div className="card-body">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="card-title">
                    <span className="badge badge-neutral badge-outline mr-2">#{p.id}</span>
                    <Link href={`/posts/${p.id}`} className="link link-hover">{p.title}</Link>
                  </h2>
                  {session?.user?.email === p.user.email && (
                    <Link className="btn btn-sm btn-outline" href={`/edit/${p.id}`}>Edit</Link>
                  )}
                </div>
                <p className="text-sm opacity-70">by {p.user.name}</p>
                <div className="card-actions justify-end">
                  <Link className="btn btn-primary" href={`/posts/${p.id}`}>Open</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <nav className="join">
            {Array.from({ length: Math.max(1, Math.ceil(total / take)) }).map((_, i) => {
              const n = i + 1
              const active = n === page
              return (
                <Link
                  key={n}
                  href={`/posts?page=${n}`}
                  className={`join-item btn btn-sm ${active ? "btn-active" : ""}`}
                >
                  {n}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
