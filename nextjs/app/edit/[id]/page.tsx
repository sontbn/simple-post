export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"

async function updateAction(id: number, formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return
  const post = await prisma.post.findUnique({ where: { id }, include: { user: true } })
  if (!post || post.user.email !== session.user.email) return
  const title = String(formData.get("title") || "")
  const body = String(formData.get("body") || "")
  await prisma.post.update({ where: { id }, data: { title, body } })
  redirect(`/posts/${id}`)
}

async function removeAction(id: number, _formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return
  const post = await prisma.post.findUnique({ where: { id }, include: { user: true } })
  if (!post || post.user.email !== session.user.email) return
  await prisma.post.delete({ where: { id } })
  redirect("/posts")
}

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number.parseInt(idStr, 10)
  if (!Number.isInteger(id)) notFound()

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-lg rounded-2xl">
      <div className="card-body">
        <h2 className="card-title">Edit Post #{post.id}</h2>

        <form id="editForm" action={updateAction.bind(null, id)} className="space-y-4">
          <label className="form-control">
            <span className="label-text mb-1">Title</span>
            <input name="title" defaultValue={post.title} className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Body</span>
            <textarea name="body" defaultValue={post.body} className="textarea textarea-bordered w-full h-56" />
          </label>
        </form>

        <div className="mt-3 card-actions flex-nowrap gap-2">
          <Link href={`/posts/${post.id}`} className="btn">Back</Link>
          <button form="editForm" className="btn btn-primary">Update</button>
          <form action={removeAction.bind(null, id)} className="contents">
            <button className="btn btn-error">Delete</button>
          </form>
        </div>
      </div>
    </div>
  )
}
