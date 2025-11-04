import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

async function create(data: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return
  const title = String(data.get("title") || "")
  const body = String(data.get("body") || "")
  await prisma.post.create({ data: { title, body, userId: user.id } })
  redirect("/posts")
}

export default async function NewPost() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/sign-in")
  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-lg rounded-2xl">
      <div className="card-body">
        <h2 className="card-title">New Post</h2>
        <form action={create} className="space-y-4">
          <label className="form-control">
            <span className="label-text mb-1">Title</span>
            <input name="title" className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Body</span>
            <textarea name="body" className="textarea textarea-bordered w-full h-56" />
          </label>
          <div className="flex gap-2 justify-end">
            <a href="/posts" className="btn">Cancel</a>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
