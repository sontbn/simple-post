export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

type PostWithUser = { id: number; title: string; body: string; user: { name: string; email: string } }

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number.parseInt(idStr, 10)
  if (!Number.isInteger(id)) notFound()

  const post = (await prisma.post.findUnique({ where: { id }, include: { user: true } })) as PostWithUser | null
  if (!post) notFound()

  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="breadcrumbs text-sm mb-3">
        <ul>
          <li><Link href="/posts">Posts</Link></li>
          <li>#{post.id}</li>
        </ul>
      </div>

      <div className="card bg-base-100 shadow-lg rounded-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-semibold">
            <span className="badge badge-neutral badge-outline mr-2">#{post.id}</span>
            {post.title}
          </h1>
          <p className="opacity-70 text-sm">by {post.user.name}</p>
          <div className="divider my-4"></div>
          <div className="prose max-w-none whitespace-pre-wrap">{post.body}</div>

          <div className="mt-6">
            <div className="card-actions flex-nowrap gap-2">
              <Link className="btn" href="/posts">Back</Link>
              {session?.user?.email === post.user.email && (
                <>
                  <Link className="btn btn-outline" href={`/edit/${post.id}`}>Edit</Link>
                  <form action={async () => { "use server"; await prisma.post.delete({ where: { id: post.id } }) }} className="contents">
                    <button className="btn btn-error">Delete</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
